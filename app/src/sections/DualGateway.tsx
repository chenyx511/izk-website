import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTemplate } from "@/contexts/TemplateContext";
import { assetUrl } from "@/lib/asset";
import type { TemplateConfig } from "@/config/templates";

export default function DualGateway({ content }: { content: Record<string, string> }) {
  const { t: _t } = useTranslation();
  const { currentTemplate: t, templateId } = useTemplate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const c = {
    // Text from i18n (language-aware)
    clientTitle: _t("gateway.clientTitle"),
    clientSlogan: _t("gateway.clientSlogan"),
    clientDesc: _t("gateway.clientDesc"),
    clientCta: _t("gateway.clientCta"),
    recruitTitle: _t("gateway.recruitTitle"),
    recruitSlogan: _t("gateway.recruitSlogan"),
    recruitDesc: _t("gateway.recruitDesc"),
    recruitCta: _t("gateway.recruitCta"),
    // Images from CMS
    clientImg: assetUrl(content.gateway_client_image ?? "/images/gateway-client.jpg"),
    recruitImg: assetUrl(content.gateway_recruit_image ?? "/images/gateway-recruit.jpg"),
  };

  // ─── dark-industrial: 50/50分屏 ───
  if (templateId === "dark-industrial") {
    return (
      <section id="gateway" className="relative min-h-screen flex flex-col lg:flex-row" ref={sectionRef}>
        <GatewayHalf side="left" t={t} isInView={isInView}
          slogan={c.clientSlogan} title={c.clientTitle} desc={c.clientDesc} image={c.clientImg}
          cta={{ text: _t("gateway.clientCta"), href: "#products", color: t.colors.primary }} label={_t("gateway.clientLabel")} />
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] z-20" style={{ backgroundColor: t.colors.border }}>
          <motion.div className="w-full" style={{ backgroundColor: t.colors.primary }}
            initial={{ height: 0 }} animate={isInView ? { height: "100%" } : {}} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} />
        </div>
        <GatewayHalf side="right" t={t} isInView={isInView}
          slogan={c.recruitSlogan} title={c.recruitTitle} desc={c.recruitDesc} image={c.recruitImg}
          cta={{ text: _t("gateway.recruitCta"), href: "/#/recruit", color: t.colors.accentSecondary }} label={_t("gateway.recruitLabel")} />
      </section>
    );
  }

  // ─── clean-corporate: 不对称 60/40，柔和，无边框 ───
  if (templateId === "clean-corporate") {
    return (
      <section id="gateway" className="py-20 sm:py-28" style={{ backgroundColor: t.colors.bgSecondary }} ref={sectionRef}>
        <div className="section-padding max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            <motion.a href="/#products" className="lg:col-span-3 group block relative overflow-hidden" style={{ borderRadius: t.borderRadius }}
              initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
              <img src={c.clientImg} alt="" className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.7), transparent)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-mono tracking-wider uppercase mb-2" style={{ color: "#fff", opacity: 0.7 }}>{_t("gateway.clientLabel")}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{c.clientTitle}</h3>
                <span className="inline-flex items-center gap-2 text-sm text-white/80 mt-2 group-hover:gap-3 transition-all">
                  {_t("gateway.clientCta")}<ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
            <motion.a href="/#/recruit"
              className="lg:col-span-2 group block relative overflow-hidden" style={{ borderRadius: t.borderRadius }}
              initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
              <img src={c.recruitImg} alt="" className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.7), transparent)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-mono tracking-wider uppercase mb-2" style={{ color: "#fff", opacity: 0.7 }}>{_t("gateway.recruitLabel")}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{c.recruitTitle}</h3>
                <span className="inline-flex items-center gap-2 text-sm text-white/80 mt-2 group-hover:gap-3 transition-all">
                  {_t("gateway.recruitCta")}<ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    );
  }

  // ─── modern-tech: 上下堆叠，带编号和装饰线 ───
  if (templateId === "modern-tech") {
    return (
      <section id="gateway" className="py-24 sm:py-32" style={{ backgroundColor: t.colors.bg }} ref={sectionRef}>
        <div className="section-padding max-w-5xl mx-auto space-y-16">
          {/* Client */}
          <motion.a href="/#products" className="group block grid lg:grid-cols-12 gap-8 items-center"
            initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="lg:col-span-4">
              <div className="text-8xl font-bold font-mono leading-none" style={{ color: `${t.colors.primary}15` }}>01</div>
              <div className="w-12 h-1 mt-2 mb-4" style={{ backgroundColor: t.colors.primary }} />
              <p className="text-xs font-mono tracking-wider uppercase" style={{ color: t.colors.accent }}>{_t("gateway.clientLabel")}</p>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>{c.clientTitle}</h3>
              <p className="text-sm leading-relaxed" style={{ color: t.colors.textMuted }}>{c.clientDesc}</p>
              <span className="inline-flex items-center gap-2 text-sm pt-2" style={{ color: t.colors.primary }}>
                {_t("gateway.clientCta")}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <div className="lg:col-span-3">
              <div className="overflow-hidden" style={{ borderRadius: "1.5rem" }}>
                <img src={c.clientImg} alt="" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </motion.a>

          {/* Divider */}
          <div className="h-[1px]" style={{ backgroundColor: t.colors.border }} />

          {/* Recruit */}
          <motion.a href="/#/recruit"
            className="group block grid lg:grid-cols-12 gap-8 items-center"
            initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="lg:col-span-3 lg:order-1">
              <div className="overflow-hidden" style={{ borderRadius: "1.5rem" }}>
                <img src={c.recruitImg} alt="" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="lg:col-span-5 lg:order-2 space-y-3 lg:text-right">
              <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>{c.recruitTitle}</h3>
              <p className="text-sm leading-relaxed" style={{ color: t.colors.textMuted }}>{c.recruitDesc}</p>
              <span className="inline-flex items-center gap-2 text-sm pt-2" style={{ color: t.colors.accentSecondary }}>
                {_t("gateway.recruitCta")}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <div className="lg:col-span-4 lg:order-3 lg:text-right">
              <div className="text-8xl font-bold font-mono leading-none" style={{ color: `${t.colors.accentSecondary}15` }}>02</div>
              <div className="w-12 h-1 mt-2 mb-4 lg:ml-auto" style={{ backgroundColor: t.colors.accentSecondary }} />
              <p className="text-xs font-mono tracking-wider uppercase" style={{ color: t.colors.accentSecondary }}>{_t("gateway.recruitLabel")}</p>
            </div>
          </motion.a>
        </div>
      </section>
    );
  }

  // ─── minimal-white: 紧凑双列，图片+文字+细线边框 ───
  if (templateId === "minimal-white") {
    return (
      <section id="gateway" className="py-24 sm:py-32" style={{ backgroundColor: t.colors.bgSecondary }} ref={sectionRef}>
        <div className="section-padding max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-0" style={{ border: `1px solid ${t.colors.border}` }}>
            <motion.a href="/#products" className="group block transition-colors hover:bg-black/[0.02]"
              style={{ borderRight: `1px solid ${t.colors.border}` }}
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="h-48 overflow-hidden">
                <img src={c.clientImg} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-xs font-mono tracking-wider uppercase mb-4" style={{ color: t.colors.textMuted }}>01 — {_t("gateway.clientLabel")}</p>
                <h3 className="text-xl sm:text-2xl font-light leading-tight mb-3" style={{ color: t.colors.text }}>{c.clientTitle}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: t.colors.textMuted }}>{c.clientDesc}</p>
                <span className="text-sm font-mono tracking-wider" style={{ color: t.colors.text, borderBottom: `1px solid ${t.colors.text}` }}>
                  製品情報 →
                </span>
              </div>
            </motion.a>
            <motion.a href="/#/recruit"
              className="group block transition-colors hover:bg-black/[0.02]"
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="h-48 overflow-hidden">
                <img src={c.recruitImg} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-xs font-mono tracking-wider uppercase mb-4" style={{ color: t.colors.textMuted }}>02 — {_t("gateway.recruitLabel")}</p>
                <h3 className="text-xl sm:text-2xl font-light leading-tight mb-3" style={{ color: t.colors.text }}>{c.recruitTitle}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: t.colors.textMuted }}>{c.recruitDesc}</p>
                <span className="text-sm font-mono tracking-wider" style={{ color: t.colors.text, borderBottom: `1px solid ${t.colors.text}` }}>
                  採用情報 →
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    );
  }

  // ─── bold-dark: 全宽两列并排，金色边框，编号大字 ───
  return (
    <section id="gateway" className="py-0" style={{ backgroundColor: t.colors.bg }} ref={sectionRef}>
      <div className="grid lg:grid-cols-2">
        <motion.a href="/#products" className="group relative block p-10 sm:p-16 lg:p-20 overflow-hidden"
          style={{ borderRight: `1px solid ${t.colors.border}`, borderBottom: `1px solid ${t.colors.border}` }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
          <div className="absolute inset-0 opacity-50">
            <img src={c.clientImg} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          </div>
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
          <div className="relative z-10">
            <span className="text-7xl font-bold font-mono block mb-4" style={{ color: `${t.colors.primary}20` }}>01</span>
            <p className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: t.colors.primary }}>{_t("gateway.clientLabel")}</p>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4" style={{ color: t.colors.text }}>{c.clientTitle}</h3>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: t.colors.textSecondary }}>{c.clientDesc}</p>
            <span className="inline-flex items-center gap-2 px-6 py-2 text-sm font-bold transition-all"
              style={{ border: `2px solid ${t.colors.primary}`, color: t.colors.primary }}>
              製品情報<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </motion.a>
        <motion.a href="/#/recruit"
          className="group relative block p-10 sm:p-16 lg:p-20 overflow-hidden"
          style={{ borderBottom: `1px solid ${t.colors.border}` }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
          <div className="absolute inset-0 opacity-50">
            <img src={c.recruitImg} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          </div>
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
          <div className="relative z-10">
            <span className="text-7xl font-bold font-mono block mb-4" style={{ color: `${t.colors.accentSecondary}20` }}>02</span>
            <p className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: t.colors.accentSecondary }}>{_t("gateway.recruitLabel")}</p>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4" style={{ color: t.colors.text }}>{c.recruitTitle}</h3>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: t.colors.textSecondary }}>{c.recruitDesc}</p>
            <span className="inline-flex items-center gap-2 px-6 py-2 text-sm font-bold transition-all"
              style={{ border: `2px solid ${t.colors.accentSecondary}`, color: t.colors.accentSecondary }}>
              採用情報<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}

