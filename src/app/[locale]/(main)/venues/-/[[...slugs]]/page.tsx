import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
    slugs: string[];
  }>;
}

export default async function VenuesPage(props: Props) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const t = await getTranslations("VenuesPage");

  return <div>{t("test")}</div>;
}
