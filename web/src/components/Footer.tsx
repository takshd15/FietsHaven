import { motion, useInView } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
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

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const social = [
  { Icon: IconFacebook, label: "Facebook" },
  { Icon: IconTwitter, label: "X" },
  { Icon: IconInstagram, label: "Instagram" },
  { Icon: IconYoutube, label: "YouTube" },
] as const;

export function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [email, setEmail] = useState("");

  function handleNewsletter(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <motion.footer
      ref={ref}
      id="contact"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-neutral-700 bg-neutral-800 px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 className="text-lg font-bold tracking-tight text-white">
            Schrijf je in voor de nieuwsbrief
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Tips, nieuwe producten en aanbiedingen—compact in je inbox.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="mt-6 flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-neutral-600 bg-neutral-700 shadow-sm sm:flex-row"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              E-mailadres
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Je e-mailadres"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-11 flex-1 border-0 bg-neutral-700 px-4 py-3 text-sm text-white placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/25"
            />
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-none bg-white px-6 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-200"
            >
              Inschrijven
            </button>
          </form>
        </div>

        <div className="lg:col-span-3">
          <p className="text-sm font-semibold text-white">Bezoek ons</p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-white/75">
            128 Canal Street
            <br />
            Amsterdam, NL 1013 KE
          </address>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            <span className="font-medium text-white">Openingstijden</span>
            <br />
            ma–za 10:00–18:00
            <br />
            zo gesloten
          </p>
          <p className="mt-4 text-sm">
            <a
              href="mailto:hello@fietshaven.com"
              className="text-white/75 transition-colors hover:text-white"
            >
              hello@fietshaven.com
            </a>
            <br />
            <a
              href="tel:+31201234567"
              className="text-white/75 transition-colors hover:text-white"
            >
              +31 20 123 4567
            </a>
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold text-white">Snel naar</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/75">
            {quickLinks.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold text-white">Beleid</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/75">
            {policyLinks.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <p className="text-sm font-semibold text-white">Volg ons</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {social.map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-700 text-white shadow-sm ring-1 ring-neutral-600 transition-colors hover:bg-neutral-600"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-neutral-700 pt-8">
        <p className="text-center text-xs text-white/70">
          © {new Date().getFullYear()} Fietshaven. Alle rechten voorbehouden.
        </p>
      </div>
    </motion.footer>
  );
}
