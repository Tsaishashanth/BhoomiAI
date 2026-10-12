"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  CloudRain,
  IndianRupee,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  Sprout,
  Thermometer,
  TrendingUp,
  Wallet,
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
  "Other",
];

type CropRule = {
  minTemp: number;
  maxTemp: number;
  heavyRainMm: number;
  seedKgPerAcre: number;
  seedNote: string;
};

type ForecastDay = {
  date: string;
  minTemp: number | null;
  maxTemp: number | null;
  rainMm: number | null;
  rainProbability: number | null;
};

const cropRules: Record<string, CropRule> = {
  Paddy: {
    minTemp: 22,
    maxTemp: 35,
    heavyRainMm: 40,
    seedKgPerAcre: 20,
    seedNote:
      "Approximate direct-seeding rate. Nursery and transplanting methods differ.",
  },
  Wheat: {
    minTemp: 10,
    maxTemp: 25,
    heavyRainMm: 25,
    seedKgPerAcre: 40,
    seedNote: "Approximate rate. Variety and sowing method affect requirements.",
  },
  Sugarcane: {
    minTemp: 20,
    maxTemp: 35,
    heavyRainMm: 40,
    seedKgPerAcre: 1200,
    seedNote:
      "Approximate planting-material weight. Sugarcane is generally planted using setts.",
  },
  Cotton: {
    minTemp: 21,
    maxTemp: 35,
    heavyRainMm: 30,
    seedKgPerAcre: 1.5,
    seedNote: "Indicative rate. Hybrid and spacing affect the actual requirement.",
  },
  Maize: {
    minTemp: 18,
    maxTemp: 32,
    heavyRainMm: 30,
    seedKgPerAcre: 8,
    seedNote: "Approximate rate. Grain, sweet corn, and fodder systems differ.",
  },
  Groundnut: {
    minTemp: 20,
    maxTemp: 32,
    heavyRainMm: 25,
    seedKgPerAcre: 50,
    seedNote: "Approximate rate. Variety and seed basis affect the requirement.",
  },
  Millets: {
    minTemp: 20,
    maxTemp: 35,
    heavyRainMm: 25,
    seedKgPerAcre: 2,
    seedNote: "Indicative rate. Millet species and sowing method matter.",
  },
  Soybean: {
    minTemp: 20,
    maxTemp: 32,
    heavyRainMm: 30,
    seedKgPerAcre: 30,
    seedNote: "Approximate rate. Seed size and row spacing affect requirements.",
  },
  Other: {
    minTemp: 18,
    maxTemp: 32,
    heavyRainMm: 30,
    seedKgPerAcre: 0,
    seedNote: "Choose a supported crop to estimate seed requirements.",
  },
};

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function ResultBox({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Sprout;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center gap-2">
        <Icon size={19} className="shrink-0 text-[#9BF4B8]" />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </article>
  );
}

