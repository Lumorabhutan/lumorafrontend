"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Star,
  Globe,
  Clock,
  Tag,
  Sparkles,
  Calendar,
  CalendarDays,
  Car,
  HeartHandshake,
  Hotel,
  Plane,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function WhyChooseUs() {
  // Define reasons with dynamic icons
  const reasons = [
    { icon: Globe, text: "Reviewed Best Tour Company in Bhutan" },
    { icon: Sparkles, text: "Complete Customization" },
    { icon: Calendar, text: "Available All Year Round Packages" },
    { icon: Hotel, text: "Best Hotels Offer" },
    { icon: Users, text: "Rated Best Guided Services in Bhutan" },
    { icon: Plane, text: "Available Any-Day Departures" },
    { icon: CalendarDays, text: "Flexible On Days Program" },
    { icon: CheckCircle2, text: "Guaranteed Flight Seats" },
    { icon: Car, text: "Rated Best Transports Service Provider" },
    { icon: HeartHandshake, text: "Friendly Bhutanese Own Company" },
  ];

  // Framer Motion variants
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
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Image Section */}
        <div className="relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full max-w-lg"
          >
            <Image
              src="/why-us.jpg"
              width={600}
              height={500}
              alt="Traveler"
              className="rounded-3xl object-cover w-full h-[600px] shadow-lg"
            />

            {/* Floating Review Card */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              viewport={{ once: true }}
              className="absolute top-6 -right-4 lg:right-6 bg-white rounded-2xl shadow-xl p-5 w-52"
            >
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900">4.9</h3>
                <div className="flex justify-center mt-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="#facc15" strokeWidth={0} size={16} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">2394 reviews</p>
                <Badge className="bg-green-100 text-green-700 mt-2 px-2 py-0.5 text-xs rounded-full">
                  Excellent
                </Badge>
                <Separator className="my-2" />
                <p className="text-xs font-semibold text-slate-800">
                  Tripadvisor
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="uppercase text-green-600 font-medium tracking-wider text-sm mb-2">
            Great Experience
          </p>
          <h2 className="text-3xl font-mono font-bold text-gray-900 mb-4">
            Why choose us?
          </h2>
          <p className="text-gray-600 text-base mb-8 leading-relaxed font-serif">
            We are the custodians and storytellers of Bhutan, crafting
            expeditions that transcend travel. Rooted in the profound principles
            of Gross National Happiness, we invite you to explore our sacred
            valleys, timeless traditions, and untouched landscapes with purpose
            and mindfulness.
          </p>

          {/* Reasons List with Icons */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
          >
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex items-start gap-4"
                >
                  <Icon
                    className={`w-7 h-7 text-lime-500 mt-1 flex-shrink-0`}
                  />
                  <p className="text-gray-600 font-serif text-base leading-snug">
                    {reason.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
