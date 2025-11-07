"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { MapPin, Calendar, Search, ChevronDown, Play } from "lucide-react";

// Import a sample image for destinations
import destImg from "../../image/Paro_Taktsang.jpg";
import StatsSection from "../stats/statsSection";

export default function HomePage() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const destinations = [
    { title: "Paris, France", img: destImg },
    { title: "Tokyo, Japan", img: destImg },
    { title: "Bali, Indonesia", img: destImg },
  ];

  const slides = [
    {
      image: "/Beautiful Dzong.jpg",
      alt: "Beautiful nature scene 1",
      title: "Explore majestic ",
      subtitle: " mountain ranges",
      tagline: "EXPLORE BHUTAN",
    },
    {
      image: "/Beautiful Valley.jpg",
      alt: "Beautiful nature scene 2",
      title: "Discover hidden",
      subtitle: "cultural treasures",
      tagline: "EXPERIENCE CULTURE",
    },
    {
      image: "/Green Paddy field.jpg",
      alt: "Beautiful nature scene 3",
      title: "Journey through",
      subtitle: "ancient monasteries",
      tagline: "SPIRITUAL ADVENTURE",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative text-white px-0">
        <div className="w-full relative min-h-[60vh] md:h-screen">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            setApi={setApi}
            className="w-full h-full"
          >
            <CarouselContent className="h-full">
              {slides.map((slide, index) => (
                <CarouselItem
                  key={index}
                  className="min-h-[60vh] md:h-screen p-0 m-0"
                >
                  <div className="relative w-full h-full">
                    {/* Background Image */}
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index === 0}
                      quality={90}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

                    {/* Content Overlay */}
                    <div className="relative w-full h-full flex flex-col justify-center items-center lg:items-start px-6 md:px-12 lg:px-20 xl:px-32">
                      <div className="max-w-4xl space-y-4 md:space-y-6">
                        {/* Tagline */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-xl text-center lg:text-start md:text-xl lg:text-6xl tracking-widest text-white"
                        >
                          {slide.tagline}
                        </motion.p>

                        {/* Main Title */}
                        <motion.h1
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl md:text-5xl lg:text-5xl xl:text-7xl font-bold leading-tight"
                        >
                          {slide.title}
                          <br />
                          {slide.subtitle}
                        </motion.h1>

                        {/* Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-wrap gap-4 pt-4 items-center"
                        >
                          <Button
                            size="lg"
                            className="bg-transparent border-1 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-md px-6 md:px-8 transition-all group"
                          >
                            EXPLORE
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </Button>
                          <div className="relative w-12 h-12 bg-playbuttongreen rounded-4xl p-[2px] overflow-hidden">
                            {/* Ripple container */}
                            <button
                              className={`
      relative w-full h-full rounded-full bg-playbuttongreen opacity-80 shadow-lg
      flex items-center justify-center text-white
      transition-all duration-300
      focus:outline-none
      ripple-btn
    `}
                              aria-label="Play"
                            >
                              <Play className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                            </button>
                          </div>
                        </motion.div>
                      </div>

                      {/* Search Bar */}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Dots */}
            <div
              className="
    absolute 
    bottom-7 md:bottom-7 lg:bottom-1/2   /* bottom for sm/md, vertical center for lg+ */
    left-1/2 md:left-1/2 lg:left-[90%]   /* centered for sm/md, right for lg+ */
    -translate-x-1/2 md:-translate-x-1/2 lg:translate-x-0   /* only translate for sm/md */
    flex md:flex-row lg:flex-col gap-3 z-40
  "
            >
              {slides.map((_, index) => {
                const isActive = current === index;
                return (
                  <button
                    key={index}
                    className={`
          relative w-4 h-4 rounded-full
          border transition-all duration-300
          ${
            isActive
              ? "border-2 border-green-400 bg-transparent scale-125 shadow-md"
              : "border border-white/50 bg-dotcolor hover:border-white/80 hover:scale-110"
          }
        `}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 m-auto w-1 h-1 bg-green-500 rounded-full shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </Carousel>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="
    mt-5 
    lg:mt-0 
    lg:absolute 
    lg:bottom-[-28px] 
    lg:right-32
    lg:ml-120
    left-0 right-0 
    px-6 md:px-14 
  "
        >
          <div className="bg-icongrey rounded-tl-xl rounded-tr-xl lg:ml-[300px] lg:mb-7  p-4 md:p-6 max-w-2xl md:max-w-4xl lg:max-w-2xl mx-auto shadow-2xl lg:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 ">
              {/* Destination Input */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="bg-transparent outline-none text-gray-700 placeholder:text-gray-400 w-full"
                />
              </div>

              {/* Date Picker */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg cursor-pointer">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 flex-1">Tour date</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg cursor-pointer  lg:flex">
                <span className="text-gray-400 flex-1">All categories</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              {/* Search Button */}
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg w-full lg:col-span-1"
              >
                <Search className="w-5 h-5 mr-2" />
                SEARCH
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
      <StatsSection />
    </div>
  );
}
