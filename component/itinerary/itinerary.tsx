"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

interface DayProps {
dayNumber: string;
title: string;
bulletPoints: string[];
leftImages: { src: string; alt: string }[];
videoThumbnail: string;

}

export default function ItineraryDay({
dayNumber,
title,
bulletPoints,
leftImages,
videoThumbnail,
}: DayProps) {

return ( <div className="space-y-6 md:space-y-8 px-4 md:px-8">
{/* Header */} <header className="space-y-2"> <p className="text-sm font-medium text-amber-700">{dayNumber}</p> <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1> </header>

```
  {/* Bullet Points */}
  <ul className="space-y-3 md:space-y-4 text-gray-700 pl-4 md:pl-8">
    {bulletPoints.map((point, idx) => (
      <li key={idx} className="relative pl-6">
        <span className="absolute left-0 top-2 w-2 h-2 bg-amber-600 rounded-full"></span>
        <span dangerouslySetInnerHTML={{ __html: point }} />
      </li>
    ))}
  </ul>

  {/* Image + Video Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    {/* Left stacked images */}
    <div className="flex flex-col gap-4">
      {leftImages.map((img, idx) => (
        <div key={idx} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>

    
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg h-[550px]">
        <div
          className="group  w-full h-full relative"
        >
          <Image src={videoThumbnail} alt="Video thumbnail" fill className="object-cover" />
          
        </div>

    </div>
  </div>
</div>

);
}
