"use client";

import { Menu } from "lucide-react";
import { CourseSidebar } from "@/components/CourseSidebar";
import type { CourseData, Chapter } from "@/lib/mock-course-data";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface CourseSidebarDrawerProps {
  courseData: CourseData;
  activeChapter: Chapter;
}

export function CourseSidebarDrawer({
  courseData,
  activeChapter,
}: CourseSidebarDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 text-white shadow-[0_0_24px_rgba(147,51,234,0.4)] hover:bg-purple-500 transition-colors"
          aria-label="Open course menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-full bg-slate-900 border-l border-white/10">
        <VisuallyHidden.Root>
          <DrawerTitle>Course Navigation</DrawerTitle>
        </VisuallyHidden.Root>
        <div className="h-full overflow-y-auto">
          <CourseSidebar courseData={courseData} activeChapter={activeChapter} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
