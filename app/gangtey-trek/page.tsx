"use client";

import HeroVideoSection from "@/component/destination";
import PhotoCollage from "@/component/image-collage/iamge-collage";
import PhotoGallery from "@/component/image-collage/iamge-collage";
import ItineraryDay from "@/component/itinerary/itinerary";
import image1 from "@/public/image1.jpg";
import Landing from "@/component/landing/landing";
import Navbar from "@/component/navbar/navbar";
import PolicyPage, {
} from "@/component/policy-page/policy-page";
import TourBand from "@/component/tour-band/tour- band";
import TourAbout from "@/component/tour-highlights/tour-highlights";
import { tourInfo, mockTourData, photoSets, newTourPackageData, eaternBhutanData, gangteyTrekBhutanData } from "@/data/paro-places-data";
import { Check, MapPin, X } from "lucide-react";
import TripsForFistTimer from "../pages/trips-for-first-timer";
import Footer from "@/component/footer";
import PaymentCard from "@/component/payments";

export default function CultureMain() {
    const itinerary = [
        {
            dayNumber: "Day 1",
            title: "Arrival in Paro – Transfer to Phobjikha Valley",
            subtitle: "",
            leftImages: [
                { src: "/thimphu-hotel.jpg", alt: "Paro Airport" },
                { src: "/thimphu-dzong.jpg", alt: "Farewell Bhutan" },
            ],
            rightImage: "/kurje.jpg",
            videoUrl: "",
            content: `
Upon arrival at Paro International Airport, you will be warmly welcomed by your guide and transferred to Phobjikha Valley (approx. 4–5 hours by road). En route, enjoy scenic views of the Paro and Wangdue valleys, traditional villages, and terraced fields. Upon arrival, settle into your lodge or campsite, relax, and take a short walk to explore the valley. The evening can be spent observing local life or photographing the picturesque valley sunset. Overnight in Phobjikha.
    `,
        },
        {
            dayNumber: "Day 2",
            title: "Phobjikha – Zasa",
            subtitle: "Distance: 15 km, Duration: 6–7 hours (Camp Altitude: 3,130 m)",
            leftImages: [
                { src: "/amankora_bhutan_-_bumthang_6.jpg", alt: "Paro Airport" },
                { src: "/Bhutanese village.jpg", alt: "Farewell Bhutan" },
            ],
            rightImage: "/campning.jpg",
            videoUrl: "",
            content: `
Distance: 15 km, Duration: 6–7 hours (Camp Altitude: 3,130 m)<br/>

The trek begins near Tabiting village, passing through meadows and cultivated fields. The trail climbs gradually through forests of juniper, bamboo, magnolia, and rhododendron to Tsele La (3,430 m). From here, descend into the Juge Kangkha Chhu valley. Continue to Gogona village, renowned for its traditional cheese. The day concludes at the Zasa campsite, beside a small stream in a yak pasture.
    `,
        },
        {
            dayNumber: "Day 3",
            title: "Zasa – Chorten Karpo",
            subtitle: "Distance: 16 km, Duration: 5–7 hours (Camp Altitude: 3,330 m)",
            leftImages: [
                { src: "/lhakang.jpg", alt: "Paro Airport" },
                { src: "/Landscape0.jpg", alt: "Farewell Bhutan" },
            ],
            rightImage: "/kal11.jpg",
            videoUrl: "",
            content: `
Distance: 16 km, Duration: 5–7 hours (Camp Altitude: 3,330 m)<br/>

Begin the day with a gentle climb to Shobe La Pass (3,480 m), offering panoramic mountain views. Descend into a wide valley with views of Khothokha village, home to about 60 houses. The trek continues with a gentle ascent to the Chorten Karpo campsite, where four chortens stand amidst a blue pine forest, marking a scenic and peaceful stop for the night.
    `,
        },
        {
            dayNumber: "Day 4",
            title: "Chorten Karpo – Tikke Zampa",
            subtitle: "Distance: 12 km, Duration: 4–5 hours",
            leftImages: [
                { src: "/dagala2.jpg", alt: "Paro Airport" },
                { src: "/dagala3.jpg", alt: "Farewell Bhutan" },
            ],
            rightImage: "/Phobjikha-Valley.jpg",
            videoUrl: "",
            content: `
Distance: 12 km, Duration: 4–5 hours <br/>

From camp, follow the trail to a forest road and continue along a ridge at 2,800 m. The descent leads through lush valleys, offering excellent birdwatching opportunities. The trek concludes at Tikke Zampa, where you will be transferred back to Paro or your next destination, completing the scenic and culturally rich journey.
    `,
        },
        {
            dayNumber: "Day 5",
            title: "Paro – Sightseeing & Departure",
            subtitle: "",
            leftImages: [
                { src: "/cul8.jpg", alt: "Paro Airport" },
                { src: "/cul6.jpg", alt: "Farewell Bhutan" },
            ],
            rightImage: "/monestary.jpg",
            videoUrl: "",
            content: `
On your final day, enjoy a leisurely morning in Paro. Optional activities include visiting Kyichu Lhakhang or Paro Rinpung Dzong for photography and cultural exploration. After breakfast, transfer to Paro International Airport for your onward flight, concluding your Gangtey Trek with memories of Bhutan’s stunning landscapes and traditional villages.
    `,
        },
        {
            dayNumber: " ",
            title: "Until Next Time",
            subtitle: "",

            videoUrl: "",
            content: `
Until Next Time:
As you bid farewell to Bhutan, carry with you the serenity of its valleys, the warmth of its people, and the timeless beauty of its mountains and monasteries. Though your journey may end for now, the memories and experiences you’ve gathered will linger, calling you back to the Land of Thunder Dragon soon!
    `,
        },
    ];




    return (
        <main className="w-full h-full">
            <Landing
                image="/photo6.jpg"
                alt="Paro Festival"
                imagestyle="h-[500px] md:h-[600px] lg:h-[500px]"
                subContainer="w-full relative"
                maincontainer="w-full"
                heading="Gangtey Trek in Punakha"
                subheading="The Gangtey Trek is a moderate, short trek through scenic valleys, forests, and traditional villages."
                Itinerary="Book Us"
                headingstyle="font-mono"
            />
            <TourBand
                data={tourInfo}
                mainContainerstyle="mt-10  flex justify-start"
            />
            <div className=" bg-[#EAEDF0] pt-3 pb-10">
                <TourAbout data={gangteyTrekBhutanData} />
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
