import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { languages } from "@/i18n";
import { useTemplate } from "@/contexts/TemplateContext";

interface LanguageSwitcherProps {
  variant?: "nav" | "admin";
}

export default function LanguageSwitcher({ variant = "nav" }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const { currentTemplate: t } = useTemplate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  if (variant === "admin") {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors hover:bg-white/5"
          style={{ borderColor: "rgba(255,255,255,0.15)", color: "#d1d5db" }}
        >
          <Globe className="w-3.5 h-3.5" />
          {currentLang.label}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-36 rounded-lg border shadow-xl z-50 overflow-hidden"
            style={{ backgroundColor: "#1a1a24", borderColor: "rgba(255,255,255,0.1)" }}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-white/5"
                style={{ color: i18n.language === lang.code ? "#3B82F6" : "#d1d5db" }}
              >
                <span>{lang.label}</span>
                {i18n.language === lang.code && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded transition-all hover:opacity-80"
        style={{
          color: t.colors.navText,
          border: `1px solid ${t.colors.border}`,
          backgroundColor: "transparent",
        }}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{currentLang.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg shadow-xl z-50 overflow-hidden"
          style={{
            backgroundColor: t.colors.navBg,
            border: `1px solid ${t.colors.border}`,
            backdropFilter: "blur(20px)",
          }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm transition-colors hover:opacity-80"
              style={{ color: i18n.language === lang.code ? t.colors.primary : t.colors.navText }}
            >
              <span>{lang.label}</span>
              {i18n.language === lang.code && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
