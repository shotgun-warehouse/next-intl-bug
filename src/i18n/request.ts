import deepmerge from "deepmerge";
import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { getLocaleFallback, isLocale, type Locale } from "./config";
import { routing } from "./routing";

async function importMessages(locale: Locale): Promise<AbstractIntlMessages> {
  const mod = await import(`../../messages/${locale}.json`);
  const messages = mod.default ?? mod;
  // NOTE: Spreading is necessary to ensure that the messages are not mutated
  // or proxied by the bundler.
  return { ...messages };
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  const uncheckedLocale = await requestLocale;
  const locale =
    uncheckedLocale && isLocale(uncheckedLocale)
      ? uncheckedLocale
      : routing.defaultLocale;

  let localeMessages = await importMessages(locale);
  if (locale !== routing.defaultLocale) {
    const defaultMessages = await importMessages(routing.defaultLocale);

    // Some locales have fallbacks, e.g. `pt-pt` falls back to `pt-br`
    const fallbackLocale = getLocaleFallback(locale);
    const fallbackMessages = fallbackLocale
      ? await importMessages(fallbackLocale)
      : {};

    localeMessages = deepmerge.all([
      defaultMessages,
      fallbackMessages,
      localeMessages,
    ]) as AbstractIntlMessages;
  }

  return {
    locale,
    timeZone: "UTC",
    messages: localeMessages,
  };
});
