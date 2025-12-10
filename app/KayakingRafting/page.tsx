"use client";

import HeroVideoSection from "@/component/destination";
import PhotoCollage from "@/component/image-collage/iamge-collage";
import PhotoGallery from "@/component/image-collage/iamge-collage";
import ItineraryDay from "@/component/itinerary/itinerary";
import image1 from "@/public/image1.jpg";
import Landing from "@/component/landing/landing";
import Navbar from "@/component/navbar/navbar";
import PolicyPage from "@/component/policy-page/policy-page";
import TourBand from "@/component/tour-band/tour- band";
import TourAbout from "@/component/tour-highlights/tour-highlights";
import { tourInfo, mockTourData, photoSets, newTourPackageData, kayakingData } from "@/data/paro-places-data";
import { Check, MapPin, X } from "lucide-react";
import TripsForFistTimer from "../pages/trips-for-first-timer";
import Footer from "@/component/footer";
import PaymentCard from "@/component/payments";

export default function CultureMain() {
const itinerary = [
  {
    dayNumber: "Day 1",
    title: "Arrival & Orientation in Paro",
    subtitle: "",
    leftImages: [
      { src: "/kal1.jpg", alt: "Paro International Airport" },
      { src: "/kal2.jpg", alt: "Gentle paddle on Paro River" },
    ],
    rightImage: "/kal3.jpg",
    content: `
      Arrive at Paro International Airport and transfer to your hotel. Meet your adventure guide and attend a safety briefing and kayaking/rafting orientation. Explore the Paro River for a gentle paddle to get accustomed to your equipment. Enjoy an evening by the river, capturing scenic shots and preparing for the adventure ahead.
    `,
  },
  {
    dayNumber: "Day 2",
    title: "Kayaking & Rafting in Punakha Valley",
    subtitle: "",
    leftImages: [
      { src: "/kal4.jpg", alt: "Rafting on Mo Chhu river" },
      { src: "/kal5.jpg", alt: "Stunning river gorge scenery" },
    ],
    rightImage: "/kal6.jpg",
    content: `
      Drive to Punakha, one of Bhutan’s most scenic river valleys. Experience a full day of kayaking and rafting on the Mo Chhu and Pho Chhu rivers, navigating gentle rapids and enjoying the stunning river gorge scenery. Stop along the riverbanks for picnic lunch and photography breaks, capturing the verdant landscapes, traditional farmhouses, and mountain views.
    `,
  },
  {
    dayNumber: "Day 3",
    title: "Travel to Thimphu & City Sightseeing",
    subtitle: "",
    leftImages: [
      { src: "/kal7.jpg", alt: "Buddha Dordenma statue" },
      { src: "/kal8.jpg", alt: "Tashichho Dzong" },
    ],
    rightImage: "/kal9.jpg",
    content: `
      After breakfast, travel to Thimphu, the capital of Bhutan, enjoying scenic stops along the way. Upon arrival, explore the highlights of the city, including Buddha Dordenma, Tashichho Dzong, and local markets. This is an excellent day for capturing architectural and street photography, cultural snapshots, and panoramic valley views. In the evening, relax at your hotel or take a short walk along Norzin Lam to enjoy the bustling city life.
    `,
  },
  {
    dayNumber: "Day 4",
    title: "Hike to Tiger’s Nest Monastery (Taktsang)",
    subtitle: "",
    leftImages: [
      { src: "/kal10.jpg", alt: "Morning ascent to Tiger’s Nest" },
      { src: "/kal11.jpg", alt: "Prayer flags on the trail" },
    ],
    rightImage: "/kal12.jpg",
    content: `
      Begin early for the iconic hike to Tiger’s Nest Monastery, perched dramatically on a cliffside overlooking the Paro Valley. Photograph the monastery from multiple angles as you ascend through pine forests decorated with prayer flags and morning mist. At the top, capture detailed shots of the monastery’s architecture, pilgrims, and breathtaking valley panoramas. Descend in the afternoon and enjoy a relaxed evening reviewing your photos or strolling in Paro town.
    `,
  },
  {
    dayNumber: "Day 5",
    title: "Departure from Paro",
    subtitle: "",
   
    content: `
      On your final morning, enjoy a sunrise session in the Paro Valley if time permits, capturing the golden light across farm fields and distant mountains. After breakfast, check out from your hotel and transfer to Paro International Airport for your onward journey. Conclude your adventure with lasting memories of Bhutan’s rivers, mountains, and cultural treasures.
    `,
  },
];
  

  return (
    <main className="w-full h-full">
      <Landing
        image="/kal2.jpg"
        alt="Paro Festival"
        imagestyle="h-[500px] md:h-[600px] lg:h-[500px]"
        subContainer="w-full relative"
        maincontainer="w-full"
        heading="Kayaking & Rafting Adventure in Bhutan"
        subheading="Bhutan, with its pristine rivers and breathtaking valleys, offers some of the most thrilling and scenic white-water adventures in the Himalayas. "
        Itinerary="Book Us"
        headingstyle="font-mono"
      />
      <TourBand
        data={tourInfo}
        mainContainerstyle="mt-10  flex justify-start"
      />
      <div className=" bg-[#EAEDF0] pt-3 pb-10">
        <TourAbout data={kayakingData} />
      </div>
    

      <section className="min-h-screen bg-gradient-to-b py-8 mt-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              {itinerary.map((day, idx) => (
                <ItineraryDay key={idx} {...day} />
              ))}
            </div>

            {/* RIGHT: Sticky Map */}
            <aside className=" block lg:col-span-1 mt-10">
              <div className="sticky top-6 bg-white rounded shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33209.0!2d89.41334!3d27.43050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI1JzQ5LjgiTiA4OcKwMjQnNDguOCJF!5e0!3m2!1sen!2sbt!4v0000000000000"
                  width="100%"
                  height="700"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded"
                ></iframe>
              </div>
            </aside>
          </div>
        </div>
      </section>
     <div className=" bg-[#EAEDF0] pt-3 pb-10">
        <PolicyPage />
      </div>
      <div>
        <HeroVideoSection
          title="Start Exploring"
          subtitle="Are you ready for adventures to"
          bookUs={true}
          contactUs={true}
          backgroundImage={image1}
          video={false}
        />
      </div>
         <div>     <PaymentCard /></div>
      
      <div>
        <TripsForFistTimer />
      </div>

      <div>
        <Footer />
      </div>
    </main>
  );
}
