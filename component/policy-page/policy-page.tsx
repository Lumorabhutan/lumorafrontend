// components/PolicyPage.tsx
import React from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BorderHorizontal from "../border-horizontal/border-horizontal";
export interface TourHighlight {
  title: string;
  description: string;
  icon:React.ElementType
  color?:string
}

export interface PolicyPageData {
  city: string;
  country: string;

  highlights: TourHighlight[];
  description?: string; // plain text with \n for line-breaks
}
interface PolicyPageProps {
  data: PolicyPageData;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ data }) => {
  const { city, country, highlights, description } = data;

  // Split description on double line-breaks to create paragraphs
  const paragraphs = description?.split(/\n\s*\n/).filter((p) => p.trim());

  return (
   <Card className="w-full  mx-auto mt-10 px-4 sm:px-6 lg:max-w-6xl">
      {/* Header – “About” */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-serif">
          Policy
        </CardTitle>
        <BorderHorizontal borderStyle="w-full border-b border-gray-300 mt-4 mr-2" />
      </CardHeader>

      <CardContent className="space-y-8">
        {/* ---------- Highlights ---------- */}
       <section className="flex flex-col sm:flex-row gap-4 sm:gap-10">
      <h3 className="text-lg font-semibold mb-2 sm:mb-0 sm:w-1/4">
        Policy Included
      </h3>
      <ul className="space-y-2 sm:w-3/4">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex flex-row items-start gap-3">
            <item.icon
              className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`}
              strokeWidth={2.5}
            />
            <div>
              <span className="text-muted-foreground">{item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
        <BorderHorizontal borderStyle="w-full border-b border-gray-300 mt-4 mr-2" />

        {/* ---------- Description ---------- */}
       <section className="flex flex-col sm:flex-row gap-4 sm:gap-10">
      <h3 className="text-lg font-semibold mb-2 sm:mb-0 sm:w-1/4">
        Policy Included
      </h3>
      <ul className="space-y-2 sm:w-3/4">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex flex-row items-start gap-3">
            <item.icon
              className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`}
              strokeWidth={2.5}
            />
            <div>
              <span className="text-muted-foreground">{item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
         <BorderHorizontal borderStyle="w-full border-b border-gray-300 mt-4 mr-2" />

        {/* ---------- Description ---------- */}
       <section className="flex flex-col sm:flex-row gap-4 sm:gap-10">
      <h3 className="text-lg font-semibold mb-2 sm:mb-0 sm:w-1/4">
        Policy Included
      </h3>
      <ul className="space-y-2 sm:w-3/4">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex flex-row items-start gap-3">
            <item.icon
              className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`}
              strokeWidth={2.5}
            />
            <div>
              <span className="text-muted-foreground">{item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
      </CardContent>
    </Card>
  );
};

export default PolicyPage;
