"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Trees,
  Utensils,
  Landmark,
  Mountain,
  Bike,
  Ship,
  Users,
  HeartPulse,
  BookOpen,
  Drumstick,
} from "lucide-react";
import React from "react";

const tourTypes = [
  { icon: Trees, title: "Ecotourism & Resort", count: 124 },
  { icon: Utensils, title: "Food & Culinary", count: 231 },
  { icon: Landmark, title: "In-depth Cultural", count: 271 },
  { icon: Mountain, title: "Explorer & Adventure", count: 311 },
  { icon: Drumstick, title: "Festival & Events", count: 219 },
  { icon: Landmark, title: "Museums & Exhibitions", count: 189 },
  { icon: Mountain, title: "Hiking & Trekking", count: 167 },
  { icon: Bike, title: "Motor & Bicycles", count: 112 },
  { icon: Ship, title: "Ships & Boats", count: 301 },
  { icon: Users, title: "Family Activities", count: 211 },
  { icon: HeartPulse, title: "Health & Spa", count: 189 },
  { icon: BookOpen, title: "Educational", count: 129 },
];

export default function AdventureTypes() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 font-mono">
        <p className="uppercase tracking-wide text-green-600 font-semibold font-mono">
          Tour Categories
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mt-2 font-mono">
          Adventure Types
        </h2>
        <p className="mt-2 text-gray-500">
          You need{" "}
          <span className="text-green-600 font-semibold underline underline-offset-4 cursor-pointer">
            advice?
          </span>
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {tourTypes.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ rotateY: 8, scale: 1.09 }}
            className="group flex flex-row items-center p-3 gap-2 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:bg-lime-600 bg-white"
          >
            {/* Rebuild Card structure */}
            <div className="flex-shrink-0 p-3 rounded-lg">
              <item.icon className="w-8 h-8 text-[#7cb342] group-hover:text-white transition-colors duration-300" />
            </div>

            <div className="w-0 h-9 border border-gray-250" />

            <div className="p-0 flex flex-col justify-center font-sans">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300">
                {item.count} Tours
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
