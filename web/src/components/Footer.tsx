import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Fietsen", to: "/#bikes" },
  { label: "Accessoires", to: "/#accessories" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

const policyLinks = [
  { label: "Beleidsoverzicht", to: "/policies" },
  { label: "Bestellen & levering", to: "/policies/ordering" },
  { label: "Retourbeleid", to: "/policies/refund" },
  { label: "Beschadigde producten", to: "/policies/damaged" },
] as const;

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608C4.533 2.357 5.8 2.069 7.166 2.007 8.432 1.95 8.812 1.938 12 1.938zm0 1.802c-3.142 0-3.528.012-4.768.068-1.197.056-1.847.263-2.28.492-.571.33-1.01.77-1.34 1.34-.229.433-.436 1.083-.492 2.28-.056 1.24-.068 1.626-.068 4.768s.012 3.528.068 4.768c.056 1.197.263 1.847.492 2.28.33.57.77 1.01 1.34 1.34.433.229 1.083.436 2.28.492 1.24.056 1.626.068 4.768.068s3.528-.012 4.768-.068c1.197-.056 1.847-.263 2.28-.492.57-.33 1.01-.77 1.34-1.34.229-.433.436-1.083.492-2.28.056-1.24.068-1.626.068-4.768s-.012-3.528-.068-4.768c-.056-1.197-.263-1.847-.492-2.28-.33-.57-.77-1.01-1.34-1.34-.433-.229-1.083-.436-2.28-.492-1.24-.056-1.626-.068-4.768-.068zm0 3.51a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zm0 11.25a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm7.086-11.69a1.687 1.687 0 11-3.375 0 1.687 1.687 0 013.375 0z" />
    </svg>
  );
}

const social = [
  { Icon: IconFacebook, label: "Facebook" },
  { Icon: IconTwitter, label: "X" },
  { Icon: IconInstagram, label: "Instagram" },
] as const;

export function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.footer
      ref={ref}
      id="contact"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-neutral-200 bg-white px-4 py-14 text-neutral-900 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] text-neutral-900">FIETS HAVEN</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
            Elektrische fietsen en accessoires — eenvoudig bestellen via WhatsApp.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-medium tracking-widest text-neutral-500">Shop</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-neutral-700">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-neutral-900">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest text-neutral-500">Beleid</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-neutral-700">
              {policyLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-neutral-900">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-widest text-neutral-500">Volg ons</p>
          <div className="flex gap-2">
            {social.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:text-neutral-900"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-neutral-200 pt-8">
        <p className="text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Fiets Haven. Alle rechten voorbehouden.
        </p>
      </div>
    </motion.footer>
  );
}
