import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const STATIC_TITLES: Record<string, string> = {
  "/": "Fiets Haven — Electric bikes & accessories",
  "/faq": "FAQ — Fiets Haven",
  "/contact": "Contact — Fiets Haven",
  "/policies": "Policies — Fiets Haven",
  "/policies/ordering": "Ordering & delivery — Fiets Haven",
  "/policies/refund": "Refund policy — Fiets Haven",
  "/policies/damaged": "Damaged products — Fiets Haven",
};

const DEFAULT_TITLE = "Fiets Haven — Electric bikes & accessories";

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
