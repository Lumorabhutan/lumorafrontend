"use client";

import { motion } from "framer-motion";
import {
  Award,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function TravelAgencyAbout() {
  const ContactUsData = [
    {
      icon: Phone,
      text: "+975 17 94 98 27",
      href: "#",
      color: "#34D399", // green for phone (optional)
    },
    {
      icon: Mail,
      text: "Mail",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=ceo@bhutanbestinbound.com",
      color: "#D44638", // Gmail red
    },
    {
      icon: Facebook,
      text: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61580366382758",
      color: "#1877F2", // Facebook blue
    },
    {
      icon: Instagram,
      text: "Instagram",
      href: "https://instagram.com/bhutanbestinbound",
      color: "#E4405F", // Instagram pinkish
    },
    {
      icon: Linkedin,
      text: "Linkedin",
      href: "https://bt.linkedin.com/in/lumora-tours-and-travels-b0b535380",
      color: "#0A66C2", // LinkedIn blue
    },
    {
      icon: MapPin,
      text: "Place",
      href: "https://maps.google.com/?q=Thimphu+Bhutan",
      color: "#EA4335", // Google Maps red
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="relative py-20 px-5 md:px-12 bg-bgsubcolor overflow-hidden">
      <div className="relative z-10 max-w-8xl mx-auto flex flex-col md:flex-row justify-center  gap-12">
        {/* LEFT IMAGE (on desktop), BELOW ON MOBILE */}
        <div className="order-2 md:order-1 flex justify-center items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl w-[300px] sm:w-[500px]">
              <img
                src="/The Takila.jpg"
                alt="Traveler hiking"
                className="w-full h-[700px] sm:h-[600px] object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT CONTENT (on desktop), ABOVE ON MOBILE */}
        <div className="order-1 md:order-2 max-w-xl  md:mr-20 text-left md:text-left">
          <p className="text-green-600  uppercase text-2xl not-visited: mb-3 font-sans">
            About  Lumora Tours and Travels
          </p>
          <p className="text-black font-bold font-lato  tracking-widest  text-xl not-visited: mb-3">
            We are Leading Bhutan’s Next Era of Sustainable Travel
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            "Travel Sustainably, Explore Mindfully” reflects Bhutan’s deep-rooted philosophy of harmony between people, nature, and culture. At Lumora Tours and Travels, we believe that travel should enrich both the traveler and the destination.
            Travel sustainably means minimizing environmental impact, supporting local livelihoods, and protecting Bhutan’s pristine landscapes, culture, and traditions for future generations.
            Explore mindfully invites travelers to slow down, connect deeply with local culture, traditions, and people, and experience Bhutan with awareness and respect.
            Through mindful exploration, we create authentic travel experiences that reflect the spirit of Bhutan and contribute positively to the country’s vision of Gross National Happiness."
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-10 justify-center items-center "
          >
            {ContactUsData.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.a
                  key={index}
                  href={reason.href}
                  variants={item}
                  className="flex items-center gap-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    className="w-7 h-7 flex-shrink-0"
                    style={{ color: reason.color }}
                  />
                  <p className="text-gray-600 font-serif text-base leading-snug">
                    {reason.text}
                  </p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
