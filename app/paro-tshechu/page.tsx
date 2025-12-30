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
import { tourInfo, mockTourData, photoSets } from "@/data/paro-places-data";
import { Check, MapPin, X } from "lucide-react";
import TripsForFistTimer from "../pages/trips-for-first-timer";
import Footer from "@/component/footer";
import PaymentCard from "@/component/payments";
import PolicyPage from "@/component/policy-page/policy-page";

export default function CultureMain() {
 const itinerary = [
  {
    dayNumber: "Day 1",
    title: "Arrival in Paro",
    subtitle: "Arrival and Cultural Exploration",
    leftImages: [
      { src: "/hotel.jpg", alt: "Paro International Airport" },
      { src: "/kitchu.jpg", alt: "Kyichu Lhakhang Temple" },
    ],
    rightImage: "/parofestival.jpg",
    videoUrl: "",
    content: `
      <strong>Arrival at Paro International Airport</strong><br/>
      Upon arrival in Bhutan, guests are greeted with a warm smile and the offering of a khadar, a ceremonial white silk scarf symbolizing purity, goodwill, and respect. This heartfelt Bhutanese gesture marks an auspicious beginning to your journey, reflecting the country’s deep-rooted culture of hospitality and spiritual grace.<br/><br/>

      <strong>Hotel Check-in and Welcome Tea</strong><br/>
      Upon arrival, check in at your hotel and relax with a warm welcome tea, a traditional Bhutanese gesture of hospitality. Take some time to settle in and enjoy the serene surroundings before beginning your cultural journey.<br/><br/>

      <strong>Sightseeing in Paro Valley</strong><br/>
      Begin your exploration of Paro Valley with a visit to Kyichu Lhakhang, one of Bhutan’s oldest and most sacred temples, built in the 7th century. This revered site offers a glimpse into Bhutan’s spiritual heritage and is a place of devotion for locals and visitors alike.<br/>
      Next, stop at Ta Dzong, the National Museum of Bhutan, housed in a historic watchtower. Here, you can explore a rich collection of Bhutanese art, traditional artifacts, and historical exhibits that showcase the country’s culture and craftsmanship.<br/>
      Continue to Drukgyel Dzong, the ruins of a historic fortress set amidst scenic landscapes. Perched above the valley, it offers panoramic views of the Paro Valley and the surrounding Himalayan peaks, providing both a sense of Bhutan’s history and breathtaking natural beauty.<br/><br/>

      <strong>Lunch at Hotel:</strong><br/>
      Take a relaxing break and enjoy a wholesome lunch in the comfort of your hotel, offering a mix of local Bhutanese flavors and international options to refuel for the day’s exploration.<br/><br/>

      <strong>Afternoon visit to Paro Tshechu:</strong><br/>
      Spend the afternoon at Paro Rinpung Dzong to witness the vibrant Paro Tshechu festival, featuring masked dances, traditional music, and colorful rituals, providing a unique glimpse into Bhutanese culture and spiritual traditions.<br/><br/>

      <strong>Dinner and overnight in Paro:</strong><br/>
      Enjoy a delicious dinner at your hotel, savoring local Bhutanese flavors or international cuisine, followed by a restful overnight stay in the serene surroundings of Paro Valley.
    `,
  },
  {
    dayNumber: "Day 2",
    title: "Hike to Taktsang and Tshechu Tour in the Afternoon",
    subtitle: "Tiger’s Nest Hike and Cultural Experience",
    leftImages: [
      { src: "/hike.jpg", alt: "Taktsang Monastery Hike" },
      { src: "/viewpont.jpg", alt: "View Point Restaurant" },
    ],
    rightImage: "/The Mask Dance.jpg",
    videoUrl: "",
    content: `
      <strong>Early Morning:</strong><br/>
      After an early breakfast, begin the Taktsang Monastery (Tiger’s Nest) hike, winding through pine forests, waterfalls, and prayer-flagged cliffs, with a midway stop at a viewpoint for photos and refreshments, offering spectacular views of Paro Valley. The hike takes approximately 4 to 5 hours round-trip, including time to explore the monastery.<br/><br/>

      <strong>Late Morning:</strong><br/>
      Arrive at Taktsang Monastery, perched 3,120 meters above sea level. Explore its chapels, prayer halls, and courtyards while enjoying panoramic mountain views and learning about its spiritual significance, including its association with Guru Rinpoche (Padmasambhava).<br/><br/>

      <strong>Lunch at View Point Restaurant:</strong><br/>
      Stop at View Point Restaurant while descending from Taktsang Monastery, enjoying a meal of local Bhutanese cuisine and taking in breathtaking views of the Paro Valley before continuing back to the base.<br/><br/>

      <strong>Afternoon Paro Tshechu Tour:</strong><br/>
      Attend the Paro Tshechu festival at Paro Rinpung Dzong, one of Bhutan’s most vibrant cultural events. Experience the masked dances (Cham), where monks and lay performers enact traditional spiritual and historical stories through elaborate costumes and choreography. Enjoy traditional music and drumming that accompany the dances, creating a lively and immersive festive atmosphere.<br/>
      A highlight of the festival is the unfurling of the Thongdrol, a large sacred painting believed to bring blessings and cleanse sins for all who witness it. Throughout the afternoon, observe religious rituals performed by monks, and enjoy folk dances, songs, and cultural performances that showcase Bhutanese heritage. The event is also a community gathering, bringing locals and visitors together to celebrate, socialize, and experience Bhutan’s rich culture and spiritual traditions.<br/><br/>

      <strong>Farewell Dinner and Overnight:</strong><br/>
      Hotel in Paro. Conclude your Bhutan journey with a farewell dinner at your hotel or a local restaurant in Paro, featuring traditional Bhutanese cuisine and a warm, cultural ambiance. Retire to your hotel afterward for an overnight stay in Paro.
    `,
  },
  {
    dayNumber: "Day 3",
    title: "Departure from Paro",
    subtitle: "Farewell to Bhutan",
    leftImages: [
      { src: "/dance.jpg", alt: "Paro Airport" },
      { src: "/dance2.jpg", alt: "Farewell Bhutan" },
    ],
    rightImage: "/lam.jpg",
    videoUrl: "",
    content: `
      <strong>After breakfast:</strong><br/>
      Transfer to Paro International Airport for your onward journey. Our representative from Lumora Tours and Travels will bid you farewell with warm wishes and blessings for your safe journey home.<br/><br/>

      <strong>Departure from Bhutan:</strong><br/>
      Begin your final day with a check-in at Paro International Airport, completing airport formalities with ease. As you await your flight, take a quiet moment to reflect on the enchanting experiences, vibrant culture, and serene landscapes that have made your Bhutan journey unforgettable.<br/>
      When boarding is announced, proceed to your gate and settle in for departure. As your plane ascends over the majestic Himalayas, savor one last panoramic view of Bhutan’s pristine valleys and cliffside monasteries—a breathtaking farewell to the Land of the Thunder Dragon.<br/><br/>

   `,
  },
   {
    dayNumber: "",
    title: "Until Next Time",
    subtitle: "",
   
    videoUrl: "",
    content: `
         As you bid farewell to Bhutan, carry with you the serenity of its valleys, the warmth of its people, and the timeless beauty of its mountains and monasteries. Though your journey may end for now, the memories and experiences you’ve gathered will linger, calling you back.
    `,
  },
];


  return (
    <main className="w-full h-full">
      <Landing
        image="/Beautiful Dzong.jpg"
        alt="Paro Festival"
        imagestyle="h-[500px] md:h-[600px] lg:h-[500px]"
        subContainer="w-full relative"
        maincontainer="w-full"
        heading="The Paro Tshechu (Festival of Paro)"
        subheading="Experience the vibrant culture, traditions, and spiritual celebrations of Bhutan in the Paro Festival."
        Itinerary="Book Us"
        headingstyle="font-mono"
      />
      <TourBand
        data={tourInfo}
        mainContainerstyle="mt-10  flex justify-start"
      />
      <div className=" bg-[#EAEDF0] pt-3 pb-10">
        <TourAbout data={mockTourData} />
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
