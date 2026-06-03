import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTemplate } from "@/contexts/TemplateContext";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navigation() {
  const { t } = useTranslation();
  const { currentTemplate: tplt, templateId } = useTemplate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: t("nav.products"), labelEn: t("nav.productsEn"), sectionId: "products" },
    { label: t("nav.about"), labelEn: t("nav.aboutEn"), sectionId: "about" },
    { label: t("nav.careers"), labelEn: t("nav.careersEn"), sectionId: "gateway" },
    { label: t("nav.contact"), labelEn: "", sectionId: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname, navigate]);

  const isBold = templateId === "bold-dark";

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? tplt.colors.navBg : "transparent",
          borderBottom: `1px solid ${isScrolled ? tplt.colors.border : "transparent"}`,
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          boxShadow: isScrolled ? tplt.shadows.nav : "none",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="section-padding flex items-center justify-between h-16 sm:h-20">
          <a href="/#/" className="flex items-center gap-3 group">
            <img src="/images/logo.png" alt="IZK" className="h-8 w-auto rounded-sm" />
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-wider block transition-colors" style={{ color: tplt.colors.navText }}>
                {t("footer.companyName", "和泉金属工業")}
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: tplt.colors.textMuted }}>
                IZUMI MACHINE TOOLS
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button key={link.sectionId} onClick={() => scrollToSection(link.sectionId)}
                className="group relative text-sm transition-colors hover:opacity-80 bg-transparent border-none cursor-pointer"
                style={{ color: tplt.colors.navText }}>
                <span className="tracking-wide" style={{ fontWeight: isBold ? 600 : 400 }}>{link.label}</span>
                {link.labelEn && (
                  <span className="block text-[10px] font-mono mt-0.5" style={{ color: tplt.colors.textMuted }}>
                    {link.labelEn}
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full transition-all duration-300"
                  style={{ height: isBold ? "2px" : "1px", backgroundColor: tplt.colors.primary }} />
              </button>
            ))}
            {user?.role === "admin" && (
              <a href="/#/admin"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all"
                style={{ color: tplt.colors.primary, border: `1px solid ${tplt.colors.primary}` }}>
                <Settings className="w-3.5 h-3.5" />{t("nav.admin")}
              </a>
            )}
            <LanguageSwitcher />
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <LanguageSwitcher />
            <button className="p-2" style={{ color: tplt.colors.navText }} onClick={() => setIsMobileOpen(!isMobileOpen)}>
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: tplt.colors.bg + "f0", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <img src="/images/logo.png" alt="IZK" className="h-12 w-auto rounded-sm mb-4" />
            {navLinks.map((link, i) => (
              <motion.button key={link.sectionId} onClick={() => scrollToSection(link.sectionId)}
                className="text-2xl text-center transition-colors hover:opacity-80 bg-transparent border-none cursor-pointer"
                style={{ color: tplt.colors.text }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                {link.label}
                {link.labelEn && <span className="block text-sm font-mono mt-1" style={{ color: tplt.colors.textMuted }}>{link.labelEn}</span>}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
