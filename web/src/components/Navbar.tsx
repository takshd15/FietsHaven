import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext.tsx";
import { buildCartOrderMessage, openWhatsAppOrder } from "../lib/whatsapp.ts";

const mainLinks = [
  { label: "Home", to: "/" },
  { label: "Bikes", to: "/#bikes" },
  { label: "Accessories", to: "/#accessories" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

const policyLinks = [
  { label: "All policies", to: "/policies" },
  { label: "Ordering & delivery", to: "/policies/ordering" },
  { label: "Refund policy", to: "/policies/refund" },
  { label: "Damaged products", to: "/policies/damaged" },
] as const;

function isHashLink(to: string): to is `/#${string}` {
  return to.startsWith("/#");
}

function isMainLinkActive(
  to: string,
  pathname: string,
  hash: string,
): boolean {
  if (to === "/") {
    return pathname === "/" && (hash === "" || hash === "#" || hash === "#home");
  }
  if (isHashLink(to)) {
    const id = to.slice(2);
    return pathname === "/" && hash === `#${id}`;
  }
  return pathname === to;
}

function isPolicyRoute(pathname: string) {
  return pathname.startsWith("/policies");
}

const linkBase =
  "relative text-sm font-medium transition-colors hover:text-gray-900";
const linkInactive = "text-gray-700";
const linkActive = "text-gray-900";

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
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOut(e: MouseEvent) {
      if (!policiesRef.current?.contains(e.target as Node)) {
        setPoliciesOpen(false);
      }
    }
    if (!policiesOpen) return;
    document.addEventListener("click", handleClickOut);
    return () => document.removeEventListener("click", handleClickOut);
  }, [policiesOpen]);

  const policiesNavActive = isPolicyRoute(pathname);

  const { items, totalQuantity } = useCart();

  function handleCartClick() {
    const msg = buildCartOrderMessage(
      items.map((i) => ({
        title: i.title,
        price: i.price,
        quantity: i.quantity,
      })),
    );
    openWhatsAppOrder(msg);
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
          <motion.div whileHover={{ opacity: 0.82 }} transition={{ duration: 0.2 }} className="min-w-0">
            <Link
              to="/"
              className="flex min-w-0 items-center gap-2.5 text-gray-900"
            >
              <img
                src="/logo.jpeg"
                alt="Fiets Haven"
                className="h-8 w-auto max-h-8 shrink-0 object-contain sm:h-9 md:h-10"
                height={40}
                width={120}
              />
              <span className="truncate text-lg font-bold tracking-tight md:text-xl">
                Fiets Haven
              </span>
            </Link>
          </motion.div>
        </div>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {mainLinks.map(({ label, to }) => {
            const active = isMainLinkActive(to, pathname, hash);
            return (
              <li key={label}>
                <Link
                  to={to}
                  className={`relative ${linkBase} rounded-lg px-3 py-2 ${
                    active ? linkActive : linkInactive
                  }`}
                >
                  {label}
                  {active ? (
                    <span className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full bg-gray-900 max-lg:hidden" />
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
              onClick={(e) => {
                e.stopPropagation();
                setPoliciesOpen((o) => !o);
              }}
              className={`relative ${linkBase} flex items-center gap-1 rounded-lg px-3 py-2 ${
                policiesOpen || policiesNavActive ? linkActive : linkInactive
              }`}
            >
              Policies
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  policiesOpen ? "rotate-180" : ""
                }`}
                strokeWidth={1.5}
                aria-hidden
              />
              {policiesNavActive ? (
                <span className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full bg-gray-900 max-lg:hidden" />
              ) : null}
            </button>
            <AnimatePresence>
              {policiesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-gray-200/90 bg-white py-2 shadow-lg ring-1 ring-black/5"
                >
                  {policyLinks.map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setPoliciesOpen(false)}
                      className={`block px-4 py-2.5 text-sm ${
                        pathname === to
                          ? "bg-gray-50 font-semibold text-gray-900"
                          : "font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
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

        <div className="flex shrink-0 items-center gap-3 text-gray-900 sm:gap-4">
          <motion.button
            type="button"
            aria-label="Search"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </motion.button>
          <motion.button
            type="button"
            aria-label={
              totalQuantity > 0
                ? `Shopping cart, ${totalQuantity} items — open WhatsApp to order`
                : "Shopping cart — open WhatsApp"
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCartClick}
            className="relative rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {totalQuantity > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-bold leading-none text-white">
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            ) : null}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto px-4 py-5">
              <ul className="flex flex-col gap-1">
                {mainLinks.map(({ label, to }) => {
                  const active = isMainLinkActive(to, pathname, hash);
                  return (
                    <li key={label}>
                      <Link
                        to={to}
                        className={`block rounded-xl px-4 py-3 text-base font-medium ${
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Policies
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {policyLinks.map(({ label, to }) => {
                  const active = pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        className={`block rounded-xl px-4 py-3 text-base font-medium ${
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50"
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
