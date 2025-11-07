"use client";
import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  id: number;
  url: string;
  alt: string;
  span?: string;
}

interface PhotoSets {
  [key: string]: Photo[];
}

interface PhotoCollageProps {
  photoSets: PhotoSets;
}

const PhotoCollage: React.FC<PhotoCollageProps> = ({ photoSets }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<keyof PhotoSets>(
    Object.keys(photoSets)[0] as keyof PhotoSets
  );

  const photos = photoSets[activeTab];

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    setSelectedIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : photos.length - 1
    );
  };

  const goToNext = () => {
    setSelectedIndex((prev) =>
      prev !== null && prev < photos.length - 1 ? prev + 1 : 0
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeLightbox();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleTabChange = (tab: keyof PhotoSets) => {
    setActiveTab(tab);
    setSelectedIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>

      <div className="md:max-w-7xl w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Photos</h1>
          <nav className="flex gap-6 border-b border-gray-200 pb-4">
            {Object.keys(photoSets).map((key) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`${
                  activeTab === key
                    ? "text-gray-900 font-medium border-b-2 border-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                } pb-1 transition-colors`}
              >
                {key}
              </button>
            ))}
          </nav>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group ${photo.span} animate-fadeInUp`}
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image Container */}
          <div className="w-full h-full flex items-center justify-center p-8">
            <img
              src={photos[selectedIndex].url}
              alt={photos[selectedIndex].alt}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCollage;
