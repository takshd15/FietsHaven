import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";

export function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
