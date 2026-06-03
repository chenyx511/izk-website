import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTemplate } from "@/contexts/TemplateContext";
import { assetUrl } from "@/lib/asset";

export default function AboutSection({ content }: { content: Record<string, string> }) {
  const { t: _t } = useTranslation();
  const { currentTemplate: t, templateId } = useTemplate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const title = `${_t("about.title1")} ${_t("about.title2")}`;
  const descRaw = _t("about.description");
  const description = descRaw ? descRaw.split("\n\n") : [];
  const image = assetUrl(content.about_image ?? "/images/about-factory.jpg");
  const stats = [
    { value: "1953", label: _t("about.stat1Label") },
    { value: "70+", label: _t("about.stat2Label") },
    { value: "30+", label: _t("about.stat3Label") },
  ];

  // ─── dark-industrial: 左右分栏 60/40 ───
  if (templateId === "dark-industrial") {
    return (
      <section id="about" className="py-24 sm:py-32 lg:py-40" style={{ backgroundColor: t.colors.bg }} ref={sectionRef}>
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            <motion.div className="lg:col-span-3 space-y-8"
              initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
              <SectionLabel t={t} label={_t("about.label")} />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>
                {_t("about.title1")}<br /><span style={{ color: t.colors.primary }}>{_t("about.title2")}</span>
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: t.colors.textMuted }}>
                {description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="grid grid-cols-3 gap-6 pt-6" style={{ borderTop: `1px solid ${t.colors.border}` }}>
                {stats.map((s) => <StatBlock key={s.label} value={s.value} label={s.label} t={t} isInView={isInView} />)}
              </div>
            </motion.div>
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="relative group overflow-hidden rounded-lg">
                <img src={image} alt="" className="w-full h-[400px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ─── clean-corporate: 全宽标题 + 图片在下 + 居中 ───
  if (templateId === "clean-corporate") {
    return (
      <section id="about" className="py-20 sm:py-28" style={{ backgroundColor: t.colors.bgSecondary }} ref={sectionRef}>
        <div className="section-padding max-w-6xl mx-auto">
          <motion.div className="text-center space-y-4 mb-12"
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <SectionLabel t={t} label={_t("about.label")} centered />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>{title}</h2>
          </motion.div>
          <motion.div className="max-w-3xl mx-auto text-center space-y-4 mb-12 leading-relaxed" style={{ color: t.colors.textMuted }}
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            {description.map((p, i) => <p key={i}>{p}</p>)}
          </motion.div>
          <motion.div className="relative overflow-hidden mb-12" style={{ borderRadius: t.borderRadius }}
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
            <img src={image} alt="" className="w-full h-64 sm:h-80 object-cover" />
          </motion.div>
          <div className="flex justify-center gap-12 sm:gap-20">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="text-center space-y-1"
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }}>
                <div className="text-3xl sm:text-4xl font-bold font-mono" style={{ color: t.colors.primary }}>{s.value}</div>
                <div className="text-xs" style={{ color: t.colors.textMuted }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── modern-tech: 非对称布局，图片左 + 渐变边框 + 圆角 ───
  if (templateId === "modern-tech") {
    return (
      <section id="about" className="py-24 sm:py-32" style={{ backgroundColor: t.colors.bg }} ref={sectionRef}>
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div className="lg:col-span-5" initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
              <div className="relative p-1 rounded-3xl" style={{ background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.accent})` }}>
                <div className="rounded-3xl overflow-hidden">
                  <img src={image} alt="" className="w-full h-80 lg:h-[420px] object-cover" />
                </div>
              </div>
            </motion.div>
            <motion.div className="lg:col-span-7 space-y-6 lg:pl-8"
              initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <SectionLabel t={t} label={_t("about.label")} />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>
                {title}
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: t.colors.textMuted }}>
                {description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="flex gap-8 pt-4">
                {stats.map((s) => (
                  <div key={s.label} className="space-y-1">
                    <div className="text-2xl font-bold font-mono" style={{ color: t.colors.accent }}>{s.value}</div>
                    <div className="text-xs" style={{ color: t.colors.textMuted }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ─── minimal-white: 纯文字，无图，极简，大量留白 ───
  if (templateId === "minimal-white") {
    return (
      <section id="about" className="py-32 sm:py-40" style={{ backgroundColor: t.colors.bg }} ref={sectionRef}>
        <div className="section-padding max-w-3xl mx-auto">
          <motion.div className="space-y-2 mb-16"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px]" style={{ backgroundColor: t.colors.text }} />
              <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: t.colors.textMuted }}>{_t("about.label")}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light leading-tight tracking-tight" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>
              {title}
            </h2>
          </motion.div>
          <motion.div className="space-y-6 leading-[1.8]" style={{ color: t.colors.textSecondary }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            {description.map((p, i) => <p key={i} className="text-lg">{p}</p>)}
          </motion.div>
          <motion.div className="mt-16 pt-8 flex gap-16"
            style={{ borderTop: `1px solid ${t.colors.border}` }}
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-light" style={{ color: t.colors.text }}>{s.value}</div>
                <div className="text-xs mt-1 font-mono tracking-wider" style={{ color: t.colors.textMuted }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── bold-dark: 全宽图片 + 叠加文字，大字体 ───
  return (
    <section id="about" className="relative py-0" style={{ backgroundColor: t.colors.bg }} ref={sectionRef}>
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, transparent 60%)" }} />
      </div>
      <div className="section-padding max-w-5xl mx-auto -mt-32 relative z-10 pb-24">
        <motion.h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter"
          style={{ color: t.colors.primary, fontFamily: t.fonts.heading }}
          initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          {title}
        </motion.h2>
        <motion.div className="mt-8 grid sm:grid-cols-2 gap-6 leading-relaxed max-w-3xl" style={{ color: t.colors.textSecondary }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          {description.map((p, i) => <p key={i}>{p}</p>)}
        </motion.div>
        <motion.div className="flex gap-12 mt-12 pt-8" style={{ borderTop: `2px solid ${t.colors.primary}30` }}
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="text-4xl font-bold font-mono" style={{ color: t.colors.primary }}>{s.value}</div>
              <div className="text-xs font-mono tracking-wider" style={{ color: t.colors.textMuted }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionLabel({ t, label, centered }: { t: { colors: Record<string, string> }; label: string; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <div className="w-8 h-[1px]" style={{ backgroundColor: t.colors.accent }} />
      <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: t.colors.accent }}>{label}</span>
    </div>
  );
}

function StatBlock({ value, label, t, isInView }: { value: string; label: string; t: { colors: Record<string, string> }; isInView: boolean }) {
  return (
    <motion.div className="space-y-1"
      initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono" style={{ color: t.colors.text }}>{value}</div>
      <div className="text-xs" style={{ color: t.colors.textMuted }}>{label}</div>
    </motion.div>
  );
}
