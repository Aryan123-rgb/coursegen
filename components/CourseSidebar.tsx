"use client";

import Link from "next/link";
import { CheckCircle2, Lock, BookOpen } from "lucide-react";
import type { CourseData, Chapter } from "@/lib/mock-course-data";

interface CourseSidebarProps {
  courseData: CourseData;
  activeChapter: Chapter;
}

export function CourseSidebar({
  courseData,
  activeChapter,
}: CourseSidebarProps) {
  const totalChapters = courseData.chapters.length;
  const progressPercent = Math.round(
    (activeChapter.order / totalChapters) * 100,
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
      {/* Course Header */}
      <div className="p-5 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white truncate mb-1">
          {courseData.title}
        </h2>
        <p className="text-xs text-gray-400 mb-3">
          {progressPercent}% Complete
        </p>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Chapter List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {courseData.chapters.map((chapter) => {
          const isCurrent = chapter.id === activeChapter.id;
          const isCompleted = chapter.order < activeChapter.order;
          const isLocked = chapter.order > activeChapter.order;

          return (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.id}`}
              className={`
                flex items-start gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group
                ${
                  isCurrent
                    ? "bg-purple-500/15 border border-purple-500/40 text-white"
                    : isCompleted
                      ? "hover:bg-white/5 text-gray-300"
                      : "text-gray-500 hover:bg-white/5"
                }
              `}
            >
              {/* Status Icon */}
              <div className="mt-0.5 shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <BookOpen className="w-4 h-4 text-purple-400" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-600" />
                )}
              </div>

              {/* Chapter Info */}
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">
                  Chapter {chapter.order}
                </span>
                <p
                  className={`truncate font-medium leading-tight ${
                    isCurrent
                      ? "text-white"
                      : isCompleted
                        ? "text-gray-300"
                        : "text-gray-500"
                  }`}
                >
                  {chapter.title}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
