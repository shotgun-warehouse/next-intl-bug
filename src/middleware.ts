import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const PATHNAME_REGEX = /^\/([a-z-]{2}|[a-z-]{5})(.*)/;

function getLocalePathname({ pathname }: NextRequest["nextUrl"]) {
  const matches = pathname.match(PATHNAME_REGEX);

  if (!matches) {
    throw new Error("Missing locale in pathname");
  }

  return {
    locale: matches[1],
    pathname: matches[2]!,
  };
}

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const res = intlMiddleware(req);
  if (!res.ok) {
    // redirect to the right locale
    return res;
  }

  const { locale, pathname } = getLocalePathname(req.nextUrl);

  console.log("middleware", { locale, pathname });

  return res;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(en|fr|es|pt-br|pt-pt)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
