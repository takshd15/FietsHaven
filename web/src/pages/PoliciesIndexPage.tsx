import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const easeOut = "easeOut" as const;

const links = [
  {
    to: "/policies/ordering",
    title: "Ordering & delivery",
    desc: "Checkout, payments, tracking, and delivery timeframes.",
  },
  {
    to: "/policies/refund",
    title: "Refund policy",
    desc: "Returns, condition requirements, and refund timing.",
  },
  {
    to: "/policies/damaged",
    title: "Damaged or defective products",
    desc: "How to report issues and what we’ll do next.",
  },
] as const;

export function PoliciesIndexPage() {
  return (
    <motion.div
      className="min-h-screen bg-[#fafafa]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <main className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Policies
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Customer policies
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-600">
            Straightforward information on ordering, returns, and product
            issues—so you always know what to expect.
          </p>
          <ul className="mt-12 list-none space-y-4 p-0">
            {links.map(({ to, title, desc }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/80 transition-shadow hover:shadow-md"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 group-hover:underline group-hover:decoration-gray-300 group-hover:underline-offset-4">
                      {title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {desc}
                    </p>
                  </div>
                  <ChevronRight
                    className="mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-700"
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
