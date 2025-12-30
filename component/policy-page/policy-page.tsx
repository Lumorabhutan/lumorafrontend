// components/PolicyPage.tsx
import React, { useState } from "react";
import {
  Check,
  X,
  FileCheck,
  ClipboardCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BorderHorizontal from "../border-horizontal/border-horizontal";

const PolicyPage: React.FC = () => {
  // All sections start COLLAPSED by default
  const [openSections, setOpenSections] = useState<{
    inclusions: boolean;
    exclusions: boolean;
    visa: boolean;
    documents: boolean;
  }>({
    inclusions: false,
    exclusions: false,
    visa: false,
    documents: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // --------------------- YOUR ORIGINAL DATA (completely unchanged) ---------------------
  const tourInclusions = [
    "<strong>Arrival and Departure</strong>: All airport and hotel transfers, as well as ground transportation throughout the trip, are provided in a comfortable private vehicle.",
    "<strong>Accommodation</strong>: Stay in comfortable twin/double sharing lodging throughout your Bhutan tour, carefully selected to ensure a relaxing and enjoyable experience.",
    "<strong>Sightseeing Fees & Visa</strong>: Sustainable Development Fee (SDF), all entrance fees to museums, monuments, and heritage sites are included, along with your Bhutanese Tourist Visa.",
    "<strong>Meals</strong>: Enjoy full-board meals throughout your journey, including breakfast, lunch, dinner, tea, and snacks.",
    "<strong>Transportation</strong>: All ground transportation during the tour will be in a comfortable private vehicle, as outlined in the itinerary.",
    "<strong>Guide</strong>: Benefit from the expertise of a licensed, professional English-speaking Bhutanese guide who is friendly, knowledgeable, and dedicated to enhancing your travel experience.",
    "<strong>Water</strong>: Mineral drinking water is provided during all tour activities.",
    "<strong>Government Taxes</strong>: All applicable government taxes and official expenses are included in your package.",
  ];

  const tourExclusions = [
    "<strong>International Airfare</strong>: Flights to and from Bhutan are not included in the package. However, Lumora Tours and Travels will assist you in booking the flights to and from Bhutan.",
    "<strong>Travel Insurance</strong>: Personal travel, medical, or accident insurance is not included.",
    "<strong>Personal Expenses</strong>: Items such as souvenirs, laundry, phone calls, or personal purchases are not covered.",
    "<strong>Optional Activities</strong>: Any optional excursions, activities, or experiences not mentioned in the itinerary are at your own cost.",
    "<strong>Tips & Gratuities</strong>: Tips for guides, drivers, hotel staff, and porters are not included and are left to your discretion.",
    "<strong>Alcoholic & Special Beverages</strong>: Alcoholic drinks and beverages beyond standard tea, coffee, and water are not included.",
    "<strong>Visa & Permit for Non-Standard Entry</strong>: Any special permits required outside the standard Bhutanese Tourist Visa are not included.",
  ];

  const visaRequirements = [
    "Lumora Tours and Travels will assist in arranging all visa and e-permit applications for international visitors.",
    "A single-entry visa (USD 40) must be obtained before arrival and presented at the Point of Entry in Bhutan.",
    "All tourists, except those from India, Bangladesh, and the Maldives, require a visa to enter Bhutan. Indian visitors need a permit, while nationals of Bangladesh and the Maldives are eligible for a visa on arrival.",
    "Tourists paying in US Dollars are eligible for a 50% discount on the standard SDF of USD 200, reducing it to USD 100 per person per day.",
    "This discount also applies to children aged 6–11 years paying in US Dollars.",
    "The 24-hour SDF waiver for visitors staying in border towns remains in effect.",
    "Visitors can obtain their visa clearance or permit online through the Department of Immigration, or they can rely on Lumora Tours and Travels to handle all travel documents.",
    "All tourists must travel via a pre-booked tour package, ensuring all paperwork is handled smoothly for a hassle-free trip.",
  ];

  const documentRequired = [
    "A digital copy of a valid passport with at least six months of validity beyond your departure date from Bhutan.",
    "A recent digital passport photo.",
    "Arrival and departure dates.",
    "Valid travel insurance for the duration of your travel.",
    "Sustainable Development Fee (SDF) of USD100 per night per adult and USD50 for children aged 5 to 12 years old. Children below 5 years are waived.",
    "A one-time visa application fee of USD40.",
    "Lumora Tours and Travels will process your Bhutan visa upon receiving the required documents and applicable fees.",
  ];

  // --------------------- COLLAPSIBLE SECTION COMPONENT ---------------------
  const CollapsibleSection = ({
    title,
    items,
    icon: Icon,
    color,
    sectionKey,
  }: {
    title: string;
    items: string[];
    icon: React.ElementType;
    color: string;
    sectionKey: keyof typeof openSections;
  }) => {
    const isOpen = openSections[sectionKey];

    return (
      <div className="border-b border-gray-200 pb-8 last:border-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between text-left hover:bg-gray-50 -mx-4 px-4 py-3 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 flex-shrink-0" color={color} />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isOpen && (
          <ul className="mt-4 space-y-3 ml-9">
            {items.map((text, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-1 flex-shrink-0" color={color} />
                <span
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // --------------------- MAIN RETURN ---------------------
  return (
    <Card className="w-full mx-auto mt-10 px-4 sm:px-6 lg:max-w-6xl font-sans">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center sm:text-left">
          Tour Inclusions & Exclusions
        </CardTitle>
        <BorderHorizontal borderStyle="w-full border-b border-gray-300 mt-4" />
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-8">
          <CollapsibleSection
            title="Tour Inclusions"
            items={tourInclusions}
            icon={Check}
            color="green"
            sectionKey="inclusions"
          />

          <CollapsibleSection
            title="Tour Exclusions"
            items={tourExclusions}
            icon={X}
            color="red"
            sectionKey="exclusions"
          />

          <CollapsibleSection
            title="Visa Requirement"
            items={visaRequirements}
            icon={FileCheck}
            color="green"
            sectionKey="visa"
          />

          <CollapsibleSection
            title="Documents Required"
            items={documentRequired}
            icon={ClipboardCheck}
            color="green"
            sectionKey="documents"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyPage;