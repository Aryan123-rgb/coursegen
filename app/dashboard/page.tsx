import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { user } = session;

  return (
    <div className="min-h-screen flex flex-col bg-black font-sans relative overflow-hidden selection:bg-purple-500/30">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none -z-10" />
      
      <Navbar />

      <main className="flex-1 flex flex-col p-8 sm:p-12 z-10 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Welcome back, {user.name?.split(" ")[0]}!
          </h1>
          <p className="text-gray-400">
            Manage your courses and settings below.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Your Courses</h2>
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-white/10 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No courses yet</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-sm">
                You haven't generated any courses yet. Start by generating your first AI-powered course.
              </p>
              <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-white text-black hover:bg-gray-100 h-10 px-6 shadow-sm">
                Generate Course
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-medium">
                  {user.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-2xl font-bold text-white mb-1">0</p>
                  <p className="text-xs text-gray-400">Total Courses</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-2xl font-bold text-white mb-1">0</p>
                  <p className="text-xs text-gray-400">Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
