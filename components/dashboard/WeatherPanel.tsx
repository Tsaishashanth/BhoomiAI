"use client";

import { useState } from "react";
import {
  CloudRain,
  Droplets,
  LoaderCircle,
  MapPin,
  Thermometer,
  Wind,
} from "lucide-react";

type WeatherData = {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
};

export default function WeatherPanel() {
  const [location, setLocation] = useState("Vijayawada");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather() {
    if (!location.trim()) {
      setError("Enter a location first.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          location
        )}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error("Could not search for this location.");
      }

      const geoData = await geoResponse.json();
      const place = geoData.results?.[0];

      if (!place) {
        throw new Error("Location not found. Try another city or district.");
      }

      const params = new URLSearchParams({
        latitude: String(place.latitude),
        longitude: String(place.longitude),
        current:
          "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m",
        timezone: "Asia/Kolkata",
      });

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`
      );

      if (!weatherResponse.ok) {
        throw new Error("Could not fetch weather data.");
      }

      const data = await weatherResponse.json();

      setWeather({
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        windSpeed: data.current.wind_speed_10m,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  const metrics = weather
    ? [
        {
          label: "Temperature",
          value: `${weather.temperature}°C`,
          icon: Thermometer,
        },
        {
          label: "Humidity",
          value: `${weather.humidity}%`,
          icon: Droplets,
        },
        {
          label: "Precipitation",
          value: `${weather.precipitation} mm`,
          icon: CloudRain,
        },
        {
          label: "Wind speed",
          value: `${weather.windSpeed} km/h`,
          icon: Wind,
        },
      ]
    : [];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0b0d0c] p-5 sm:p-7">
      <div className="mb-6">
        <p className="text-sm font-medium text-[#9BF4B8]">
          LIVE WEATHER
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#F1F5F0]">
          Weather conditions
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Check current weather before planning your crop activities.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void fetchWeather();
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4">
          <MapPin size={18} className="shrink-0 text-[#9BF4B8]" />

          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter city or district"
            className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-zinc-500"
            aria-label="City or district"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#9BF4B8] px-6 py-3.5 text-sm font-semibold text-[#07130b] transition hover:bg-[#b6ffca] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <LoaderCircle size={16} className="animate-spin" />}
          {loading ? "Fetching..." : "Check weather"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {!weather && !loading && !error && (
        <p className="mt-5 text-sm text-zinc-500">
          Enter a location and select Check weather to load live readings.
        </p>
      )}

      {weather && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
              >
                <Icon size={19} className="text-[#9BF4B8]" />

                <p className="mt-4 text-sm text-zinc-400">{label}</p>

                <p className="mt-1 text-xl font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-5 text-zinc-500">
            Current weather readings from Open-Meteo. Precipitation is the
            current reported interval, not the daily rainfall total. These
            readings alone do not determine suitable planting dates.
          </p>
        </>
      )}
    </section>
  );
}