import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const easeOut = "easeOut" as const;

const faqs = [
  {
    q: "Hoe lang duurt de levering?",
    a: "3–7 werkdagen, afhankelijk van je adres.",
  },
  {
    q: "Kan ik retourneren?",
    a: "Ja, binnen 14 dagen na levering.",
  },
  {
    q: "Is de fiets compleet gemonteerd?",
    a: "Minimale montage; snel klaar.",
  },
  {
    q: "Leveren jullie internationaal?",
    a: "Ja, in geselecteerde regio’s.",
  },
] as const;

export function FAQPage() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: "var(--fh-bg)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <main className="px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Over Fietshaven
          </p>
          <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Veelgestelde vragen
          </h1>

          <motion.div
            className="mx-auto mt-10 max-w-md"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.05 }}
          >
            <div className="rounded-3xl border border-white/15 px-8 py-7 shadow-sm" style={{ backgroundColor: "var(--fh-surface)" }}>
              <img
                src="/logo.jpeg"
                alt="Fietshaven"
                className="mx-auto h-12 w-auto object-contain sm:h-14"
                height={56}
                width={160}
              />
            </div>
          </motion.div>

          <motion.section
            className="mt-12 rounded-3xl border border-white/15 p-8 shadow-sm sm:p-10"
            style={{ backgroundColor: "var(--fh-surface)" }}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.08 }}
          >
            <p className="text-lg font-medium leading-relaxed text-white/85">
              Fietshaven is er voor wie prestaties, stijl en betrouwbaarheid belangrijk vindt. We
              ontwerpen moderne elektrische fietsen en accessoires die je dagelijkse rit
              moeiteloos maken.
            </p>
            <div className="mt-8 border-t border-white/15 pt-8">
              <h2 className="text-lg font-bold text-white">Onze missie</h2>
              <p className="mt-3 leading-relaxed text-white/70">
                Stedelijke mobiliteit hoort verfijnd te aanvoelen—niet ingewikkeld. Elk product
                voldoet aan dezelfde lat: eerlijke materialen, doordacht design en service die je
                tijd respecteert.
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
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Antwoorden
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                  Korte antwoorden hieronder. Nog vragen?{" "}
                  <Link
                    to="/contact"
                    className="font-semibold text-white underline decoration-white/40 underline-offset-[5px] transition-colors hover:decoration-white"
                  >
                    Neem contact op
                  </Link>
                  .
                </p>
              </div>
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white sm:flex">
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
                    <details className="group overflow-hidden rounded-3xl border border-white/15 shadow-sm transition-shadow hover:shadow-md open:shadow-md" style={{ backgroundColor: "var(--fh-surface)" }}>
                      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 pr-4 text-left sm:px-6 sm:py-5 marker:content-none hover:bg-white/5 [&::-webkit-details-marker]:hidden">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-bold tabular-nums text-white group-open:bg-white group-open:text-[#4a5260]">
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-white sm:text-base">
                          {q}
                        </span>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white/60 transition-colors group-open:bg-white/15 group-open:text-white">
                          <ChevronIcon className="h-5 w-5 transition-transform group-open:rotate-180" />
                        </span>
                      </summary>
                      <div className="border-t border-white/12 px-5 pb-5 pt-4 sm:px-6" style={{ backgroundColor: "var(--fh-surface-lo)" }}>
                        <p className="pl-0 text-sm leading-relaxed text-white/70 sm:pl-12 sm:text-[15px]">
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
