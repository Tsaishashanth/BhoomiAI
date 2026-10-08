import Link from "next/link";

function GitHubIcon() {
return ( <svg
   viewBox="0 0 24 24"
   fill="currentColor"
   className="h-4 w-4"
   aria-hidden="true"
 > <path
     fillRule="evenodd"
     clipRule="evenodd"
     d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.93.1-.72.4-1.22.71-1.5-2.48-.28-5.08-1.24-5.08-5.51 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.5 10.5 0 0 1 5.55 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.28-2.6 5.22-5.09 5.5.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
   /> </svg>
);
}

function LeafMark() {
return ( <svg
   viewBox="0 0 40 40"
   fill="none"
   className="h-9 w-9 shrink-0"
   aria-hidden="true"
 > <rect width="40" height="40" rx="13" fill="#163B28" /> <path
     d="M28 11C17 11 11 17 12 25C13 30 19 31 23 26C27 22 28 16 28 11Z"
     fill="#9BF4B8"
   /> <path
     d="M12 29C15 23 20 19 25 16"
     stroke="#D7FFE1"
     strokeWidth="1.7"
     strokeLinecap="round"
   /> </svg>
);
}

export default function Navbar() {
  return (
    <header className="relative z-50 px-5 pt-5 sm:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/[0.09] bg-[#101712]/85 px-4 py-3 shadow-[0_12px_45px_#00000035,inset_0_1px_0_#FFFFFF0C] backdrop-blur-xl sm:px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <LeafMark />
          <span className="text-lg font-semibold tracking-tight text-[#F1F5F0]">
            Bhoomi<span className="text-[#9BF4B8]">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-[#A6B0A8] md:flex">
          <Link
            href="#features"
            className="transition-colors hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#about"
            className="transition-colors hover:text-white"
          >
            About
          </Link>

          <Link
            href="#about"
            className="transition-colors hover:text-white"
          >
            Testimonials
          </Link>

          <Link
            href="#about"
            className="transition-colors hover:text-white"
          >
            Contribute
          </Link>
        </div>

        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border border-[#9BF4B8]/25 bg-[#163B28] px-3.5 py-2.5 text-xs font-medium text-[#D9FFE3] shadow-[inset_0_1px_0_#FFFFFF18,0_0_22px_#4ADE8020] transition hover:border-[#9BF4B8]/50 hover:bg-[#1B4932] sm:text-sm"
        >
          {/* <GitHubIcon /> */}
          <span>⭐ Star on GitHub</span>
        </a>
      </nav>
    </header>
  );
}
