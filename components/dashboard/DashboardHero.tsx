"use client";

import { useState } from "react";
import { MapPin, Search, Sprout, Thermometer, Droplets, CloudRain } from "lucide-react";

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

type WeatherResult = {
  location: string;
  crop: string;
  temperature: number;
  humidity: number;
  rainfall: number;
};

export default function DashboardHero() {
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("Paddy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WeatherResult | null>(null);

  async function handleExplore() {
    const searchLocation = location.trim();

    if (!searchLocation) {
      setError("Please enter a city, state, or district.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const geoParams = new URLSearchParams({
        name: searchLocation,
        count: "1",
        language: "en",
        format: "json",
      });

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?${geoParams}`
      );

      if (!geoResponse.ok) {
        throw new Error("Could not search for this location.");
      }

      const geoData = await geoResponse.json();
      const place = geoData.results?.[0];

      if (!place) {
        throw new Error("Location not found. Try a nearby city or district.");
      }

      const weatherParams = new URLSearchParams({
        latitude: String(place.latitude),
        longitude: String(place.longitude),
        current: "temperature_2m,relative_humidity_2m,precipitation",
        timezone: "Asia/Kolkata",
      });

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?${weatherParams}`
      );

      if (!weatherResponse.ok) {
        throw new Error("Could not fetch weather data. Please try again.");
      }

      const weatherData = await weatherResponse.json();
      const current = weatherData.current;

      if (
        typeof current?.temperature_2m !== "number" ||
        typeof current?.relative_humidity_2m !== "number" ||
        typeof current?.precipitation !== "number"
      ) {
        throw new Error("Weather data is currently unavailable.");
      }

      setResult({
        location: [place.name, place.admin1, place.country]
          .filter(Boolean)
          .join(", "),
        crop,
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        rainfall: current.precipitation,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
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
            onKeyDown={(event) => {
              if (event.key === "Enter") handleExplore();
            }}
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
          disabled={loading}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#9BF4B8] px-6 text-sm font-semibold text-[#07110A] transition-all hover:bg-[#B4F8C8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search size={16} />
          {loading ? "Loading..." : "Explore"}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-4 rounded-2xl border border-white/[0.09] bg-[#0A0D0B] p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs text-zinc-500">Weather for</p>
              <h2 className="mt-1 text-lg font-semibold text-[#F1F5F0]">
                {result.location}
              </h2>
            </div>
            <span className="rounded-full border border-[#9BF4B8]/20 bg-[#9BF4B8]/10 px-3 py-1 text-xs text-[#9BF4B8]">
              <Sprout size={13} className="mr-1 inline" />
              {result.crop}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <Thermometer size={18} className="text-[#9BF4B8]" />
              <p className="mt-3 text-xs text-zinc-500">Temperature</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {result.temperature}°C
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <Droplets size={18} className="text-[#9BF4B8]" />
              <p className="mt-3 text-xs text-zinc-500">Humidity</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {result.humidity}%
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <CloudRain size={18} className="text-[#9BF4B8]" />
              <p className="mt-3 text-xs text-zinc-500">Current precipitation</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {result.rainfall} mm
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-zinc-500">
            These are current weather readings, not a crop recommendation.
            Crop-specific planting and harvest guidance has not been connected yet.
            Weather data: Open-Meteo.
          </p>
        </div>
      )}
    </section>
  );
}