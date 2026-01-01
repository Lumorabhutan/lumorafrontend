"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import apiClient from "@/app/api/apiClient";
import { getApiEndpoint } from "@/app/api";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

interface BlogItem {
  id: number;
  title: string;
  content: string;
  published_at: Date;
  images: string[];
  createdAt: string;
}

interface CategoryResponse {
  id: number;
  published_at:Date;
  items: BlogItem[];
}

/* ================= CONSTANTS ================= */

const ITEMS_PER_LOAD = 6;

/* ================= SKELETON ================= */

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
    <div className="h-60 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-300 rounded w-4/5" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="flex justify-between pt-4">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>
    </div>
  </div>
);

/* ================= COMPONENT ================= */

const BlogSection = () => {
  const [blogs, setBlogs] = React.useState<CategoryResponse[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = React.useState<CategoryResponse[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const router = useRouter();
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const lastBlogRef = React.useRef<HTMLDivElement | null>(null);

  /* ================= FETCH BLOGS ================= */

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get(
          getApiEndpoint.getBlogs("Content")
        );
        const data = response.data.data || [];

        setBlogs(data);
        setDisplayedBlogs(data.slice(0, ITEMS_PER_LOAD));
        setHasMore(data.length > ITEMS_PER_LOAD);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ================= INFINITE SCROLL ================= */

  React.useEffect(() => {
    if (loading || loadingMore || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "300px" }
    );

    if (lastBlogRef.current) {
      observerRef.current.observe(lastBlogRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [displayedBlogs, loadingMore, hasMore]);

  const loadMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      const next = blogs.slice(
        displayedBlogs.length,
        displayedBlogs.length + ITEMS_PER_LOAD
      );

      setDisplayedBlogs((prev) => [...prev, ...next]);
      setHasMore(displayedBlogs.length + next.length < blogs.length);
      setLoadingMore(false);
    }, 700);
  };

  /* ================= LOADING STATE ================= */

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 space-y-4">
            <div className="h-10 w-96 mx-auto bg-gray-300 rounded animate-pulse" />
            <div className="h-6 w-72 mx-auto bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ================= EMPTY STATE ================= */

  if (!blogs.length) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-gray-500 text-lg">No blog posts available yet.</p>
      </section>
    );
  }
  /* ================= UI ================= */
  return (
    <section className="py-0 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
Blogs            <span className="block h-1 w-20 bg-gradient-to-r from-green-500 to-green-700 mx-auto mt-4 rounded-full" />
          </h2>
       
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((category, index) => {
            const post = category.items?.[0];
            if (!post) return null;

            const isLast = index === displayedBlogs.length - 1;

            return (
              <article
                key={category.id}
                ref={isLast ? lastBlogRef : null}
                onClick={() =>
                  router.push(`/blog-content?id=${category.id}`)
                }
                className="
                  group cursor-pointer bg-white rounded-2xl overflow-hidden
                  border border-gray-100 shadow-sm
                  hover:shadow-2xl hover:-translate-y-1
                  transition-all duration-500
                "
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={post.images?.[0] || "/Beautiful Dzong.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-green-700 shadow">
                    Bhutan Stories
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.content.length > 150
                      ? `${post.content.slice(0, 150).trim()}...`
                      : post.content}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(category.published_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Load More Skeleton */}
        {loadingMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* End Message */}
        {!hasMore && displayedBlogs.length > ITEMS_PER_LOAD && (
          <div className="text-center py-14 text-gray-500 italic">
            You’ve reached the end of our stories. More coming soon 🌿
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
