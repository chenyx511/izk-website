import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTemplate } from "@/contexts/TemplateContext";
import { assetUrl } from "@/lib/asset";

export default function HeroSection({ content }: { content: Record<string, string> }) {
  const { t: _t } = useTranslation();
  const { currentTemplate: t, templateId } = useTemplate();
  // Text content from i18n translations (language-aware)
  const title = _t("hero.title1") + _t("hero.title2");
  const subtitle = "IZUMI MACHINE TOOLS";
  const desc = _t("hero.description");
  const cta1 = _t("hero.ctaPrimary");
  const cta2 = _t("hero.ctaSecondary");
  // Non-text config from CMS (images)
  const bgImage = assetUrl(content.hero_bg_image ?? "/images/hero-bg.jpg");

  // ─── dark-industrial: 全屏背景图 + 暗色overlay ───
  if (templateId === "dark-industrial") {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.85), rgba(10,10,15,0.5), rgba(10,10,15,1))" }} />
        </div>
        <div className="relative z-10 section-padding w-full max-w-6xl mx-auto">
          <LogoBlock t={t} />
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mt-6" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            {_t("hero.title1")}<br /><span style={{ color: t.colors.primary }}>{_t("hero.title2")}</span>
          </motion.h1>
          <motion.p className="text-base sm:text-lg tracking-widest font-mono mt-4" style={{ color: t.colors.textSecondary }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>{subtitle}</motion.p>
          <motion.p className="text-sm sm:text-base max-w-xl mt-4 leading-relaxed" style={{ color: t.colors.textMuted }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>{desc}</motion.p>
          <CTABlock t={t} cta1={cta1} cta2={cta2} delay={0.9} />
          <ScrollIndicator t={t} />
        </div>
        <div className="absolute top-24 right-8 hidden lg:flex items-center gap-3">
          <div className="w-12 h-[1px]" style={{ backgroundColor: t.colors.primary, opacity: 0.5 }} />
          <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: t.colors.textMuted }}>EST. 1953</span>
        </div>
      </section>
    );
  }

  // ─── clean-corporate: 白色底，60vh，文字居中，无背景图 ───
  if (templateId === "clean-corporate") {
    return (
      <section className="relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: t.colors.bg, minHeight: "60vh", paddingTop: "6rem" }}>
        <div className="relative z-10 section-padding w-full max-w-4xl mx-auto text-center py-20">
          <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider mb-8"
            style={{ border: `1px solid ${t.colors.border}`, color: t.colors.textMuted }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {_t("hero.est")} · {_t("hero.title1")}{_t("hero.title2")}
          </motion.div>
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            style={{ color: t.colors.text, fontFamily: t.fonts.heading }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            {title}
          </motion.h1>
          <motion.p className="text-base sm:text-lg tracking-widest font-mono mt-6" style={{ color: t.colors.primary }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>{subtitle}</motion.p>
          <motion.p className="text-sm sm:text-base max-w-2xl mx-auto mt-6 leading-relaxed" style={{ color: t.colors.textMuted }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>{desc}</motion.p>
          <CTABlock t={t} cta1={cta1} cta2={cta2} delay={0.9} centered />
        </div>
      </section>
    );
  }

  // ─── modern-tech: 深蓝渐变背景，80vh，装饰性几何元素 ───
  if (templateId === "modern-tech") {
    return (
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0C1222, #1e1b4b, #0C1222)" }}>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${t.colors.primary}, transparent)` }} />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${t.colors.accent}, transparent)` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5" style={{ border: `2px solid ${t.colors.primary}` }} />

        <div className="relative z-10 section-padding w-full max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <LogoBlock t={t} />
              <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-6" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
                {title}
              </motion.h1>
              <motion.p className="text-sm sm:text-base max-w-lg mt-6 leading-relaxed" style={{ color: t.colors.textMuted }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>{desc}</motion.p>
              <CTABlock t={t} cta1={cta1} cta2={cta2} delay={0.9} />
            </div>
            <motion.div className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <div className="relative">
                <div className="w-64 h-64 rounded-3xl overflow-hidden" style={{ boxShadow: `0 20px 60px ${t.colors.primary}30` }}>
                  <img src={bgImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: t.colors.bgCard, border: `1px solid ${t.colors.border}` }}>
                  <span className="text-3xl font-bold font-mono" style={{ color: t.colors.primary }}>70+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <ScrollIndicator t={t} />
      </section>
    );
  }

  // ─── minimal-white: 极简，70vh，纯文字，大量留白 ───
  if (templateId === "minimal-white") {
    return (
      <section className="relative flex items-end overflow-hidden" style={{ backgroundColor: t.colors.bg, minHeight: "70vh", paddingTop: "8rem" }}>
        <div className="relative z-10 section-padding w-full max-w-5xl mx-auto pb-20">
          <motion.div className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="w-12 h-[1px]" style={{ backgroundColor: t.colors.text }} />
            <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: t.colors.textMuted }}>{subtitle}</span>
          </motion.div>
          <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
            style={{ color: t.colors.text, fontFamily: t.fonts.heading, fontWeight: 300 }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            {_t("hero.title1")}<br />{_t("hero.title2")}<br /><span style={{ color: t.colors.accent }}>{_t("hero.title2")}</span>
          </motion.h1>
          <motion.p className="text-sm sm:text-base max-w-md mt-8 leading-relaxed" style={{ color: t.colors.textMuted }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>{desc}</motion.p>
          <motion.div className="mt-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <a href="#products" className="text-sm font-mono tracking-wider transition-colors hover:opacity-70"
              style={{ color: t.colors.text, borderBottom: `1px solid ${t.colors.text}` }}>
              {cta1} →
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── bold-dark: 全屏100vh，纯黑，超大金色标题，粗体 ───
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgImage} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,1))" }} />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(${t.colors.primary}20 1px, transparent 1px), linear-gradient(90deg, ${t.colors.primary}20 1px, transparent 1px)`, backgroundSize: "100px 100px" }} />

      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto">
        <LogoBlock t={t} />
        <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter mt-8"
          style={{ color: t.colors.text, fontFamily: t.fonts.heading, textTransform: "uppercase" as const }}
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          {_t("hero.title1")}<br /><span style={{ color: t.colors.primary }}>{_t("hero.title2")}</span>
        </motion.h1>
        <motion.div className="flex items-center gap-6 mt-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <div className="w-16 h-0.5" style={{ backgroundColor: t.colors.primary }} />
          <p className="text-sm sm:text-base max-w-lg leading-relaxed" style={{ color: t.colors.textSecondary }}>{desc}</p>
        </motion.div>
        <CTABlock t={t} cta1={cta1} cta2={cta2} delay={0.9} />
        <ScrollIndicator t={t} />
      </div>
    </section>
  );
}

// ─── Sub-components ───

function LogoBlock({ t }: { t: { colors: Record<string, string> } }) {
  const { t: tr } = useTranslation();
  return (
    <motion.div className="flex items-center gap-3 sm:gap-4"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
      <img src={assetUrl("/images/logo.png")} alt="IZK" className="h-12 sm:h-14 w-auto rounded-sm" />
      <div>
        <p className="text-sm sm:text-base font-bold tracking-wide" style={{ color: t.colors.text }}>{tr("footer.companyName", "和泉金属工業株式会社")}</p>
        <p className="text-[10px] font-mono tracking-[0.2em]" style={{ color: t.colors.textMuted }}>{tr("footer.companyNameEn", "IZUMI KINZOKU KOGYO CO.,LTD.")}</p>
      </div>
    </motion.div>
  );
}

function CTABlock({ t, cta1, cta2, delay, centered }: { t: { colors: Record<string, string>; borderRadius: string; shadows: Record<string, string> }; cta1: string; cta2: string; delay: number; centered?: boolean }) {
  return (
    <motion.div className={`flex flex-col sm:flex-row gap-4 pt-6 ${centered ? "justify-center" : ""}`}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.8 }}>
      <a href="#products" className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm tracking-wide transition-all duration-300 group"
        style={{ backgroundColor: t.colors.primary, color: "#fff", borderRadius: t.colors.borderRadius ? undefined : undefined }}>
        {cta1}<span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>
      <a href="#gateway" className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm tracking-wide transition-all duration-300 group"
        style={{ border: `1px solid ${t.colors.accentSecondary}`, color: t.colors.accentSecondary }}>
        {cta2}<span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </motion.div>
  );
}

function ScrollIndicator({ t }: { t: { colors: Record<string, string> } }) {
  const { t: tr } = useTranslation();
  return (
    <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: t.colors.textMuted }}>{tr("hero.scroll")}</span>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown className="w-5 h-5" style={{ color: t.colors.primary }} />
      </motion.div>
    </motion.div>
  );
}
