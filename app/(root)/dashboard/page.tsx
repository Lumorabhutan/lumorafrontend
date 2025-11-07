"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";

import Sidebar from "@/component/dashboard/sidebar";

import BookingCard from "./booking";
import ContactCard from "./contact";
import Navbar from "./navbar";
import ReviewCard from "./review";
import TripsCard from "./trips-type";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Map,
  Star,
  Mail,
  User,
} from "lucide-react";
import DashboardContent from "./DashboardContent";
import ProfileCard from "./ProfileCard";
import UserCard from "./UserCard";

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [role, setRole] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  // Decode JWT and extract role
  useEffect(() => {
    const token = Cookies.get("accessToken");

    // No token → redirect to main dashboard
    if (!token) {
      router.push("/dashboard");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload & { role?: string }>(token);
      const userRole = decoded?.role ?? null;

      if (!userRole) {
        router.push("/dashboard");
        return;
      }

      setRole(userRole);
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/dashboard");
    }
  }, [router]);

  // Redirect if role is invalid
  useEffect(() => {
    if (role && !["admin", "Manager", "User", "client"].includes(role)) {
      router.push("/dashboard");
    }
  }, [role, router]);

  // Sidebar menu based on role
  const menuItems = useMemo(() => {
    // Full access (Admin, Manager, User, client)
    if (["admin", "Manager", "User", "client"].includes(role || "")) {
      return [
        { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Users", icon: <Users className="w-5 h-5" /> },
        { name: "Bookings", icon: <BookOpen className="w-5 h-5" /> },
        { name: "Trips", icon: <Map className="w-5 h-5" /> },
        { name: "Reviews", icon: <Star className="w-5 h-5" /> },
        { name: "Contact", icon: <Mail className="w-5 h-5" /> },
        { name: "Profile", icon: <User className="w-5 h-5" /> },
      ];
    }

    // Default (no role or invalid)
    return [
        { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Users", icon: <Users className="w-5 h-5" /> },
      { name: "Bookings", icon: <BookOpen className="w-5 h-5" /> },
      { name: "Trips", icon: <Map className="w-5 h-5" /> },
      { name: "Reviews", icon: <Star className="w-5 h-5" /> },
      { name: "Contact", icon: <Mail className="w-5 h-5" /> },
    ];
  }, [role]);

  // Page content rendering
  const renderContent = () => {
    const key = activeItem.toLowerCase();

    switch (key) {
      case "dashboard":
        return <DashboardContent />;
      case "users":
        return <UserCard />;
      case "bookings":
        return <BookingCard />;
      case "trips":
        return <TripsCard />;
      case "reviews":
        return <ReviewCard />;
      case "contact":
        return <ContactCard />;
      case "profile":
        return <ProfileCard />;
      default:
        return <DashboardContent />;
    }
  };

  // Wait until role is known before rendering
  // if (role === null) {
  //   return (
  //     <div className="flex h-screen items-center justify-center text-gray-600 dark:text-gray-300">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        onItemClick={() => setSidebarOpen(false)}
      />

      {/* Main Section */}
      <div className="flex flex-1 flex-col">
        <Navbar
          activeItem={activeItem}
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-950">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
