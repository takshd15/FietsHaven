import { motion } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = "easeOut" as const;

const sectionPadX = "px-6 lg:px-8";
const sectionY = "py-16 lg:py-20";

type ContentPageShellProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function ContentPageShell({ title, eyebrow, children }: ContentPageShellProps) {
  return (
    <motion.div
      className="min-h-screen bg-[#fafafa]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <main className={`${sectionPadX} ${sectionY}`}>
        <article className="mx-auto max-w-3xl">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-gray-600">
            {children}
          </div>
        </article>
      </main>
    </motion.div>
  );
}
