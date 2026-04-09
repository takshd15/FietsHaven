import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const easeOut = "easeOut" as const;

const links = [
  {
    to: "/policies/ordering",
    title: "Bestellen & levering",
    desc: "Betaling, tracking en levertijden.",
  },
  {
    to: "/policies/refund",
    title: "Retourbeleid",
    desc: "Retourvoorwaarden en terugbetaling.",
  },
  {
    to: "/policies/damaged",
    title: "Beschadigde producten",
    desc: "Melden en vervolgstappen.",
  },
] as const;

export function PoliciesIndexPage() {
  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: "var(--fh-bg)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <main className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Beleid
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Klantbeleid
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-600">
            Duidelijke informatie over bestellen, retourneren en producten—zodat je weet wat je
            kunt verwachten.
          </p>
          <ul className="mt-12 list-none space-y-4 p-0">
            {links.map(({ to, title, desc }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-neutral-900 group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4">
                      {title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{desc}</p>
                  </div>
                  <ChevronRight
                    className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-700"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </motion.div>
  );
}
