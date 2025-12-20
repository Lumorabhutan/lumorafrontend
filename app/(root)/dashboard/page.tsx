"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Sidebar from "@/component/dashboard/sidebar";
import BookingCard from "./booking";
import ContactCard from "./contact";
import Navbar from "./navbar";
import ReviewCard from "./review";
import TripsCard from "./trips-type";
import DashboardContent from "./DashboardContent";
import UserCard from "./UserCard";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Map,
  Star,
  Mail,
  Package,
  ShoppingCart,
  FileText,
} from "lucide-react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import BlogCard from "./blog";
import ProductCard from "@/component/dashboard/dashboard/products";
import OrderCard from "@/component/dashboard/dashboard/order";

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [role, setRole] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Debug: Check if token exists
    if (!token) {
      console.warn("No accessToken found in localStorage", token);
      router.push("/");
      return;
    }

    console.log("Token found:", token.substring(0, 20) + "..."); // Log first part for debug

    try {
      const decoded = jwtDecode<JwtPayload & { role?: string }>(token);
      const userRole = decoded.role;

      if (!userRole) {
        console.error("No role found in JWT token");
        Cookies.remove("accessToken");
        router.push("/");
        return;
      }

      const normalizedRole = userRole.toLowerCase();

      // Block client users
      if (normalizedRole === "client") {
        router.push("/register");
        return;
      }

      // Allow only these roles on dashboard
      if (!["admin", "manager", "user", "accounts"].includes(normalizedRole)) {
        console.warn("Unauthorized role:", userRole);
        Cookies.remove("accessToken");
        router.push("/");
        return;
      }

      // SUCCESS: Valid user → allow access
      console.log("Access granted for role:", userRole);
      setRole(userRole); // This now runs!
    } catch (err) {
      console.error("Invalid or expired token:", err);
      Cookies.remove("accessToken");
      router.push("/");
    }
  }, [router]);

  // Full menu for allowed roles
  const menuItems = useMemo(() => {
    if (!role) return [];

    return [
      { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
      { name: "Users", icon: <Users className="w-5 h-5" /> },
      { name: "Bookings", icon: <BookOpen className="w-5 h-5" /> },
      { name: "Trips", icon: <Map className="w-5 h-5" /> },
      { name: "Reviews", icon: <Star className="w-5 h-5" /> },
      { name: "Contact", icon: <Mail className="w-5 h-5" /> },
      { name: "Product", icon: <Package className="w-5 h-5" /> },
      { name: "Orders", icon: <ShoppingCart className="w-5 h-5" /> },
      { name: "Blog", icon: <FileText className="w-5 h-5" /> },
    ];
  }, [role]);

  const renderContent = () => {
    switch (activeItem.toLowerCase()) {
      case "dashboard": return <DashboardContent />;
      case "users": return <UserCard />;
      case "bookings": return <BookingCard />;
      case "trips": return <TripsCard />;
      case "reviews": return <ReviewCard />;
      case "contact": return <ContactCard />;
      case "product": return <ProductCard />;
      case "orders": return <OrderCard />;
      case "blog": return <BlogCard />;
      default: return <DashboardContent />;
    }
  };

  // Loading state while checking token/role
  if (role === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(prev => !prev)}
        onItemClick={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        <Navbar
          activeItem={activeItem}
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-950">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}