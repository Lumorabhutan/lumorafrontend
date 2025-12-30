"use client";

import Image from "next/image";

interface DayProps {
  dayNumber: string;
  title: string;
  content: string | string[];
  leftImages?: { src: string; alt: string }[];
  rightImage?: string;
}

export default function ItineraryDay({
  dayNumber,
  title,
  content,
  leftImages,
  rightImage,
}: DayProps) {
  const totalImages = (leftImages?.length || 0) + (rightImage ? 1 : 0);

  return (
    <div className="space-y-0 md:space-y-1 px-4 md:px-8">
      {/* Header */}
      <header className="font-medium">
        <h1 className="text-xl md:text-xl font-mono text-gray-900">{title}</h1>
      </header>

      {/* Bullet Points */}
      {Array.isArray(content) ? (
        <ul className="space-y-0 md:space-y-0 text-gray-700 pl-0 md:pl-0">
          {content.map((point, idx) => (
            <li key={idx} className="relative pl-0 my-2">
              <span
                dangerouslySetInnerHTML={{ __html: point }}
                className="font-sans text-base"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="text-gray-700 font-sans text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {/* Image Section */}
      {(leftImages || rightImage) && (
        <>
          {totalImages === 2 ? (
            // Flex row when exactly two images
            <div className="flex flex-row gap-4 md:gap-6">
              {leftImages?.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
              {rightImage && (
                <div className="relative w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image src={rightImage} alt="Right Image" fill className="object-cover" />
                </div>
              )}
            </div>
          ) : (
            // Keep original grid design for three or more images
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {leftImages && (
                <div className="flex flex-col gap-4">
                  {leftImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
              {rightImage && (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg h-[550px]">
                  <Image src={rightImage} alt="Right Image" fill className="object-cover" />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
