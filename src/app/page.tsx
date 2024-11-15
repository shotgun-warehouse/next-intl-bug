import { redirect } from "next/navigation";
import { routing } from "~/i18n/routing";

// this page is not used since the middleware handles the redirect

export default function RootPage() {
  redirect(routing.defaultLocale);
}
