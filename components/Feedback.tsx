export default function Feedback() {
  return (
    <section
      id="testimonials"
      className="relative z-[1] border-t border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#85D99F]">
              Community feedback
            </p>

            <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#F1F5F0] sm:text-2xl">
              Your perspective matters.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#929F95]">
              We are building BhoomiAI in the open. Developer and user feedback
              will help shape what comes next.
            </p>
          </div>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-white/[0.12] px-5 py-3 text-sm font-medium text-[#E9F0EA] transition hover:border-[#85D99F]/40 hover:bg-[#85D99F]/[0.06] sm:self-center"
          >
            Share feedback
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className="mt-5 text-center text-xs text-[#69766C]">
          Community stories and feedback will appear here as BhoomiAI grows.
        </p>
      </div>
    </section>
  );
}