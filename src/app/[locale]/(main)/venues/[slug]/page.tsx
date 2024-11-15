import { setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function VenuePage(props: Props) {
  const params = await props.params;

  setRequestLocale(params.locale);

  return <div>{params.slug} venue page</div>;
}
