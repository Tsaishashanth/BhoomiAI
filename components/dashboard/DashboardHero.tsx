
"use client";

import { useState } from "react";
import { MapPin, Search, Sprout } from "lucide-react";

const crops = [
  "Paddy",
  "Wheat",
  "Sugarcane",
  "Cotton",
  "Maize",
  "Groundnut",
  "Millets",
  "Soybean",
];

export default function DashboardHero() {
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("Paddy");

  function handleExplore() {
    if (!location.trim()) {
      alert("Please enter a city, state, or district.");
      return;
    }

    // feat: We'll connect the selected location and crop to the dashboard data next later
    console.log({ location: location.trim(), crop });
  }

  return (
    <section className="relative z-20 mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.09] bg-[#101712]/75 p-3 shadow-[0_12px_40px_#00000025,inset_0_1px_0_#FFFFFF0C] backdrop-blur-xl sm:flex-row sm:items-center">

        <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-white/[0.08] bg-black/30 px-4 transition-colors focus-within:border-[#9BF4B8]/40">
          <MapPin size={18} className="shrink-0 text-[#9BF4B8]" />

          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Search city, state, or district..."
            aria-label="Search city, state, or district"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#F1F5F0] outline-none placeholder:text-zinc-600"
          />
        </div>

        <div className="flex h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-black/30 px-4 transition-colors focus-within:border-[#9BF4B8]/40 sm:w-56">
          <Sprout size={18} className="shrink-0 text-[#9BF4B8]" />

          <select
            value={crop}
            onChange={(event) => setCrop(event.target.value)}
            aria-label="Select crop"
            className="w-full cursor-pointer appearance-none bg-transparent text-sm text-[#F1F5F0] outline-none"
          >
            {crops.map((item) => (
              <option key={item} value={item} className="bg-[#101712]">
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleExplore}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#9BF4B8] px-6 text-sm font-semibold text-[#07110A] transition-all hover:bg-[#B4F8C8] active:scale-[0.98]"
        >
          <Search size={16} />
          Explore
        </button>
      </div>
    </section>
  );
}