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
            title: "Arrival in Paro",
            subtitle: "",
            leftImages: [
                { src: "/jomo1.jpg", alt: "Paro International Airport" },
                { src: "/jomo2.jpg", alt: "Paro Rinpung Dzong" },
            ],
            rightImage: "/jomo26.jpg",
            content: `
      Upon arrival at Paro International Airport, guests are warmly welcomed and transferred to the hotel for rest and acclimatization. 
      In the afternoon, a guided sightseeing tour includes Paro Rinpung Dzong, a remarkable fortress-monastery, and the National Museum, providing an introduction to Bhutanese history and culture.<br/><br/>
      Overnight stay at a 3-star hotel in Paro.
    `,
        },
        {
            dayNumber: "Day 2",
            title: "Paro to Shana and Trek to Soe Village",
            subtitle: "",
            leftImages: [
                { src: "/jomo3.jpg", alt: "Trek starting point at Shana" },
                { src: "/jomo4.jpeg", alt: "Pine forests and streams" },
            ],
            rightImage: "/jomo25.jpg",
            content: `
      After breakfast, a scenic drive from Paro leads to the trek’s starting point at Shana, situated amidst lush valleys. 
      The trek begins through pine forests, streams, and terraced fields, culminating at Soe Village, where accommodation is arranged in a campsite or local tea house.<br/><br/>
      Meals included: Breakfast, Lunch, Dinner.<br/>
      Overnight in campsite/local tea house.
    `,
        },
        {
            dayNumber: "Day 3",
            title: "Trek from Soe Village to Jangothang",
            subtitle: "",
            leftImages: [
                { src: "/jomo5.jpg", alt: "Mount Jomolhari" },
                { src: "/jomo6.jpg", alt: "Jangothang plateau" },
            ],
            rightImage: "/jomo24.jpg",
            content: `
      The trail ascends gradually through forests and open valleys, offering panoramic views of Mount Jomolhari and surrounding Himalayan peaks. 
      Trekking concludes at Jangothang, a scenic plateau, with overnight stay in a tented camp.<br/><br/>
      Meals included: Breakfast, Lunch, Dinner.<br/>
      Trekking time: 5–6 hours.<br/><br/>
      Overnight in tented camp at Jangothang.
    `,
        },
        {
            dayNumber: "Day 4",
            title: "Jangothang to Jomolhari Base Camp",
            subtitle: "",
            leftImages: [
                { src: "/jomo7.jpg", alt: "Rhododendron forests" },
                { src: "/jomo8.jpg", alt: "Jomolhari glacier close-up" },
            ],
            rightImage: "/jomo23.jpg",
            content: `
      The trek continues through rhododendron forests and alpine meadows, with close-up views of glaciers and Mount Jomolhari. 
      A campsite is established near the base camp, providing a serene mountain setting.<br/><br/>
      Meals included: Breakfast, Lunch, Dinner.<br/>
      Trekking time: 6–7 hours.<br/><br/>
      Overnight in tented camp near Jomolhari Base Camp.
    `,
        },
        {
            dayNumber: "Day 5",
            title: "Base Camp to Sinchela Pass",
            subtitle: "",
            leftImages: [
                { src: "/jomo9.jpg", alt: "Sinchela Pass (4,880m)" },
                { src: "/jomo22.jpg", alt: "Panoramic Himalayan vista" },
            ],
            rightImage: "/jomo22.jpg",
            content: `
      The trail ascends to Sinchela Pass (4,880 m), offering panoramic Himalayan vistas. 
      After crossing the pass, a descent leads to a suitable campsite for overnight stay. 
      Camping equipment, sleeping bags, and meals are provided.<br/><br/>
      Trekking time: 6–7 hours.<br/><br/>
      Overnight in tented camp.
    `,
        },
        {
            dayNumber: "Day 6",
            title: "Sinchela Pass to Lingshi Village",
            subtitle: "",
            leftImages: [
                { src: "/jomo11.jpg", alt: "Traditional houses in Lingshi" },
                { src: "/jomo12.jpg", alt: "Yak pastures and alpine landscape" },
            ],
            rightImage: "/jomo21.jpg",
            content: `
      The descent from high-altitude terrain reaches Lingshi Village, a charming settlement with traditional Bhutanese houses. 
      The route passes yak pastures, streams, and alpine landscapes, providing a glimpse into rural Bhutanese life. 
      Accommodation is in a homestay or campsite.<br/><br/>
      Meals included: Breakfast, Lunch, Dinner.<br/>
      Trekking time: 5–6 hours.<br/><br/>
      Overnight in homestay or campsite.
    `,
        },
        {
            dayNumber: "Day 7",
            title: "Lingshi Village to Chebisa with Optional Gangtey Visit",
            subtitle: "",
            leftImages: [
                { src: "/jomo13.jpg", alt: "Remote hamlet of Chebisa" },
                { src: "/jomo14.jpg", alt: "Gangtey Monastery (optional)" },
            ],
            rightImage: "/jomo20.jpg",
            content: `
      The trail follows gentle paths through remote hamlets and grazing areas. 
      An optional excursion to Gangtey Valley and Gangtey Monastery in the Phobjikha Valley is available. 
      Overnight stay is in a campsite or lodge.<br/><br/>
      Meals included: Breakfast, Lunch, Dinner.<br/>
      Trekking time: 5–6 hours.<br/><br/>
      Overnight in campsite or lodge.
    `,
        },
        {
            dayNumber: "Day 8",
            title: "Trek Completion and Return to Paro via Thimphu",
            subtitle: "",
            leftImages: [
                { src: "/jomo15.jpg", alt: "Scenic drive to Thimphu" },
                { src: "/jomo16.jpg", alt: "Rivers and terraced fields" },
            ],
            rightImage: "/jomo19.jpg",
            content: `
      The trek concludes at Chebisa or Bomthang, from where guests are transferred by vehicle on a scenic drive to Thimphu, Bhutan’s capital. 
      Along the way, views of rivers, villages, and terraced fields enhance the experience.<br/><br/>
      Overnight stay at a 3-star hotel in Thimphu or Paro.<br/>
      Meals included: Breakfast, Lunch, Dinner.
    `,
        },
        {
            dayNumber: "Day 9",
            title: "Paro Sightseeing and Tiger’s Nest Hike",
            subtitle: "",
            leftImages: [
                { src: "/jomo17.jpg", alt: "Tiger’s Nest Monastery" },
                { src: "/jomo18.jpg", alt: "Cliffside view of Taktsang" },
            ],
            rightImage: "/jomo26.jpg",
            content: `
      A hike to the iconic Tiger’s Nest Monastery (Taktsang) provides spectacular cliffside views of Paro Valley. 
      After the hike, free time is available to explore Paro town and local markets.<br/><br/>
      Overnight stay at a 3-star hotel in Paro.<br/>
      Meals included: Breakfast, Lunch.
    `,
        },
        {
            dayNumber: "Day 10",
            title: "Departure from Paro",
            subtitle: "",

            content: `
      After breakfast, guests are transferred to Paro International Airport for departure, concluding an unforgettable Himalayan adventure.<br/><br/>
      Meals included: Breakfast.<br/><br/>
      <strong>Trekking Requirements & Notes</strong> <br>
      

o	Trekking Level: Moderate to Strenuous (altitudes up to 4,880 m)<br>

o	Accommodation: Hotels in Paro/Thimphu; tents and camping along the trek; homestay options in Lingshi<br>

o	Meals: Full board (Breakfast, Lunch, Dinner) during the trek; breakfast included in hotels.<br>

o	Equipment Provided: Tents, sleeping bags, mats, basic camping gear<br>

o	Recommended Gear: Sturdy trekking shoes, trekking poles, warm clothing, sun protection, personal medication, and lights. <br>

o	Guides & Support: Experienced Bhutanese guides and porters. 

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
                image="/trekking-in-bhutan-bannr.jpg"
                alt="Paro Festival"
                imagestyle="h-[500px] md:h-[600px] lg:h-[500px]"
                subContainer="w-full relative"
                maincontainer="w-full"
                heading="Jomolhari Trek – Bhutan"
                subheading="The Jomolhari Trek is one of Bhutan’s most iconic and scenic treks, offering trekkers an immersive journey into the pristine Himalayan wilderness."
                Itinerary="Book Us"
                headingstyle="font-mono"
            />
            <TourBand
                data={tourInfo}
                mainContainerstyle="mt-10  flex justify-start"
            />
            <div className=" bg-[#EAEDF0] pt-3 pb-10">
                <TourAbout data={JomolhariData} />
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
