export default function Project() {
  return (
    <section
      id="contribute"
      className="relative z-[1] border-t border-white/[0.07] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#14251A] via-[#0D1710] to-[#0A100C] p-7 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#69D98C]/10 blur-[90px]" />

        <div className="relative max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#85D99F]">
            Open source
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#F1F5F0] sm:text-4xl">
            Built in the open.
            <br />
            Improved together.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#A0ADA2] sm:text-base">
            BhoomiAI is a growing project. Help us make farming information
            more accessible through code, ideas, documentation, and feedback.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#B8F5C8] px-5 py-3 text-sm font-semibold text-[#102116] transition hover:bg-[#D0FFDB]"
            >
              Contribute on GitHub
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#testimonials"
              className="inline-flex items-center rounded-full border border-white/[0.12] px-5 py-3 text-sm font-medium text-[#D5DFD6] transition hover:border-white/25 hover:bg-white/[0.04]"
            >
              Share your feedback
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}