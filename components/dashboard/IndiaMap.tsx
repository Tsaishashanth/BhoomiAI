"use client";

import { useEffect, useState } from "react";
import { IndiaMap as IndiaSvgMap } from "vardhan-maps/react";
import { CloudRain, Droplets, Thermometer } from "lucide-react";

type WeatherLayer = "temperature" | "rainfall" | "humidity";

const layers = [
  { id: "temperature", label: "Temperature", unit: "°C", icon: Thermometer },
  { id: "rainfall", label: "Rainfall", unit: "mm", icon: CloudRain },
  { id: "humidity", label: "Humidity", unit: "%", icon: Droplets },
] as const;

const stateLocations: Record<string, { lat: number; lon: number }> = {
  "Andhra Pradesh": { lat: 16.5062, lon: 80.648 },
  "Arunachal Pradesh": { lat: 27.0844, lon: 93.6053 },
  Assam: { lat: 26.1445, lon: 91.7362 },
  Bihar: { lat: 25.5941, lon: 85.1376 },
  Chhattisgarh: { lat: 21.2514, lon: 81.6296 },
  Goa: { lat: 15.4909, lon: 73.8278 },
  Gujarat: { lat: 23.2156, lon: 72.6369 },
  Haryana: { lat: 30.7333, lon: 76.7794 },
  "Himachal Pradesh": { lat: 31.1048, lon: 77.1734 },
  Jharkhand: { lat: 23.3441, lon: 85.3096 },
  Karnataka: { lat: 12.9716, lon: 77.5946 },
  Kerala: { lat: 8.5241, lon: 76.9366 },
  "Madhya Pradesh": { lat: 23.2599, lon: 77.4126 },
  Maharashtra: { lat: 19.076, lon: 72.8777 },
  Manipur: { lat: 24.817, lon: 93.9368 },
  Meghalaya: { lat: 25.5788, lon: 91.8933 },
  Mizoram: { lat: 23.7271, lon: 92.7176 },
  Nagaland: { lat: 25.6751, lon: 94.1086 },
  Odisha: { lat: 20.2961, lon: 85.8245 },
  Punjab: { lat: 30.7333, lon: 76.7794 },
  Rajasthan: { lat: 26.9124, lon: 75.7873 },
  Sikkim: { lat: 27.3389, lon: 88.6065 },
  "Tamil Nadu": { lat: 13.0827, lon: 80.2707 },
  Telangana: { lat: 17.385, lon: 78.4867 },
  Tripura: { lat: 23.8315, lon: 91.2868 },
  "Uttar Pradesh": { lat: 26.8467, lon: 80.9462 },
  Uttarakhand: { lat: 30.3165, lon: 78.0322 },
  "West Bengal": { lat: 22.5726, lon: 88.3639 },
  Delhi: { lat: 28.6139, lon: 77.209 },
  Chandigarh: { lat: 30.7333, lon: 76.7794 },
  "Jammu and Kashmir": { lat: 34.0837, lon: 74.7973 },
  Ladakh: { lat: 34.1526, lon: 77.5771 },
  Puducherry: { lat: 11.9416, lon: 79.8083 },
  "Andaman and Nicobar Islands": { lat: 11.6234, lon: 92.7265 },
  Lakshadweep: { lat: 10.5667, lon: 72.6417 },
  "Dadra and Nagar Haveli and Daman and Diu": {
    lat: 20.3974,
    lon: 72.8328,
  },
};

type WeatherData = {
  temperature: number;
  rainfall: number;
  humidity: number;
};

export default function IndiaMap() {
  const [layer, setLayer] = useState<WeatherLayer>("temperature");
  const [selectedState, setSelectedState] = useState("Andhra Pradesh");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const location = stateLocations[selectedState];

    const controller = new AbortController();

    async function fetchWeather() {
      setLoading(true);
      setError("");

      try {
        if (!location) {
          setWeather(null);
          setError("Weather coordinates are not available for this region.");
          return;
        }

        const params = new URLSearchParams({
          latitude: String(location.lat),
          longitude: String(location.lon),
          current: "temperature_2m,relative_humidity_2m,precipitation",
          timezone: "Asia/Kolkata",
        });

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Weather service is unavailable. Please try again.");
        }

        const data = await response.json();
        const current = data.current;

        if (
          typeof current?.temperature_2m !== "number" ||
          typeof current?.relative_humidity_2m !== "number" ||
          typeof current?.precipitation !== "number"
        ) {
          throw new Error("Weather data is currently unavailable.");
        }

        setWeather({
          temperature: current.temperature_2m,
          rainfall: current.precipitation,
          humidity: current.relative_humidity_2m,
        });
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setWeather(null);
        setError(
          err instanceof Error ? err.message : "Could not load weather data."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchWeather();

    return () => controller.abort();
  }, [selectedState]);

  const activeLayer = layers.find((item) => item.id === layer)!;
  const value = weather?.[layer];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0A0D0B] shadow-[inset_0_1px_0_#FFFFFF08]">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] p-4 sm:p-5">
        <div>
          <h2 className="text-base font-semibold text-[#F1F5F0]">
            India Weather Map
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Select a state and explore its current weather.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {layers.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setLayer(id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                layer === id
                  ? "border-[#9BF4B8]/30 bg-[#9BF4B8]/10 text-[#9BF4B8]"
                  : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:bg-white/[0.05]"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="flex min-h-[380px] items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 p-3 sm:min-h-[480px] sm:p-6">
          <div className="india-weather-map w-full max-w-[650px]">
            <IndiaSvgMap
              level="state"
              tooltip={(state) => state.name}
              stateFill={(name) =>
                name === selectedState ? "#28543A" : "#14231A"
              }
              onStateClick={(name) => setSelectedState(name)}
            />
          </div>
        </div>

        <aside className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <div>
            <p className="text-xs text-zinc-500">Selected region</p>
            <h3 className="mt-1 text-lg font-semibold text-[#F1F5F0]">
              {selectedState}
            </h3>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <activeLayer.icon size={15} />
              {activeLayer.label}
            </div>

            {loading ? (
              <p className="mt-3 text-sm text-zinc-400">
                Loading weather...
              </p>
            ) : error ? (
              <p className="mt-3 text-sm text-red-300">{error}</p>
            ) : (
              <>
                <p className="mt-3 text-3xl font-semibold text-[#9BF4B8]">
                  {value}
                  <span className="ml-1 text-sm font-normal text-zinc-400">
                    {activeLayer.unit}
                  </span>
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  Current reading near the state capital
                </p>
              </>
            )}
          </div>

          <p className="text-xs leading-5 text-zinc-500">
            Weather readings represent the selected state&apos;s capital area, not
            the entire state. Data provided by Open-Meteo.
          </p>
        </aside>
      </div>

      <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
        <p className="text-xs text-zinc-500">
          Rainfall shows current precipitation in mm, not the daily total.
        </p>
      </div>
    </section>
  );
}