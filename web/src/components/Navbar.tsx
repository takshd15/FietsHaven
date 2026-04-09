import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext.tsx";
import { EASE, springTap } from "../lib/motion.ts";
import { buildCartOrderMessage, openWhatsAppOrder } from "../lib/whatsapp.ts";

const navList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const mainLinks = [
  { label: "Home", to: "/" },
  { label: "Fietsen", to: "/#bikes" },
  { label: "Accessoires", to: "/#accessories" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

const policyLinks = [
  { label: "Beleidsoverzicht", to: "/policies" },
  { label: "Bestellen & levering", to: "/policies/ordering" },
  { label: "Retourbeleid", to: "/policies/refund" },
  { label: "Beschadigde producten", to: "/policies/damaged" },
] as const;
function isHashLink(to: string): to is `/#${string}` {
  return to.startsWith("/#");
}

function isMainLinkActive(to: string, pathname: string, hash: string): boolean {
  if (to === "/") return pathname === "/" && (hash === "" || hash === "#" || hash === "#home");
  if (isHashLink(to)) return pathname === "/" && hash === `#${to.slice(2)}`;
  return pathname === to;
}

function isPolicyRoute(pathname: string) {
  return pathname.startsWith("/policies");
}

export function Navbar() {
  const { pathname, hash } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const policiesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setPoliciesOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOut(e: MouseEvent) {
      if (!policiesRef.current?.contains(e.target as Node)) setPoliciesOpen(false);
    }
    if (!policiesOpen) return;
    document.addEventListener("click", handleClickOut);
    return () => document.removeEventListener("click", handleClickOut);
  }, [policiesOpen]);

  const policiesNavActive = isPolicyRoute(pathname);
  const { items, totalQuantity } = useCart();

  function handleCartClick() {
    const msg = buildCartOrderMessage(
      items.map((i) => ({ title: i.title, price: i.price, quantity: i.quantity })),
    );
    openWhatsAppOrder(msg);
  }

  const linkBase = "relative text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900";
  const linkActive = "text-neutral-900";

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="sticky top-0 z-50 border-b border-neutral-200/90 bg-white/95 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
        {/* Logo */}
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>

          <motion.div whileHover={{ opacity: 0.85 }} transition={{ duration: 0.2 }} className="min-w-0">
            <Link to="/" className="flex min-w-0 items-center gap-2.5 text-neutral-900">
              <span className="truncate text-sm font-semibold tracking-[0.25em] md:text-base">
                FIETS HAVEN
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Desktop links */}
        <motion.ul
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          initial="hidden"
          animate="show"
          variants={navList}
        >
          {mainLinks.map(({ label, to }) => {
            const active = isMainLinkActive(to, pathname, hash);
            return (
              <motion.li key={label} variants={navItem}>
                <Link
                  to={to}
                  className={`relative ${linkBase} rounded-xl px-3 py-2 ${active ? linkActive : ""}`}
                >
                  {label}
                  {active ? (
                    <span className="absolute -bottom-px left-3 right-3 h-px bg-neutral-900 max-lg:hidden" />
                  ) : null}
                </Link>
              </motion.li>
            );
          })}

          <motion.li ref={policiesRef} className="relative" variants={navItem}>
            <button
              type="button"
              aria-expanded={policiesOpen}
              aria-haspopup="true"
              onClick={(e) => { e.stopPropagation(); setPoliciesOpen((o) => !o); }}
              className={`relative ${linkBase} flex items-center gap-1 rounded-xl px-3 py-2 ${policiesOpen || policiesNavActive ? linkActive : ""}`}
            >
              Beleid
              <ChevronDown
                className={`h-4 w-4 transition-transform ${policiesOpen ? "rotate-180" : ""}`}
                strokeWidth={1.5}
                aria-hidden
              />
              {policiesNavActive ? (
                <span className="absolute -bottom-px left-3 right-3 h-px bg-neutral-900 max-lg:hidden" />
              ) : null}
            </button>

            <AnimatePresence>
              {policiesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-neutral-200 bg-white py-2 shadow-sm"
                >
                  {policyLinks.map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setPoliciesOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 ${
                        pathname === to ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.li>
        </motion.ul>

        {/* Icons */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <motion.button
            type="button"
            aria-label="Zoeken"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={springTap}
            className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </motion.button>

          <motion.button
            type="button"
            aria-label={
              totalQuantity > 0
                ? `Winkelwagen, ${totalQuantity} producten — open WhatsApp om te bestellen`
                : "Winkelwagen — open WhatsApp"
            }
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={springTap}
            onClick={handleCartClick}
            className="relative rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {totalQuantity > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] font-semibold leading-none text-white">
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            ) : null}
          </motion.button>
        </div>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="relative overflow-hidden border-t border-neutral-200 bg-white lg:hidden"
          >
            <div className="relative z-10 max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto px-4 py-5">
              <ul className="flex flex-col gap-1">
                {mainLinks.map(({ label, to }) => {
                  const active = isMainLinkActive(to, pathname, hash);
                  return (
                    <li key={label}>
                      <Link
                        to={to}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          active ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-4 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Beleid
              </p>

              <ul className="mt-2 flex flex-col gap-1">
                {policyLinks.map(({ label, to }) => {
                  const active = pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          active ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
