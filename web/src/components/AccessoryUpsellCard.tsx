import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

const easeOut = "easeOut" as const;

type AccessoryUpsellCardProps = {
  title: string;
  price: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  slug: string;
  variants?: Variants;
};

const btnAccessory =
  "flex min-h-11 w-full items-center justify-center rounded-xl bg-neutral-100 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-200/90 transition-colors hover:bg-neutral-200";

export function AccessoryUpsellCard({
  title,
  price,
  description,
  imageSrc,
  imageAlt,
  slug,
  variants,
}: AccessoryUpsellCardProps) {
  return (
    <motion.div variants={variants} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/80 transition-shadow duration-300 hover:shadow-md"
      >
        <Link
          to={`/product/${slug}`}
          className="relative block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-neutral-100">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-contain object-center p-4 transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-white/90 p-1.5 shadow-sm ring-1 ring-gray-200/70">
              <img
                src="/logo.jpeg"
                alt=""
                aria-hidden="true"
                className="h-4 w-auto max-w-[52px] object-contain opacity-90"
                width={52}
                height={16}
              />
            </div>
          </div>
        </Link>
        <Link
          to={`/product/${slug}`}
          className="mt-5 block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-lg font-bold tabular-nums text-gray-900">
            {price}
          </p>
        </Link>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
          {description}
        </p>
        <Link to={`/product/${slug}`} className="mt-6 block w-full">
          <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className={btnAccessory}
          >
            View details
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
