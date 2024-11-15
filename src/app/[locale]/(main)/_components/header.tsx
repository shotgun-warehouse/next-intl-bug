import { getTranslations } from "next-intl/server";
import { Link } from "~/navigation";

export async function PageHeader() {
  const t = await getTranslations("header");

  return (
    <header>
      {t("test")} <Link href="/">link</Link>
    </header>
  );
}
