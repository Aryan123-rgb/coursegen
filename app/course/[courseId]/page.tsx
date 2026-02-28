import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import { CourseSidebarDrawer } from "@/components/CourseSidebarDrawer";
import { db } from "@/lib/db";
import { courses, chapters as chaptersSchema } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import type { CourseData, Chapter } from "@/lib/mock-course-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NextChapterButton } from "@/components/NextChapterButton";

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ chapterId?: string }>;
}

export default async function CoursePage({
  params,
  searchParams,
}: CoursePageProps) {
  const { courseId } = await params;
  const { chapterId } = await searchParams;

  const [courseRecord] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId));

  if (!courseRecord) {
    notFound();
  }

  const courseChapters = await db
    .select()
    .from(chaptersSchema)
    .where(eq(chaptersSchema.courseId, courseId))
    .orderBy(asc(chaptersSchema.order));

  // Map DB data to CourseData structure
  const courseData: CourseData = {
    id: courseRecord.id,
    title: courseRecord.title,
    description: courseRecord.description || "",
    chapters: courseChapters.map((ch) => ({
      id: ch.id,
      title: ch.title,
      order: ch.order,
      content: ch.content || "",
      video_urls: ch.videoUrls || [],
    })),
  };

  const targetChapterId =
    chapterId || courseRecord.activeChapterId || courseData.chapters[0]?.id;

  const activeChapter = courseData.chapters.find(
    (ch) => ch.id === targetChapterId,
  );

  if (!activeChapter) {
    notFound();
  }

  const prevChapter = courseData.chapters.find(
    (ch) => ch.order === activeChapter.order - 1,
  );
  const nextChapter = courseData.chapters.find(
    (ch) => ch.order === activeChapter.order + 1,
  );

  const videoUrl = activeChapter.video_urls?.[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200 font-sans relative selection:bg-purple-500/30">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none" />

      <div className="flex flex-1 w-full max-w-[1440px] mx-auto">
        {/* ───────── Main Content ───────── */}
        <main className="flex-1 lg:w-3/4 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>

            {/* Chapter Title */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
                Chapter {activeChapter.order} of {courseData.chapters.length}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mt-1 tracking-tight">
                {activeChapter.title}
              </h1>
            </div>

            {/* Video Player */}
            {videoUrl && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black mb-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <iframe
                  src={`https://www.youtube.com/embed/${videoUrl}`}
                  title={activeChapter.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            {/* Markdown Content */}
            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-code:text-purple-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-blockquote:border-purple-500/50 prose-blockquote:text-gray-400 prose-a:text-indigo-400 prose-li:text-gray-300 prose-th:text-white prose-td:text-gray-300">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: (props) => (
                    <span className="block my-8 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-auto object-cover"
                        {...props}
                        alt={props.alt || ""}
                      />
                    </span>
                  ),
                  a: (props) => (
                    <a
                      className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                }}
              >
                {activeChapter.content}
              </ReactMarkdown>
            </article>

            {/* ───────── Navigation Buttons ───────── */}
            <div className="flex items-center justify-between mt-14 pt-8 border-t border-white/10">
              {prevChapter ? (
                <Link
                  href={`/course/${courseId}?chapterId=${prevChapter.id}`}
                  className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-gray-300 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500">
                      Previous
                    </span>
                    <span className="block truncate max-w-[160px]">
                      {prevChapter.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextChapter ? (
                <NextChapterButton
                  courseId={courseId}
                  chapterId={nextChapter.id}
                  chapterOrder={nextChapter.order}
                  chapterTitle={nextChapter.title}
                />
              ) : (
                <div className="px-5 py-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-sm font-medium text-emerald-300">
                  🎉 Course Complete!
                </div>
              )}
            </div>
          </div>
        </main>

        {/* ───────── Desktop Sidebar ───────── */}
        <aside className="hidden lg:block w-[320px] shrink-0 sticky top-0 h-screen p-4 pl-0">
          <div className="h-full">
            <CourseSidebar
              courseData={courseData}
              activeChapter={activeChapter}
            />
          </div>
        </aside>
      </div>

      {/* ───────── Mobile Drawer ───────── */}
      <CourseSidebarDrawer
        courseData={courseData}
        activeChapter={activeChapter}
      />
    </div>
  );
}
