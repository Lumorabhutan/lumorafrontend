"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/component/shopping-ui/product/cartContext";
import CheckoutDialog from "../add-to-card/form";
import Footer from "@/component/footer";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>(
    () => {
      const initial: { [key: string]: string } = {};
      cartItems.forEach((item) => {
        initial[item.id] = item.images[0] || "/Beautiful Dzong.jpg";
      });
      return initial;
    }
  );

  if (!cartItems || cartItems.length === 0)
    return <p className="text-center py-10">No products in the cart.</p>;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.final_price) * (item.quantity || 1),
    0
  );

  const handleSelectImage = (productId: string, img: string) => {
    setSelectedImages((prev) => ({ ...prev, [productId]: img }));
  };

  return (
    <div>
    <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      {/* Left side - All products */}
      <div className="flex-1 flex flex-col gap-6">
        {cartItems.map((product) => {
          const quantity = product.quantity || 1;
          const selectedImage = selectedImages[product.id] || "/Beautiful Dzong.jpg";

          return (
            <div
              key={product.id}
              className="flex gap-4 bg-white shadow-lg rounded-xl p-4"
            >
              {/* Image */}
              <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={selectedImage}
                  alt={product.product_name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-1">
                <h2 className="font-semibold text-gray-900">{product.product_name}</h2>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
                <p className="text-sm text-gray-700">
                  Availability:{" "}
                  <span className={product.stock_quantity! > 0 ? "text-green-600" : "text-red-600"}>
                    {product.stock_quantity! > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-green-600 font-bold">${product.final_price}</p>
                  {product.discount_percent && (
                    <p className="text-gray-400 line-through">${product.original_price}</p>
                  )}
                </div>

                {/* Quantity & Remove */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded-none"
                  >
                    <Minus />
                  </Button>
                  <span className="px-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="h-8 w-8 rounded-none"
                  >
                    <Plus />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0 flex items-center justify-center ml-2"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Image Thumbnails */}
                
              </div>
            </div>
          );
        })}
      </div>

      {/* Right side - Payment summary */}
      <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col gap-4">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        <div className="flex justify-between">
          <span className="text-gray-700">Items:</span>
          <span className="text-gray-900 font-semibold">{cartItems.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Total:</span>
          <span className="text-green-600 font-bold">${totalPrice}</span>
        </div>
        <Button
          size="lg"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setIsCheckoutOpen(true)}
        >
          Book Now
        </Button>
      </div>

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        subtotal={totalPrice}
        total={totalPrice}
      />
     
    </div>
      <Footer />
      </div>
  );
}
