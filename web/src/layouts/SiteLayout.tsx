import { Footer } from "../components/Footer.tsx";
import { Navbar } from "../components/Navbar.tsx";
import { RouteShell } from "../components/RouteShell.tsx";
import { ScrollToTop } from "../components/ScrollToTop.tsx";
import { AnimatedOutlet } from "./AnimatedOutlet.tsx";

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <RouteShell />
      <Navbar />
      <AnimatedOutlet />
      <Footer />
    </>
  );
}
