import { inngest } from "./client";
import { ChatGroq } from "@langchain/groq";
import { z } from "zod";
import { db } from "@/lib/db";
import { courses, chapters } from "@/lib/db/schema";
import { searchYoutubeVideos } from "@/lib/youtube";
import { env } from "@/env";
import { eq } from "drizzle-orm";

// ─── Zod Schemas for structured output ───────────────────────────

const chapterOutlineSchema = z.object({
  chapters: z
    .array(z.object({ title: z.string() }))
    .length(8)
    .describe("Exactly 8 chapter titles for the course"),
});

// ─── Helper: AI content generation via LangChain ─────────────────

async function generateChapterContent(
  chapterTitle: string,
  courseTitle: string,
  courseDescription: string
): Promise<string> {
  const model = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
  });

  const response = await model.invoke([
    {
      role: "system",
      content:
        "You are an expert educator. Write educational content in Markdown format. Be thorough but concise, around 300 words.",
    },
    {
      role: "user",
      content: `Write ~300 words of Markdown educational content for the chapter titled "${chapterTitle}" which is part of a course called "${courseTitle}". Course description: "${courseDescription}". Include headings, key concepts, and practical examples.`,
    },
  ]);

  return response.content as string;
}

// ─── Helper: Pexels image search ─────────────────────────────────

async function fetchPexelsImage(query: string): Promise<string> {
  const fallback = `https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: env.PEXELS_API_KEY },
  });

  if (!res.ok) {
    console.error("Pexels API error:", res.status, await res.text());
    return fallback;
  }

  const data = await res.json();
  return data.photos?.[0]?.src?.landscape ?? fallback;
}

// ─── Main Inngest Function ───────────────────────────────────────

export const generateCoursePipeline = inngest.createFunction(
  { id: "generate-course-pipeline" },
  { event: "app/course.generate" },
  async ({ event, step }) => {
    const { courseId, title, description } = event.data as {
      courseId: string;
      title: string;
      description: string;
      userId: string;
    };

    try {
      // ── Step 1: Chapter Outlining (LangChain + Zod structured output) ──

      const outline = await step.run("outline-chapters", async () => {
        const model = new ChatGroq({
          apiKey: env.GROQ_API_KEY,
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
        });

        const structuredModel = model.withStructuredOutput(chapterOutlineSchema);

        const result = await structuredModel.invoke([
          {
            role: "system",
            content:
              "You are an expert course curriculum designer. Generate exactly 8 chapter titles for a course. Return structured JSON.",
          },
          {
            role: "user",
            content: `Create exactly 8 chapter titles for a course titled "${title}". Course description: "${description}". The chapters should follow a logical learning progression from beginner to advanced concepts.`,
          },
        ]);

        return result;
      });

      // ── Step 2: Parallel Chapter Generation (Fan-out) ──

      const generatedChapters = await Promise.all(
        outline.chapters.map((chapter, index) =>
          step.run(`generate-chapter-${index}`, async () => {
            // Sub-task A: AI Content
            const content = await generateChapterContent(
              chapter.title,
              title,
              description
            );

            // Sub-task B: YouTube Search (top 2 videos)
            const videoUrls = await searchYoutubeVideos(chapter.title);

            // Sub-task C: Return chapter data
            return {
              title: chapter.title,
              content,
              videoUrls,
              order: index,
            };
          })
        )
      );

      // ── Step 3: Global Assets (Pexels) ──

      const imageUrl = await step.run("fetch-course-image", async () => {
        return await fetchPexelsImage(title);
      });

      // ── Step 4: Database Persistence (Drizzle) ──

      const result = await step.run("save-to-database", async () => {
        // Sort chapters by order to guarantee the correct first chapter
        const sortedChapters = [...generatedChapters].sort(
          (a, b) => a.order - b.order
        );
        const firstChapterId = crypto.randomUUID();

        // Prepare all chapter records with IDs
        const chapterRecords = sortedChapters.map((ch, idx) => ({
          id: idx === 0 ? firstChapterId : crypto.randomUUID(),
          courseId,
          title: ch.title,
          content: ch.content,
          videoUrls: ch.videoUrls,
          order: ch.order,
        }));

        // Update the existing course
        await db
          .update(courses)
          .set({
            imageUrl,
            activeChapterId: firstChapterId,
            activeChapterOrder: 0,
            status: "completed",
          })
          .where(eq(courses.id, courseId));

        // Bulk insert all chapters
        await db.insert(chapters).values(chapterRecords);

        return { courseId, totalChapters: chapterRecords.length };
      });

      return result;
    } catch (error) {
      console.error("Pipeline failed for courseId:", courseId, error);

      await step.run("mark-course-failed", async () => {
        await db
          .update(courses)
          .set({ status: "failed" })
          .where(eq(courses.id, courseId));
      });

      throw error;
    }
  }
);
