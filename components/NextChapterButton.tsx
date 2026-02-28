"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateCourseActiveChapter } from "@/app/actions/update-course-progress";

interface NextChapterButtonProps {
  courseId: string;
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
}

export function NextChapterButton({
  courseId,
  chapterId,
  chapterOrder,
  chapterTitle,
}: NextChapterButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNextClick = () => {
    // 1. Optimistic navigation
    router.push(`/course/${courseId}?chapterId=${chapterId}`);

    // 2. Fire server action in background to update DB progress
    startTransition(async () => {
      try {
        await updateCourseActiveChapter({
          courseId,
          chapterId,
          chapterOrder,
        });
      } catch (error) {
        console.error("Failed to update course progress", error);
      }
    });
  };

  return (
    <button
      onClick={handleNextClick}
      disabled={isPending}
      className="cursor-pointer group flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-medium text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.25)] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <div className="text-right">
        <span className="block text-[10px] uppercase tracking-widest text-purple-200">
          Next Chapter
        </span>
        <span className="block truncate max-w-[160px]">{chapterTitle}</span>
      </div>
      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}
