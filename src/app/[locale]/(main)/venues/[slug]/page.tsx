import type { Locale } from "~/i18n/config";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 3600;
export const dynamic = "force-static";

interface Props {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export default async function VenuePage(props: Props) {
  const params = await props.params;

  setRequestLocale(params.locale);

  return <div>{params.slug} venue page</div>;
}
