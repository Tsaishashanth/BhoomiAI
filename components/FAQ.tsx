const faqs = [
  {
    question: "What is BhoomiAI?",
    answer:
      "BhoomiAI is a project designed to make farming-related information easier to understand and use when planning agricultural decisions.",
  },
  {
    question: "Who can use BhoomiAI?",
    answer:
      "Farmers, students, and anyone interested in agriculture can explore BhoomiAI as it develops.",
  },
  {
    question: "Does BhoomiAI provide live weather and crop data?",
    answer:
      "Live data integrations are still being developed. Available information will depend on the features and data sources connected to the platform.",
  },
  {
    question: "Can I contribute to the project?",
    answer:
      "Yes. You can contribute code, documentation, ideas, and feedback through the project's GitHub repository.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative z-[1] border-t border-white/[0.07] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#85D99F]">
            FAQ
          </p>

          <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#F1F5F0] sm:text-4xl">
            Questions, answered.
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-6 text-[#929F95]">
            A few things to know about BhoomiAI and what we are building.
          </p>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group border-t border-white/[0.1] py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[#E9F0EA] [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>

                <span className="text-lg text-[#85D99F] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 max-w-xl pr-6 text-sm leading-6 text-[#929F95]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}