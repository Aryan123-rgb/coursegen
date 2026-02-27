import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { generateCoursePipeline } from "@/lib/inngest/generate-course";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateCoursePipeline],
});
