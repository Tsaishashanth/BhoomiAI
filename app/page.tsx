import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductPreview from "@/components/ProductPreview";

export default function Home() {
return ( <main className="relative min-h-screen overflow-hidden bg-[#080D0A] text-[#F1F5F0]"> 
<Navbar /> 
<Hero />
<ProductPreview />
</main>
);
}