// ─── Shared Gateway Half ───

function GatewayHalf({ side, t, isInView, slogan, title, desc, image, cta, label }:
  { side: "left" | "right"; t: TemplateConfig; isInView: boolean; slogan: string; title: string; desc: string; image: string;
    cta: { text: string; href: string; color: string; external?: boolean }; label: string }) {
  const isLeft = side === "left";
  return (
    <motion.div className="relative flex-1 min-h-[50vh] lg:min-h-screen flex items-center justify-center overflow-hidden group"
      initial={{ clipPath: isLeft ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)" }}
      animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0" style={{ backgroundColor: `${t.colors.bg}aa` }} />
      </div>
      <div className="relative z-10 text-center px-6 sm:px-12 space-y-6 max-w-lg">
        <motion.span className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono block"
          style={{ color: t.colors.text, opacity: 0.08 }}
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 0.08, y: 0 } : {}} transition={{ delay: 0.4 }}>{slogan}</motion.span>
        <motion.h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>{title}</motion.h3>
        <motion.p className="text-sm sm:text-base" style={{ color: t.colors.textSecondary }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>{desc}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }}>
          <a href={cta.href} target={cta.external ? "_blank" : undefined} rel={cta.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-8 py-3 text-white transition-all duration-300"
            style={{ backgroundColor: cta.color, borderRadius: "0.125rem" }}>
            {cta.text}<ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
      <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "left-4" : "right-4"} hidden lg:block`}>
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase [writing-mode:vertical-lr]" style={{ color: t.colors.textMuted }}>{label}</span>
      </div>
    </motion.div>
  );
}
