import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

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
    <motion.div variants={variants}>
      <div className="flex flex-col items-center px-1 text-center sm:items-start sm:px-0 sm:text-left">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 sm:mb-4 sm:h-12 sm:w-12">
          <Icon className="h-7 w-7 sm:h-6 sm:w-6" strokeWidth={1.25} />
        </div>
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-gray-900 sm:text-sm">
          {title}
        </h3>
        <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-gray-600 sm:text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
