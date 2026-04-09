import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { EASE } from "../lib/motion.ts";

/**
 * Cross-fade + slight vertical motion between routes (premium, subtle).
 */
export function AnimatedOutlet() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.36, ease: EASE }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
