"use client";

import { Plus, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// ───────────────────────────────────────────────────
// Mock data shaped after the Drizzle `courses` schema
// ───────────────────────────────────────────────────
interface Course {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  activeChapterId: string | null;
  activeChapterOrder: number | null;
}

const TOTAL_CHAPTERS = 8;

const mockCourses: Course[] = [
  {
    id: "crs_1",
    userId: "usr_1",
    title: "Machine Learning Fundamentals",
    description:
      "Explore supervised and unsupervised learning, neural networks, and real-world ML pipelines from scratch.",
    imageUrl: null,
    activeChapterId: "ch_1_3",
    activeChapterOrder: 3,
  },
  {
    id: "crs_2",
    userId: "usr_1",
    title: "Full-Stack Web Development",
    description:
      "Build modern web applications with React, Next.js, databases, and deployment strategies.",
    imageUrl: null,
    activeChapterId: "ch_2_6",
    activeChapterOrder: 6,
  },
  {
    id: "crs_3",
    userId: "usr_1",
    title: "Cybersecurity Essentials",
    description:
      "Learn threat modeling, penetration testing, cryptography, and secure coding practices.",
    imageUrl: null,
    activeChapterId: "ch_3_1",
    activeChapterOrder: 1,
  },
  {
    id: "crs_4",
    userId: "usr_1",
    title: "Cloud Architecture with AWS",
    description:
      "Design scalable cloud solutions using EC2, Lambda, S3, and infrastructure-as-code tools.",
    imageUrl: null,
    activeChapterId: "ch_4_0",
    activeChapterOrder: 0,
  },
  {
    id: "crs_5",
    userId: "usr_1",
    title: "Data Structures & Algorithms",
    description:
      "Master arrays, trees, graphs, dynamic programming, and competitive-programming patterns.",
    imageUrl: null,
    activeChapterId: "ch_5_0",
    activeChapterOrder: 0,
  },
];

// ───────────────────────────────────────────────────
// Component
// ───────────────────────────────────────────────────
interface DashboardClientProps {
  user: { name?: string | null; email?: string | null };
  courses: Partial<Course>[];
}

export function DashboardClient({ user, courses }: DashboardClientProps) {
  const router = useRouter();

  const inProgress = courses.filter(
    (c) => c.activeChapterOrder && c.activeChapterOrder > 0
  );
  const library = courses.filter(
    (c) => !c.activeChapterOrder || c.activeChapterOrder === 0
  );

  const isEmpty = courses.length === 0;

  // Gradient palette for card image placeholders
  const gradients = [
    "from-blue-600/40 to-indigo-800/40",
    "from-indigo-600/40 to-cyan-700/40",
    "from-sky-600/40 to-blue-800/40",
    "from-blue-500/40 to-slate-800/40",
    "from-cyan-600/40 to-indigo-800/40",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200 font-sans relative overflow-hidden selection:bg-blue-500/30">
      {/* Static matrix texture (removed, now in layout) */}

      {/* Ambient radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.10),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none z-0" />

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col px-6 sm:px-12 pt-28 pb-16 z-10 max-w-7xl mx-auto w-full">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            My Dashboard
          </h1>
          <Button
            onClick={() => router.push("/create-course")}
            className="w-full sm:w-auto h-auto rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 shadow-[0_0_24px_rgba(59,130,246,0.25)] hover:shadow-[0_0_32px_rgba(59,130,246,0.40)] transition-all duration-300 gap-2"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="font-medium text-sm">Create New Course</span>
          </Button>
        </div>

        {/* ── Empty State ── */}
        {isEmpty && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
              <BookOpen className="w-9 h-9 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No courses generated yet
            </h2>
            <p className="text-slate-400 mb-8 max-w-md">
              Create your first AI-powered course and start learning at your own
              pace.
            </p>
            <Button
              onClick={() => router.push("/create-course")}
              className="w-full sm:w-auto h-auto rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 shadow-[0_0_24px_rgba(59,130,246,0.25)] transition-colors gap-2"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="font-medium text-sm">Generate Your First Course</span>
            </Button>
          </div>
        )}

        {!isEmpty && (
          <div className="space-y-12">
            {/* ── Section A: In Progress ── */}
            {inProgress.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  In Progress
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {inProgress.map((course, idx) => {
                    const progress =
                      ((course.activeChapterOrder ?? 0) / TOTAL_CHAPTERS) * 100;

                    return (
                      <button
                        key={course.id}
                        onClick={() =>
                          router.push(
                            course.activeChapterId
                              ? `/course/${course.id}?chapterId=${course.activeChapterId}`
                              : `/course/${course.id}`
                          )
                        }
                        className="cursor-pointer group text-left rounded-2xl border border-slate-800 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        {/* Image / Gradient Placeholder */}
                        <div
                          className={`h-36 bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center relative overflow-hidden`}
                        >
                          {course.imageUrl ? (
                            <Image src={course.imageUrl} alt={course.title || "Course"} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <BookOpen className="w-10 h-10 text-white/20" />
                          )}
                          {/* Shine on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                        </div>

                        <div className="p-5">
                          <h3 className="text-base font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                            {course.title}
                          </h3>

                          {/* Progress Bar */}
                          <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-blue-500 transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-400">
                            Chapter {course.activeChapterOrder} of{" "}
                            {TOTAL_CHAPTERS}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── Section B: Library ── */}
            {library.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-5">
                  Library
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {library.map((course, idx) => (
                    <button
                      key={course.id}
                      onClick={() =>
                        router.push(
                          course.activeChapterId
                            ? `/course/${course.id}?chapterId=${course.activeChapterId}`
                            : `/course/${course.id}`
                        )
                      }
                      className="cursor-pointer group text-left rounded-2xl border border-slate-800 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {/* Image / Gradient Placeholder */}
                      <div
                        className={`h-36 bg-gradient-to-br ${gradients[(inProgress.length + idx) % gradients.length]} flex items-center justify-center relative overflow-hidden`}
                      >
                        {course.imageUrl ? (
                          <Image src={course.imageUrl} alt={course.title || "Course"} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <BookOpen className="w-10 h-10 text-white/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      </div>

                      <div className="p-5">
                        <h3 className="text-base font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                          {course.title}
                        </h3>

                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                          Start Learning
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

    </div>
  );
}
