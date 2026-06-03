import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Printer, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTemplate } from "@/contexts/TemplateContext";

export default function ContactBand({ content }: { content: Record<string, string> }) {
  const { t: _t } = useTranslation();
  const { currentTemplate: t, templateId } = useTemplate();
  const title = _t("contact.title");
  const desc = _t("contact.description");
  // Hard info from CMS (non-language)
  const address = content.contact_address ?? "";
  const phone = content.contact_phone ?? "";
  const fax = content.contact_fax ?? "";
  const email = content.contact_email ?? "";

  // ─── clean-corporate: 白色背景，左文右CTA ───
  if (templateId === "clean-corporate") {
    return (
      <section id="contact" className="py-16 sm:py-20" style={{ backgroundColor: t.colors.bgSecondary }}>
        <div className="section-padding max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-4" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: t.colors.text }}>{title}</h2>
              <p className="leading-relaxed" style={{ color: t.colors.textMuted }}>{desc}</p>
              <div className="space-y-2 pt-2" style={{ color: t.colors.textMuted }}>
                {address && <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" style={{ color: t.colors.primary }} /><span>{address}</span></div>}
                {phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4" style={{ color: t.colors.primary }} /><span>{phone}</span></div>}
                {fax && <div className="flex items-center gap-2 text-sm"><Printer className="w-4 h-4" style={{ color: t.colors.primary }} /><span>{fax}</span></div>}
                {email && <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" style={{ color: t.colors.primary }} /><span>{email}</span></div>}
              </div>
            </motion.div>
            <motion.div className="flex justify-start lg:justify-end" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-3 px-10 py-4 text-white font-medium transition-all group"
                style={{ backgroundColor: t.colors.primary, borderRadius: t.borderRadius }}>
                <Mail className="w-5 h-5" />CONTACT US<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ─── modern-tech: 渐变背景，居中卡片式 ───
  if (templateId === "modern-tech") {
    return (
      <section id="contact" className="py-24 sm:py-28" style={{ backgroundColor: t.colors.bgSecondary }}>
        <div className="section-padding max-w-3xl mx-auto">
          <motion.div className="p-8 sm:p-12 text-center space-y-8"
            style={{ backgroundColor: t.colors.bgCard, borderRadius: "2rem", border: `1px solid ${t.colors.border}` }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: t.colors.text }}>{title}</h2>
            <p style={{ color: t.colors.textMuted }}>{desc}</p>
            <div className="flex flex-wrap justify-center gap-6" style={{ color: t.colors.textSecondary }}>
              {address && <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" style={{ color: t.colors.accent }} /><span>{address}</span></div>}
              {phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4" style={{ color: t.colors.accent }} /><span>{phone}</span></div>}
              {email && <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" style={{ color: t.colors.accent }} /><span>{email}</span></div>}
            </div>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-8 py-3 text-white font-medium transition-all"
              style={{ background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.accent})`, borderRadius: "0.75rem" }}>
              <Mail className="w-5 h-5" />CONTACT US
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── minimal-white: 极简，细线分隔 ───
  if (templateId === "minimal-white") {
    return (
      <section id="contact" className="py-20 sm:py-24" style={{ backgroundColor: t.colors.bg, borderTop: `1px solid ${t.colors.border}` }}>
        <div className="section-padding max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-12">
            <motion.div className="sm:col-span-2 space-y-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-light" style={{ color: t.colors.text }}>{title}</h2>
              <p className="leading-relaxed" style={{ color: t.colors.textMuted }}>{desc}</p>
            </motion.div>
            <motion.div className="space-y-3" style={{ color: t.colors.textMuted }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {address && <div className="text-sm">{address}</div>}
              {phone && <div className="text-sm font-mono">TEL: {phone}</div>}
              {fax && <div className="text-sm font-mono">FAX: {fax}</div>}
              {email && <a href={`mailto:${email}`} className="text-sm font-mono transition-colors hover:opacity-70 block" style={{ color: t.colors.text, borderBottom: `1px solid ${t.colors.border}` }}>{email}</a>}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ─── bold-dark: 高对比度，金色强调 ───
  if (templateId === "bold-dark") {
    return (
      <section id="contact" className="py-16 sm:py-20" style={{ borderTop: `2px solid ${t.colors.primary}40`, borderBottom: `2px solid ${t.colors.primary}40` }}>
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <motion.div className="lg:col-span-5" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter" style={{ color: t.colors.primary }}>{title}</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: t.colors.textSecondary }}>{desc}</p>
            </motion.div>
            <motion.div className="lg:col-span-4 space-y-3 text-sm" style={{ color: t.colors.textSecondary }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {address && <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: t.colors.primary }} /><span>{address}</span></div>}
              {phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" style={{ color: t.colors.primary }} /><span>{phone}</span></div>}
              {fax && <div className="flex items-center gap-2"><Printer className="w-4 h-4 shrink-0" style={{ color: t.colors.primary }} /><span>{fax}</span></div>}
              {email && <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" style={{ color: t.colors.primary }} /><span>{email}</span></div>}
            </motion.div>
            <motion.div className="lg:col-span-3 flex lg:justify-end" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold transition-all hover:brightness-110"
                style={{ border: `2px solid ${t.colors.primary}`, color: t.colors.primary }}>
                <Mail className="w-4 h-4" />CONTACT
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ─── dark-industrial (default): 渐变背景居中 ───
  return (
    <section id="contact" className="relative py-20 sm:py-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.accent})` }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="section-padding max-w-5xl mx-auto relative text-center space-y-8">
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/70">{_t("contact.label")}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{title}</h2>
          <p className="text-white/80 max-w-2xl mx-auto">{desc}</p>
        </motion.div>
        <motion.div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/80" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {address && <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" /><span>{address}</span></div>}
          {phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4" /><span>{phone}</span></div>}
          {fax && <div className="flex items-center gap-2 text-sm"><Printer className="w-4 h-4" /><span>{fax}</span></div>}
          {email && <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" /><span>{email}</span></div>}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white font-medium transition-all group"
            style={{ color: t.colors.primary, borderRadius: "0.125rem" }}>
            <Mail className="w-5 h-5" />CONTACT US<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
