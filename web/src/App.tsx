import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext.tsx";
import { SiteLayout } from "./layouts/SiteLayout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ProductPage } from "./pages/ProductPage.tsx";
import { FAQPage } from "./pages/FAQPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import { PoliciesIndexPage } from "./pages/PoliciesIndexPage.tsx";
import { PolicyOrderingPage } from "./pages/PolicyOrderingPage.tsx";
import { PolicyRefundPage } from "./pages/PolicyRefundPage.tsx";
import { PolicyDamagedPage } from "./pages/PolicyDamagedPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/about" element={<Navigate to="/faq" replace />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/policies" element={<PoliciesIndexPage />} />
          <Route path="/policies/ordering" element={<PolicyOrderingPage />} />
          <Route path="/policies/refund" element={<PolicyRefundPage />} />
          <Route path="/policies/damaged" element={<PolicyDamagedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
