import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

interface ItineraryItem {
  day: string;
  title: string;
  content: string;
}

interface CulturalHighlightsProps {
  items: ItineraryItem[];
  mainContainer?: string;
}

const CulturalHighlights: React.FC<CulturalHighlightsProps> = ({
  items,
  mainContainer,
}) => {
  const itineraryData = items;

  return (
    <div className={mainContainer || "max-w-4xl p-4"}>
      <Accordion type="single" collapsible className="w-full">
        <div className="relative pl-14">
          {/* Vertical Line */}
          <div
            className="absolute left-5 w-0.5 bg-gray-200 z-0"
            style={{ top: "2.5rem", bottom: "2rem" }}
          />

          {itineraryData.map((item, index) => {
            const isLast = index === itineraryData.length - 1;

            return (
              <div key={index}>
                <AccordionItem value={`item-${index}`} className="border-0 ">
                  <AccordionTrigger className="hover:no-underline py-5 hover:bg-gray-50/50 transition-colors rounded-lg [&[data-state=open]_.plus-icon]:rotate-45">
                    <div className="flex items-center gap-4 w-full -ml-14">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 transition-all duration-300 plus-icon z-10">
                        <Plus
                          className="text-white"
                          size={20}
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className="flex-1 text-left text-xl">
                        <span className="font-bold">{item.day}:</span>{" "}
                        <span className="ml-2">{item.title}</span>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pl-14 pr-4 pb-8 text-gray-700 leading-relaxed pt-0 -ml-14 ">
                    <div className="ml-14">{item.content}</div>
                  </AccordionContent>
                    {!isLast&&<div className="w-full border-b border-gray-200 mt-4 -ml-9"></div>}
                </AccordionItem>
              
              </div>
            );
          })}
        </div>
      </Accordion>
    </div>
  );
};

export default CulturalHighlights;
