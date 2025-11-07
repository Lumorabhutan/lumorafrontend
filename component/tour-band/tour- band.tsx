"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
interface BandData {
  typename?: string;
  value?: string;
  icon?: React.ElementType;
}

interface TourBandAttributes {
  data: BandData[];
  mainContainerstyle?: string;
}

const TourBand: React.FC<TourBandAttributes> = ({
  data,
  mainContainerstyle,
}) => {
  return (
    <div className={mainContainerstyle}>
      {/* Image Section */}
      <div className="items-center grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-40 gap-y-7 max-w-7xl mx-auto">
        {data.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ rotateY: 8, scale: 1.09 }}
            className="group flex flex-row  p-3  py-2  transition-all duration-300  hover:bg-lime-600"
          >
            {/* Rebuild Card structure */}
            <div className="flex-shrink-0  rounded-lg">
              {item.icon && (
                <item.icon  className="w-10 h-10 text-[#74B530] group-hover:text-white transition-colors duration-300" />
              )}
            </div>

            <div className="w-px h-10 bg-gray-300 mx-3  self-stretch" />

            <div className=" flex flex-col justify-center font-sans">
             
              <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300">
                {item.typename}
              </p>

               <h3 className="font-mono text-lg font-semibold whitespace-nowrap text-gray-900 group-hover:text-white transition-colors duration-300">
                {item.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TourBand;
