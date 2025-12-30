import { Suspense } from "react";
import BlogsPage from ".";
import ProductDetail from ".";

export default function BlogContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetail />
    </Suspense>
  );
}
