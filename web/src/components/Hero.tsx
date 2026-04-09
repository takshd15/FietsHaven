import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { Link } from "react-router-dom";
import { publicAsset } from "../lib/publicAsset.ts";

const easeOut = "easeOut" as const;

const heroBikeSlides = [
  { src: publicAsset("hero/dubbele-accu.jpeg"), alt: "Elektrische fiets met dubbele accu" },
  { src: publicAsset("hero/mini.jpeg"), alt: "Elektrische fiets Mini" },
] as const;

const heroHeading = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const heroSub = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.14, ease: easeOut },
  },
};

const heroButtonsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.38 },
  },
};

const heroButton = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-7 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100";
const btnSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/35 bg-transparent px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10";

const SLIDE_INTERVAL_MS = 2500;

/** Full-bleed within the hero card; square on small screens to match product shots */
const heroImgClass =
  "absolute inset-0 h-full w-full object-contain object-center";

const heroImgSizes =
  "(min-width: 1280px) 640px, (min-width: 1024px) 48vw, 100vw";

function HeroImage() {
  const [index, setIndex] = useState(0);
  const [tabHidden, setTabHidden] = useState(
    () => typeof document !== "undefined" && document.hidden,
  );
  const touchStartX = useRef<number | null>(null);
  const len = heroBikeSlides.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (tabHidden) return;
    const id = window.setInterval(() => goNextRef.current(), SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [tabHidden]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 48) goPrev();
    else if (dx < -48) goNext();
  };

  return (
    <div
      className="relative flex min-h-0 w-full flex-1 flex-col lg:min-h-[480px]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="relative w-full overflow-hidden bg-neutral-950 px-0 pt-0 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:py-0"
        role="region"
        aria-roledescription="carousel"
        aria-label="Uitgelichte fietsen"
      >
        {/* Square viewport on mobile = full card width; desktop fills column height */}
        <div className="relative aspect-square w-full max-w-none min-h-0 lg:aspect-auto lg:min-h-[min(52vh,560px)] lg:flex-1 xl:min-h-[min(56vh,600px)]">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={heroBikeSlides[index].src}
              src={heroBikeSlides[index].src}
              alt={heroBikeSlides[index].alt}
              width={1080}
              height={1080}
              sizes={heroImgSizes}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: easeOut }}
              className={heroImgClass}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1.5 sm:px-3 lg:px-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goPrev();
            }}
            className="pointer-events-auto flex h-10 w-10 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors hover:bg-black/45 sm:h-10 sm:w-10"
            aria-label="Vorige fiets"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goNext();
            }}
            className="pointer-events-auto flex h-10 w-10 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors hover:bg-black/45 sm:h-10 sm:w-10"
            aria-label="Volgende fiets"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
          </button>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1 sm:bottom-4">
          {heroBikeSlides.map((_, i) => (
            <button
              key={heroBikeSlides[i].src}
              type="button"
              onClick={() => setIndex(i)}
              className="pointer-events-auto flex min-h-[44px] min-w-[44px] items-center justify-center p-2"
              aria-label={`Ga naar dia ${i + 1} van ${len}`}
              aria-current={i === index}
            >
              <span
                className={`block rounded-full transition-all ${
                  i === index ? "h-1.5 w-6 bg-white" : "h-1.5 w-1.5 bg-white/35 hover:bg-white/60"
                }`}
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-white/10 sm:rounded-3xl">
        <div className="relative z-10 grid gap-0 lg:grid-cols-2 lg:items-stretch">
          <div className="order-2 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:order-1 lg:py-16 lg:pl-12 lg:pr-6 xl:pl-14">
            <div className="max-w-xl">
              <motion.h1
                variants={heroHeading}
                initial="hidden"
                animate="visible"
                className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                Ontdek jouw perfecte rit
              </motion.h1>
              <motion.p
                variants={heroSub}
                initial="hidden"
                animate="visible"
                className="mt-4 text-base font-normal leading-relaxed text-white/70 sm:text-lg"
              >
                Ontdek onze collectie van hoogwaardige fietsen.
              </motion.p>
            </div>

            <motion.div
              className="mt-8 flex flex-wrap gap-3 sm:gap-4"
              variants={heroButtonsContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={heroButton}>
                <Link to="/#bikes" className={btnPrimary}>
                  <motion.span
                    className="inline-flex"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                  >
                    Bekijk fietsen
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div variants={heroButton}>
                <Link to="/#values" className={btnSecondary}>
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="inline-flex"
                  >
                    Meer informatie
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="order-1 flex min-h-0 w-full flex-col lg:order-2 lg:h-full lg:min-h-0">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}
