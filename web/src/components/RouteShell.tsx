import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const STATIC_TITLES: Record<string, string> = {
  "/": "Fietshaven — Elektrische fietsen & accessoires",
  "/faq": "Veelgestelde vragen — Fietshaven",
  "/contact": "Contact — Fietshaven",
  "/policies": "Beleid — Fietshaven",
  "/policies/ordering": "Bestellen & levering — Fietshaven",
  "/policies/refund": "Retourbeleid — Fietshaven",
  "/policies/damaged": "Beschadigde producten — Fietshaven",
};

const DEFAULT_TITLE = "Fietshaven — Elektrische fietsen & accessoires";

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
