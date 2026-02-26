"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-bold text-lg">
              C
            </div>
            <span className="font-semibold text-lg tracking-tight text-white hidden sm:block">
              CourseGen
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="#products"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Products
          </Link>
          <Link
            href="#about"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            About us
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Contact us
          </Link>
        </nav>

        <div className="flex items-center justify-end space-x-4 shrink-0">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
          ) : !user ? (
            <button
              onClick={handleSignIn}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 bg-white/10 text-white hover:bg-white/20 border border-white/10 h-10 px-6 backdrop-blur-sm"
            >
              Log In
            </button>
          ) : (
            <div className="relative flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-gray-300 hover:text-white hidden sm:block"
              >
                Dashboard
              </Link>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500 text-white hover:opacity-90 transition font-medium"
                aria-label="Toggle user menu"
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-12 mt-2 w-56 p-2 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-xl backdrop-blur-xl z-50">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>
                  <div className="h-px bg-white/10 my-1 mx-2" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
