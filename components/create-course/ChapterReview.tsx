"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen, Rocket, X } from "lucide-react";

interface ChapterReviewProps {
  title: string;
  chapters: string[];
  onGoBack: () => void;
  onStartGenerating: () => void;
}

export function ChapterReview({
  title,
  chapters,
  onGoBack,
  onStartGenerating,
}: ChapterReviewProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="mb-2">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
          Course Preview
        </p>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      <p className="text-slate-400 text-sm mb-6">
        We generated {chapters.length} chapters for your course. Review them
        below, then hit start to generate the full content.
      </p>

      {/* Chapter list */}
      <div className="space-y-2.5 mb-8">
        {chapters.map((chapter, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-black/30 px-4 py-3 transition-colors hover:border-slate-700"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold shrink-0">
              {idx + 1}
            </span>
            <span className="text-sm text-slate-200">{chapter}</span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onStartGenerating}
          className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-300 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 shadow-[0_0_24px_rgba(59,130,246,0.20)] hover:shadow-[0_0_32px_rgba(59,130,246,0.35)]"
        >
          <Rocket className="w-4 h-4" />
          Start Generating Courses
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-5 py-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Form
        </button>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowConfirm(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm mx-4 rounded-2xl border border-slate-800 bg-[#111] p-6 text-center shadow-2xl"
          >
            <button
              onClick={() => setShowConfirm(false)}
              className="cursor-pointer absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-amber-400" />
            </div>

            <h3 className="text-base font-semibold text-white mb-1">
              Go back to form?
            </h3>
            <p className="text-slate-400 text-sm mb-5">
              Your generated chapters will be lost and you&apos;ll need to
              regenerate them.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="cursor-pointer flex-1 rounded-xl text-sm font-medium border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-4 py-2.5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onGoBack();
                }}
                className="cursor-pointer flex-1 rounded-xl text-sm font-medium bg-amber-600 hover:bg-amber-500 text-white px-4 py-2.5 transition-colors"
              >
                Yes, go back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
