import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const easeOut = "easeOut" as const;

const faqs = [
  {
    q: "How long does delivery take?",
    a: "3–7 business days depending on location.",
  },
  {
    q: "Do you offer returns?",
    a: "Yes, within 14 days of delivery.",
  },
  {
    q: "Is the bike fully assembled?",
    a: "Minimal setup required.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, selected regions.",
  },
] as const;

export function FAQPage() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen bg-[#fafafa]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <main className="px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
            About Fiets Haven
          </p>
          <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            FAQ
          </h1>

          <motion.div
            className="mx-auto mt-10 max-w-md"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.05 }}
          >
            <div className="rounded-2xl bg-white px-8 py-7 shadow-sm ring-1 ring-gray-200/80">
              <img
                src="/logo.jpeg"
                alt="Fiets Haven"
                className="mx-auto h-12 w-auto object-contain sm:h-14"
                height={56}
                width={160}
              />
            </div>
          </motion.div>

          <motion.section
            className="mt-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.08 }}
          >
            <p className="text-lg font-medium leading-relaxed text-gray-800">
              Fiets Haven is built for riders who value performance, style, and
              reliability. We design modern electric bikes and accessories that
              make everyday travel effortless.
            </p>
            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-lg font-bold text-gray-900">Our mission</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We believe urban mobility should feel refined—not complicated.
                Every product we ship is held to the same standard: honest
                materials, thoughtful design, and support that respects your time.
              </p>
            </div>
          </motion.section>

          <motion.div
            className="mt-14"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.12 },
              },
            }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  Common questions
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
                  Quick answers below. Still stuck?{" "}
                  <Link
                    to="/contact"
                    className="font-semibold text-gray-900 underline decoration-gray-300 underline-offset-[5px] transition-colors hover:decoration-gray-900"
                  >
                    Contact us
                  </Link>
                  .
                </p>
              </div>
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white sm:flex">
                <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
            </div>

            <ul className="mt-8 list-none space-y-3 p-0">
              {faqs.map(({ q, a }, i) => (
                <motion.li
                  key={q}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: easeOut },
                    },
                  }}
                >
                  <details className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition-[box-shadow,border-color] hover:border-gray-300/90 hover:shadow-md open:border-gray-200 open:shadow-md">
                    <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 pr-4 text-left sm:px-6 sm:py-5 marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold tabular-nums text-gray-600 group-open:bg-gray-900 group-open:text-white">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-gray-900 sm:text-base">
                        {q}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-colors group-open:bg-gray-100 group-open:text-gray-800">
                        <ChevronIcon className="h-5 w-5 transition-transform group-open:rotate-180" />
                      </span>
                    </summary>
                    <div className="border-t border-gray-100 bg-gray-50/80 px-5 pb-5 pt-4 sm:px-6">
                      <p className="pl-0 text-sm leading-relaxed text-gray-600 sm:pl-12 sm:text-[15px]">
                        {a}
                      </p>
                    </div>
                  </details>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
