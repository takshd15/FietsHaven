import { motion, type Variants } from "framer-motion";

export type AccessoryCardVariant = "compact" | "showcase";

type AccessoryCardProps = {
  variant?: AccessoryCardVariant;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  buttonLabel?: string;
  buttonStyle?: "dark" | "muted";
  showcaseFooter?: string;
  showcaseButtonLabel?: string;
  showcaseButtonStyle?: "dark" | "muted";
  variants?: Variants;
};

const hoverTransition = { duration: 0.35, ease: "easeOut" as const };

export function AccessoryCard({
  variant = "compact",
  title,
  description,
  imageSrc,
  imageAlt,
  buttonLabel = "Buy now",
  buttonStyle = "dark",
  showcaseFooter,
  showcaseButtonLabel = "Buy now",
  showcaseButtonStyle = "dark",
  variants,
}: AccessoryCardProps) {
  if (variant === "showcase") {
    const showBtnClass =
      showcaseButtonStyle === "muted"
        ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
        : "bg-gray-900 text-white hover:bg-black";

    return (
      <motion.div variants={variants} className="h-full">
        <motion.div
          whileHover={{ y: -4 }}
          transition={hoverTransition}
          className="group flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-white shadow-sm shadow-gray-900/5 ring-1 ring-gray-200/70 transition-shadow duration-300 ease-out hover:shadow-lg hover:shadow-gray-900/10"
        >
          <div className="relative h-52 shrink-0 overflow-hidden bg-gray-100 sm:h-56 md:h-[240px]">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt ?? title}
                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                  Image
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col border-t border-gray-100 bg-white px-6 pb-6 pt-5">
            <h3 className="text-lg font-bold leading-snug text-gray-900">
              {title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
              {showcaseFooter ?? description}
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`mt-6 w-full shrink-0 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${showBtnClass}`}
            >
              {showcaseButtonLabel}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const btnClass =
    buttonStyle === "dark"
      ? "bg-gray-900 text-white hover:bg-black"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300";

  return (
    <motion.div variants={variants}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={hoverTransition}
        className="group flex flex-col overflow-hidden rounded-3xl bg-gray-50 p-6 shadow-sm shadow-gray-900/5 ring-1 ring-gray-200/60 transition-shadow duration-300 ease-out hover:shadow-lg hover:shadow-gray-900/8"
      >
        <div className="mx-auto flex h-40 w-full max-w-[200px] items-center justify-center overflow-hidden rounded-2xl bg-gray-200/90">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt ?? title}
              className="h-full w-full object-contain transition-transform duration-[450ms] ease-out will-change-transform group-hover:scale-105"
            />
          ) : (
            <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
              Product
            </span>
          )}
        </div>
        <h3 className="mt-6 text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${btnClass}`}
        >
          {buttonLabel}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