export default function PlantingRecommendations() {
  const [location, setLocation] = useState("Vijayawada");
  const [crop, setCrop] = useState("Paddy");
  const [variety, setVariety] = useState("");
  const [plantingStatus, setPlantingStatus] =
    useState("Not planted yet");
  const [areaAcres, setAreaAcres] = useState("1");
  const [seedPrice, setSeedPrice] = useState("");
  const [irrigation, setIrrigation] = useState("Canal / borewell");

  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [placeName, setPlaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const rule = cropRules[crop] ?? cropRules.Other;
  const acres = Math.max(0, Number(areaAcres) || 0);
  const seedKg = rule.seedKgPerAcre * acres;
  const enteredSeedPrice = Number(seedPrice);

  const hasSeedPrice =
    seedPrice.trim() !== "" &&
    Number.isFinite(enteredSeedPrice) &&
    enteredSeedPrice >= 0;

  async function analyzeConditions() {
    if (!location.trim()) {
      setError("Enter a city or district.");
      return;
    }

    setLoading(true);
    setError("");
    setForecast([]);
    setPlaceName("");
    setSearched(false);

    try {
      const geoParams = new URLSearchParams({
        name: location.trim(),
        count: "10",
        language: "en",
        format: "json",
        countryCode: "IN",
      });

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?${geoParams}`
      );

      if (!geoResponse.ok) {
        throw new Error("Unable to search for this location.");
      }

      const geoData = await geoResponse.json();
      const place = geoData.results?.[0];

      if (!place) {
        throw new Error(
          "Location not found. Try a city or district in India."
        );
      }

      const params = new URLSearchParams({
        latitude: String(place.latitude),
        longitude: String(place.longitude),
        daily:
          "temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max",
        forecast_days: "14",
        timezone: "Asia/Kolkata",
      });

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
      );

      if (!weatherResponse.ok) {
        throw new Error("Unable to retrieve the weather forecast.");
      }

      const weatherData = await weatherResponse.json();
      const daily = weatherData.daily;

      if (
        !daily?.time?.length ||
        !daily.temperature_2m_max ||
        !daily.temperature_2m_min ||
        !daily.precipitation_sum
      ) {
        throw new Error("Forecast data is incomplete for this location.");
      }

      const days: ForecastDay[] = daily.time.map(
        (date: string, index: number) => ({
          date,
          minTemp: daily.temperature_2m_min[index] ?? null,
          maxTemp: daily.temperature_2m_max[index] ?? null,
          rainMm: daily.precipitation_sum[index] ?? null,
          rainProbability:
            daily.precipitation_probability_max?.[index] ?? null,
        })
      );

      setForecast(days);
      setPlaceName(
        [place.name, place.admin1].filter(Boolean).join(", ")
      );
      setSearched(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while checking the forecast."
      );
    } finally {
      setLoading(false);
    }
  }

  const validForecast = forecast.filter(
    (day) =>
      day.minTemp !== null &&
      day.maxTemp !== null &&
      day.rainMm !== null &&
      Number.isFinite(day.minTemp) &&
      Number.isFinite(day.maxTemp) &&
      Number.isFinite(day.rainMm)
  );

  const suitableDays = validForecast.filter((day) => {
    if (rule.seedKgPerAcre <= 0) return false;

    const temperatureMatches =
      day.maxTemp! >= rule.minTemp &&
      day.minTemp! <= rule.maxTemp;

    const rainIsNotHeavy = day.rainMm! < rule.heavyRainMm;

    return temperatureMatches && rainIsNotHeavy;
  });

  const nextRainyDay = forecast.find(
    (day) =>
      day.rainProbability !== null &&
      day.rainProbability >= 50
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0b0d0c] p-5 sm:p-7">
      <div className="mb-6">
        <p className="text-sm font-medium text-[#9BF4B8]">
          CROP PLANNING
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#F1F5F0]">
          Plan your crop with local data
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Enter your farm details to check the forecast, estimate seed
          requirements, and review your planting options.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void analyzeConditions();
        }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Farm location
          </span>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4">
            <MapPin
              size={18}
              className="shrink-0 text-[#9BF4B8]"
            />

            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="City or district"
              className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
              required
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Crop
          </span>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4">
            <Sprout
              size={18}
              className="shrink-0 text-[#9BF4B8]"
            />

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

        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Seed variety / brand
          </span>

          <input
            value={variety}
            onChange={(event) => setVariety(event.target.value)}
            placeholder="Variety or brand (optional)"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Farm size (acres)
          </span>

          <input
            type="number"
            min="0.1"
            step="0.1"
            value={areaAcres}
            onChange={(event) => setAreaAcres(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Planting status
          </span>

          <select
            value={plantingStatus}
            onChange={(event) => setPlantingStatus(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#101210] px-4 py-3.5 text-sm text-white outline-none"
          >
            <option>Not planted yet</option>
            <option>Already planted</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Irrigation availability
          </span>

          <select
            value={irrigation}
            onChange={(event) => setIrrigation(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#101210] px-4 py-3.5 text-sm text-white outline-none"
          >
            <option>Rain-fed</option>
            <option>Canal / borewell</option>
            <option>Drip irrigation</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm text-zinc-400">
            Seed price quoted by a dealer (₹ per kg)
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={seedPrice}
            onChange={(event) => setSeedPrice(event.target.value)}
            placeholder="Optional — enter the price per kg"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
          />

          <span className="mt-1 block text-xs text-zinc-500">
            Used to estimate your seed cost. This is your entered quote,
            not a verified live market price.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#9BF4B8] px-6 py-3.5 text-sm font-semibold text-[#07130b] transition hover:bg-[#b6ffca] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {loading ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              Fetching local forecast...
            </>
          ) : (
            <>
              <CalendarDays size={17} />
              Analyze crop plan
            </>
          )}
        </button>
      </form>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {searched && (
        <>
          <div className="mt-7">
            <p className="text-xs font-medium uppercase tracking-wider text-[#9BF4B8]">
              Results for {placeName}
            </p>

            <h3 className="mt-1 text-xl font-semibold text-white">
              {crop} crop assessment
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              {plantingStatus} · {acres} acre(s) · {irrigation}
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ResultBox icon={CloudRain} title="Rainfall forecast">
              <p className="text-sm leading-6 text-zinc-400">
                {nextRainyDay
                  ? `Next day with at least a 50% forecast rain chance: ${formatDate(nextRainyDay.date)}.`
                  : "No day with a 50% or higher rain probability was found, or probability data is unavailable."}
              </p>

              <div className="mt-4 space-y-3">
                {forecast.slice(0, 7).map((day) => (
                  <div
                    key={day.date}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="text-zinc-300">
                      {formatDate(day.date)}
                    </span>

                    <span className="text-zinc-400">
                      {day.rainProbability === null
                        ? "N/A"
                        : `${day.rainProbability}%`}
                    </span>

                    <span className="min-w-14 text-right text-white">
                      {day.rainMm === null ? "—" : `${day.rainMm} mm`}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-5 text-zinc-500">
                Probability and expected rainfall are different measurements.
              </p>
            </ResultBox>

            <ResultBox
              icon={Thermometer}
              title="Temperature outlook"
            >
              <p className="text-sm text-zinc-400">
                Daily minimum and maximum temperatures for the next week.
              </p>

              <div className="mt-4 space-y-3">
                {forecast.slice(0, 7).map((day) => (
                  <div
                    key={day.date}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-zinc-300">
                      {formatDate(day.date)}
                    </span>

                    <span className="text-white">
                      {day.minTemp === null || day.maxTemp === null
                        ? "Unavailable"
                        : `${day.minTemp}° – ${day.maxTemp}°C`}
                    </span>
                  </div>
                ))}
              </div>
            </ResultBox>

            <ResultBox
              icon={CalendarDays}
              title="Weather-screened planting dates"
            >
              {plantingStatus === "Already planted" ? (
                <p className="text-sm leading-6 text-zinc-400">
                  Your crop is already planted. Use the forecast to plan
                  field checks and irrigation instead of selecting a new
                  planting date.
                </p>
              ) : suitableDays.length > 0 ? (
                <>
                  <p className="text-sm leading-6 text-zinc-400">
                    These dates pass basic temperature and heavy-rain
                    screening rules for {crop}. They are candidates for
                    further assessment, not confirmed planting dates.
                  </p>

                  <div className="mt-4 space-y-2">
                    {suitableDays.map((day) => (
                      <div
                        key={day.date}
                        className="flex items-center gap-2 rounded-xl border border-[#9BF4B8]/15 bg-[#9BF4B8]/[0.04] p-3 text-sm text-white"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-[#9BF4B8]"
                        />
                        {formatDate(day.date)}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm leading-6 text-zinc-400">
                  No dates passed the basic screening rules. This does
                  not prove that planting is unsuitable. Confirm the
                  regional planting calendar, soil moisture, and variety.
                </p>
              )}

              <p className="mt-4 text-xs leading-5 text-zinc-500">
                These are rough weather checks, not a locally validated
                agronomic recommendation.
              </p>
            </ResultBox>

            <ResultBox icon={Sprout} title="Seed requirements">
              <p className="text-3xl font-semibold text-white">
                {rule.seedKgPerAcre > 0
                  ? `${seedKg.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })} kg`
                  : "Not available"}
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Estimated requirement for {acres} acre(s)
              </p>

              {variety && (
                <p className="mt-3 text-sm text-zinc-300">
                  Variety / brand: {variety}
                </p>
              )}

              <p className="mt-3 text-xs leading-5 text-zinc-500">
                {rule.seedNote}
              </p>

              {hasSeedPrice && rule.seedKgPerAcre > 0 && (
                <div className="mt-4 rounded-xl bg-white/[0.04] p-3">
                  <p className="text-xs text-zinc-400">
                    Estimated seed cost using your quote
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    ₹
                    {(seedKg * enteredSeedPrice).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Assumes your entered price is per kg.
                  </p>
                </div>
              )}
            </ResultBox>

            <ResultBox
              icon={Wallet}
              title="Current seed market price"
            >
              <p className="text-lg font-semibold text-white">
                Live price not connected
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {hasSeedPrice
                  ? `Your entered quote is ₹${enteredSeedPrice.toLocaleString("en-IN")} per kg.`
                  : "Enter a dealer quote to calculate an estimated seed cost."}
              </p>

              <p className="mt-3 text-xs leading-5 text-zinc-500">
                A verified local dealer or marketplace data source is
                needed to show a current market price.
              </p>
            </ResultBox>

            <ResultBox
              icon={TrendingUp}
              title="Crop selling price"
            >
              <p className="text-lg font-semibold text-white">
                Market data not connected
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Current mandi prices and a harvest-time price estimate
                require crop-specific market data for your region.
              </p>

              <p className="mt-3 text-xs leading-5 text-zinc-500">
                Future prices are uncertain. MSP is not a guaranteed
                selling price for every farmer.
              </p>
            </ResultBox>

            <ResultBox
              icon={ShieldCheck}
              title="Pest and disease management"
            >
              <p className="text-sm leading-6 text-zinc-300">
                Inspect the field regularly, use healthy planting
                material, and follow integrated pest management practices
                recommended for your crop and region.
              </p>

              <div className="mt-3 flex items-start gap-2 text-sm leading-6 text-amber-200/90">
                <AlertTriangle
                  size={17}
                  className="mt-0.5 shrink-0"
                />
                <p>
                  No pesticide is prescribed because the actual pest,
                  crop growth stage, and local advisory have not been
                  identified.
                </p>
              </div>

              <p className="mt-3 text-xs leading-5 text-zinc-500">
                Confirm treatments with a local agricultural officer.
                Follow registered product labels and safety instructions.
              </p>
            </ResultBox>

            <ResultBox
              icon={IndianRupee}
              title="Estimated costs and returns"
            >
              <p className="text-sm leading-6 text-zinc-400">
                Seed cost can be estimated from your entered price and
                indicative seed quantity. Total cultivation cost and
                expected revenue are not calculated yet because verified
                local input costs, yield assumptions, and mandi prices
                are not connected.
              </p>

              <p className="mt-3 text-xs leading-5 text-zinc-500">
                Any future profit estimate should state its assumptions
                and provide a range instead of promising returns.
              </p>
            </ResultBox>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.035] p-4">
            <AlertTriangle
              size={19}
              className="mt-0.5 shrink-0 text-amber-300"
            />

            <p className="text-xs leading-5 text-zinc-400">
              Weather data comes from Open-Meteo and can change. Seed
              rates and temperature/rainfall thresholds are approximate,
              not locally validated agronomic advice. Confirm crop
              variety, soil, water availability, and regional guidance
              before making planting or pesticide decisions.
            </p>
          </div>
        </>
      )}
    </section>
  );
}