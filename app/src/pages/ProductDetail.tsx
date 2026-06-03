import { useParams, Navigate, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useProducts, useSettings, useSiteContent } from "@/hooks/useSiteData";
import { TemplateProvider } from "@/contexts/TemplateContext";
import { TemplateStyle } from "@/components/TemplateStyle";
import Navigation from "@/sections/Navigation";
import Footer from "@/sections/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, Check } from "lucide-react";
import { useTemplate } from "@/contexts/TemplateContext";
import type { StyleVariant } from "@/config/templates";
import { useState } from "react";
import { formatDescToHtml } from "@/lib/format-desc";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: products } = useProducts();
  const { data: settings } = useSettings();
  const { data: content } = useSiteContent();
  const product = products.find((p) => p.slug === slug);
  const templateId = (settings?.template as StyleVariant) ?? "dark-industrial";

  if (!product) return <Navigate to="/" replace />;

  return (
    <TemplateProvider initialTemplate={templateId}>
      <TemplateStyle />
      <Navigation />
      <ProductDetailContent product={product} />
      <Footer content={content ?? {}} />
    </TemplateProvider>
  );
}

function ProductDetailContent({ product }: { product: import("@/hooks/useSiteData").Product }) {
  const { t: _t, i18n } = useTranslation();
  const { currentTemplate: t } = useTemplate();
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "features" | "downloads">("overview");
  const lang = i18n.language;

  // Language-aware product name
  const displayName = lang === "zh" ? (product.nameZh || product.nameJa)
    : lang === "en" ? (product.nameEn || product.nameJa)
    : lang === "ko" ? (product.nameKo || product.nameJa)
    : product.nameJa;
  const displayShortDesc = lang === "zh" ? (product.shortDescZh || product.shortDesc)
    : lang === "en" ? (product.shortDescEn || product.shortDesc)
    : lang === "ko" ? (product.shortDescKo || product.shortDesc)
    : product.shortDesc;

  // Get translated detail content from i18n
  const i18nFullDesc = _t(`productDetail.items.${product.slug}.fullDesc`, { defaultValue: "" });
  const i18nFeatures = _t(`productDetail.items.${product.slug}.features`, { returnObjects: true, defaultValue: [] }) as Array<{title: string; desc: string}>;
  const i18nScopeLabel = _t(`productDetail.items.${product.slug}.scopeLabel`, { defaultValue: _t("productDetail.scopeLabel") });
  const i18nScopeItems = _t(`productDetail.items.${product.slug}.scopeItems`, { defaultValue: "" });
  const specLabelMap = _t("specsLabels", { returnObjects: true, defaultValue: {} }) as Record<string, string>;

  // Use i18n content if available, fallback to product data
  const fullDesc = (typeof i18nFullDesc === "string" && i18nFullDesc.length > 10) ? i18nFullDesc : product.fullDesc;
  const features = (Array.isArray(i18nFeatures) && i18nFeatures.length > 0) ? i18nFeatures : product.features;

  const descParagraphs = fullDesc.split("\n\n").filter(Boolean);
  const overviewText = descParagraphs[0] ?? "";
  const featureBlocks = descParagraphs.slice(1);

  return (
    <main style={{ backgroundColor: t.colors.bg }}>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ backgroundColor: t.colors.bgSecondary, paddingTop: "6rem" }}>
        <div className="section-padding max-w-7xl mx-auto py-12 sm:py-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80"
            style={{ color: t.colors.primary }}>
            <ArrowLeft className="w-4 h-4" /> {_t("productDetail.back")}
          </Link>
          <motion.div className="grid lg:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="space-y-4">
              <p className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: t.colors.accent }}>{product.nameEn}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>
                {displayName}
              </h1>
              <p className="text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: t.colors.textMuted }}>{displayShortDesc}</p>
            </div>
            <motion.div className="relative flex items-center justify-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <div className="w-full max-w-md p-8 flex items-center justify-center" style={{ backgroundColor: t.colors.bg, borderRadius: t.borderRadius, border: `1px solid ${t.colors.border}` }}>
                <img src={product.detailImage} alt={displayName} className="max-h-64 w-auto object-contain" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-30" style={{ backgroundColor: t.colors.bg, borderBottom: `1px solid ${t.colors.border}` }}>
        <div className="section-padding max-w-7xl mx-auto flex gap-0 overflow-x-auto">
          {(["overview", "specs", "features", "downloads"] as const).map((tab) => {
            const labels = { overview: _t("productDetail.tabOverview"), specs: _t("productDetail.tabSpecs"), features: _t("productDetail.tabFeatures"), downloads: _t("productDetail.tabDownloads") };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-sm font-medium transition-all whitespace-nowrap relative"
                style={{ color: isActive ? t.colors.primary : t.colors.textMuted }}>
                {labels[tab]}
                {isActive && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: t.colors.primary }} layoutId="product-tab" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto py-12 sm:py-16">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div className="grid lg:grid-cols-3 gap-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: t.colors.text }}>{_t("productDetail.overviewTitle")}</h2>
              <p className="leading-relaxed" style={{ color: t.colors.textSecondary }}>{overviewText}</p>
              <div className="space-y-4">
                {featureBlocks.filter(b => b.startsWith("**") || b.includes("・")).map((block, i) => (
                  <div key={i} className="p-4" style={{ backgroundColor: t.colors.bgCard, borderRadius: t.borderRadius, border: `1px solid ${t.colors.border}` }}>
                    <div
                      className="text-sm leading-relaxed [&_strong]:font-semibold"
                      style={{ color: t.colors.textSecondary }}
                      dangerouslySetInnerHTML={{ __html: formatDescToHtml(block) }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold" style={{ color: t.colors.textMuted }}>{i18nScopeLabel}</h3>
              {i18nScopeItems.split("、").filter(Boolean).map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: t.colors.primary }} />
                  <span className="text-sm" style={{ color: t.colors.textSecondary }}>{item.trim()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Specs Tab */}
        {activeTab === "specs" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-8" style={{ color: t.colors.text }}>{_t("productDetail.specsTitle")}</h2>
            <div className="max-w-2xl">
              {product.specs.map((spec, index) => (
                <motion.div key={spec.label} className="flex items-center justify-between py-4"
                  style={{ borderBottom: `1px solid ${t.colors.border}` }}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <span className="text-sm" style={{ color: t.colors.textMuted }}>{(specLabelMap as Record<string, string>)[spec.label] || spec.label}</span>
                  <span className="text-sm font-mono font-medium" style={{ color: t.colors.text }}>{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-8" style={{ color: t.colors.text }}>{_t("productDetail.featuresTitle")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature: {title: string; desc: string}, index: number) => (
                <motion.div key={feature.title} className="p-6 space-y-3"
                  style={{ backgroundColor: t.colors.bgCard, borderRadius: t.borderRadius, border: `1px solid ${t.colors.border}` }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.colors.primary}15` }}>
                    <Check className="w-5 h-5" style={{ color: t.colors.primary }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: t.colors.text }}>{feature.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: t.colors.textMuted }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Downloads Tab */}
        {activeTab === "downloads" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-8" style={{ color: t.colors.text }}>{_t("productDetail.downloadsTitle")}</h2>
            {product.downloads.length > 0 ? (
              <div className="grid gap-4 max-w-2xl">
                {product.downloads.map((file) => (
                  <a key={file.name} href={file.url} download className="flex items-center gap-4 p-4 transition-all hover:opacity-80"
                    style={{ backgroundColor: t.colors.bgCard, borderRadius: t.borderRadius, border: `1px solid ${t.colors.border}` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.colors.primary}15` }}>
                      <FileText className="w-5 h-5" style={{ color: t.colors.primary }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: t.colors.text }}>{file.name}</p>
                      <p className="text-xs" style={{ color: t.colors.textMuted }}>{file.size}</p>
                    </div>
                    <Download className="w-4 h-4" style={{ color: t.colors.primary }} />
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-16" style={{ color: t.colors.textMuted }}>
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>{_t("productDetail.noDownloads")}</p>
                <p className="text-sm mt-2">{_t("productDetail.noDownloadsDesc")}</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
