import { Locale } from "~/i18n/config";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 3600;
export const dynamic = "force-static";

interface Props {
  params: Promise<{
    locale: Locale;
    slugs: string[];
  }>;
}

export default async function VenuesPage(props: Props) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const t = await getTranslations("venues");

  return <div>{t("test")}</div>;
}
