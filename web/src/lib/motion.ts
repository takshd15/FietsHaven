/** Shared Framer Motion presets — consistent easing & timing site-wide */

export const EASE = [0.25, 0.1, 0.25, 1] as const;

export const DURATION = {
  fast: 0.22,
  normal: 0.4,
  slow: 0.55,
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: EASE },
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};

export const springTap = {
  type: "spring" as const,
  stiffness: 520,
  damping: 28,
};
