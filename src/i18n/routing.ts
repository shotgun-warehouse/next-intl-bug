import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "./config";

export const routing = defineRouting({
  locales: LOCALES,
  localePrefix: "always",
  defaultLocale: DEFAULT_LOCALE,
});
