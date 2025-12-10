import { Suspense } from "react";
import BlogsPage from ".";

export default function BlogContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsPage />
    </Suspense>
  );
}
