import { ContentPageShell } from "../components/ContentPageShell.tsx";

export function PolicyOrderingPage() {
  return (
    <ContentPageShell title="Ordering & delivery" eyebrow="Policies">
      <p>
        We keep checkout simple and transparent so you can focus on your ride.
      </p>
      <ul className="!mt-8 list-disc space-y-3 pl-5 marker:text-gray-400">
        <li>Easy checkout process</li>
        <li>Secure payments</li>
        <li>Tracking provided after purchase</li>
        <li>Delivery time: 3–7 business days depending on location</li>
      </ul>
    </ContentPageShell>
  );
}
