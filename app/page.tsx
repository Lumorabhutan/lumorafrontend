import AboutUs from "@/component/about-us/about-us";
import AdventuresSection from "@/component/advanture";
import Destinations from "@/component/destination";
import Footer from "@/component/footer";
import HomePage from "@/component/home";
import { tours } from "@/component/how-it-works/data";
import ToursSection from "@/component/how-it-works/how-it-works";
import Navbar from "@/component/navbar/navbar";
import WhyChooseUs from "@/component/why-us/why-us";
import Image from "next/image";
import TripsForFistTimer from "./pages/trips-for-first-timer";
import { Are_You_Serious } from "next/font/google";
import image1 from "@/public/bhutan-thimphu-city.jpg";
import TouristTalkAboutUs from "@/component/tourist-talk-aboutus";
import AdventureTypes from "@/component/advanture";
export default function Home() {
  return (
    <main className="overflow-hidden">
      <HomePage />
      <AboutUs />
      
      <ToursSection />
      <TripsForFistTimer />
      <Destinations
        title={"Lumora Tours and Travel video"}
        subtitle={"Beautiful & Romantic"}
        backgroundImage={image1}
        video={true}
      />
      {/* <AdventuresSection /> */}
      <TouristTalkAboutUs />
      <Footer />
      
    </main>
  );
}
