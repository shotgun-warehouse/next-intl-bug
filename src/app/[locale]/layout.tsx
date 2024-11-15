import { Locale } from "~/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { getMetadata } from "./metadata";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "home",
  });

  return getMetadata({
    locale: params.locale,
    pathname: null,
    title: t("metadata_title"),
    description: t("metadata_description"),
  });
}

export default async function LocaleLayout(props: Props) {
  const params = await props.params;
  const { children } = props;

  setRequestLocale(params.locale);

  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
