import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { Link } from "react-router-dom";
import { publicAsset } from "../lib/publicAsset.ts";

const easeOut = "easeOut" as const;

const heroBikeSlides = [
  { src: publicAsset("hero/v20-pro.jpeg"), alt: "Elektrische fiets v20 Pro" },
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
  "inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-2xl bg-white px-6 text-[15px] font-semibold text-[#4a5260] shadow-md transition-all active:scale-[0.98] hover:bg-white/90 sm:min-h-11 sm:w-auto sm:px-7 sm:text-sm sm:shadow-sm sm:hover:scale-[1.01]";
const btnSecondary =
  "inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-2xl border-2 border-white/70 bg-white/95 px-6 text-[15px] font-semibold text-[#4a5260] shadow-md transition-all active:scale-[0.98] hover:bg-white sm:min-h-11 sm:w-auto sm:border-white/60 sm:px-7 sm:text-sm sm:shadow-sm sm:hover:scale-[1.01]";

const SLIDE_INTERVAL_MS = 2500;

/** Full-bleed within the hero card; square on small screens to match product shots */
const heroImgClass =
  "absolute inset-0 h-full w-full object-contain object-center drop-shadow-[0_20px_48px_rgba(0,0,0,0.5)] sm:drop-shadow-[0_28px_56px_rgba(0,0,0,0.55)]";

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
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-l from-transparent via-transparent to-[#5c6370]/40 lg:to-[#5c6370]/50" />
      <div
        className="relative w-full overflow-hidden px-0 pt-0 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:py-0"
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
            className="pointer-events-auto flex h-10 w-10 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-white/25 sm:h-10 sm:w-10"
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
            className="pointer-events-auto flex h-10 w-10 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-white/25 sm:h-10 sm:w-10"
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
    <section
      id="home"
      className="px-[max(1rem,env(safe-area-inset-left))] pb-10 pt-[max(1.5rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 sm:pb-12 sm:pt-8 lg:px-8 lg:pb-16 lg:pt-10"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#7a8494]/95 via-[#6d7784]/95 to-[#5c6370]/95 shadow-lg ring-1 ring-white/20 backdrop-blur-[2px] sm:rounded-3xl sm:from-[#7a8494] sm:via-[#6d7784] sm:to-[#5c6370] sm:ring-white/15 sm:backdrop-blur-none">
        <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          {/* Mobiel: eerst kop + knoppen, daarna beeld — betere lees- en tikvolgorde */}
          <div className="order-1 flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-12 lg:order-1 lg:py-16 lg:pl-12 lg:pr-6 xl:pl-14">
            <div className="mx-auto w-full max-w-xl text-center sm:mx-0 sm:text-left">
              <motion.h1
                variants={heroHeading}
                initial="hidden"
                animate="visible"
                className="text-[1.65rem] font-bold leading-[1.1] tracking-tight text-white sm:text-3xl sm:leading-[1.08] md:text-4xl lg:text-5xl xl:text-[3.25rem]"
              >
                Ontdek jouw perfecte rit
              </motion.h1>
              <motion.p
                variants={heroSub}
                initial="hidden"
                animate="visible"
                className="mt-3 text-[15px] font-normal leading-relaxed text-white/85 sm:mt-4 sm:text-lg sm:text-white/75"
              >
                Ontdek onze collectie van hoogwaardige fietsen.
              </motion.p>
            </div>

            <motion.div
              className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:mx-0 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4"
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

          <div className="order-2 flex min-h-0 w-full flex-col lg:order-2 lg:h-full lg:min-h-0">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}
