"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignIn = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/");
            }
        }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="w-full px-6 sm:px-10 lg:px-16 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">C</div>
          <span className="font-semibold text-lg tracking-tight text-white">CourseGen</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {isPending ? (
            <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse" />
          ) : !user ? (
            <button 
              onClick={handleSignIn}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium h-10 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.03] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          ) : (
            <div className="relative flex items-center gap-3">
              <Link href="/dashboard" className="text-sm font-medium px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer hidden sm:block">Dashboard</Link>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:opacity-90 transition font-medium text-sm"
                aria-label="Toggle user menu"
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 p-1.5 rounded-xl border border-white/10 bg-[#111] shadow-xl z-50">
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="h-px bg-white/[0.06] mx-2" />
                  <Link 
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors mt-1 sm:hidden cursor-pointer"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors mt-1 cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
