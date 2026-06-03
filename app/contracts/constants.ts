export const Session = {
  cookieName: "izk_sid",
  maxAgeSec: 7 * 24 * 60 * 60,
} as const;

export const ErrorMessages = {
  unauthenticated: "Authentication required",
  insufficientRole: "Insufficient permissions",
} as const;

export const Paths = {
  login: "/login",
} as const;

export const CMS_CONTENT_KEYS = [
  "hero_bg_image",
  "about_image",
  "gateway_client_image",
  "gateway_recruit_image",
  "contact_address",
  "contact_phone",
  "contact_fax",
  "contact_email",
  "footer_company_name",
  "footer_company_name_en",
] as const;
