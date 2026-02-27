"use client";

import { useState } from "react";
import { z } from "zod";
import { Sparkles } from "lucide-react";

const courseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),
});

export type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  initialData: CourseFormData;
  onSubmit: (data: CourseFormData) => void;
  isLoading?: boolean;
}

export function CourseForm({ initialData, onSubmit, isLoading = false }: CourseFormProps) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = courseSchema.safeParse({ title, description });

    if (!result.success) {
      const fieldErrors: { title?: string; description?: string } = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as "title" | "description";
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Course Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          disabled={isLoading}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Machine Learning Fundamentals"
          className={`w-full rounded-xl border ${
            errors.title ? "border-red-500/60" : "border-slate-800"
          } bg-black/40 text-white placeholder:text-slate-600 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {errors.title && (
          <p className="mt-1.5 text-xs text-red-400">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          disabled={isLoading}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Briefly describe what this course should cover..."
          rows={4}
          className={`w-full rounded-xl border ${
            errors.description ? "border-red-500/60" : "border-slate-800"
          } bg-black/40 text-white placeholder:text-slate-600 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {errors.description && (
          <p className="mt-1.5 text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-300 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white px-5 py-3 shadow-[0_0_24px_rgba(59,130,246,0.20)] hover:shadow-[0_0_32px_rgba(59,130,246,0.35)] disabled:hover:shadow-none"
      >
        <Sparkles className="w-4 h-4" />
        {isLoading ? "Generating..." : "Generate Chapters"}
      </button>
    </form>
  );
}
