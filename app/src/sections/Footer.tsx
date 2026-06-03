import { MapPin, Phone, Mail, Printer } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTemplate } from "@/contexts/TemplateContext";

export default function Footer({ content }: { content: Record<string, string> }) {
  const { t } = useTranslation();
  const { currentTemplate: tplt, templateId } = useTemplate();
  const companyName = content.footer_company_name ?? t("footer.companyName", "和泉金属工業株式会社");
  const companyNameEn = content.footer_company_name_en ?? t("footer.companyNameEn", "IZUMI KINZOKU KOGYO CO.,LTD.");
  const address = content.contact_address ?? "";
  const phone = content.contact_phone ?? "";
  const fax = content.contact_fax ?? "";
  const email = content.contact_email ?? "";

  const footerSections = [
    {
      key: "company" as const,
      title: t("footer.company"),
      items: t("footer.companyItems", { returnObjects: true }) as string[],
    },
    {
      key: "products" as const,
      title: t("footer.products"),
      items: t("footer.productItems", { returnObjects: true }) as string[],
    },
    {
      key: "careers" as const,
      title: t("footer.careers"),
      items: t("footer.careerItems", { returnObjects: true }) as string[],
    },
  ];

  if (templateId === "minimal-white") {
    return (
      <footer className="py-12 sm:py-16" style={{ backgroundColor: tplt.colors.bg, borderTop: `1px solid ${tplt.colors.border}` }}>
        <div className="section-padding max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="IZK" className="h-8 w-auto rounded-sm" />
              <div>
                <span className="text-sm font-medium tracking-wider block" style={{ color: tplt.colors.text }}>{companyName}</span>
                <span className="text-[10px] font-mono tracking-wider" style={{ color: tplt.colors.textMuted }}>{companyNameEn}</span>
              </div>
            </div>
            <div className="space-y-1 text-xs" style={{ color: tplt.colors.textMuted }}>
              {address && <div>{address}</div>}
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {phone && <span>TEL: {phone}</span>}
                {fax && <span>FAX: {fax}</span>}
              </div>
              {email && <div>{email}</div>}
            </div>
          </div>
          <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderTop: `1px solid ${tplt.colors.border}` }}>
            <p className="text-xs" style={{ color: tplt.colors.textMuted }}>{t("footer.copyright")}</p>
            <a href="#" className="text-xs transition-colors hover:opacity-80" style={{ color: tplt.colors.textMuted }}>{t("footer.privacy")}</a>
          </div>
        </div>
      </footer>
    );
  }

  if (templateId === "bold-dark") {
    return (
      <footer style={{ backgroundColor: tplt.colors.footerBg, borderTop: `2px solid ${tplt.colors.primary}30` }}>
        <div className="section-padding max-w-7xl mx-auto py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src="/images/logo.png" alt="IZK" className="h-8 w-auto rounded-sm" />
              <div>
                <span className="text-sm font-bold tracking-wider block" style={{ color: tplt.colors.text }}>{companyName}</span>
                <span className="text-[10px] font-mono tracking-wider" style={{ color: tplt.colors.textMuted }}>{companyNameEn}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs" style={{ color: tplt.colors.textSecondary }}>
              {address && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: tplt.colors.primary }} /><span>{address}</span></div>}
              {phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" style={{ color: tplt.colors.primary }} /><span>{phone}</span></div>}
              {fax && <div className="flex items-center gap-1.5"><Printer className="w-3.5 h-3.5" style={{ color: tplt.colors.primary }} /><span>{fax}</span></div>}
              {email && <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" style={{ color: tplt.colors.primary }} /><span>{email}</span></div>}
            </div>
            <p className="text-[10px] font-mono" style={{ color: tplt.colors.textMuted }}>© 2026 IZK</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-white/10" style={{ backgroundColor: tplt.colors.footerBg }}>
      <div className="section-padding max-w-7xl mx-auto py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="IZK" className="h-10 w-auto rounded-sm" />
              <div>
                <span className="text-lg font-bold tracking-wider block" style={{ color: tplt.colors.text }}>{companyName}</span>
                <p className="text-[10px] font-mono tracking-wider" style={{ color: tplt.colors.textMuted }}>{companyNameEn}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: tplt.colors.textMuted }}>{t("footer.companySlogan")}</p>
            <div className="space-y-2 text-sm" style={{ color: tplt.colors.textMuted }}>
              {address && <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tplt.colors.primary }} /><span>{address}</span></div>}
              {phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" style={{ color: tplt.colors.primary }} /><span>{phone}</span></div>}
              {fax && <div className="flex items-center gap-2"><Printer className="w-4 h-4 shrink-0" style={{ color: tplt.colors.primary }} /><span>{fax}</span></div>}
              {email && <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" style={{ color: tplt.colors.primary }} /><span>{email}</span></div>}
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.key}>
              <h4 className="text-sm font-semibold mb-4 tracking-wide" style={{ color: tplt.colors.text }}>{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((label: string) => (
                  <li key={label}>
                    <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: tplt.colors.textMuted }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section-padding max-w-7xl mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: tplt.colors.textMuted }}>{t("footer.copyright")}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs transition-colors hover:opacity-80" style={{ color: tplt.colors.textMuted }}>{t("footer.privacy")}</a>
            <a href="#" className="text-xs transition-colors hover:opacity-80" style={{ color: tplt.colors.textMuted }}>{t("footer.sitemap")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
