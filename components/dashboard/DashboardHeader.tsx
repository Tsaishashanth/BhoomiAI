
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LeafMark } from "@/components/Navbar";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between rounded-2xl border border-white/[0.09] bg-[#101712]/85 px-4 shadow-[0_12px_45px_#00000035,inset_0_1px_0_#FFFFFF0C] backdrop-blur-xl sm:px-6">

        <Link href="/" className="flex items-center gap-2.5">
          <LeafMark />

          <span className="text-lg font-semibold tracking-tight text-[#F1F5F0]">
            Bhoomi<span className="text-[#9BF4B8]">AI</span>
          </span>
        </Link>


        <div className="hidden items-center gap-2 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9BF4B8] shadow-[0_0_10px_#9BF4B8]" />
          <span className="text-sm text-zinc-400">
            Agricultural Insights
          </span>
        </div>

       
        <nav className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/#features"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-[#F1F5F0] sm:inline-flex"
          >
            Features
          </Link>

          <a
            href="https://github.com/Tsaishashanth"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 text-sm font-medium text-[#F1F5F0] shadow-[inset_0_1px_0_#FFFFFF12] transition-all hover:border-[#9BF4B8]/30 hover:bg-white/[0.09]"
          >
            GitHub
            <ArrowUpRight
              size={14}
              className="text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9BF4B8]"
            />
          </a>
        </nav>
      </div>
    </header>
  );
}