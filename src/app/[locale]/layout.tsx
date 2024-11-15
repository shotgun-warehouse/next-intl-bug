import { Locale } from "@/src/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
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
