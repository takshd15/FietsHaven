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
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-900">
          <Icon className="h-6 w-6" strokeWidth={1.25} />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
