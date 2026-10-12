"use client";

import { useState } from "react";
import {
  CalendarCheck,
  MapPin,
  Sprout,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

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

export default function PlantingRecommendations() {
  const [location, setLocation] = useState("Vijayawada");
  const [crop, setCrop] = useState("Paddy");

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0b0d0c] p-5 sm:p-7">
      <div className="mb-6">
        <p className="text-sm font-medium text-[#9BF4B8]">
          CROP PLANNING
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#F1F5F0]">
          Find suitable planting dates
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Choose a location and crop to prepare a weather-based planting
          assessment for the coming days.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Location
          </span>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4">
            <MapPin size={18} className="shrink-0 text-[#9BF4B8]" />

            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter city or district"
              className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Select crop
          </span>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4">
            <Sprout size={18} className="shrink-0 text-[#9BF4B8]" />

            <select
              value={crop}
              onChange={(event) => setCrop(event.target.value)}
              className="w-full bg-transparent py-3.5 text-sm text-white outline-none"
            >
              {crops.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-[#0b0d0c]"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <CalendarCheck
            size={22}
            className="mt-0.5 shrink-0 text-[#9BF4B8]"
          />

          <div>
            <h3 className="font-medium text-white">
              Ready to assess {crop.toLowerCase()} planting?
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Selected location: {location.trim() || "Not entered"}.
              The next step is to compare this crop&apos;s growing requirements
              with the location&apos;s real forecast and identify suitable dates.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
          <AlertTriangle size={15} />
          No planting dates have been recommended yet.
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-white/[0.07] p-4">
        <CheckCircle2
          size={18}
          className="mt-0.5 shrink-0 text-[#9BF4B8]"
        />

        <p className="text-xs leading-5 text-zinc-500">
          Recommendations will consider forecast conditions and crop
          requirements. Local soil conditions, irrigation, crop variety,
          and agricultural guidance also matter.
        </p>
      </div>
    </section>
  );
}