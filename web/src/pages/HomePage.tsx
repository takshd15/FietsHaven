import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Headphones, Shield, Truck } from "lucide-react";
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

const showcaseSlugs = ["v20-pro", "dubbele-accu", "e-bike-mini"] as const;

const bikesShowcase = showcaseSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => p != null);

const accessoryCards = [
  {
    title: "Smart key remote",
    slug: "smart-key-remote",
    imageSrc: "/key-chain.jpeg",
    imageAlt: "Smart bike key remote",
  },
  {
    title: "Ride essentials",
    slug: "ride-essentials",
    imageSrc: "/phone-holder.jpeg",
    imageAlt: "Cycling essentials kit",
  },
] as const;

const btnDark =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90";
const btnOutline =
  "inline-flex min-h-10 w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100";

export function HomePage() {
  const location = useLocation();
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-50px" });

  const bikesRef = useRef(null);
  const bikesInView = useInView(bikesRef, { once: true, margin: "-60px" });

  const accessoriesRef = useRef(null);
  const accessoriesInView = useInView(accessoriesRef, {
    once: true,
    margin: "-50px",
  });

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.hash, location.pathname]);

  return (
    <motion.div
      className="min-h-screen bg-[#fafafa]"
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
          className={`border-y border-gray-200/90 bg-white ${sectionPadX} py-12 sm:py-14 lg:py-16`}
        >
          <div className={`${container}`}>
            <motion.div
              className="grid gap-10 sm:gap-8 md:grid-cols-3 md:gap-10 lg:gap-16"
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "show" : "hidden"}
            >
              <FeatureCard
                icon={Shield}
                title="Premium quality"
                description="Exceptional craftsmanship."
                variants={staggerItem}
              />
              <FeatureCard
                icon={Truck}
                title="Fast shipping"
                description="Prompt delivery to your doorstep."
                variants={staggerItem}
              />
              <FeatureCard
                icon={Headphones}
                title="Expert support"
                description="Professional assistance available."
                variants={staggerItem}
              />
            </motion.div>
          </div>
        </section>

        {/* Explore bikes — 3-column grid */}
        <section
          id="bikes"
          ref={bikesRef}
          className={`${sectionPadX} py-14 sm:py-16 lg:py-20`}
        >
          <div className={`${container}`}>
            <motion.h2
              className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={bikesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Electric bikes
            </motion.h2>

            <motion.ul
              className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={bikesInView ? "show" : "hidden"}
            >
              {bikesShowcase.map((bike) => {
                return (
                  <motion.li key={bike.slug} variants={staggerItem}>
                    <article className="flex h-full flex-col text-left">
                      <div className="rounded-md bg-neutral-200/80 p-1.5 ring-1 ring-gray-200/80 sm:p-2">
                        <BikeShowcaseCarousel productLabel={bike.title} />
                      </div>
                      <div className="mt-4 flex flex-1 flex-col">
                        <Link
                          to={`/product/${bike.slug}`}
                          className="text-base font-bold leading-snug text-gray-900 hover:underline"
                        >
                          {bike.title}
                        </Link>
                        <p className="mt-1 text-sm font-semibold tabular-nums text-gray-900">
                          Price: {bike.price}
                        </p>
                        <div className="mt-3 border-t border-gray-200/90 pt-3">
                          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Includes:
                          </p>
                          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-gray-600">
                            {bike.features.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <Link
                          to={`/product/${bike.slug}`}
                          className={`${btnDark} mt-5 w-full text-center sm:mt-6`}
                        >
                          View product
                        </Link>
                      </div>
                    </article>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              className="mt-12 flex justify-center sm:mt-14"
              initial={{ opacity: 0, y: 10 }}
              animate={bikesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.15, ease: easeOut }}
            >
              <Link to="/product/v20-pro" className={btnDark}>
                View all models
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Accessories */}
        <section
          id="accessories"
          ref={accessoriesRef}
          className={`border-t border-gray-200/90 bg-white ${sectionPadX} py-14 sm:py-16 lg:py-20`}
        >
          <div className={`${container}`}>
            <motion.h2
              className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={
                accessoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Find your perfect bike accessories
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
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm"
                >
                  <div className="flex h-36 items-center justify-center bg-neutral-100/90 px-3 py-3 sm:h-40 md:h-44">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="max-h-full max-w-[min(100%,11rem)] object-contain object-center sm:max-w-[55%]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                    <p className="text-sm font-bold text-gray-900 sm:text-base">
                      {item.title}
                    </p>
                    <Link
                      to={`/product/${item.slug}`}
                      className={`${btnOutline} mt-3 text-sm sm:mt-4`}
                    >
                      Shop accessories
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
