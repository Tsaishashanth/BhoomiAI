export default function ProductPreview() {
  const features = [
    {
      number: "01",
      title: "Regional conditions",
      description: "Weather and rainfall information",
    },
    {
      number: "02",
      title: "Crop insights",
      description: "Information relevant to your region",
    },
    {
      number: "03",
      title: "AI farming assistant",
      description: "Ask questions in plain language",
    },
  ];

  return (
    <section id="features" className="relative z-[1] px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[26px] border border-white/[0.12] bg-[#111813] p-2 shadow-[0_35px_100px_#00000065] sm:p-3">
          <div className="overflow-hidden rounded-[19px] border border-white/[0.07] bg-[#0C120E]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-6">
              <div>
                <p className="text-sm font-medium text-[#F1F5F0]">
                  BhoomiAI
                </p>
                <p className="text-[11px] text-[#849187]">
                  Farming intelligence
                </p>
              </div>

              <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-[#AAB6AC]">
                Product preview
              </span>
            </div>

            <div className="grid min-h-[300px] md:grid-cols-[1.4fr_0.8fr]">
              <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border-b border-white/[0.07] p-5 md:border-b-0 md:border-r">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(#78C9930A 1px, transparent 1px), linear-gradient(90deg, #78C9930A 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                <div className="relative max-w-xs text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#9BF4B8]/20 bg-[#173522] shadow-[0_0_45px_#4ADE801A]">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      className="h-8 w-8 text-[#9BF4B8]"
                      aria-hidden="true"
                    >
                      <path
                        d="M24 5L35 12L39 25L31 40L17 40L8 27L12 13L24 5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 13L24 21L35 12M24 21L17 40M24 21L39 25M24 21L31 40"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="24" cy="21" r="3" fill="currentColor" />
                    </svg>
                  </div>

                  <p className="text-lg font-medium tracking-tight text-[#F1F5F0]">
                    Explore farming across India
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#849187]">
                    A regional map with crop information and local weather
                    insights.
                  </p>

                  <span className="mt-5 inline-block rounded-full border border-white/[0.09] px-3 py-1.5 text-[11px] text-[#94A398]">
                    Interactive map coming soon
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 p-5 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7FCF98]">
                  What you can explore
                </p>

                {features.map((feature) => (
                  <div
                    key={feature.number}
                    className="flex gap-3 border-b border-white/[0.07] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="pt-0.5 text-xs text-[#80D49B]">
                      {feature.number}
                    </span>

                    <div>
                      <p className="text-sm font-medium text-[#E4EBE5]">
                        {feature.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#849187]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-[#657168]">
          Product preview — live data and interactive features will be
          connected during development.
        </p>
      </div>
    </section>
  );
}