"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function DashboardContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const stats = [
    { title: "Total Users", value: 1250 },
    { title: "Revenue", value: 12540, prefix: "$" },
    { title: "Orders", value: 230 },
    { title: "Growth Rate", value: 18.2, suffix: "%" },
    { title: "Active Sessions", value: 89 },
    { title: "Avg. Rating", value: 4.8, suffix: "/5" },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* GRAYSCALE IN DARK MODE */}
      <div
        className={`transition-filter duration-300 ${
          isDarkMode ? "filter grayscale" : ""
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <Card className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.prefix && <span className="text-lg">{stat.prefix}</span>}
                    <CountUp
                      end={stat.value}
                      duration={2}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                      separator=","
                    />
                    {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}