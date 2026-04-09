import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function NotFoundPage() {
  return (
    <motion.main
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center"
      style={{ backgroundColor: "var(--fh-bg)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="text-sm font-semibold text-white/50">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
        Pagina niet gevonden
      </h1>
      <p className="mt-3 max-w-md text-base text-white/70">
        De link klopt niet meer of de pagina bestaat niet. Ga naar de homepage of bekijk onze
        fietsen.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-6 text-sm font-semibold text-[#4a5260] transition-all hover:bg-white/90"
        >
          Home
        </Link>
        <Link
          to="/#bikes"
          className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition-all hover:bg-white/20"
        >
          Elektrische fietsen
        </Link>
      </div>
    </motion.main>
  );
}
