import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const STATIC_TITLES: Record<string, string> = {
  "/": "FietsHaven — Elektrische fietsen & accessoires",
  "/faq": "Veelgestelde vragen — FietsHaven",
  "/contact": "Contact — FietsHaven",
  "/policies": "Beleid — FietsHaven",
  "/policies/ordering": "Bestellen & levering — FietsHaven",
  "/policies/refund": "Retourbeleid — FietsHaven",
  "/policies/damaged": "Beschadigde producten — FietsHaven",
};

const DEFAULT_TITLE = "FietsHaven — Elektrische fietsen & accessoires";

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
