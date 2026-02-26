import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';

// Define the schema for course structure
export const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  units: z.array(z.object({
    title: z.string(),
    chapters: z.array(z.object({
      title: z.string(),
      youtube_query: z.string().describe("A search query to find a relevant educational video on YouTube for this chapter"),
    })),
  })),
});

export async function generateCourseStructure(prompt: string) {
  // Use Google Generative AI (Gemini) by default as it has a generous free tier
  // Fallback to OpenAI if configured
  const model = process.env.GOOGLE_GENERATIVE_AI_API_KEY 
    ? google('gemini-1.5-pro-latest') 
    : openai('gpt-4o');

  const { object } = await generateObject({
    model,
    schema: courseSchema,
    prompt: `You are an expert course creator. Create a comprehensive course curriculum based on the following topic: "${prompt}".
    The course should be structured into units, and each unit should have multiple chapters.
    For each chapter, provide a title and a specific YouTube search query to find a video that teaches that specific concept.
    Focus on quality educational content.`,
  });

  return object;
}

export async function generateChapterContent(chapterTitle: string, userPrompt: string) {
    const model = process.env.GOOGLE_GENERATIVE_AI_API_KEY 
    ? google('gemini-1.5-pro-latest') 
    : openai('gpt-4o');

    const { text } = await generateText({
        model,
        prompt: `Write a comprehensive educational article for the chapter titled "${chapterTitle}" which is part of a course about "${userPrompt}".
        The content should be detailed, easy to understand, and formatted in Markdown.
        Includes examples, code snippets (if technical), and key takeaways.`,
    });

    return text;
}
