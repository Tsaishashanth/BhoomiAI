const steps = [
  {
    number: "01",
    title: "Choose your region",
    description:
      "Start with the part of India where your crops are growing.",
  },
  {
    number: "02",
    title: "Understand the conditions",
    description:
      "Explore local weather, rainfall, and crop-related information.",
  },
  {
    number: "03",
    title: "Make your next move",
    description:
      "Ask BhoomiAI questions and use the available information to plan ahead.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="about"
      className="relative z-[1] border-t border-white/[0.07] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#85D99F]">
          How it works
        </p>

        <div className="mt-4 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#F1F5F0] sm:text-4xl">
            Farming information, without the unnecessary complexity.
          </h2>

          <div>
            {steps.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[44px_1fr] gap-4 border-t border-white/[0.1] py-5"
              >
                <span className="pt-1 text-sm text-[#81D49A]">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-base font-medium text-[#E9F0EA]">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#929F95]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}