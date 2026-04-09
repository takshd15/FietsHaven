import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Headphones, Shield, Truck } from "lucide-react";
import { BikeShowcaseCarousel } from "../components/BikeShowcaseCarousel.tsx";
import { Hero } from "../components/Hero.tsx";
import { FeatureCard } from "../components/FeatureCard.tsx";
import { products } from "../data/catalog.ts";
import { publicAsset } from "../lib/publicAsset.ts";

const easeOut = "easeOut" as const;

const sectionPadX = "px-4 sm:px-6 lg:px-8";
const container = "mx-auto max-w-7xl";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const showcaseSlugs = ["v20-pro", "dubbele-accu", "e-bike-mini"] as const;

const bikesShowcase = showcaseSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => p != null);

const accessoryCards = [
  {
    title: "Slimme afstandsbediening",
    slug: "smart-key-remote",
    imageSrc: "/key-chain.jpeg",
    imageAlt: "Slimme fietssleutel afstandsbediening",
  },
  {
    title: "Essentials voor onderweg",
    slug: "ride-essentials",
    imageSrc: "/phone-holder.jpeg",
    imageAlt: "Essentials kit voor fietsers",
  },
] as const;

const btnPrimary =
  "inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-white px-6 text-[15px] font-semibold text-[#4a5260] shadow-md transition-all active:scale-[0.98] hover:bg-white/90 sm:min-h-11 sm:w-auto sm:px-8 sm:text-sm sm:shadow-sm sm:hover:scale-[1.01]";

const btnSecondary =
  "inline-flex min-h-12 w-full items-center justify-center rounded-2xl border-2 border-white/35 bg-white/12 px-4 py-3 text-[15px] font-semibold text-white transition-colors active:scale-[0.98] hover:bg-white/20 sm:min-h-10 sm:border sm:py-2.5 sm:text-sm";

/** Portret op mobiel, actie-landschap op tablet+ — volle kleur, geen filters */
const heroBgMobile = publicAsset("home/hero-mobile.png");
const heroBgDesktop = publicAsset("home/hero-desktop.png");

export function HomePage() {
  const location = useLocation();
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-50px" });
  const bikesRef = useRef(null);
  const bikesInView = useInView(bikesRef, { once: true, margin: "-60px" });
  const accessoriesRef = useRef(null);
  const accessoriesInView = useInView(accessoriesRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.hash, location.pathname]);

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--fh-bg)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="pointer-events-none absolute inset-0 min-h-full">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(max-width: 767px)" srcSet={heroBgMobile} />
          <img
            src={heroBgDesktop}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[52%_36%] md:object-[32%_52%] lg:object-[28%_50%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
      <main className="relative z-10 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Hero />

        {/* Trust bar */}
        <section
          id="values"
          ref={featuresRef}
          className={`border-y border-white/10 ${sectionPadX} py-10 sm:py-14 lg:py-16`}
          style={{ backgroundColor: "var(--fh-surface-lo)" }}
        >
          <div className={container}>
            <motion.div
              className="grid gap-8 sm:gap-8 md:grid-cols-3 md:gap-10 lg:gap-16"
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "show" : "hidden"}
            >
              <FeatureCard
                icon={Shield}
                title="Premium kwaliteit"
                description="Zorgvuldig afgewerkt."
                variants={staggerItem}
              />
              <FeatureCard
                icon={Truck}
                title="Snelle levering"
                description="Binnen enkele dagen bij je thuis."
                variants={staggerItem}
              />
              <FeatureCard
                icon={Headphones}
                title="Deskundige service"
                description="We helpen je graag verder."
                variants={staggerItem}
              />
            </motion.div>
          </div>
        </section>

        {/* Bikes grid */}
        <section
          id="bikes"
          ref={bikesRef}
          className={`${sectionPadX} py-12 sm:py-16 lg:py-20`}
        >
          <div className={container}>
            <motion.h2
              className="text-center text-[1.375rem] font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={bikesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Ontdek onze fietsen
            </motion.h2>

            <motion.ul
              className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={bikesInView ? "show" : "hidden"}
            >
              {bikesShowcase.map((bike) => (
                <motion.li key={bike.slug} variants={staggerItem}>
                  <article
                    className="flex h-full flex-col rounded-3xl p-1.5 ring-1 ring-white/15 sm:p-2"
                    style={{ backgroundColor: "var(--fh-surface)" }}
                  >
                    <div className="overflow-hidden rounded-2xl">
                      <BikeShowcaseCarousel
                        productLabel={bike.title}
                        images={bike.images}
                        imageAlt={bike.imageAlt}
                        imageAlts={bike.imageAlts}
                      />
                    </div>

                    <div className="mt-4 flex flex-1 flex-col px-2 pb-2">
                      {/* Title + price */}
                      <Link
                        to={`/product/${bike.slug}`}
                        className="text-base font-bold leading-snug text-white hover:underline hover:decoration-white/50"
                      >
                        {bike.title}
                      </Link>
                      <p className="mt-1 text-sm font-semibold tabular-nums text-white/75">
                        {bike.price}
                      </p>

                      {/* Inclusief collapsible */}
                      <details className="group mt-4 overflow-hidden rounded-2xl border border-white/15">
                        <summary className="flex cursor-pointer list-none select-none items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/90 marker:content-none hover:bg-white/8 [&::-webkit-details-marker]:hidden">
                          Inclusief
                          <ChevronDown
                            className="h-4 w-4 shrink-0 text-white/60 transition-transform group-open:rotate-180"
                            strokeWidth={2}
                          />
                        </summary>
                        <ul className="border-t border-white/10 px-4 pb-4 pt-3 space-y-1.5 text-sm text-white/75">
                          {bike.features.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </details>

                      {/* CTA */}
                      <Link
                        to={`/product/${bike.slug}`}
                        className={`${btnPrimary} mt-4 w-full text-center`}
                      >
                        Bekijk product
                      </Link>
                    </div>
                  </article>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-12 flex justify-center sm:mt-14"
              initial={{ opacity: 0, y: 10 }}
              animate={bikesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.15, ease: easeOut }}
            >
              <Link to="/product/v20-pro" className={btnPrimary}>
                Bekijk alle modellen
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Accessories */}
        <section
          id="accessories"
          ref={accessoriesRef}
          className={`border-t border-white/10 ${sectionPadX} py-12 sm:py-16 lg:py-20`}
          style={{ backgroundColor: "var(--fh-surface-lo)" }}
        >
          <div className={container}>
            <motion.h2
              className="text-[1.375rem] font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={accessoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Vind jouw perfecte accessoires
            </motion.h2>

            <motion.div
              className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-5 sm:max-w-5xl sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={accessoriesInView ? "show" : "hidden"}
            >
              {accessoryCards.map((item) => (
                <motion.article
                  key={item.slug}
                  variants={staggerItem}
                  className="flex flex-col overflow-hidden rounded-3xl border border-white/15 shadow-sm"
                  style={{ backgroundColor: "var(--fh-surface)" }}
                >
                  <div className="flex h-36 items-center justify-center px-3 py-3 sm:h-40 md:h-44"
                    style={{ backgroundColor: "var(--fh-surface-hi)" }}>
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="max-h-full max-w-[min(100%,11rem)] object-contain object-center sm:max-w-[55%]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                    <p className="text-sm font-bold text-white sm:text-base">{item.title}</p>
                    <Link
                      to={`/product/${item.slug}`}
                      className={`${btnSecondary} mt-3 sm:mt-4`}
                    >
                      Bekijk accessoires
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
