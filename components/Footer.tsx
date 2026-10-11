import Link from "next/link";

function LeafMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="h-9 w-9 shrink-0"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="13" fill="#163B28" />

      <path
        d="M28 11C17 11 11 17 12 25C13 30 19 31 23 26C27 22 28 16 28 11Z"
        fill="#9BF4B8"
      />

      <path
        d="M12 29C15 23 20 19 25 16"
        stroke="#D7FFE1"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contribute", href: "#contribute" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex w-fit items-center gap-2.5">
            <LeafMark />

            <span className="text-lg font-semibold tracking-tight text-[#F1F5F0]">
              Bhoomi<span className="text-[#9BF4B8]">AI</span>
            </span>
          </Link>

          <p className="max-w-xs text-xs leading-5 text-[#89968D]">
            Making farming information easier to understand, one step at a
            time.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#A6B0A8]">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[#9BF4B8]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-white/[0.07] pt-5">
        <div className="flex flex-col gap-2 text-xs text-[#69766C] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BhoomiAI. All rights reserved.</p>
          <p>Designed and developed by Shashanth.</p>
        </div>
      </div>
    </footer>
  );
}