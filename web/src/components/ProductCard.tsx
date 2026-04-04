import { motion, type Variants } from "framer-motion";

const easeOut = "easeOut" as const;

type ProductCardProps = {
  name: string;
  price: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  variants?: Variants;
  cta: "view" | "cart";
  logoSrc?: string;
};

export function ProductCard({
  name,
  price,
  description,
  imageSrc,
  imageAlt,
  variants,
  cta,
  logoSrc = "/logo.jpeg",
}: ProductCardProps) {
  const ctaLabel = cta === "cart" ? "Add to Cart" : "View Product";

  return (
    <motion.article variants={variants} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="group flex h-full cursor-default flex-col overflow-hidden rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/70 transition-shadow duration-300 ease-out hover:shadow-lg hover:ring-gray-200"
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gray-100">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-contain object-center p-4 transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-white/90 p-1 shadow-sm ring-1 ring-gray-200/80 backdrop-blur-sm">
            <img
              src={logoSrc}
              alt=""
              aria-hidden="true"
              className="h-5 w-auto max-w-[72px] object-contain opacity-90"
              width={72}
              height={20}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-1 flex-col text-left">
          <h3 className="text-lg font-bold leading-snug text-gray-900">{name}</h3>
          <p className="mt-1 text-xs font-medium tracking-wide text-gray-400">
            Fiets Haven
          </p>
          <p className="mt-3 text-lg font-bold tabular-nums text-gray-900">
            {price}
          </p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
            {description}
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="mt-5 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {ctaLabel}
          </motion.button>
        </div>
      </motion.div>
    </motion.article>
  );
}
