import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTemplate } from "@/contexts/TemplateContext";
import { assetUrl } from "@/lib/asset";

interface Product {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  nameZh?: string;
  nameKo?: string;
  shortDesc: string;
  shortDescZh?: string;
  shortDescEn?: string;
  shortDescKo?: string;
  image: string;
}

function getPName(product: Product, lang: string): string {
  if (lang === "zh" && product.nameZh) return product.nameZh;
  if (lang === "en" && product.nameEn) return product.nameEn;
  if (lang === "ko" && product.nameKo) return product.nameKo;
  return product.nameJa;
}
function getPDesc(product: Product, lang: string): string {
  if (lang === "zh" && product.shortDescZh) return product.shortDescZh;
  if (lang === "en" && product.shortDescEn) return product.shortDescEn;
  if (lang === "ko" && product.shortDescKo) return product.shortDescKo;
  return product.shortDesc;
}

export default function ProductsSection({ products }: { products: Product[] }) {
  const { t: _t, i18n } = useTranslation();
  const { currentTemplate: t, templateId } = useTemplate();
  const lang = i18n.language;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const title = _t("products.title");
  const subtitle = _t("products.subtitle");

  // ─── dark-industrial: 3列卡片 ───
  if (templateId === "dark-industrial") {
    return (
      <section id="products" className="py-24 sm:py-32" style={{ backgroundColor: t.colors.bgSecondary }} ref={sectionRef}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ background: `radial-gradient(ellipse at top center, ${t.colors.primary}08, transparent 70%)` }} />
        <div className="section-padding max-w-7xl mx-auto relative">
          <SectionHeader t={t} title={title} subtitle={subtitle} isInView={isInView} centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCardA key={product.id} product={product} index={index} t={t} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── clean-corporate: 2列大卡片，图左文右 ───
  if (templateId === "clean-corporate") {
    return (
      <section id="products" className="py-20 sm:py-28" style={{ backgroundColor: t.colors.bg }} ref={sectionRef}>
        <div className="section-padding max-w-6xl mx-auto">
          <SectionHeader t={t} title={title} subtitle={subtitle} isInView={isInView} centered />
          <div className="grid sm:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.a key={product.id} href={`/#/product/${product.slug}`} className="group block"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className="relative overflow-hidden" style={{ backgroundColor: t.colors.bgCard, borderRadius: t.borderRadius, boxShadow: t.shadows.card }}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={assetUrl(product.image)} alt={getPName(product, lang)} className="w-full h-full object-contain p-4 bg-gray-50 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-bold group-hover:opacity-80 transition-opacity" style={{ color: t.colors.text }}>{getPName(product, lang)}</h3>
                    <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: t.colors.primary }}>{product.nameEn}</p>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: t.colors.textMuted }}>{getPDesc(product, lang)}</p>
                    <span className="inline-flex items-center gap-1 text-sm pt-1 transition-colors" style={{ color: t.colors.primary }}>
                      {_t("products.detail")}<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── modern-tech: 单列大图横向排列，左右交替 ───
  if (templateId === "modern-tech") {
    return (
      <section id="products" className="py-24 sm:py-32" style={{ backgroundColor: t.colors.bgSecondary }} ref={sectionRef}>
        <div className="section-padding max-w-6xl mx-auto">
          <SectionHeader t={t} title={title} subtitle={subtitle} isInView={isInView} centered />
          <div className="space-y-16">
            {products.map((product, index) => (
              <motion.a key={product.id} href={`/#/product/${product.slug}`}
                className={`group grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className={`overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`} style={{ borderRadius: "1.5rem" }}>
                  <img src={assetUrl(product.image)} alt={getPName(product, lang)} className="w-full h-64 sm:h-80 object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundColor: t.colors.bgCard }} />
                </div>
                <div className={`space-y-4 ${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                  <span className="text-6xl font-bold font-mono opacity-10" style={{ color: t.colors.primary }}>0{index + 1}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>{getPName(product, lang)}</h3>
                  <p className="text-xs font-mono tracking-wider uppercase" style={{ color: t.colors.accent }}>{product.nameEn}</p>
                  <p className="text-sm sm:text-base leading-relaxed max-w-md" style={{ color: t.colors.textMuted }}>{getPDesc(product, lang)}</p>
                  <span className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: t.colors.primary }}>
                    {_t("products.detail")}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── minimal-white: 列表式，细线分隔，无卡片 ───
  if (templateId === "minimal-white") {
    return (
      <section id="products" className="py-32 sm:py-40" style={{ backgroundColor: t.colors.bgSecondary }} ref={sectionRef}>
        <div className="section-padding max-w-4xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px]" style={{ backgroundColor: t.colors.text }} />
              <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: t.colors.textMuted }}>Products</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>{title}</h2>
          </motion.div>
          <div>
            {products.map((product, index) => (
              <motion.a key={product.id} href={`/#/product/${product.slug}`} className="group block py-8"
                style={{ borderBottom: `1px solid ${t.colors.border}` }}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-xs font-mono" style={{ color: t.colors.textMuted }}>0{index + 1}</span>
                  <h3 className="text-xl sm:text-2xl font-light group-hover:opacity-70 transition-opacity" style={{ color: t.colors.text }}>{getPName(product, lang)}</h3>
                  <span className="text-[10px] font-mono tracking-wider uppercase ml-auto" style={{ color: t.colors.textMuted }}>{product.nameEn}</span>
                </div>
                <p className="text-sm leading-relaxed pl-8" style={{ color: t.colors.textMuted }}>{getPDesc(product, lang)}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── bold-dark: 紧凑网格，编号+名称+小图 ───
  return (
    <section id="products" className="py-24 sm:py-32" style={{ backgroundColor: t.colors.bg }} ref={sectionRef}>
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader t={t} title={title} subtitle={subtitle} isInView={isInView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <motion.a key={product.id} href={`/#/product/${product.slug}`} className="group block"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <div className="p-4 h-full transition-all duration-300 group-hover:-translate-y-1"
                style={{ backgroundColor: t.colors.bgCard, border: `1px solid ${t.colors.border}` }}>
                <div className="text-4xl font-bold font-mono mb-3" style={{ color: `${t.colors.primary}40` }}>0{index + 1}</div>
                <h3 className="text-base font-bold mb-1" style={{ color: t.colors.text }}>{getPName(product, lang)}</h3>
                <p className="text-[9px] font-mono tracking-wider uppercase mb-3" style={{ color: t.colors.primary }}>{product.nameEn}</p>
                <div className="w-full h-24 mb-3 overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
                  <img src={assetUrl(product.image)} alt="" className="w-full h-full object-contain p-2 opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs leading-relaxed line-clamp-3" style={{ color: t.colors.textMuted }}>{getPDesc(product, lang)}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Shared sub-components ───

function SectionHeader({ t, title, subtitle, isInView, centered }: { t: { colors: Record<string, string>; borderRadius?: string }; title: string; subtitle: string; isInView: boolean; centered?: boolean }) {
  const { t: tr } = useTranslation();
  return (
    <motion.div className={`mb-16 sm:mb-20 space-y-4 ${centered ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <div className="w-8 h-[1px]" style={{ backgroundColor: t.colors.accent ?? "#06B6D4" }} />
        <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: t.colors.accent ?? "#06B6D4" }}>{tr("products.label")}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: t.colors.text }}>{title}</h2>
      <p className="max-w-2xl mx-auto" style={{ color: t.colors.textMuted }}>{subtitle}</p>
    </motion.div>
  );
}

function ProductCardA({ product, index, t }: { product: Product; index: number; t: { colors: Record<string, string>; borderRadius: string; shadows: Record<string, string> } }) {
  const { t: tr, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <motion.a href={`/#/product/${product.slug}`} className="group block"
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}>
      <div className="relative overflow-hidden transition-all duration-500 hover:shadow-xl"
        style={{ backgroundColor: t.colors.bgCard, border: `1px solid ${t.colors.border}`, borderRadius: t.borderRadius, boxShadow: t.shadows.card }}>
        <div className="relative h-52 sm:h-60 overflow-hidden" style={{ backgroundColor: t.colors.bgSecondary }}>
          <img src={assetUrl(product.image)} alt={getPName(product, lang)} className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${t.colors.bgCard}, transparent)` }} />
        </div>
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="text-lg sm:text-xl font-bold group-hover:opacity-80 transition-opacity" style={{ color: t.colors.text }}>{getPName(product, lang)}</h3>
          <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: t.colors.accent }}>{product.nameEn}</p>
          <p className="text-sm leading-relaxed" style={{ color: t.colors.textMuted }}>{getPDesc(product, lang)}</p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: t.colors.primary }}>
              {tr("products.detail")}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
