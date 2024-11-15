import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type Locale } from "~/i18n/config";
import { getMetadata } from "../metadata";

interface Props {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "home",
  });

  return getMetadata({
    locale: params.locale,
    pathname: "",
    title: t("metadata_title"),
    description: t("metadata_description"),
  });
}

export default async function HomePage(props: Props) {
  const params = await props.params;

  setRequestLocale(params.locale);

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
