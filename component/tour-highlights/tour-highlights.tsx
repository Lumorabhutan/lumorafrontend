// components/TourAbout.tsx
import React from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BorderHorizontal from "../border-horizontal/border-horizontal";
export interface TourHighlight {
  title: string;
  description: string;
}

export interface TourAboutData {
  city: string;
  country: string;

  highlights: TourHighlight[];
  description: string; // plain text with \n for line-breaks
}
interface TourAboutProps {
  data: TourAboutData;
}

const TourAbout: React.FC<TourAboutProps> = ({ data }) => {
  const { city, country, highlights, description } = data;

  // Split description on double line-breaks to create paragraphs
  const paragraphs = description.split(/\n\s*\n/).filter((p) => p.trim());

  return (
    <Card className="w-full max-w-7xl mx-auto mt-10">
      {/* Header – “About” */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-serif">
          The Highlights
        </CardTitle>
        <BorderHorizontal borderStyle="w-full border-b border-gray-300 mt-4 mr-2" />
      </CardHeader>

      <CardContent className="space-y-8">
        {/* ---------- Highlights ---------- */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Highlights</h3>
          <ul className="space-y-2">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 text-[#00A651] flex-shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <div>
                  <span className="font-medium">{item.title}:</span>{" "}
                  <span className="text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <BorderHorizontal borderStyle="w-full border-b border-gray-300 mt-4 mr-2" />

        {/* ---------- Description ---------- */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <div className="text-muted-foreground space-y-4 text-sm md:text-base leading-relaxed">
            {paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default TourAbout;
