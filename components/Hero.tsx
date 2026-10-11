import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative z-[1] px-5 pb-16 pt-24 sm:px-8 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[#9BF4B8]/15 bg-[#12251A]/80 px-3.5 py-2 text-xs text-[#B7E9C5]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9BF4B8] shadow-[0_0_10px_#9BF4B8]" />
          Open source · Built for real-world farming
        </div>

        <h1 className="text-5xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
          Better decisions
          <br />
          for every{" "}
          <span className="bg-gradient-to-b from-[#C5FFD4] via-[#8BE9A7] to-[#52B979] bg-clip-text text-transparent">
            growing season.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#A3ADA5] sm:text-lg sm:leading-8">
          Explore India&apos;s farming regions, understand local weather,
          and get useful crop insights with an AI assistant designed
          around real farming questions.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#B4FFCA]/40 bg-gradient-to-b from-[#A5F5B9] to-[#6ED58E] px-5 py-3.5 text-sm font-semibold text-[#092012] shadow-[inset_0_1px_0_#FFFFFFB0,0_5px_0_#2E7545,0_12px_32px_#52C87822] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Explore BhoomiAI
            <span className="transition group-hover:translate-x-1">↗</span>
          </Link>

          <Link
            href="#features"
            className="inline-flex items-center gap-2 px-4 py-3 text-sm text-[#C2CBC4] transition hover:text-white"
          >
            See how it works →
          </Link>
        </div>

        <p className="mt-5 text-xs text-[#68756B]">
          An open-source project for more informed farming.
        </p>
      </div>
    </section>
  );
}

