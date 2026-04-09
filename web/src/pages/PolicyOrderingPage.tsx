import { ContentPageShell } from "../components/ContentPageShell.tsx";

export function PolicyOrderingPage() {
  return (
    <ContentPageShell title="Bestellen & levering" eyebrow="Beleid">
      <ul className="list-disc space-y-3 pl-5 marker:text-gray-400">
        <li>Tracking na aankoop beschikbaar</li>
        <li>Levertijd: 3–7 werkdagen, afhankelijk van je locatie</li>
      </ul>
    </ContentPageShell>
  );
}
