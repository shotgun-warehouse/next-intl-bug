import type { Metadata } from "next";
import { Robots } from "next/dist/lib/metadata/types/metadata-types";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { LOCALES, type Locale } from "~/i18n/config";

export function getMetadata({
  locale,
  pathname,
  title,
  description,
  robots,
  openGraph = {},
}: {
  locale: Locale;
  pathname: string | null;
  title: string;
  description?: string;
  robots?: Robots;
  openGraph?: OpenGraph;
}): Metadata {
  if (pathname === null) {
    return {
      title,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: "Shotgun",
      locale,
      type: "website",
      ...openGraph,
    },
    robots,
    itunes: {
      appId: "760028892",
      appArgument: pathname,
    },
    alternates: {
      canonical: `/${locale}${pathname}`,
      languages: {
        "x-default": pathname || "/",
        ...Object.fromEntries(
          LOCALES.map((lang) => [lang, `/${lang}${pathname}`])
        ),
      },
    },
  };
}
