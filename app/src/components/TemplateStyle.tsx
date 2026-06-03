import { useEffect } from "react";
import { useTemplate } from "@/contexts/TemplateContext";

export function TemplateStyle() {
  const { currentTemplate: t } = useTemplate();

  useEffect(() => {
    const root = document.documentElement;
    const c = t.colors;
    root.style.setProperty("--tpl-bg", c.bg);
    root.style.setProperty("--tpl-bg-secondary", c.bgSecondary);
    root.style.setProperty("--tpl-bg-card", c.bgCard);
    root.style.setProperty("--tpl-text", c.text);
    root.style.setProperty("--tpl-text-secondary", c.textSecondary);
    root.style.setProperty("--tpl-text-muted", c.textMuted);
    root.style.setProperty("--tpl-primary", c.primary);
    root.style.setProperty("--tpl-primary-hover", c.primaryHover);
    root.style.setProperty("--tpl-accent", c.accent);
    root.style.setProperty("--tpl-accent-secondary", c.accentSecondary);
    root.style.setProperty("--tpl-border", c.border);
    root.style.setProperty("--tpl-nav-bg", c.navBg);
    root.style.setProperty("--tpl-nav-text", c.navText);
    root.style.setProperty("--tpl-footer-bg", c.footerBg);
    root.style.setProperty("--tpl-radius", t.borderRadius);
    root.style.setProperty("--tpl-font-heading", t.fonts.heading);
    root.style.setProperty("--tpl-font-body", t.fonts.body);
    root.style.setProperty("--tpl-font-mono", t.fonts.mono);
    root.style.setProperty("--tpl-shadow-card", t.shadows.card);
    root.style.setProperty("--tpl-shadow-button", t.shadows.button);
    root.style.setProperty("--tpl-shadow-nav", t.shadows.nav);
    document.body.style.backgroundColor = c.bg;
    document.body.style.color = c.text;
    document.body.style.fontFamily = t.fonts.body;
  }, [t]);

  return null;
}
