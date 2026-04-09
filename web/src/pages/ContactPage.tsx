import { Link } from "react-router-dom";
import { ContentPageShell } from "../components/ContentPageShell.tsx";

export function ContactPage() {
  return (
    <ContentPageShell title="Contact" eyebrow="We helpen je graag">
      <p>
        Vragen over een bestelling, product of samenwerking? Stuur een bericht—we reageren meestal
        binnen één werkdag.
      </p>
      <div className="!mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md" style={{ backgroundColor: "var(--fh-surface)" }}>
          <p className="text-sm font-semibold text-gray-900">E-mail</p>
          <a
            href="mailto:hello@fietshaven.com"
            className="mt-2 block font-medium text-gray-900 underline decoration-gray-400 underline-offset-4 hover:decoration-gray-900"
          >
            hello@fietshaven.com
          </a>
        </div>
        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md" style={{ backgroundColor: "var(--fh-surface)" }}>
          <p className="text-sm font-semibold text-gray-900">Telefoon</p>
          <a
            href="tel:+31201234567"
            className="mt-2 block font-medium text-gray-900 underline decoration-gray-400 underline-offset-4 hover:decoration-gray-900"
          >
            +31 20 123 4567
          </a>
        </div>
      </div>
      <address className="!mt-10 not-italic rounded-3xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md" style={{ backgroundColor: "var(--fh-surface)" }}>
        <p className="text-sm font-semibold text-gray-900">Studio</p>
        <p className="mt-3 leading-relaxed">
          128 Canal Street
          <br />
          Amsterdam, NL 1013 KE
        </p>
      </address>
      <p className="!mt-10 text-sm text-gray-600">
        Beleid en bestellingen? Zie{" "}
        <Link
          to="/faq"
          className="font-medium text-gray-900 underline decoration-gray-400 underline-offset-4 hover:decoration-gray-900"
        >
          FAQ
        </Link>{" "}
        of{" "}
        <Link
          to="/policies"
          className="font-medium text-gray-900 underline decoration-gray-400 underline-offset-4 hover:decoration-gray-900"
        >
          Beleid
        </Link>
        .
      </p>
    </ContentPageShell>
  );
}
