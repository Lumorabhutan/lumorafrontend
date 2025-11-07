// components/Stats/StatItem.tsx
import React from "react";

interface StatItemProps {
  value: string;
  title: string;
  subtitle: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, title, subtitle }) => {
  return (
    <div className="flex items-center md:flex-row flex-col gap-2">
      <div className="text-5xl font-bold text-gray-900">{value}</div>
      <div className="text-left">
        <div className="text-gray-700 font-medium">{title}</div>
        <div className="text-gray-600">{subtitle}</div>
      </div>
    </div>
  );
};

export default StatItem;
