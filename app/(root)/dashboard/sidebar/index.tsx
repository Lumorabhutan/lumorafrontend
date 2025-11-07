// components/dashboard/Sidebar.tsx
"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image"

interface MenuItem {
  name: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  activeItem: string;
  setActiveItem: (name: string) => void;
  menuItems: MenuItem[];
  isOpen: boolean;           // ← boolean
  onToggle?: () => void;     // ← function to toggle
  onItemClick?: () => void;  // ← close mobile drawer
}

export default function Sidebar({
  activeItem,
  setActiveItem,
  menuItems,
  isOpen,
  onToggle,
  onItemClick,
}: SidebarProps) {
  const handleItemClick = (name: string) => {
    setActiveItem(name);
    // onItemClick?.();
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 flex flex-col w-64
        bg-white dark:bg-gray-900 text-gray-900 dark:text-white
        border-r border-gray-200 dark:border-gray-700
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
        ${!isOpen && "md:w-20"}
      `}
    >
      {/* TOGGLE BUTTON */}
      <button
        onClick={onToggle}
        className={`
          hidden md:flex absolute -right-3 top-9 h-7 w-7 items-center justify-center
          rounded-full bg-gray-200 dark:bg-gray-700
          text-gray-800 dark:text-gray-200
          shadow-md hover:shadow-lg transition-all z-10
        `}
        aria-label={isOpen ? "Collapse" : "Expand"}
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Logo */}
      <div className="items-center gap-3 p-5 pt-8 mb-10">
        {isOpen && (
        <div className="flex flex-col items-center justify-center gap-1">
  <div className="inline-flex items-center text-lg font-semibold text-gray-900 dark:text-white">
   <h1 className="inline-flex items-center text-3xl sm:text-2xl md:text-2xl lg:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
    LU
    <span className="text-orange-500">MO</span>
    RA
  </h1>
  </div>

  <div className="text-orange-400 text-xs sm:text-sm font-medium tracking-wider">
    TOUR AND TRAVEL
  </div>
</div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 px-5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeItem === item.name.toLowerCase();
          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item.name.toLowerCase())}
              className={`
                group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5
                transition-all duration-200
                ${isActive
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
              title={!isOpen ? item.name : undefined}
            >
              <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
              {isOpen && <span className="font-medium truncate">{item.name}</span>}

              {!isOpen && (
                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100 dark:bg-gray-200 dark:text-gray-800 z-20">
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {isOpen && (
        <div className="p-5 text-xs text-gray-600 dark:text-gray-400">
          © 2025 My Dashboard
        </div>
      )}
    </aside>
  );
}