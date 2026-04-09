import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { EASE } from "../lib/motion.ts";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  variants?: Variants;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variants,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -4,
        transition: { duration: 0.28, ease: EASE },
      }}
    >
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-900">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-semibold text-neutral-900">
          {title}
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
