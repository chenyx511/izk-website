import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { templates, defaultTemplate, type StyleVariant, type TemplateConfig } from "@/config/templates";

interface TemplateContextType {
  currentTemplate: TemplateConfig;
  templateId: StyleVariant;
  setTemplate: (id: StyleVariant) => void;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export function TemplateProvider({ children, initialTemplate }: { children: ReactNode; initialTemplate?: StyleVariant }) {
  const [templateId, setTemplateId] = useState<StyleVariant>(initialTemplate ?? defaultTemplate);

  const setTemplate = useCallback((id: StyleVariant) => {
    setTemplateId(id);
  }, []);

  const currentTemplate = templates[templateId] ?? templates[defaultTemplate];

  return (
    <TemplateContext.Provider value={{ currentTemplate, templateId, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

/** 无 Provider 时回退默认模板（登录页等独立路由） */
export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (ctx) return ctx;
  const templateId = defaultTemplate;
  return {
    currentTemplate: templates[templateId],
    templateId,
    setTemplate: () => {},
  };
}
