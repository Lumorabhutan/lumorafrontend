"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/app/api/apiClient";
import { getApiEndpoint } from "@/app/api";
import { useRouter, useSearchParams } from "next/navigation";
import ItineraryDay from "@/component/itinerary/blogIteneary";

interface BlogItem {
  id: number;
  blog_id: number;
  title: string;
  link: string;
  content: string;
  images: string[];
  subcontents?: string[];
  createdAt: string;
  published_at: Date;
}

interface CategoryResponse {
  id: number;
  published_at: Date;
  category: string;
  items: BlogItem[];
}

export default function BlogsItineraryPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [subcontent, setSubcontent] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const idNumber = Number(id);
  const router = useRouter();

  const rotateData = (data: CategoryResponse[]) =>
    data.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        category: cat.category,
        published_at: cat.published_at,
      }))
    );

  const fetchBlogs = async (categoryId: number) => {
    try {
      const res = await apiClient.get(getApiEndpoint.getBlogById(categoryId));
      const response = await apiClient.get(getApiEndpoint.getBlogs("Content"));
      setSubcontent(response.data.data);
      setBlogs(rotateData(res.data.data));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!idNumber) return;
    fetchBlogs(idNumber);
  }, [idNumber]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
      {/* Main Timeline */}
      <div className="flex-1 relative">
        <h1 className="text-3xl font-bold mb-2 text-center">Travl Blogs</h1>

        {/* Vertical Timeline Line */}

        <div className="space-y-12">
          {blogs.map((blog, idx) => (
            <div key={blog.id} className="relative md:pl-16">
              {/* Timeline Marker */}

              <ItineraryDay
                dayNumber={``}
                title={blog.title}
                content={blog.subcontents || blog.content}
                leftImages={blog.images.slice(0, 2).map((src) => ({ src, alt: blog.title }))}
                rightImage={blog.images[2]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Categories */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        <h2 className="text-xl font-semibold mb-4">Other Categories</h2>
        {subcontent.map((category, idx) => (
          <div
            key={idx}
            className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition p-2"
            onClick={() => {
              router.push(`/blog-content?id=${category.id}`);
              fetchBlogs(category.id);
            }}
          >
            <img
              src={category.items[0].images[0]}
              alt={category.items[0].title}
              className="rounded-lg w-full h-48 object-cover mb-2"
            />
            <h3 className="font-semibold hover:text-lime-600 hover:underline">
              {category.items[0].title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {category.items[0].content.length > 100
                ? `${category.items[0].content.slice(0, 100)}...`
                : category.items[0].content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
