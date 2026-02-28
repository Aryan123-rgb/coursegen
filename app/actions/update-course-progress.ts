"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { z } from "zod";
import arcjet, { tokenBucket, shield } from "@arcjet/next";
import { env } from "@/env";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ─── Arcjet Protection ──────────────────────────────────────────

const aj = arcjet({
  key: env.ARCJET_KEY,
  characteristics: ["userId"],
  rules: [
    shield({ mode: "LIVE" }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 60,
      capacity: 30,
    }),
  ],
});

// ─── Payload validation schema ──────────────────────────────────

const updateActiveChapterSchema = z.object({
  courseId: z.string().min(1, "courseId is required"),
  chapterId: z.string().min(1, "chapterId is required"),
  chapterOrder: z.number().int().min(0, "chapterOrder must be a positive integer or 0"),
});

// ─── Server Action ──────────────────────────────────────────────

export async function updateCourseActiveChapter(
  input: z.infer<typeof updateActiveChapterSchema>
) {
  // 1. Authenticate the user
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized. Please sign in." };
  }

  // 2. Arcjet protection (rate limiting + shield)
  const req = new Request("https://placeholder.local", {
    headers: headersList,
  });
  const decision = await aj.protect(req, {
    userId: session.user.id,
    requested: 1,
  });

  if (decision.isDenied()) {
    return {
      success: false,
      error: decision.reason.isRateLimit()
        ? "Too many requests. Please slow down."
        : "Request blocked for security reasons.",
    };
  }

  // 3. Validate the payload
  const parsed = updateActiveChapterSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  // 4. Update the database record
  try {
    await db
      .update(courses)
      .set({
        activeChapterId: parsed.data.chapterId,
        activeChapterOrder: parsed.data.chapterOrder,
      })
      .where(
        and(
          eq(courses.id, parsed.data.courseId),
          eq(courses.userId, session.user.id) // Ensure user owns the course
        )
      );

    revalidatePath(`/dashboard`);
    revalidatePath(`/course/${parsed.data.courseId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update active chapter:", error);
    return {
      success: false,
      error: "Failed to update course progress. Please try again.",
    };
  }
}
