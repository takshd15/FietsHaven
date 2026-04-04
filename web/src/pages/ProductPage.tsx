import { Navigate, useParams } from "react-router-dom";
import { getProductBySlug } from "../data/catalog.ts";
import { ProductDetail } from "../components/ProductDetail.tsx";

export function ProductPage() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  if (!product) return <Navigate to="/" replace />;
  return <ProductDetail product={product} />;
}
