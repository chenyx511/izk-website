import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Check, Users, Building2 } from "lucide-react";
import Navigation from "@/sections/Navigation";
import Footer from "@/sections/Footer";
import { TemplateProvider } from "@/contexts/TemplateContext";
import { TemplateStyle } from "@/components/TemplateStyle";
import { useSettings, useSiteContent } from "@/hooks/useSiteData";
import type { StyleVariant } from "@/config/templates";
import { assetUrl } from "@/lib/asset";

export default function RecruitPage() {
  const { data: settings } = useSettings();
  const { data: content } = useSiteContent();
  const templateId = (settings?.template as StyleVariant) ?? "dark-industrial";

  return (
    <TemplateProvider initialTemplate={templateId}>
      <TemplateStyle />
      <Navigation />
      <RecruitContent />
      <Footer content={content ?? {}} />
    </TemplateProvider>
  );
}

function RecruitContent() {
  const { t: _t } = useTranslation();

  // Get department list from translations
  const departments = _t("recruit.departmentList", { returnObjects: true, defaultValue: [] }) as Array<{ name: string; desc: string }>;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--tpl-bg, #0A0A0F)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "6rem", backgroundColor: "var(--tpl-bg-secondary, #111118)" }}>
        <div className="section-padding max-w-7xl mx-auto py-16 sm:py-20">
          <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-80"
            style={{ color: "var(--tpl-primary, #C8A97E)" }}>
            <ArrowLeft className="w-4 h-4" /> {_t("productDetail.back")}
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: "var(--tpl-accent, #06B6D4)" }}>
              {_t("recruit.heroSubtitle")}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: "var(--tpl-text, #F0EDE5)" }}>
              {_t("recruit.heroTitle")}
            </h1>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle at 70% 50%, var(--tpl-primary, #C8A97E), transparent)" }} />
      </section>

      <div className="section-padding max-w-7xl mx-auto py-16 sm:py-20 space-y-20">
        {/* Application Process */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--tpl-primary, #C8A97E)15", color: "var(--tpl-primary, #C8A97E)" }}>
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--tpl-text, #F0EDE5)" }}>{_t("recruit.applyTitle")}</h2>
          </div>
          <div className="p-6 sm:p-8 rounded-xl space-y-6" style={{ backgroundColor: "var(--tpl-bg-card, #16161F)", border: "1px solid var(--tpl-border, #2A2A35)" }}>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--tpl-text-secondary, #9A9590)" }}>{_t("recruit.applyDesc")}</p>
            <ol className="space-y-4">
              {(_t("recruit.applySteps", { returnObjects: true, defaultValue: [] }) as string[]).map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: "var(--tpl-primary, #C8A97E)", color: "#000" }}>{i + 1}</span>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--tpl-text-muted, #6B6560)" }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* Open Positions */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--tpl-primary, #C8A97E)15", color: "var(--tpl-primary, #C8A97E)" }}>
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--tpl-text, #F0EDE5)" }}>{_t("recruit.positionsTitle")}</h2>
              <p className="text-sm mt-1" style={{ color: "var(--tpl-text-muted, #6B6560)" }}>{_t("recruit.positionsDesc")}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, i) => (
              <motion.div key={dept.name} className="p-6 rounded-xl space-y-3" style={{ backgroundColor: "var(--tpl-bg-card, #16161F)", border: "1px solid var(--tpl-border, #2A2A35)" }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" style={{ color: "var(--tpl-primary, #C8A97E)" }} />
                  <h3 className="text-lg font-bold" style={{ color: "var(--tpl-text, #F0EDE5)" }}>{dept.name}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--tpl-text-muted, #6B6560)" }}>{dept.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Two Column: Mailing Address + Contact */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mailing Address */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--tpl-primary, #C8A97E)15", color: "var(--tpl-primary, #C8A97E)" }}>
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "var(--tpl-text, #F0EDE5)" }}>{_t("recruit.mailingTitle")}</h2>
            </div>
            <div className="p-6 rounded-xl space-y-4" style={{ backgroundColor: "var(--tpl-bg-card, #16161F)", border: "1px solid var(--tpl-border, #2A2A35)" }}>
              <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans" style={{ color: "var(--tpl-text-secondary, #9A9590)" }}>
                {_t("recruit.mailingAddress")}
              </pre>
              <p className="text-xs" style={{ color: "var(--tpl-primary, #C8A97E)" }}>{_t("recruit.mailingNote")}</p>
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--tpl-primary, #C8A97E)15", color: "var(--tpl-primary, #C8A97E)" }}>
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "var(--tpl-text, #F0EDE5)" }}>{_t("recruit.contactTitle")}</h2>
            </div>
            <div className="p-6 rounded-xl space-y-4" style={{ backgroundColor: "var(--tpl-bg-card, #16161F)", border: "1px solid var(--tpl-border, #2A2A35)" }}>
              <div className="space-y-2 text-sm" style={{ color: "var(--tpl-text-secondary, #9A9590)" }}>
                <p className="font-medium" style={{ color: "var(--tpl-text, #F0EDE5)" }}>{_t("recruit.contactDept")}</p>
                <p>{_t("recruit.contactPerson")}</p>
              </div>
              <div className="space-y-2 pt-2" style={{ borderTop: "1px solid var(--tpl-border, #2A2A35)" }}>
                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--tpl-text-muted, #6B6560)" }}>
                  <Phone className="w-4 h-4 shrink-0" style={{ color: "var(--tpl-primary, #C8A97E)" }} />
                  <span>{_t("recruit.contactTel")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--tpl-text-muted, #6B6560)" }}>
                  <Mail className="w-4 h-4 shrink-0" style={{ color: "var(--tpl-primary, #C8A97E)" }} />
                  <a href="mailto:koji.takeda@izk-osaka.com" className="transition-colors hover:opacity-80" style={{ color: "var(--tpl-primary, #C8A97E)" }}>
                    {_t("recruit.contactEmail")}
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Work Environment */}
        <motion.section className="text-center py-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--tpl-text, #F0EDE5)" }}>{_t("recruit.workEnvTitle")}</h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--tpl-text-muted, #6B6560)" }}>{_t("recruit.workEnvDesc")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["/images/gateway-client.jpg", "/images/about-factory.jpg"].map((img, i) => (
              <div key={i} className="w-40 h-28 sm:w-52 sm:h-36 rounded-lg overflow-hidden" style={{ border: "1px solid var(--tpl-border, #2A2A35)" }}>
                <img src={assetUrl(img)} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
