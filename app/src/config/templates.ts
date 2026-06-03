export type StyleVariant = "dark-industrial" | "clean-corporate" | "modern-tech" | "minimal-white" | "bold-dark";

export interface TemplateConfig {
  id: StyleVariant;
  name: string;
  nameEn: string;
  description: string;
  colors: {
    bg: string;
    bgSecondary: string;
    bgCard: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    primary: string;
    primaryHover: string;
    accent: string;
    accentSecondary: string;
    border: string;
    navBg: string;
    navText: string;
    footerBg: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  borderRadius: string;
  shadows: {
    card: string;
    button: string;
    nav: string;
  };
}

export const templates: Record<StyleVariant, TemplateConfig> = {
  "dark-industrial": {
    id: "dark-industrial",
    name: "深色工业",
    nameEn: "Dark Industrial",
    description: "深色主题配钢蓝色强调，精密工业美学",
    colors: {
      bg: "#0A0A0F",
      bgSecondary: "#141419",
      bgCard: "#1a1a24",
      text: "#F8F9FA",
      textSecondary: "#C0C0C8",
      textMuted: "#6B7280",
      primary: "#3B82F6",
      primaryHover: "#2563EB",
      accent: "#06B6D4",
      accentSecondary: "#F59E0B",
      border: "rgba(255,255,255,0.08)",
      navBg: "rgba(10,10,15,0.85)",
      navText: "#F8F9FA",
      footerBg: "#141419",
    },
    fonts: { heading: "'Inter', 'Noto Sans JP', sans-serif", body: "'Inter', 'Noto Sans JP', sans-serif", mono: "'JetBrains Mono', monospace" },
    borderRadius: "0.5rem",
    shadows: { card: "0 4px 24px rgba(0,0,0,0.3)", button: "0 0 20px rgba(59,130,246,0.2)", nav: "0 2px 20px rgba(0,0,0,0.2)" },
  },
  "clean-corporate": {
    id: "clean-corporate",
    name: "简约企业",
    nameEn: "Clean Corporate",
    description: "明亮白色底，卡片式布局，现代企业展示风格",
    colors: {
      bg: "#FFFFFF",
      bgSecondary: "#F8FAFC",
      bgCard: "#FFFFFF",
      text: "#0F172A",
      textSecondary: "#334155",
      textMuted: "#64748B",
      primary: "#0F766E",
      primaryHover: "#0D5C56",
      accent: "#14B8A6",
      accentSecondary: "#F59E0B",
      border: "rgba(15,23,42,0.08)",
      navBg: "rgba(255,255,255,0.95)",
      navText: "#0F172A",
      footerBg: "#0F172A",
    },
    fonts: { heading: "'Inter', 'Noto Sans JP', sans-serif", body: "'Inter', 'Noto Sans JP', sans-serif", mono: "'JetBrains Mono', monospace" },
    borderRadius: "0.75rem",
    shadows: { card: "0 4px 16px rgba(0,0,0,0.06)", button: "0 4px 12px rgba(15,118,110,0.25)", nav: "0 1px 8px rgba(0,0,0,0.06)" },
  },
  "modern-tech": {
    id: "modern-tech",
    name: "现代科技",
    nameEn: "Modern Tech",
    description: "深蓝渐变主题，大圆角，科技感十足",
    colors: {
      bg: "#0C1222",
      bgSecondary: "#111827",
      bgCard: "#1E293B",
      text: "#F1F5F9",
      textSecondary: "#CBD5E1",
      textMuted: "#64748B",
      primary: "#6366F1",
      primaryHover: "#4F46E5",
      accent: "#22D3EE",
      accentSecondary: "#F472B6",
      border: "rgba(99,102,241,0.15)",
      navBg: "rgba(12,18,34,0.88)",
      navText: "#F1F5F9",
      footerBg: "#0B1120",
    },
    fonts: { heading: "'Space Grotesk', 'Inter', 'Noto Sans JP', sans-serif", body: "'Inter', 'Noto Sans JP', sans-serif", mono: "'JetBrains Mono', monospace" },
    borderRadius: "1rem",
    shadows: { card: "0 8px 32px rgba(99,102,241,0.1)", button: "0 4px 16px rgba(99,102,241,0.35)", nav: "0 4px 20px rgba(0,0,0,0.15)" },
  },
  "minimal-white": {
    id: "minimal-white",
    name: "极简白调",
    nameEn: "Minimal White",
    description: "纯白极简，大量留白，优雅克制",
    colors: {
      bg: "#FAFAFA",
      bgSecondary: "#F5F5F5",
      bgCard: "#FFFFFF",
      text: "#171717",
      textSecondary: "#404040",
      textMuted: "#737373",
      primary: "#171717",
      primaryHover: "#000000",
      accent: "#DC2626",
      accentSecondary: "#171717",
      border: "rgba(0,0,0,0.06)",
      navBg: "rgba(250,250,250,0.95)",
      navText: "#171717",
      footerBg: "#171717",
    },
    fonts: { heading: "'Inter', 'Noto Sans JP', sans-serif", body: "'Inter', 'Noto Sans JP', sans-serif", mono: "'JetBrains Mono', monospace" },
    borderRadius: "0.25rem",
    shadows: { card: "none", button: "none", nav: "0 1px 4px rgba(0,0,0,0.04)" },
  },
  "bold-dark": {
    id: "bold-dark",
    name: "Bold暗色",
    nameEn: "Bold Dark",
    description: "高对比度暗色，金色强调，大胆有力",
    colors: {
      bg: "#000000",
      bgSecondary: "#0A0A0A",
      bgCard: "#111111",
      text: "#FFFFFF",
      textSecondary: "#A1A1AA",
      textMuted: "#52525B",
      primary: "#EAB308",
      primaryHover: "#CA8A04",
      accent: "#EF4444",
      accentSecondary: "#3B82F6",
      border: "rgba(255,255,255,0.1)",
      navBg: "rgba(0,0,0,0.9)",
      navText: "#FFFFFF",
      footerBg: "#000000",
    },
    fonts: { heading: "'Space Grotesk', 'Inter', 'Noto Sans JP', sans-serif", body: "'Inter', 'Noto Sans JP', sans-serif", mono: "'JetBrains Mono', monospace" },
    borderRadius: "0",
    shadows: { card: "0 0 0 1px rgba(255,255,255,0.05)", button: "0 0 15px rgba(234,179,8,0.3)", nav: "0 2px 10px rgba(0,0,0,0.3)" },
  },
};

export const defaultTemplate: StyleVariant = "dark-industrial";
