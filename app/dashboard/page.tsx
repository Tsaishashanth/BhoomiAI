import DashboardHeader from "@/components/dashboard/DashboardHeader";
//import DashboardHero from "@/components/dashboard/DashboardHero";
import IndiaMap from "@/components/dashboard/IndiaMap";
import WeatherPanel from "@/components/dashboard/WeatherPanel";
import PlantingRecomendations from "@/components/dashboard/PlantingRecomendations";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <DashboardHeader />
      {/* <DashboardHero /> */}
      <IndiaMap />
      <WeatherPanel />
      <PlantingRecomendations />
    </main>
  );
}