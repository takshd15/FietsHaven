import { ContentPageShell } from "../components/ContentPageShell.tsx";

export function PolicyDamagedPage() {
  return (
    <ContentPageShell title="Damaged or defective products" eyebrow="Policies">
      <p>
        If something arrives in poor condition, we’ll make it right—quickly and
        fairly.
      </p>
      <ul className="!mt-8 list-disc space-y-3 pl-5 marker:text-gray-400">
        <li>Contact us within 48 hours of delivery</li>
        <li>Provide photos of the damage</li>
        <li>Replacement or refund offered after review</li>
      </ul>
      <p className="!mt-8">
        Reach us at{" "}
        <a
          href="mailto:hello@fietshaven.com"
          className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
        >
          hello@fietshaven.com
        </a>{" "}
        with your order number.
      </p>
    </ContentPageShell>
  );
}
