import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { DashboardClient } from "@/components/DashboardClient";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { inArray } from "drizzle-orm";
import { env } from "@/env";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { user } = session;

  const allowedUserIds = [user.id];
  if (env.GUEST_USER_ID && env.GUEST_USER_ID !== user.id) {
    allowedUserIds.push(env.GUEST_USER_ID);
  }

  const fetchedCourses = await db
    .select()
    .from(courses)
    .where(inArray(courses.userId, allowedUserIds));

  // Deduplicate courses by id
  const uniqueCoursesMap = new Map();
  for (const course of fetchedCourses) {
    if (!uniqueCoursesMap.has(course.id)) {
      uniqueCoursesMap.set(course.id, course);
    }
  }
  const userCourses = Array.from(uniqueCoursesMap.values());

  return (
    <>
      <Navbar />
      <DashboardClient
        user={{ name: user.name, email: user.email }}
        courses={userCourses}
      />
    </>
  );
}
