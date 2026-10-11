import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardHero from "@/components/dashboard/DashboardHero";
import IndiaMap from "@/components/dashboard/IndiaMap";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <DashboardHeader />
      <DashboardHero />
      <IndiaMap />
    </main>
  );
}