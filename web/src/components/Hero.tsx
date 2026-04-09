import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, ShoppingCart, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import type { Product } from "../data/catalog.ts";
import { products } from "../data/catalog.ts";
import { useCart } from "../context/CartContext.tsx";
import { EASE, springTap } from "../lib/motion.ts";
import { buildCartOrderMessage, openWhatsAppOrder } from "../lib/whatsapp.ts";

const easeOut = "easeOut" as const;

/** Accessoires + niet-getoonde modellen uitsluiten uit de hero-slideshow */
const HERO_SLIDESHOW_EXCLUDE = new Set([
  "smart-key-remote",
  "ride-essentials",
  "v20-pro",
]);

function getHeroBikes(): Product[] {
  return products.filter((p) => !HERO_SLIDESHOW_EXCLUDE.has(p.slug));
}

const heroBikes = getHeroBikes();

const NAV_LINKS = [
  { label: "Fietsen", to: "/#bikes" },
  { label: "Accessoires", to: "/#accessories" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

/** Left column — staggered entrance */
const leftContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const leftItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easeOut },
  },
};

const rightBar = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const SLIDE_INTERVAL_MS = 4500;

const slideMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function HeroBikeSlideshow({ bikes }: { bikes: Product[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const len = bikes.length;
  const current = bikes[index] ?? bikes[0];

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;

  const [tabHidden, setTabHidden] = useState(
    () => typeof document !== "undefined" && document.hidden,
  );

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (len <= 1 || tabHidden) return;
    const id = window.setInterval(() => goNextRef.current(), SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [len, tabHidden]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 48) goPrev();
    else if (dx < -48) goNext();
  };

  if (!current || len === 0) {
    return null;
  }

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.52, ease: EASE };

  return (
    <div
      className="flex w-full max-w-lg flex-col items-center"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Uitgelichte fietsen"
    >
      <div className="relative w-full">
        {len > 1 ? (
          <>
            <motion.button
              type="button"
              onClick={goPrev}
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
              aria-label="Vorige fiets"
              whileHover={{ scale: 1.08, backgroundColor: "rgba(0,0,0,0.55)" }}
              whileTap={{ scale: 0.94 }}
              transition={springTap}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </motion.button>
            <motion.button
              type="button"
              onClick={goNext}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
              aria-label="Volgende fiets"
              whileHover={{ scale: 1.08, backgroundColor: "rgba(0,0,0,0.55)" }}
              whileTap={{ scale: 0.94 }}
              transition={springTap}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </motion.button>
          </>
        ) : null}

        <div className="relative min-h-[min(52vh,520px)] overflow-hidden px-10 sm:px-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.slug}
              initial={reduceMotion ? false : slideMotion.initial}
              animate={reduceMotion ? undefined : slideMotion.animate}
              exit={reduceMotion ? undefined : slideMotion.exit}
              transition={transition}
              className="flex flex-col items-center"
            >
              <div className="w-full bg-white p-4 sm:p-6">
                <img
                  src={current.images[0]}
                  alt={current.imageAlt}
                  className="mx-auto h-auto max-h-[min(44vh,440px)] w-full object-contain object-center"
                  width={900}
                  height={900}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
                />
              </div>
              <div className="mt-8 max-w-md text-center">
                <p className="text-base font-semibold tracking-wide text-white sm:text-lg">{current.title}</p>
                <p className="mt-2 text-sm text-white/65">{current.price}</p>
                <Link
                  to={`/product/${current.slug}`}
                  className="mt-6 inline-block text-xs font-medium tracking-wide text-white underline underline-offset-[10px] transition-opacity hover:opacity-85"
                >
                  Bekijk specificaties
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {len > 1 ? (
        <div className="mt-8 flex justify-center gap-2">
          {bikes.map((b, i) => (
            <motion.button
              key={b.slug}
              type="button"
              onClick={() => setIndex(i)}
              layout
              className={`h-1.5 rounded-full ${
                i === index ? "w-8 bg-white" : "w-1.5 bg-white/35 hover:bg-white/55"
              }`}
              aria-label={`Ga naar ${b.title}`}
              aria-current={i === index}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              transition={springTap}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Hero() {
  const { items, totalQuantity } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleCartClick() {
    const msg = buildCartOrderMessage(
      items.map((i) => ({ title: i.title, price: i.price, quantity: i.quantity })),
    );
    openWhatsAppOrder(msg);
  }

  return (
    <section id="home" className="relative min-h-[calc(100svh-4rem)]">
      <div className="grid min-h-[calc(100svh-4rem)] grid-cols-1 lg:grid-cols-2">
        {/* Left — white */}
        <div className="relative flex min-h-[52vh] flex-col justify-between bg-white px-6 py-8 sm:px-10 lg:min-h-[calc(100svh-4rem)] lg:px-14 lg:py-12">
          <motion.header
            className="flex items-start justify-between gap-4"
            variants={leftItem}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/"
              className="text-sm font-semibold tracking-[0.35em] text-neutral-900 sm:text-base"
            >
              FIETS HAVEN
            </Link>
            <motion.button
              type="button"
              className="p-2 text-neutral-700 lg:hidden"
              aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={{ scale: 0.92 }}
              transition={springTap}
            >
              {menuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
            </motion.button>
          </motion.header>

          <div className="flex flex-1 flex-col justify-center py-12 lg:py-0">
            <motion.div
              className="max-w-xl"
              variants={leftContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={leftItem}
                className="text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
              >
                ONTDEK JOUW
                <br />
                PERFECTE RIT
              </motion.h1>
              <motion.p
                variants={leftItem}
                className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg"
              >
                Ontdek onze collectie van hoogwaardige fietsen.
              </motion.p>
              <motion.div variants={leftItem} className="mt-10">
                <motion.div
                  className="inline-block"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTap}
                >
                  <Link
                    to="/#bikes"
                    className="inline-flex min-h-12 min-w-[200px] items-center justify-center bg-neutral-900 px-10 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800"
                  >
                    Bekijk fietsen
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col gap-6 border-t border-neutral-200/80 pt-8 lg:flex-row lg:items-center lg:justify-between lg:border-t-0 lg:pt-0"
            variants={leftContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={leftItem}
              className="text-[11px] font-medium tracking-[0.28em] text-neutral-400"
            >
              AMSTERDAM · KWALITEIT · SERVICE
            </motion.p>
            <motion.nav
              variants={leftContainer}
              className="hidden gap-8 text-xs font-medium tracking-wide text-neutral-500 lg:flex"
            >
              {NAV_LINKS.map(({ label, to }) => (
                <motion.span key={to} variants={leftItem}>
                  <Link to={to} className="transition-colors hover:text-neutral-900">
                    {label}
                  </Link>
                </motion.span>
              ))}
            </motion.nav>
          </motion.div>
        </div>

        {/* Right — black + slideshow */}
        <div className="relative flex min-h-[48vh] flex-col bg-neutral-950 lg:min-h-[calc(100svh-4rem)]">
          <motion.div
            className="flex items-center justify-end gap-6 px-6 py-8 sm:px-10 lg:px-14"
            variants={rightBar}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/contact"
              className="hidden text-xs font-medium tracking-[0.2em] text-white/70 transition-colors hover:text-white sm:inline"
            >
              AMSTERDAM
            </Link>
            <motion.button
              type="button"
              onClick={handleCartClick}
              aria-label={
                totalQuantity > 0
                  ? `Winkelwagen, ${totalQuantity} producten`
                  : "Winkelwagen — WhatsApp"
              }
              className="relative p-2 text-white/85 transition-colors hover:text-white"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={springTap}
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
              {totalQuantity > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-neutral-900">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              ) : null}
            </motion.button>
          </motion.div>

          <div className="flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-2 sm:px-6 lg:pb-16">
            <HeroBikeSlideshow bikes={heroBikes} />
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <div className="flex h-full flex-col px-6 py-8">
              <div className="flex justify-end">
                <motion.button
                  type="button"
                  className="p-2"
                  aria-label="Menu sluiten"
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  transition={springTap}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              <motion.nav
                className="mt-12 flex flex-col gap-1"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                }}
              >
                {NAV_LINKS.map(({ label, to }) => (
                  <motion.div
                    key={to}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                  >
                    <Link
                      to={to}
                      className="block py-3 text-lg font-medium text-neutral-900"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
