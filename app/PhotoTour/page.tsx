"use client";

import HeroVideoSection from "@/component/destination";
import PhotoCollage from "@/component/image-collage/iamge-collage";
import PhotoGallery from "@/component/image-collage/iamge-collage";
import ItineraryDay from "@/component/itinerary/itinerary";
import image1 from "@/public/image1.jpg";
import Landing from "@/component/landing/landing";
import Navbar from "@/component/navbar/navbar";
import TourBand from "@/component/tour-band/tour- band";
import TourAbout from "@/component/tour-highlights/tour-highlights";
import {
  tourInfo, mockTourData,
  FeelBhutanTour,
  PhotoTour,

} from "@/data/paro-places-data";
import { Check, MapPin, X } from "lucide-react";
import TripsForFistTimer from "../pages/trips-for-first-timer";
import Footer from "@/component/footer";
import PaymentCard from "@/component/payments";
import PolicyPage from "@/component/policy-page/policy-page";

export default function CultureMain() {
const itinerary = [
  {
    dayNumber: "Day 1",
    title: "Arrival in Paro – Sunset Photography Session",
    subtitle: "",
    leftImages: [
      { src: "/photo1.jpg", alt: "Dramatic landing in Paro" },
      { src: "/photo2.jpg", alt: "Paro Rinpung Dzong at sunset" },
    ],
    rightImage: "/photo3.jpg",
    content: `
      Your photographic journey begins as your plane glides between steep mountains into the Paro Valley—one of the world’s most dramatic landings. Upon arrival, you are warmly greeted by your Lumora guide and transferred to your hotel. After settling in, your first golden-hour shoot takes you to Paro Rinpung Dzong, a magnificent fortress that glows warmly under the evening sun. As the light softens, you move to the riverside for tranquil long-exposure shots of the traditional cantilever bridge and flowing Paro River. The day concludes with a gentle walk through Paro town, perfect for street photography and capturing everyday Bhutanese life.
    `,
  },
  {
    dayNumber: "Day 2",
    title: "Tiger’s Nest Photography Hike",
    subtitle: "",
    leftImages: [
      { src: "/photo4.jpg", alt: "Morning light on Taktsang" },
      { src: "/photo5.jpg", alt: "Monastery revealing through mist" },
    ],
    rightImage: "/photo6.jpg",
    content: `
      It is one of the highlights of your photo tour—the hike to Tiger’s Nest Monastery. You begin early to capture the morning light as you ascend through pine forests draped with prayer flags. As you gain height, the monastery slowly reveals itself, clinging dramatically to a cliffside, creating a dreamlike scene for photographers. You’ll have plenty of time to frame wide-angle landscapes, close-up architectural details, and candid shots of pilgrims. On the descent, you can photograph misty forests, prayer wheels, and monastery views from new angles. In the evening, join a relaxed indoor photo review or editing session to refine your shots from the day.
    `,
  },
  {
    dayNumber: "Day 3",
    title: "Paro to Thimphu – City & Night Photography",
    subtitle: "",
    leftImages: [
      { src: "/photo7.jpg", alt: "Tachog Iron Bridge" },
      { src: "/photo8.jpg", alt: "Buddha Dordenma panorama" },
    ],
    rightImage: "/photo9.jpg",
    content: `
      After breakfast, drive to Thimphu with scenic stops along the way, including Tachog Iron Bridge, where colourful prayer flags and rustic chains provide excellent compositions. In the afternoon, visit the towering Buddha Dordenma, offering sweeping valley shots perfect for wide-angle lenses. Later, explore Tashichho Dzong, capturing its grand courtyards, intricate woodwork, and monastic activities. As the sun sets, Thimphu transforms into a glowing canvas, ideal for night photography with spinning prayer wheels, light trails, and illuminated temples.
    `,
  },
  {
    dayNumber: "Day 4",
    title: "Thimphu to Punakha – Valley Landscapes & Dzong Photography",
    subtitle: "",
    leftImages: [
      { src: "/photo10.jpg", alt: "Dochula Pass with Himalayan backdrop" },
      { src: "/photo11.jpg", alt: "Punakha Dzong at confluence" },
    ],
    rightImage: "/photo12.jpg",
    content: `
      Depart early for Punakha, stopping at Dochula Pass, where 108 chortens stand against a panoramic Himalayan backdrop. On a clear day, this location provides some of the most spectacular mountain photography opportunities in Bhutan. Continue to Punakha Dzong, the country’s most picturesque fortress, sitting at the confluence of two rivers. Its white walls, ornate woodwork, and seasonal blooms offer postcard-perfect compositions. In the afternoon, visit the Punakha Suspension Bridge to capture dynamic shots of fluttering prayer flags and deep river valleys. The day ends with peaceful sunset photography along the river, capturing soft twilight tones and warm reflections.
    `,
  },
  {
    dayNumber: "Day 5",
    title: "Punakha to Phobjikha – Black-Necked Crane Valley",
    subtitle: "",
    leftImages: [
      { src: "/photo13.jpg", alt: "Expansive Phobjikha Valley" },
      { src: "/photo14.jpg", alt: "Gangtey Monastery above the valley" },
    ],
    rightImage: "/photo15.jpg",
    content: `
      The journey will take you into the serene Phobjikha Valley, a glacial bowl famous for rolling hills, open landscapes, and traditional farmhouses. The valley provides expansive, wide-angle opportunities for untouched nature and rural Bhutan. Visit Gangtey Monastery, perched above the valley, ideal for architectural photography and, where allowed, aerial drone shots. If traveling between October and February, witness the graceful Black-Necked Cranes in their natural habitat, a rare and magical photographic experience. As night falls, the valley’s clear skies offer excellent opportunities for astro photography, with prayer flags and farmhouses as foregrounds.
    `,
  },
  {
    dayNumber: "Day 6",
    title: "Phobjikha to Paro – Cultural Portrait Session",
    subtitle: "",
    leftImages: [
      { src: "/photo16.jpg", alt: "Kyichu Lhakhang temple details" },
      { src: "/photo.jpg", alt: "Bhutanese Gho & Kira portrait" },
    ],
    rightImage: "/photo18.jpg",
    content: `
      After breakfast, drive back to Paro, stopping at scenic viewpoints for landscape shots. In the afternoon, visit Kyichu Lhakhang, one of Bhutan’s oldest temples, offering beautiful light, deep textures, intricate details, and moments of spiritual life—perfect for documentary-style photography. A highlight of the day is an optional Traditional Bhutanese Dress Photo Session, where local models or your group can pose in Gho or Kira against historic backdrops, creating culturally rich portraits. Later, enjoy a relaxed evening photo review session, sharing stories and refining your best images.
    `,
  },
  {
    dayNumber: "Day 7",
    title: "Departure – Final Sunrise Shoot",
    subtitle: "",
    leftImages: [
      { src: "/photo20.jpg", alt: "Golden sunrise over Paro Valley" },
      { src: "/photo19.jpg", alt: "Lumora farewell gift" },
    ],
    rightImage: "/photo21.jpg",
    content: `
      Begin your final morning with a sunrise session in Paro Valley, capturing the golden glow on farm fields, traditional houses, and distant Himalayan peaks. After breakfast, transfer to Paro International Airport for departure. Before leaving, Lumora Tours presents a special souvenir, closing your journey with lasting memories and a camera full of Bhutan’s beauty.
    `,
  },
];






  return (
    <main className="w-full h-full">
      <Landing
        image="/photo01.jpg"
        alt="Paro Festival"
        imagestyle="h-[500px] md:h-[600px] lg:h-[500px]"
        subContainer="w-full relative"
        maincontainer="w-full"
        heading="Photo Tour of Bhutan"
        subheading="Immerse yourself in Bhutan’s breathtaking landscapes, ancient monasteries, vibrant festivals, and timeless village life on a specially curated Photo Tour of Bhutan. "
        Itinerary="Book Us"
        headingstyle="font-mono"
      />
      <TourBand
        data={tourInfo}
        mainContainerstyle="mt-10  flex justify-start"
      />
      <div className=" bg-[#EAEDF0] pt-3 pb-10">
        <TourAbout data={PhotoTour} />
      </div>


      <section className="min-h-screen bg-gradient-to-b py-8 mt-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="font-bold text-3xl font-mono">Your itinerary</span>
              </div>
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
