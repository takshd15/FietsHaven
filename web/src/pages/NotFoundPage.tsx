import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function NotFoundPage() {
  return (
    <motion.main
      className="flex min-h-[60vh] flex-col items-center justify-center bg-[#fafafa] px-6 py-20 text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="text-sm font-semibold text-gray-500">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-base text-gray-600">
        The link may be broken or the page was removed. Try the homepage or our
        bikes section.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gray-900 px-6 text-sm font-semibold text-white hover:bg-black"
        >
          Home
        </Link>
        <Link
          to="/#bikes"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Electric bikes
        </Link>
      </div>
    </motion.main>
  );
}
