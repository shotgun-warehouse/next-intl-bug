import { setRequestLocale } from "next-intl/server";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function MainLayout(props: Props) {
  const params = await props.params;
  const { children } = props;

  setRequestLocale(params.locale);

  return <>{children}</>;
}
