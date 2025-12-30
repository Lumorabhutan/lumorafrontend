"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart, ShoppingBag } from "lucide-react";
import { getApiEndpoint } from "../api";
import apiClient from "../api/apiClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart, Product } from "@/component/shopping-ui/product/cartContext";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState("/Beautiful Dzong.jpg");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const router = useRouter();
  const { addToCart } = useCart();

  // Fetch main product
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await apiClient.get(getApiEndpoint.getProductById(id));
        const data: Product = response.data.product;
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const res = await apiClient.get(getApiEndpoint.getproduct());
        const productsData: Product[] = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
        setRelatedProducts(productsData.filter((p) => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
    fetchRelatedProducts();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-10">
      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-10 bg-white shadow-lg rounded-xl p-6">
        {/* Left - Images */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
            <Image
              src={selectedImage}
              alt={product.product_name}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex gap-3 mt-2 overflow-x-auto">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className={`w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  selectedImage === img ? "border-green-500 scale-105" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-gray-900">{product.product_name}</h1>
          <p className="text-sm text-gray-500">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <p className="text-sm">
            Availability:{" "}
            <span className={`font-medium ${product.stock_quantity! ? "text-green-600" : "text-green-600"}`}>
              {product.stock_quantity! >0  ? "In Stock" : "In Stock"}
            </span>
          </p>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-600">${product.final_price}</p>
            {product.discount_percent  && (
              <p className="text-gray-400 line-through">${product.original_price}</p>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-none"
              >
                <Minus />
              </Button>
              <span className="px-4 font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.min( quantity + 1))}
                className="h-10 w-10 rounded-none"
              >
                <Plus />
              </Button>
            </div>

            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-6 h-10 flex items-center gap-2"
              disabled={product.stock_quantity === 0}
              onClick={() =>
                addToCart({
                  ...product,
                  quantity,
                })
              }
            >
              <ShoppingBag className="w-5 h-5" /> ADD TO CART
            </Button>

            <Button variant="outline" className="h-10 w-10 p-0 flex items-center justify-center">
              <Heart className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="min-w-[200px] bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0"
              >
                <div className="w-full h-40 relative">
                  <Image
                    src={p.images[0] || "/Beautiful Dzong.jpg"}
                    alt={p.product_name}
                    width={200}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-800">{p.product_name}</h3>
                  <p className="text-green-600 font-bold">${p.final_price}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => router.push(`/add-to-card?id=${p.id}`)}
                  >
                    View More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
