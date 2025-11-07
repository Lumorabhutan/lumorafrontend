"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Calendar, MapPin, Star, Heart, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

interface SpecificDetailsCard {
  img: string;
  title?: string;
  days?: number;
  slug: string;
  destinations?: string;
  ratingnumber?: number;
  charge?: number;
  originalPrice?: number;
  reviews?: number;
}

interface TravelingtoPlacesProps {
  data: SpecificDetailsCard[];
}

const PlacesToTravelOptions: React.FC<TravelingtoPlacesProps> = ({ data }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToScroll, setSlidesToScroll] = useState(4);
  const router = useRouter();

  // Dynamically update slidesToScroll based on screen width
  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth < 768) {
        setSlidesToScroll(1);
      } else {
        setSlidesToScroll(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(data.length / slidesToScroll);

  // Track carousel index change
  useEffect(() => {
    if (!api) return;

    const handleSelect = (): void => {
      const selectedIndex = Math.floor(
        api.selectedScrollSnap() / slidesToScroll
      );
      setCurrentIndex(selectedIndex);
    };

    api.on("select", handleSelect);
    handleSelect();

    return (): void => {
      api.off("select", handleSelect);
    };
  }, [api, slidesToScroll]);

  const handleDotClick = (index: number): void => {
    if (!api) return;
    api.scrollTo(index * slidesToScroll);
    setCurrentIndex(index);
  };

  const handleClick = (slug: string): void => {
    router.push(`/${slug}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          slidesToScroll,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="flex gap-4">
          {data.map((details, index) => (
            <CarouselItem key={index} className="flex-none w-[288px]">
              <Card className="w-full h-[450px] bg-bgsubcolor overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col p-0">
                {/* Image Header */}
                <CardHeader className="relative p-0 m-0">
                  <Image
                    src={details.img}
                    alt={details.title || "place image"}
                    width={288}
                    height={200}
                    className="object-content w-full h-[220px]"
                  />
                  <button className="absolute top-2.5 right-2.5 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-200">
                    <Heart className="w-4 h-4 text-green-500 fill-green-500" />
                  </button>
                </CardHeader>

                {/* Content */}
                <CardContent className="p-2  flex-grow flex flex-col justify-between overflow-hidden">
                  <div className="m">
                    <h2
                      className="text-lg font-bold text-gray-900  line-clamp-2 cursor-pointer h-10 font-sans"
                      onClick={() => handleClick(details.slug)}
                    >
                      {details.title}
                    </h2>

                    <div className="flex items-center gap-3 pb-1.5 mb-1.5 border-b border-gray-200 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-sm font-medium">
                          {details.days} days
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-sm font-medium">
                          {details.destinations}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 border-b border-gray-200">
                      <span className="text-lg font-bold text-gray-900">
                        {details.ratingnumber}
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      {details.reviews && (
                        <span className="text-gray-500 text-xs ml-1">
                          ({details.reviews} reviews)
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className="p-2.5 pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-end gap-1">
                      <span className="text-xl font-bold text-gray-900">
                        ${details.charge}
                      </span>
                      {details.originalPrice && (
                        <span className="text-sm text-gray-400 line-through mb-0.5">
                          ${details.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-md hover:scale-110 transition-all duration-200"
                      onClick={() => handleClick(details.slug)}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-3 mt-8 pb-5 w-full">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIndex
                ? "bg-green-600 w-12"
                : "bg-gray-300 w-6 hover:bg-green-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToTravelOptions;
