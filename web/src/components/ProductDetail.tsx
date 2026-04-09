import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Award,
  Check,
  ChevronDown,
  Package,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext.tsx";
import { buildProductOrderMessage, openWhatsAppOrder } from "../lib/whatsapp.ts";
import { BikeShowcaseCarousel } from "./BikeShowcaseCarousel.tsx";
import type { Product } from "../data/catalog.ts";

const easeOut = "easeOut" as const;

const detailStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
};

const detailItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

function StarRow({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4 sm:h-[18px] sm:w-[18px]";
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} van 5 sterren`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half =
          !filled && i === Math.floor(rating) && rating % 1 >= 0.25 && rating % 1 < 1;
        return (
          <Star
            key={i}
            className={`${dim} ${
              filled
                ? "fill-amber-400 text-amber-400"
                : half
                  ? "fill-amber-400/55 text-amber-400"
                  : "fill-gray-200 text-gray-200"
            }`}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const reduceMotion = useReducedMotion();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addCooldown, setAddCooldown] = useState(false);
  const [buyCooldown, setBuyCooldown] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const lowStock = product.lowStockCount;
  const moreDetails = product.moreDetails?.trim();
  const specIntro = product.specIntro?.trim();
  const specs = product.specs?.filter(Boolean) ?? [];
  const hasSpecsSection = Boolean(specIntro) || specs.length > 0 || Boolean(moreDetails);

  useEffect(() => {
    document.title = `${product.title} | Fietshaven`;
    return () => {
      document.title = "Fietshaven — Elektrische fietsen & accessoires";
    };
  }, [product.title]);

  useEffect(() => {
    if (!addedToCart) return;
    const t = window.setTimeout(() => setAddedToCart(false), 2600);
    return () => window.clearTimeout(t);
  }, [addedToCart]);

  useEffect(() => {
    if (!showAddedToast) return;
    const t = window.setTimeout(() => setShowAddedToast(false), 3200);
    return () => window.clearTimeout(t);
  }, [showAddedToast]);

  const handleAddToCart = useCallback(() => {
    addToCart({
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
    });
    setAddedToCart(true);
    setShowAddedToast(true);
    setAddCooldown(true);
    window.setTimeout(() => setAddCooldown(false), 800);
  }, [addToCart, product.slug, product.title, product.price, quantity]);

  const handleBuyNow = useCallback(() => {
    const message = buildProductOrderMessage(
      product.title,
      product.price,
      quantity,
      product.slug,
    );
    openWhatsAppOrder(message);
    setBuyCooldown(true);
    window.setTimeout(() => setBuyCooldown(false), 1200);
  }, [product.slug, product.title, product.price, quantity]);

  const pageFrom = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };

  const addDisabled = addCooldown;
  const buyDisabled = buyCooldown;

  return (
    <motion.div
      className="min-h-screen pb-28 lg:pb-12"
      style={{ backgroundColor: "var(--fh-bg)" }}
      initial={pageFrom}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeOut }}
    >
      <AnimatePresence>
        {showAddedToast ? (
          <motion.div
            key="added-toast"
            role="status"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed left-1/2 top-20 z-[100] max-w-[min(90vw,20rem)] -translate-x-1/2 rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-[#4a5260] shadow-lg"
          >
            Toegevoegd aan winkelwagen
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-10 py-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Terug naar shop
          </Link>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 lg:items-start">
          {/* Gallery */}
          <motion.div
            className="lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <BikeShowcaseCarousel
              productLabel={product.title}
              variant="pdp"
              images={product.images}
              imageAlt={product.imageAlt}
              imageAlts={product.imageAlts}
            />
          </motion.div>

          {/* Center: details */}
          <motion.div
            className="lg:col-span-4 space-y-5"
            variants={detailStagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={detailItem} className="flex flex-wrap items-center gap-2">
              {product.bestSeller ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-1 text-xs font-semibold text-amber-200">
                  <Award className="h-3.5 w-3.5" strokeWidth={2} />
                  Bestseller
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                30 dagen retour · 2 jaar garantie
              </span>
            </motion.div>

            <motion.div variants={detailItem}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Fietshaven
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[1.75rem] lg:leading-tight">
                {product.title}
              </h1>
            </motion.div>

            <motion.div variants={detailItem}>
              <a
                href="#reviews"
                className="inline-flex flex-wrap items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <StarRow rating={product.rating} />
                <span className="font-semibold text-white">
                  {product.rating}/5
                </span>
                <span className="text-white/55">
                  ({product.reviewCount} beoordelingen)
                </span>
              </a>
            </motion.div>

            <motion.p
              variants={detailItem}
              className="text-base leading-relaxed text-white/75 sm:text-[17px]"
            >
              {product.description}
            </motion.p>

            <motion.div variants={detailItem}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/60">Inclusief</h2>
              <ul className="mt-3 space-y-2.5">
                {product.features.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-white/80">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      strokeWidth={2.5}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>

            {hasSpecsSection ? (
              <motion.div variants={detailItem}>
                <details className="group overflow-hidden rounded-2xl border border-white/15" style={{ backgroundColor: "var(--fh-surface-lo)" }}>
                  <summary className="flex cursor-pointer list-none select-none items-center justify-between gap-3 px-4 py-4 text-sm font-bold uppercase tracking-widest text-white/80 marker:content-none hover:bg-white/8 [&::-webkit-details-marker]:hidden">
                    Product specificaties
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-white/50 transition-transform group-open:rotate-180"
                      strokeWidth={2}
                    />
                  </summary>
                  <div className="border-t border-white/10 px-4 pb-4 pt-3">
                    {specIntro ? (
                      <p className="text-sm leading-relaxed text-white/70">{specIntro}</p>
                    ) : null}
                    {specs.length > 0 ? (
                      <ul className="mt-3 space-y-2 text-sm text-white/80">
                        {specs.map((spec) => (
                          <li key={spec} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {!specIntro && specs.length === 0 && moreDetails ? (
                      <p className="text-sm leading-relaxed text-white/70">{moreDetails}</p>
                    ) : null}
                  </div>
                </details>
              </motion.div>
            ) : null}
          </motion.div>

          {/* Right: purchase box — desktop */}
          <motion.aside
            className="hidden lg:col-span-3 lg:block"
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: reduceMotion ? 0 : 0.08 }}
          >
            <div className="sticky top-24 rounded-3xl border border-white/15 p-6 shadow-md" style={{ backgroundColor: "var(--fh-surface)" }}>
              <PurchasePanel
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                addedToCart={addedToCart}
                addDisabled={addDisabled}
                buyDisabled={buyDisabled}
                lowStock={lowStock}
              />
            </div>
          </motion.aside>

          {/* Purchase card — mobile (in flow) */}
          <div className="lg:col-span-12 lg:hidden">
            <div className="rounded-3xl border border-white/15 p-6 shadow-md" style={{ backgroundColor: "var(--fh-surface)" }}>
              <PurchasePanel
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                addedToCart={addedToCart}
                addDisabled={addDisabled}
                buyDisabled={buyDisabled}
                lowStock={lowStock}
                compactTrust
              />
            </div>
          </div>
        </div>

        <motion.section
          id="reviews"
          className="mt-16 border-t border-white/15 pt-14 lg:mt-20 lg:pt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Beoordelingen
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Van gekochte klanten.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 px-4 py-3" style={{ backgroundColor: "var(--fh-surface)" }}>
              <span className="text-3xl font-bold tabular-nums text-white">
                {product.rating}
              </span>
              <div>
                <StarRow rating={product.rating} />
                <p className="mt-0.5 text-xs text-white/55">
                  Op basis van {product.reviewCount} beoordelingen
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {product.reviews.map((r, i) => (
              <motion.li
                key={`${r.author}-${i}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: reduceMotion ? 0 : i * 0.07,
                  ease: easeOut,
                }}
                className="rounded-3xl border border-white/12 p-5 shadow-sm" style={{ backgroundColor: "var(--fh-surface)" } as React.CSSProperties}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white">{r.author}</span>
                  <StarRow rating={r.rating} size="sm" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  “{r.text}”
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md lg:hidden" style={{ backgroundColor: "var(--fh-surface-lo)" }}>
        <div className="mx-auto max-w-7xl px-1">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
                Prijs
              </p>
              <p className="truncate text-lg font-bold tabular-nums text-white">
                {product.price}
              </p>
            </div>
            <motion.button
              type="button"
              onClick={handleBuyNow}
              disabled={buyDisabled}
              whileHover={{ scale: buyDisabled ? 1 : 1.02 }}
              whileTap={{ scale: buyDisabled ? 1 : 0.98 }}
              className="min-h-12 min-w-0 flex-1 rounded-2xl bg-white px-4 text-sm font-semibold text-[#4a5260] shadow-md transition-all hover:bg-white/90 disabled:opacity-70"
            >
              Nu kopen - WhatsApp
            </motion.button>
          </div>
          <motion.button
            type="button"
            onClick={handleAddToCart}
            disabled={addDisabled}
            whileHover={{ scale: addDisabled ? 1 : 1.01 }}
            whileTap={{ scale: addDisabled ? 1 : 0.98 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="mt-2 flex min-h-11 w-full items-center justify-center rounded-2xl border-2 border-white/25 bg-white/10 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20 disabled:opacity-70"
          >
            {addedToCart ? (
              <motion.span
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Check className="h-4 w-4 text-emerald-400" strokeWidth={2.5} />
                Toegevoegd aan winkelwagen
              </motion.span>
            ) : (
              "Toevoegen aan winkelwagen"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function PurchasePanel({
  product,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow,
  addedToCart,
  addDisabled,
  buyDisabled,
  lowStock,
  compactTrust,
}: {
  product: Product;
  quantity: number;
  setQuantity: (n: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  addedToCart: boolean;
  addDisabled: boolean;
  buyDisabled: boolean;
  lowStock: number | null | undefined;
  compactTrust?: boolean;
}) {
  return (
    <div className="space-y-5">
      <p className="hidden text-3xl font-bold tabular-nums text-white lg:block">
        {product.price}
      </p>

      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-2 font-medium text-emerald-300">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
          Op voorraad
        </p>
        <p className="flex items-start gap-2 text-white/70">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={2} />
          Gratis levering binnen 3–5 dagen
        </p>
        {lowStock != null ? (
          <p className="flex items-center gap-2 font-medium text-amber-300">
            <Package className="h-4 w-4 shrink-0" strokeWidth={2} />
            Nog {lowStock} op voorraad
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="qty" className="text-xs font-semibold uppercase tracking-wide text-white/55">
          Aantal
        </label>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            aria-label="Aantal verlagen"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-lg font-medium text-white transition-colors hover:bg-white/20"
          >
            −
          </button>
          <input
            id="qty"
            readOnly
            value={quantity}
            className="h-10 w-14 rounded-2xl border border-white/20 bg-white/10 text-center text-sm font-semibold tabular-nums text-white"
          />
          <button
            type="button"
            aria-label="Aantal verhogen"
            onClick={() => setQuantity(Math.min(9, quantity + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-lg font-medium text-white transition-colors hover:bg-white/20"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <motion.button
          type="button"
          onClick={onBuyNow}
          disabled={buyDisabled}
          whileHover={{ scale: buyDisabled ? 1 : 1.02 }}
          whileTap={{ scale: buyDisabled ? 1 : 0.98 }}
          transition={{ duration: 0.2, ease: easeOut }}
          className="flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-white py-3.5 text-base font-semibold text-[#4a5260] shadow-md transition-all hover:bg-white/90 disabled:opacity-75"
        >
          Nu kopen - WhatsApp
        </motion.button>
        <motion.button
          type="button"
          onClick={onAddToCart}
          disabled={addDisabled}
          whileHover={{ scale: addDisabled ? 1 : 1.02 }}
          whileTap={{ scale: addDisabled ? 1 : 0.98 }}
          transition={{ duration: 0.2, ease: easeOut }}
          className="flex min-h-11 w-full items-center justify-center rounded-2xl border-2 border-white/25 bg-white/10 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20 disabled:opacity-70"
        >
          {addedToCart ? (
            <motion.span
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Check className="h-4 w-4 text-emerald-400" strokeWidth={2.5} />
              Toegevoegd aan winkelwagen
            </motion.span>
          ) : (
            "Toevoegen aan winkelwagen"
          )}
        </motion.button>
      </div>

      {!compactTrust ? (
        <div className="space-y-2 border-t border-white/15 pt-4 text-xs text-white/55">
          <p className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-white/35" strokeWidth={2} />
            Bestellen via WhatsApp — veilig en direct
          </p>
          <p className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-white/35" strokeWidth={2} />
            Eenvoudig retour — 30 dagen garantie
          </p>
        </div>
      ) : (
        <p className="text-center text-[11px] text-white/50">
          WhatsApp-bestelling · Eenvoudig retour
        </p>
      )}
    </div>
  );
}
