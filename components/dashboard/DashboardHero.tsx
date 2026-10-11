
import { MapPin } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-8 pt-12 text-center sm:pt-16">

      <h1 className="text-3xl font-semibold tracking-tight text-[#F1F5F0] sm:text-5xl">
        Understand your land.
        <br />
        <span className="text-zinc-500">Make better decisions.</span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
        Explore weather, rainfall, and crop conditions across India.
        Get practical insights for your next farming decision.
      </p>

      <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-white/[0.1] bg-[#0C0E0D]/90 p-2 shadow-[0_12px_40px_#00000030,inset_0_1px_0_#FFFFFF0A] transition-colors focus-within:border-[#9BF4B8]/40">
        <MapPin className="ml-2 shrink-0 text-zinc-500" size={18} />

        <input
          type="text"
          placeholder="Search a city, state, or district..."
          className="h-10 min-w-0 flex-1 bg-transparent text-sm text-[#F1F5F0] outline-none placeholder:text-zinc-600"
          aria-label="Search location"
        />

        <button
          type="button"
          className="rounded-xl bg-[#9BF4B8] px-4 py-2.5 text-sm font-semibold text-[#07110A] transition-colors hover:bg-[#B4F8C8]"
        >
          Explore
        </button>
      </div>
    </section>
  );
}