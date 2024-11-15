export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "es", "fr", "pt-br", "pt-pt"] as const;

export type DefaultLocale = typeof DEFAULT_LOCALE;
export type Locale = (typeof LOCALES)[number];

export type LocalizedRecord<T = string> = Record<DefaultLocale, T> &
  Partial<Record<Locale, T>>;

export const LOCALE_STATIC_PARAMS = LOCALES.map((locale) => ({ locale }));

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getLocaleFallback(locale: Locale): Locale | undefined {
  switch (locale) {
    case "pt-pt":
      return "pt-br";
    default:
      return undefined;
  }
}
