import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures each navigation starts at the top (SPA default keeps scroll position).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
