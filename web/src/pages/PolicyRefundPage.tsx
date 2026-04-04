import { ContentPageShell } from "../components/ContentPageShell.tsx";

export function PolicyRefundPage() {
  return (
    <ContentPageShell title="Refund policy" eyebrow="Policies">
      <p>We want you to be confident in every purchase from Fiets Haven.</p>
      <ul className="!mt-8 list-disc space-y-3 pl-5 marker:text-gray-400">
        <li>Returns accepted within 14 days of delivery</li>
        <li>Product must be unused and in original condition</li>
        <li>Refund processed within 5–7 days after approval</li>
      </ul>
    </ContentPageShell>
  );
}
