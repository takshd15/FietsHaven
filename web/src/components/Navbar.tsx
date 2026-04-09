import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext.tsx";
import { buildCartOrderMessage, openWhatsAppOrder } from "../lib/whatsapp.ts";
import { publicAsset } from "../lib/publicAsset.ts";

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
const mobileMenuBackdrop = publicAsset("home-bg-rider.png");

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

  const linkBase = "relative text-sm font-medium text-white/80 transition-colors hover:text-white";
  const linkActive = "text-white";

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#5c6370]/95 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
        {/* Logo */}
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-xl p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>

          <motion.div whileHover={{ opacity: 0.85 }} transition={{ duration: 0.2 }} className="min-w-0">
            <Link to="/" className="flex min-w-0 items-center gap-2.5 text-white">
              <img
                src="/logo.jpeg"
                alt="Fietshaven"
                className="h-8 w-auto max-h-8 shrink-0 rounded-lg object-contain sm:h-9 md:h-10"
                height={40}
                width={120}
              />
              <span className="truncate text-lg font-bold tracking-tight text-white md:text-xl">
                Fietshaven
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Desktop links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {mainLinks.map(({ label, to }) => {
            const active = isMainLinkActive(to, pathname, hash);
            return (
              <li key={label}>
                <Link
                  to={to}
                  className={`relative ${linkBase} rounded-xl px-3 py-2 ${active ? linkActive : ""}`}
                >
                  {label}
                  {active ? (
                    <span className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full bg-white max-lg:hidden" />
                  ) : null}
                </Link>
              </li>
            );
          })}

          <li ref={policiesRef} className="relative">
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
                <span className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full bg-white max-lg:hidden" />
              ) : null}
            </button>

            <AnimatePresence>
              {policiesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-2xl border border-white/15 bg-[#5c6370] py-2 shadow-xl"
                >
                  {policyLinks.map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setPoliciesOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 ${
                        pathname === to ? "text-white" : "text-white/75 hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <motion.button
            type="button"
            aria-label="Zoeken"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCartClick}
            className="relative rounded-xl p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {totalQuantity > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold leading-none text-[#5c6370]">
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
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative overflow-hidden border-t border-white/10 bg-[#5c6370] lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <img
                src={mobileMenuBackdrop}
                alt=""
                className="h-full w-full object-cover object-[60%_44%] opacity-24"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="relative z-10 max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto px-4 py-5">
              <ul className="flex flex-col gap-1">
                {mainLinks.map(({ label, to }) => {
                  const active = isMainLinkActive(to, pathname, hash);
                  return (
                    <li key={label}>
                      <Link
                        to={to}
                        className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                          active ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-4 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Beleid
              </p>

              <ul className="mt-2 flex flex-col gap-1">
                {policyLinks.map(({ label, to }) => {
                  const active = pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                          active ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
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
