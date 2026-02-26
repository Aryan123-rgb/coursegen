import { Navbar } from "@/components/Navbar";
import { ArrowRight, Sparkles, Search, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200 font-sans relative overflow-hidden selection:bg-indigo-500/30">
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15),transparent_70%)] pointer-events-none" />

      <Navbar />
      
      <main className="flex-1 flex flex-col items-center pt-48 pb-24 z-10 w-full">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full mb-32">
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-white mb-6 font-serif">
            Master the skills that <br className="hidden sm:block" /> shape the future.
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-12 font-light">
            Revolutionize your digital learning using Artificial Intelligence. Generate, manage, and share immersive courses in seconds.
          </p>
          
          <div className="relative w-full max-w-md group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative flex items-center bg-black/50 border border-white/10 rounded-full p-1 pl-6 backdrop-blur-xl shadow-2xl">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for topics or generate a course..." 
                className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none px-4 py-3 placeholder:text-gray-500"
              />
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-white text-black hover:bg-gray-200 px-6 py-2.5 shadow-sm"
              >
                Sign up now
              </Link>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col items-center gap-6 opacity-70">
            <p className="text-sm text-gray-500 tracking-wider uppercase font-semibold">Trusted by Innovative Educators</p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 grayscale">
              {["MITx", "Harvard", "Stanford", "Coursera", "Udemy"].map((partner) => (
                <span key={partner} className="text-xl font-bold text-gray-400">{partner}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED CARDS SECTION */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-1 bg-[#8FB9A6] rounded-[2rem] p-8 text-black flex flex-col justify-between aspect-[4/3] group cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex justify-between items-start mb-12">
                <span className="flex items-center text-sm font-bold"><Star className="w-4 h-4 fill-black mr-1" /> 4.9</span>
                <span className="text-sm font-medium">1.4M Students</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Cybersecurity & <br/> Ethical Hacking</h3>
                <div className="flex justify-between items-end">
                  <p className="text-black/70 font-medium">(20 Courses)</p>
                  <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-[#8FB9A6] transition-colors"><ArrowRight className="w-5 h-5 -rotate-45" /></div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 bg-[#C2D6DB] rounded-[2rem] p-8 text-black flex flex-col justify-between aspect-[4/3] group cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex justify-between items-start mb-12">
                <span className="flex items-center text-sm font-bold"><Star className="w-4 h-4 fill-black mr-1" /> 4.8</span>
                <span className="text-sm font-medium">999K Students</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Digital Marketing <br/> Masterclass</h3>
                <div className="flex justify-between items-end">
                  <p className="text-black/70 font-medium">(30 Courses)</p>
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform"><ArrowRight className="w-5 h-5 -rotate-45" /></div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 flex flex-col gap-6 h-full">
              <div className="bg-[#E4C87F] rounded-[2rem] p-6 text-black flex-1 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                  <span className="flex items-center text-sm font-bold"><Star className="w-4 h-4 fill-black mr-1" /> 4.5</span>
                  <span className="text-sm font-medium">1.2M Students</span>
                </div>
                <div>
                   <h3 className="text-xl font-bold mb-1">Digital Strategy</h3>
                   <div className="flex justify-between items-center">
                     <p className="text-black/70 font-medium">(14 Courses)</p>
                     <ArrowRight className="w-5 h-5 -rotate-45" />
                   </div>
                </div>
              </div>

              <div className="bg-[#9BBFA3] rounded-[2rem] p-6 text-black flex-1 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                  <span className="flex items-center text-sm font-bold"><Star className="w-4 h-4 fill-black mr-1" /> 4.7</span>
                  <span className="text-sm font-medium">1M Students</span>
                </div>
                <div>
                   <h3 className="text-xl font-bold mb-1">Cybersecurity</h3>
                   <div className="flex justify-between items-center">
                     <p className="text-black/70 font-medium">(07 Courses)</p>
                     <ArrowRight className="w-5 h-5 -rotate-45" />
                   </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 bg-[#E1A693] rounded-[2rem] p-6 text-black flex flex-col justify-between h-48 group cursor-pointer hover:scale-[1.02] transition-transform">
               <div className="flex justify-between items-start">
                  <span className="flex items-center text-sm font-bold"><Star className="w-4 h-4 fill-black mr-1" /> 5.0</span>
                  <span className="text-sm font-medium">950K Students</span>
                </div>
                <div className="flex justify-between items-end">
                   <h3 className="text-xl font-bold">Cloud Computing</h3>
                   <ArrowRight className="w-5 h-5 -rotate-45" />
                </div>
            </div>

            <div className="col-span-1 md:col-span-2 bg-[#BA98A1] rounded-[2rem] p-6 sm:p-8 text-black flex flex-col justify-between h-48 group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                  <span className="flex items-center text-sm font-bold"><Star className="w-4 h-4 fill-black mr-1" /> 5.0</span>
                  <span className="text-sm font-medium">1.9M Students</span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                     <h3 className="text-2xl font-bold mb-1">Graphic Design</h3>
                     <p className="text-black/70 font-medium">Foundations (12 Courses)</p>
                   </div>
                   <ArrowRight className="w-6 h-6 -rotate-45" />
                </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="w-full max-w-5xl mx-auto px-4 py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400">Choose the perfect plan for your learning journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <p className="text-gray-400 mb-6 text-sm">Perfect for getting started</p>
              <div className="mb-6"><span className="text-5xl font-bold text-white">$0</span><span className="text-gray-500">/month</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Generate up to 3 courses", "Basic AI models", "Community support"].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors font-medium">
                Get Started
              </button>
            </div>
            
            <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 flex flex-col relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <p className="text-gray-400 mb-6 text-sm">For serious learners and creators</p>
              <div className="mb-6"><span className="text-5xl font-bold text-white">$19</span><span className="text-gray-500">/month</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Unlimited course generations", "Advanced GPT-4 integration", "Priority support", "Analytics and student tracking"].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors font-medium shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/50 py-12 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
             <span className="font-bold text-xl tracking-tight text-white">CourseGen</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-sm text-gray-600">© 2026 CourseGen Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
