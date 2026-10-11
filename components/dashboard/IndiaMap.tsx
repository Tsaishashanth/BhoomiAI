
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { GeoJsonObject } from "geojson";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);

const GeoJSONLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false },
);

const ZoomControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false },
);

export default function IndiaMap() {
  const [indiaData, setIndiaData] = useState<GeoJsonObject | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(
      "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load India state boundaries");
        }
        return response.json();
      })
      .then((data: GeoJsonObject) => {
        if (!cancelled) setIndiaData(data);
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090B09] shadow-[0_20px_70px_#00000030,inset_0_1px_0_#FFFFFF08]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
        <div>
          <h2 className="text-sm font-medium text-[#F1F5F0]">
            India Overview
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Explore state boundaries and regions
          </p>
        </div>

        <span className="rounded-full border border-[#9BF4B8]/15 bg-[#9BF4B8]/[0.06] px-2.5 py-1 text-[11px] text-[#9BF4B8]">
          INDIA
        </span>
      </div>

      <div className="relative h-[420px] w-full sm:h-[540px]">
        <MapContainer
          center={[22.5, 82.5]}
          zoom={4}
          minZoom={3}
          maxZoom={8}
          scrollWheelZoom
          zoomControl={false}
          className="h-full w-full bg-[#090B09]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {indiaData && (
            <GeoJSONLayer
              data={indiaData}
              style={{
                color: "#9BF4B8",
                weight: 1,
                opacity: 0.65,
                fillColor: "#9BF4B8",
                fillOpacity: 0.035,
              }}
            />
          )}

          <ZoomControl position="bottomright" />
        </MapContainer>

        {!indiaData && (
          <div className="pointer-events-none absolute inset-0 z-[500] flex items-center justify-center">
            <p className="rounded-lg border border-white/10 bg-black/80 px-4 py-2 text-xs text-zinc-400">
              {mapError
                ? "State boundaries unavailable. The base map is still visible."
                : "Loading India state boundaries..."}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3 sm:px-5">
        <p className="text-xs text-zinc-500">
          Map data: OpenStreetMap · State boundaries: GeoJSON
        </p>
        <span className="text-xs text-zinc-600">BhoomiAI</span>
      </div>
    </section>
  );
}