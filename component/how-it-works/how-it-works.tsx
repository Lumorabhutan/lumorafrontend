"use client";

import { motion, Variants } from "framer-motion";
import { User, Briefcase, ShoppingBag } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { tours } from "./data";

interface Tour {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  }),
};

export default function ToursSection() {
  // ✅ define tours array HERE in the same client file

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-green-500 text-white rounded p-8 flex flex-col justify-between"
        >
          <div>
            <p className="uppercase text-base font-semibold font-mono">
              Flexible Tours
            </p>
            <h2 className="text-3xl font-bold mt-2 mb-4 font-mono">
              Explore your way
            </h2>
            <p className="text-base font-sans">
              Explore Moliva your way with incredible trips and captivating
              experiences.
            </p>
          </div>
          <a href="#" className="mt-4  text-white font-medium text-sm">
            You need <strong className="underline">advice</strong>?
          </a>
        </motion.div>

        {tours.map((tour, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ rotateY: 8, rotateX: -5, scale: 1.09 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-bgsubcolor shadow-md rounded-sm p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full mb-4">
              <tour.icon />
            </div>
            <h3 className="text-lg font-semibold font-mono mb-2">
              {tour.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-sans">
              {tour.description}
            </p>
            <a
              href={tour.linkHref}
              className="text-green-500 font-medium text-sm hover:text-black"
            >
              {tour.linkText} →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
