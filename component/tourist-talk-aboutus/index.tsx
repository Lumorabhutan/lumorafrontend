"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useCallback, useRef } from "react";

export default function TouristTalkAboutUs() {
  const testimonials = [
    { name: "John Doe", location: "Venice, Italy", text: "Our trip to Moliva was amazing! Moliva Travel Agency organized everything perfectly, from the hotels to the sightseeing spots. I was very impressed and will definitely return!", date: "Jun 25 24", rating: 5 },
    { name: "Emily Smith", location: "Chicago, USA", text: "We had an unforgettable vacation in Moliva thanks to the excellent service of Moliva Travel Agency. The itinerary was well-arranged, and the support team was very helpful. Best trip ever!", date: "Jun 28 24", rating: 5 },
    { name: "Alex Mark", location: "Texas, USA", text: "Moliva is a perfect destination, and Moliva Travel Agency made our trip flawless. From booking to sightseeing activities, everything was wonderful. I am very satisfied!", date: "Jun 28 24", rating: 5 },
    { name: "Sarah Lee", location: "Sydney, Australia", text: "The team at Moliva Travel Agency exceeded our expectations. Every detail was taken care of, and we had the most relaxing vacation. Highly recommend!", date: "Jul 01 24", rating: 5 },
    { name: "Michael Brown", location: "Toronto, Canada", text: "From the moment we landed, everything was seamless. The guides were knowledgeable and friendly. Moliva is now our go-to travel agency!", date: "Jul 03 24", rating: 5 },
    { name: "Lisa Wong", location: "Singapore", text: "Amazing experience! The personalized itinerary made our family trip unforgettable. Thank you, Moliva Travel Agency!", date: "Jul 05 24", rating: 5 },
  ];

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [currentSnap, setCurrentSnap] = useState(0);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  // Update slidesPerView based on viewport
  const updateSlidesPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) setSlidesPerView(1);
    else if (width < 1024) setSlidesPerView(2);
    else setSlidesPerView(3);
  }, []);

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [updateSlidesPerView]);

useEffect(() => {
  if (!api) return;

  const onSelect = () => setCurrentSnap(api.selectedScrollSnap());

  onSelect(); // set initial snap
  api.on("select", onSelect);

  // Cleanup: make sure it returns void
  return () => {
    if (api) api.off("select", onSelect);
  };
}, [api]);

  // Scroll to specific snap
  const goToSnap = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <p className="text-green-600 font-medium text-base mb-2 font-mono">GENUINE REVIEWS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tourists talk about us</h2>
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="text-right">
              <p className="text-2xl font-extrabold text-gray-900">+95K</p>
              <p className="text-sm text-gray-600">Tour bookings</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-gray-900">4.9</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm text-gray-600 ml-1">(+85K reviews)</span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.reset()}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="p-6 h-full bg-white shadow-sm border rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`/placeholder-user-${(i % 6) + 1}.jpg`} alt={t.name} />
                          <AvatarFallback>{t.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{t.name}</p>
                          <p className="text-sm text-gray-500">{t.location}</p>
                        </div>
                      </div>
                      <span className="text-4xl text-gray-200 select-none">”</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{t.text}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs font-medium">{t.date}</Badge>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

     
        </Carousel>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {api?.scrollSnapList().map((_, i) => (
            <button
              key={i}
              onClick={() => goToSnap(i)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                i === currentSnap ? "bg-green-600 w-12" : "bg-gray-300 w-6 hover:bg-green-400"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
