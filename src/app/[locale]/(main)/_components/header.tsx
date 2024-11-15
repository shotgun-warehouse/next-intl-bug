import { getTranslations } from "next-intl/server";

export async function PageHeader() {
  const t = await getTranslations("header");

  return <header>{t("test")}</header>;
}
