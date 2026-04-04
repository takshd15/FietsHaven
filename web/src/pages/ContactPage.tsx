import { Link } from "react-router-dom";
import { ContentPageShell } from "../components/ContentPageShell.tsx";

export function ContactPage() {
  return (
    <ContentPageShell title="Contact" eyebrow="We’re here to help">
      <p>
        Questions about an order, a product, or partnership? Send a note—we
        typically reply within one business day.
      </p>
      <div className="!mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/80">
          <p className="text-sm font-semibold text-gray-900">Email</p>
          <a
            href="mailto:hello@fietshaven.com"
            className="mt-2 block font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
          >
            hello@fietshaven.com
          </a>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/80">
          <p className="text-sm font-semibold text-gray-900">Phone</p>
          <a
            href="tel:+31201234567"
            className="mt-2 block font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
          >
            +31 20 123 4567
          </a>
        </div>
      </div>
      <address className="!mt-10 not-italic rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/80">
        <p className="text-sm font-semibold text-gray-900">Studio</p>
        <p className="mt-3 leading-relaxed">
          128 Canal Street
          <br />
          Amsterdam, NL 1013 KE
        </p>
      </address>
      <p className="!mt-10 text-sm text-gray-500">
        Policies and order questions? See{" "}
        <Link
          to="/faq"
          className="font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-gray-900 hover:decoration-gray-900"
        >
          FAQ
        </Link>{" "}
        or{" "}
        <Link
          to="/policies"
          className="font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-gray-900 hover:decoration-gray-900"
        >
          Policies
        </Link>
        .
      </p>
    </ContentPageShell>
  );
}
