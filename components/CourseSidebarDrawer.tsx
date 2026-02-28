"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import type { CourseData, Chapter } from "@/lib/mock-course-data";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface CourseSidebarDrawerProps {
  courseData: CourseData;
  activeChapter: Chapter;
}

export function CourseSidebarDrawer({
  courseData,
  activeChapter,
}: CourseSidebarDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="fixed top-6 right-6 z-40 md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white shadow-[0_0_24px_rgba(147,51,234,0.4)] hover:bg-purple-500 transition-colors"
          aria-label="Open course menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 bg-[#0a0a0a] border-l border-white/10 w-[300px] sm:w-[350px]">
        <VisuallyHidden.Root>
          <SheetTitle>Course Navigation</SheetTitle>
        </VisuallyHidden.Root>
        <div className="h-full overflow-y-auto p-4 pt-12">
          <CourseSidebar courseData={courseData} activeChapter={activeChapter} onChapterClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
