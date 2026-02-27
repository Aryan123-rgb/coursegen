"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { inngest } from "@/lib/inngest/client";
import { z } from "zod";
import arcjet, { tokenBucket, shield } from "@arcjet/next";
import { env } from "@/env";

// ─── Arcjet Protection ──────────────────────────────────────────

const aj = arcjet({
  key: env.ARCJET_KEY,
  characteristics: ["userId"],
  rules: [
    // Shield: protects against common attacks (SQLi, XSS, etc.)
    shield({ mode: "LIVE" }),
    // Rate limit: 5 course generations per hour per user
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 3600,
      capacity: 5,
    }),
  ],
});

// ─── Payload validation schema ──────────────────────────────────

const generateCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),
});

// ─── Server Action ──────────────────────────────────────────────

export async function generateCourseAction(
  input: z.infer<typeof generateCourseSchema>
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
  // Construct a Request object from the headers for Arcjet
  const req = new Request("https://placeholder.local", {
    headers: headersList,
  });
  const decision = await aj.protect(req, {
    userId: session.user.id,
    requested: 1,
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return {
        success: false,
        error:
          "You've exceeded the rate limit. Please wait before generating another course.",
      };
    }
    return {
      success: false,
      error: "Request blocked for security reasons.",
    };
  }

  // 3. Validate the payload
  const parsed = generateCourseSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  // 4. Trigger the Inngest pipeline
  try {
    await inngest.send({
      name: "app/course.generate",
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        userId: session.user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to trigger course generation:", error);
    return {
      success: false,
      error: "Failed to start course generation. Please try again.",
    };
  }
}
