import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const easeOut = "easeOut" as const;

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
  "inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-900 px-7 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90";
const btnSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-white/10 px-7 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-opacity hover:opacity-90";

const HERO_IMG = "/bike.jpeg";

function HeroImage() {
  return (
    <div className="relative min-h-[280px] lg:min-h-[460px] xl:min-h-[500px]">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-l from-transparent via-transparent to-black/30 lg:to-black/40" />
      <div className="relative flex h-full min-h-[280px] w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:min-h-[460px] lg:py-12">
        <img
          src={HERO_IMG}
          alt="Fiets Haven Urban E-Bike"
          className="h-auto w-full max-w-2xl object-contain object-center drop-shadow-[0_28px_56px_rgba(0,0,0,0.55)] sm:max-h-[min(88vh,520px)] sm:max-w-none lg:max-h-[min(86vh,600px)]"
          width={800}
          height={600}
          decoding="async"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-gradient-to-br from-zinc-800 via-neutral-900 to-black shadow-lg ring-1 ring-black/20 sm:rounded-xl">
        <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          <div className="order-2 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:order-1 lg:py-16 lg:pl-12 lg:pr-6 xl:pl-14">
            <div className="max-w-xl">
              <motion.h1
                variants={heroHeading}
                initial="hidden"
                animate="visible"
                className="text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.25rem]"
              >
                Discover your perfect ride
              </motion.h1>
              <motion.p
                variants={heroSub}
                initial="hidden"
                animate="visible"
                className="mt-4 text-base font-normal leading-relaxed text-zinc-300 sm:text-lg"
              >
                Explore our collection of high-performance bikes.
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
                    Shop bikes
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
                    Learn more
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="order-1 min-h-[240px] lg:order-2 lg:min-h-0">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}
