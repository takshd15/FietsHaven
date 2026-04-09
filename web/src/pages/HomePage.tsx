import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Headphones, Shield, Truck } from "lucide-react";
import { BikeShowcaseCarousel } from "../components/BikeShowcaseCarousel.tsx";
import { Hero } from "../components/Hero.tsx";
import { FeatureCard } from "../components/FeatureCard.tsx";
import { products } from "../data/catalog.ts";

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

const showcaseSlugs = ["dubbele-accu", "e-bike-mini"] as const;

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
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-8 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100";

const btnSecondary =
  "inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50";

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
      className="min-h-screen"
      style={{ backgroundColor: "var(--fh-bg)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <main>
        <Hero />

        {/* Trust bar */}
        <section
          id="values"
          ref={featuresRef}
          className={`border-y border-gray-200/70 ${sectionPadX} py-12 sm:py-14 lg:py-16`}
          style={{ backgroundColor: "var(--fh-surface-lo)" }}
        >
          <div className={container}>
            <motion.div
              className="grid gap-10 sm:gap-8 md:grid-cols-3 md:gap-10 lg:gap-16"
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
          className={`${sectionPadX} py-14 sm:py-16 lg:py-20`}
        >
          <div className={container}>
            <motion.h2
              className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={bikesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Ontdek onze fietsen
            </motion.h2>

            <motion.ul
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={bikesInView ? "show" : "hidden"}
            >
              {bikesShowcase.map((bike) => (
                <motion.li key={bike.slug} variants={staggerItem}>
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 p-2"
                    style={{ backgroundColor: "var(--fh-surface)" }}
                  >
                    <div className="overflow-hidden rounded-xl">
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
                        className="text-base font-bold leading-snug text-gray-900 hover:underline hover:decoration-gray-400"
                      >
                        {bike.title}
                      </Link>
                      <p className="mt-1 text-sm font-semibold tabular-nums text-gray-700">
                        {bike.price}
                      </p>

                      {/* Inclusief collapsible */}
                      <details className="group mt-4 overflow-hidden rounded-xl border border-gray-200">
                        <summary className="flex cursor-pointer list-none select-none items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-900 marker:content-none hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                          Inclusief
                          <ChevronDown
                            className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                            strokeWidth={2}
                          />
                        </summary>
                        <ul className="border-t border-gray-200 px-4 pb-4 pt-3 space-y-1.5 text-sm text-gray-700">
                          {bike.features.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
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
              <Link to="/product/dubbele-accu" className={btnPrimary}>
                Bekijk alle modellen
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Accessories */}
        <section
          id="accessories"
          ref={accessoriesRef}
          className={`border-t border-gray-200/70 ${sectionPadX} py-14 sm:py-16 lg:py-20`}
          style={{ backgroundColor: "var(--fh-surface-lo)" }}
        >
          <div className={container}>
            <motion.h2
              className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={accessoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Vind jouw perfecte accessoires
            </motion.h2>

            <motion.div
              className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-5 sm:max-w-5xl sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={accessoriesInView ? "show" : "hidden"}
            >
              {accessoryCards.map((item) => (
                <motion.article
                  key={item.slug}
                  variants={staggerItem}
                  className="flex flex-col overflow-hidden rounded-2xl border border-gray-200"
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
                    <p className="text-sm font-bold text-gray-900 sm:text-base">{item.title}</p>
                    <Link
                      to={`/product/${item.slug}`}
                      className={`${btnSecondary} mt-3 text-sm sm:mt-4`}
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
