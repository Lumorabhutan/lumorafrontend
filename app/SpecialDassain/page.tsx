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
    generalFestivalData,
    introBhutanData,
    JomolhariData,
    dassainData,

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
    title: "Arrival in Paro – Transfer to Thimphu (A Warm Festival Welcome)",
    subtitle: "",
    leftImages: [
      { src: "/das1.jpg", alt: "Paro Airport" },
      { src: "/das2.jpg", alt: "Traditional khada welcome" },
    ],
    rightImage: "/das3.jpg",
    content: `
      Your journey begins as you land at the iconic Paro International Airport, surrounded by breathtaking Himalayan mountains. Our Lumora representative will greet you with a traditional khada scarf and guide you to Thimphu, Bhutan’s charming capital. Along the way, enjoy scenic landscapes and fresh mountain air.
      
      Upon arrival, settle into your hotel and enjoy a Dassain Welcome Tea session with homemade snacks. In the afternoon, visit the majestic Buddha Dordenma, offering sweeping views of the Thimphu valley, followed by a peaceful walk around the Memorial Chorten, one of Bhutan’s most sacred monuments. Your evening ends with a special Dassain Cultural Dinner featuring traditional Bhutanese and Nepali festival dishes accompanied by folk music.
    `,
  },
  {
    dayNumber: "Day 2",
    title: "Dassain Tika Day at Devi Pangchyan Mandir",
    subtitle: "",
    leftImages: [
      { src: "/das4.jpg", alt: "Tashichho Dzong" },
      { src: "/das5.jpg", alt: "Tika & Jamara blessing" },
    ],
    rightImage: "/das6.jpg",
    content: `
      Begin with a visit to Tashichho Dzong, followed by a special Dassain Tika & Jamara Blessing Ceremony at Devi Pangchyan Mandir. Receive blessings from the temple priest and enjoy an optional photo session in traditional dress.
      
      Spend the afternoon exploring Thimphu’s festive markets and end the day with a relaxed walk along Norzin Lam.
    `,
  },
  {
    dayNumber: "Day 3",
    title: "Thimphu to Paro (Cultural Excursions & Festive Evening)",
    subtitle: "",
    leftImages: [
      { src: "/das7.jpg", alt: "Tachog Iron Bridge" },
      { src: "/das8.jpg", alt: "National Museum Paro" },
    ],
    rightImage: "/das9.jpg",
    content: `
      After breakfast, embark on a scenic drive back to Paro. En route, stop at Tachog Iron Bridge, designed by the legendary architect Thangtong Gyalpo. Once in Paro, immerse yourself in the elegant exhibits of the National Museum, showcasing Bhutan’s rich spiritual heritage. Afterwards, walk down to the iconic Paro Rinpung Dzong, a fortress dripping with history and beauty.
      In the evening, Lumora hosts a cozy Dassain Bonfire Night, where you’ll enjoy festive meals, music, and cultural sharing under the stars.
    `,
  },
  {
    dayNumber: "Day 4",
    title: "Hike to Tiger’s Nest + Valley Picnic Experience",
    subtitle: "",
    leftImages: [
      { src: "/bhutan-thimphu-city.jpg", alt: "Trail to Tiger’s Nest" },
      { src: "/buddha.png", alt: "Taktsang Monastery" },
    ],
    rightImage: "/buddha.jpg",
    content: `
      Early morning, begin your hike to Taktsang Monastery (Tiger’s Nest), hanging dramatically on a cliffside 900 meters above the valley floor. Your guide will share the spiritual legends of Guru Rinpoche as you make your way through pine forests and prayer-flag-draped pathways.
      
      After descending, enjoy a Dassain Festive Picnic Lunch in the serene Paro valley, surrounded by rivers, fields, and mountain views.
      
      Spend the evening at leisure—explore local cafés, shop for souvenirs, or opt for a soothing traditional hot stone bath (optional).
    `,
  },
  {
    dayNumber: "Day 5",
    title: "Departure from Paro (Farewell Blessings)",
    subtitle: "",
 
    content: `
      Enjoy your final breakfast in Bhutan before checking out. Before heading to the airport, Lumora presents you with a Dassain Blessing Souvenir as a token of gratitude for choosing us.
      
      Our team ensures a smooth and heartfelt departure as you carry home memories of joy, culture, and celebration.
    `,
  },
];

    // const PolicyPageData: PolicyPageData = {
    //   city: "Thimphu",
    //   country: "Bhutan",
    //   highlights: [
    //     {
    //       title: "Thimphu City Exploration",
    //       description:
    //         "Discover Bhutan’s charming capital, where traditional architecture blends seamlessly with modern life. Visit the Buddha Dordenma statue, Tashichho Dzong, and local markets.",
    //       icon: Check,
    //       color: "text-[#00A651]",
    //     },
    //     {
    //       title: "Cultural Immersion",
    //       description:
    //         "Experience Bhutanese traditions through visits to monasteries, museums, and craft centers showcasing the country’s art, textiles, and heritage.",
    //       icon: X,
    //       color: "text-red-500",
    //     },
    //   ],
    // };

    return (
        <main className="w-full h-full">
            <Landing
                image="/das4.jpg"
                alt="Paro Festival"
                imagestyle="h-[500px] md:h-[600px] lg:h-[500px]"
                subContainer="w-full relative"
                maincontainer="w-full"
                heading="Special Dassain with Lumora"
                subheading="Celebrate Dassain with Lumora Tours & Travels as we bring you an unforgettable festivity blended with spiritual blessings."
                Itinerary="Book Us"
                headingstyle="font-mono"
            />
            <TourBand
                data={tourInfo}
                mainContainerstyle="mt-10  flex justify-start"
            />
            <div className=" bg-[#EAEDF0] pt-3 pb-10">
                <TourAbout data={dassainData} />
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
