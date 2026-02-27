import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { DashboardClient } from "@/components/DashboardClient";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { user } = session;

  const userCourses = await db
    .select()
    .from(courses)
    .where(eq(courses.userId, user.id));

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
