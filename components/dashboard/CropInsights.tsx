"use client";

import { Sprout, CalendarDays, CloudRain, Thermometer } from "lucide-react";

type CropInfo = {
  season: string;
  planting: string;
  harvest: string;
  temperature: string;
  rainfall: string;
  advice: string;
};

const cropInfo: Record<string, CropInfo> = {
  Paddy: {
    season: "Kharif",
    planting: "June – July",
    harvest: "September – November",
    temperature: "20–35°C",
    rainfall: "High water demand; needs reliable water supply",
    advice:
      "Check rainfall forecasts and field water levels before deciding whether irrigation is needed.",
  },
  Wheat: {
    season: "Rabi",
    planting: "October – December",
    harvest: "February – April",
    temperature: "Best suited to cooler growing conditions",
    rainfall: "Moderate water requirement; varies by growth stage",
    advice:
      "Monitor soil moisture and avoid unnecessary irrigation, especially near harvest.",
  },
  Sugarcane: {
    season: "Long-duration crop",
    planting: "Varies by region; often October – March",
    harvest: "Usually 10–18 months after planting",
    temperature: "Warm conditions",
    rainfall: "High water requirement",
    advice:
      "Plan irrigation according to soil moisture, local rainfall, and the crop's growth stage.",
  },
  Cotton: {
    season: "Mostly Kharif",
    planting: "May – July, depending on region",
    harvest: "October – February, depending on region",
    temperature: "Warm, frost-free conditions",
    rainfall: "Moderate; waterlogging can damage the crop",
    advice:
      "Monitor heavy-rain forecasts and ensure fields drain properly.",
  },
  Maize: {
    season: "Kharif, Rabi, or summer",
    planting: "Depends on the local season",
    harvest: "Often 3–5 months after planting",
    temperature: "Warm conditions",
    rainfall: "Consistent moisture is important during flowering",
    advice:
      "Pay particular attention to water availability during flowering and grain filling.",
  },
  Groundnut: {
    season: "Kharif or summer, region-dependent",
    planting: "Often June – July for Kharif",
    harvest: "Usually 3–5 months after planting",
    temperature: "Warm conditions",
    rainfall: "Moderate, well-distributed rainfall",
    advice:
      "Avoid waterlogging and monitor soil moisture during pod development.",
  },
  Millets: {
    season: "Varies by millet and region",
    planting: "Often during the monsoon",
    harvest: "Usually 2–4 months after planting",
    temperature: "Many varieties tolerate heat",
    rainfall: "Some varieties tolerate low rainfall",
    advice:
      "Choose a locally recommended millet variety and check expected rainfall before sowing.",
  },
  Soybean: {
    season: "Mostly Kharif",
    planting: "June – July, depending on monsoon onset",
    harvest: "September – October, depending on variety",
    temperature: "Warm growing conditions",
    rainfall: "Moderate rainfall; sensitive to waterlogging",
    advice:
      "Check drainage and avoid sowing solely on the basis of one rainfall event.",
  },
};

type Props = {
  crop: string;
};

export default function CropInsights({ crop }: Props) {
  const info = cropInfo[crop];

  if (!info) return null;

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 pb-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0A0D0B]">
        <div className="border-b border-white/[0.07] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#9BF4B8]/20 bg-[#9BF4B8]/10">
              <Sprout size={20} className="text-[#9BF4B8]" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">Crop guide</p>
              <h2 className="text-lg font-semibold text-[#F1F5F0]">
                {crop} growing insights
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            General agricultural guidance. Exact planting and harvesting
            windows depend on your district, variety, soil, and local conditions.
          </p>
        </div>

        <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          <InsightCard
            icon={<CalendarDays size={17} />}
            title="Growing season"
            value={info.season}
            detail="Typical season; varies by region"
          />

          <InsightCard
            icon={<Sprout size={17} />}
            title="Planting period"
            value={info.planting}
            detail="Confirm with local agricultural guidance"
          />

          <InsightCard
            icon={<CalendarDays size={17} />}
            title="Harvest period"
            value={info.harvest}
            detail="Depends on variety and sowing date"
          />

          <InsightCard
            icon={<Thermometer size={17} />}
            title="Temperature"
            value={info.temperature}
            detail="General growing-condition guidance"
          />

          <InsightCard
            icon={<CloudRain size={17} />}
            title="Water and rainfall"
            value={info.rainfall}
            detail="Actual needs depend on soil and growth stage"
          />

          <InsightCard
            icon={<Sprout size={17} />}
            title="Field consideration"
            value={info.advice}
            detail="General guidance, not a live crop diagnosis"
          />
        </div>
      </div>
    </section>
  );
}

function InsightCard({
  icon,
  title,
  value,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="bg-[#0A0D0B] p-5">
      <div className="flex items-center gap-2 text-[#9BF4B8]">
        {icon}
        <h3 className="text-sm font-medium text-zinc-300">{title}</h3>
      </div>

      <p className="mt-3 text-sm font-semibold leading-6 text-[#F1F5F0]">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-500">{detail}</p>
    </div>
  );
}