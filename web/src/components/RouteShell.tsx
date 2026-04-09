import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const STATIC_TITLES: Record<string, string> = {
  "/": "Fiets Haven — Elektrische fietsen & accessoires",
  "/faq": "Veelgestelde vragen — Fiets Haven",
  "/contact": "Contact — Fiets Haven",
  "/policies": "Beleid — Fiets Haven",
  "/policies/ordering": "Bestellen & levering — Fiets Haven",
  "/policies/refund": "Retourbeleid — Fiets Haven",
  "/policies/damaged": "Beschadigde producten — Fiets Haven",
};

const DEFAULT_TITLE = "Fiets Haven — Elektrische fietsen & accessoires";

/**
 * Sets document title for static routes. Product pages set their own title in ProductDetail.
 */
export function RouteShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/product/")) return;
    document.title = STATIC_TITLES[pathname] ?? DEFAULT_TITLE;
  }, [pathname]);

  return null;
}
