import { Locale } from "@/src/i18n/config";
import { setRequestLocale } from "next-intl/server";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function MainLayout(props: Props) {
  const params = await props.params;
  const { children } = props;

  setRequestLocale(params.locale);

  return <>{children}</>;
}
