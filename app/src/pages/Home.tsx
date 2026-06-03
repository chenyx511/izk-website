import { useState } from "react";
import { useSiteContent, useProducts, useSettings } from "@/hooks/useSiteData";
import { TemplateProvider } from "@/contexts/TemplateContext";
import { TemplateStyle } from "@/components/TemplateStyle";
import Navigation from "@/sections/Navigation";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ProductsSection from "@/sections/ProductsSection";
import DualGateway from "@/sections/DualGateway";
import ContactBand from "@/sections/ContactBand";
import Footer from "@/sections/Footer";
import LoadingScreen from "@/sections/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: content } = useSiteContent();
  const { data: products } = useProducts();
  const { data: settings } = useSettings();

  const safeContent = content ?? {};
  const safeProducts = products ?? [];
  const templateId = (settings?.template as "dark-industrial" | "clean-corporate" | "modern-tech" | "minimal-white" | "bold-dark") ?? "dark-industrial";

  return (
    <TemplateProvider initialTemplate={templateId}>
      <TemplateStyle />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Navigation />
        <main>
          <HeroSection content={safeContent} />
          <AboutSection content={safeContent} />
          <ProductsSection products={safeProducts} />
          <DualGateway content={safeContent} />
          <ContactBand content={safeContent} />
        </main>
        <Footer content={safeContent} />
      </div>
    </TemplateProvider>
  );
}
