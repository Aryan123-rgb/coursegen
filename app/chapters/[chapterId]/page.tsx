import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockCourseData } from "@/lib/mock-course-data";
import { CourseSidebar } from "@/components/CourseSidebar";
import { CourseSidebarDrawer } from "@/components/CourseSidebarDrawer";

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;

  const activeChapter = mockCourseData.chapters.find(
    (ch) => ch.id === chapterId
  );

  if (!activeChapter) {
    notFound();
  }

  const prevChapter = mockCourseData.chapters.find(
    (ch) => ch.order === activeChapter.order - 1
  );
  const nextChapter = mockCourseData.chapters.find(
    (ch) => ch.order === activeChapter.order + 1
  );

  const videoUrl = activeChapter.video_urls[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200 font-sans relative selection:bg-purple-500/30">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none" />

      <div className="flex flex-1 w-full max-w-[1440px] mx-auto">
        {/* ───────── Main Content ───────── */}
        <main className="flex-1 lg:w-3/4 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
            {/* Chapter Title */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
                Chapter {activeChapter.order} of {mockCourseData.chapters.length}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mt-1 tracking-tight">
                {activeChapter.title}
              </h1>
            </div>

            {/* Video Player */}
            {videoUrl && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black mb-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <iframe
                  src={videoUrl}
                  title={activeChapter.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            {/* Markdown Content */}
            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-code:text-purple-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-blockquote:border-purple-500/50 prose-blockquote:text-gray-400 prose-a:text-indigo-400 prose-li:text-gray-300 prose-th:text-white prose-td:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(activeChapter.content) }} />
            </article>

            {/* ───────── Navigation Buttons ───────── */}
            <div className="flex items-center justify-between mt-14 pt-8 border-t border-white/10">
              {prevChapter ? (
                <Link
                  href={`/chapters/${prevChapter.id}`}
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
                <Link
                  href={`/chapters/${nextChapter.id}`}
                  className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-medium text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.25)]"
                >
                  <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-widest text-purple-200">
                      Next Chapter
                    </span>
                    <span className="block truncate max-w-[160px]">
                      {nextChapter.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
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
              courseData={mockCourseData}
              activeChapter={activeChapter}
            />
          </div>
        </aside>
      </div>

      {/* ───────── Mobile Drawer ───────── */}
      <CourseSidebarDrawer
        courseData={mockCourseData}
        activeChapter={activeChapter}
      />
    </div>
  );
}

/**
 * Minimal markdown-to-HTML converter.
 * Handles headings, bold, italic, inline code, code blocks, blockquotes, lists, tables, and links.
 */
function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (fenced ``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre><code class="language-${lang}">${escaped}</code></pre>`;
  });

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/gm,
    (_match, headerRow: string, _separator: string, bodyRows: string) => {
      const headers = headerRow
        .split("|")
        .filter((c: string) => c.trim())
        .map((c: string) => `<th>${c.trim()}</th>`)
        .join("");
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Split by code blocks to avoid processing inside them
  const parts = html.split(/(<pre><code[\s\S]*?<\/code><\/pre>)/g);
  html = parts
    .map((part, i) => {
      // Odd indices are code blocks — leave them intact
      if (i % 2 === 1) return part;

      let text = part;

      // Blockquotes
      text = text.replace(/^>\s+(.+)$/gm, "<blockquote><p>$1</p></blockquote>");

      // Headings
      text = text.replace(/^### (.+)$/gm, "<h3>$1</h3>");
      text = text.replace(/^## (.+)$/gm, "<h2>$1</h2>");
      text = text.replace(/^# (.+)$/gm, "<h1>$1</h1>");

      // Bold & italic
      text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");

      // Inline code
      text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

      // Links
      text = text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2">$1</a>'
      );

      // Unordered lists
      text = text.replace(
        /(^- .+(?:\n- .+)*)/gm,
        (match) => {
          const items = match
            .split("\n")
            .map((line) => `<li>${line.replace(/^- /, "")}</li>`)
            .join("");
          return `<ul>${items}</ul>`;
        }
      );

      // Ordered lists
      text = text.replace(
        /(^\d+\. .+(?:\n\d+\. .+)*)/gm,
        (match) => {
          const items = match
            .split("\n")
            .map((line) => `<li>${line.replace(/^\d+\. /, "")}</li>`)
            .join("");
          return `<ol>${items}</ol>`;
        }
      );

      // Paragraphs: wrap solo text lines
      text = text.replace(
        /^(?!<[a-z])((?!^$).+)$/gm,
        "<p>$1</p>"
      );

      return text;
    })
    .join("");

  return html;
}
