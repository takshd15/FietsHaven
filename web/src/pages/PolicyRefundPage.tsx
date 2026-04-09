import { ContentPageShell } from "../components/ContentPageShell.tsx";

export function PolicyRefundPage() {
  return (
    <ContentPageShell title="Retourbeleid" eyebrow="Beleid">
      <ul className="list-disc space-y-3 pl-5 marker:text-gray-400">
        <li>Retour binnen 14 dagen na levering mogelijk</li>
        <li>Product ongebruikt en in originele staat</li>
        <li>Terugbetaling binnen 5–7 dagen na goedkeuring</li>
      </ul>
    </ContentPageShell>
  );
}
