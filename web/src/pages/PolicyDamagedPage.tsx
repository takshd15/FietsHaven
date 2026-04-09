import { ContentPageShell } from "../components/ContentPageShell.tsx";

export function PolicyDamagedPage() {
  return (
    <ContentPageShell title="Beschadigde of defecte producten" eyebrow="Beleid">
      <ul className="list-disc space-y-3 pl-5 marker:text-gray-400">
        <li>Neem binnen 48 uur na levering contact op</li>
        <li>Stuur duidelijke foto’s van de schade</li>
        <li>Na beoordeling: vervanging of terugbetaling</li>
      </ul>
      <p className="!mt-8">
        Mail naar{" "}
        <a
          href="mailto:hello@fietshaven.com"
          className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
        >
          hello@fietshaven.com
        </a>{" "}
        met je bestelnummer.
      </p>
    </ContentPageShell>
  );
}
