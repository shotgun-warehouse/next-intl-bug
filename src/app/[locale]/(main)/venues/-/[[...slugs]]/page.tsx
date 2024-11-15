import { Locale } from "~/i18n/config";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: Locale;
    slugs: string[];
  }>;
}

export default async function VenuesPage(props: Props) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const t = await getTranslations("VenuesPage");

  return <div>{t("test")}</div>;
}
