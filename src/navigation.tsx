import { createNavigation } from "next-intl/navigation";
import { forwardRef } from "react";
import { routing } from "./i18n/routing";

const navigation = createNavigation(routing);

export const { redirect, usePathname, useRouter } = navigation;

const NavigationLink = navigation.Link;

export type LinkProps = React.ComponentProps<typeof NavigationLink>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <NavigationLink ref={ref} prefetch={false} {...props} />
));
Link.displayName = "Link";
