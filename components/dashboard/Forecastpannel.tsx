"use client";

import { useState } from "react";
import {
  CalendarDays,
  CloudRain,
  Droplets,
  LoaderCircle,
  MapPin,
  Sun,
  Thermometer,
} from "lucide-react";

type ForecastDay = {
  date: string;
  maxTemp: number;
  minTemp: number;
  rain: number;
  humidity: number;
};

export default function ForecastPanel() {
  const [location, setLocation] = useState("Vijayawada");
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchForecast() {
    if (!location.trim()) {
      setError("Enter a location first.");
      return;
    }

    setLoading(true);
    setError("");
    setForecast([]);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          location
        )}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error("Unable to search for this location.");
      }

      const geoData = await geoResponse.json();
      const place = geoData.results?.[0];

      if (!place) {
        throw new Error("Location not found. Try another city or district.");
      }

      const params = new URLSearchParams({
        latitude: String(place.latitude),
        longitude: String(place.longitude),
        daily:
          "temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_mean",
        forecast_days: "14",
        timezone: "Asia/Kolkata",
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch the forecast.");
      }

      const data = await response.json();

      if (!data.daily?.time?.length) {
        throw new Error("Forecast data is unavailable for this location.");
      }

      const days: ForecastDay[] = data.daily.time.map(
        (date: string, index: number) => ({
          date,
          maxTemp: data.daily.temperature_2m_max[index],
          minTemp: data.daily.temperature_2m_min[index],
          rain: data.daily.precipitation_sum[index],
          humidity: data.daily.relative_humidity_2m_mean[index],
        })
      );

      setForecast(days);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date: string) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0b0d0c] p-5 sm:p-7">
      <div className="mb-6">
        <p className="text-sm font-medium text-[#9BF4B8]">
          14-DAY OUTLOOK
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#F1F5F0]">
          Upcoming forecast
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Compare forecast temperatures, rainfall, and humidity for the
          coming days.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void fetchForecast();
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4">
          <MapPin size={18} className="shrink-0 text-[#9BF4B8]" />

          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter city or district"
            aria-label="Forecast location"
            className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#9BF4B8] px-6 py-3.5 text-sm font-semibold text-[#07130b] transition hover:bg-[#b6ffca] disabled:opacity-60"
        >
          {loading && (
            <LoaderCircle size={16} className="animate-spin" />
          )}
          {loading ? "Loading..." : "Get forecast"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {forecast.length > 0 && (
        <div className="mt-6 space-y-3">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:grid-cols-[1.1fr_1fr_1fr_1fr]"
            >
              <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                <CalendarDays
                  size={18}
                  className="shrink-0 text-[#9BF4B8]"
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {formatDate(day.date)}
                  </p>
                  <p className="text-xs text-zinc-500">{day.date}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Thermometer size={15} />
                  <span className="text-xs">Temperature</span>
                </div>
                <p className="mt-2 text-sm font-medium text-white">
                  {day.minTemp}° – {day.maxTemp}°C
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <CloudRain size={15} />
                  <span className="text-xs">Rainfall</span>
                </div>
                <p className="mt-2 text-sm font-medium text-white">
                  {day.rain} mm
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Droplets size={15} />
                  <span className="text-xs">Humidity</span>
                </div>
                <p className="mt-2 text-sm font-medium text-white">
                  {day.humidity == null
                    ? "Unavailable"
                    : `${day.humidity}%`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!forecast.length && !loading && !error && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/[0.07] p-4">
          <Sun size={20} className="text-[#9BF4B8]" />
          <p className="text-sm text-zinc-400">
            Fetch a forecast to see the next 14 days of weather.
          </p>
        </div>
      )}

      <p className="mt-4 text-xs leading-5 text-zinc-500">
        Forecast values are estimates and can change. These are weather
        forecasts, not planting recommendations. Crop-specific guidance
        will be calculated separately.
      </p>
    </section>
  );
}