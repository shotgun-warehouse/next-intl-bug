import type { Locale } from "~/i18n/config";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "./_components/header";

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

  return (
    <>
      <PageHeader />
      {children}
    </>
  );
}
