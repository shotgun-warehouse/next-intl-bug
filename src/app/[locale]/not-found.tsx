import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { DEFAULT_LOCALE, type Locale } from "~/i18n/config";
import { Link } from "~/navigation";
import { getMetadata } from "./metadata";

interface Props {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getMetadata({
    locale: params.locale,
    pathname: null,
    title: "404 - Page not found",
    robots: {
      index: false,
      follow: false,
    },
  });
}

export default function NotFound({ params }: Props) {
  setRequestLocale(params?.locale ?? DEFAULT_LOCALE);

  const t = useTranslations("not_found");

  return (
    <div><h1>Not found</h1><p><Link href="/">{t("home")}</Link></p></div>
  );
}
