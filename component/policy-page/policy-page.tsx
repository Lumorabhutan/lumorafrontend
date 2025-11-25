// components/PolicyPage.tsx
import React from "react";
import {
  Check,
  X,
  FileCheck,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BorderHorizontal from "../border-horizontal/border-horizontal";

const PolicyPage: React.FC = () => {
  // --------------------- DATA INSERTED HERE ---------------------
  const tourInclusions = [
    "Arrival and Departure: All airport and hotel transfers, as well as ground transportation throughout the trip, are provided in a comfortable private vehicle.",
    "Accommodation: Stay in comfortable twin/double sharing lodging throughout your Bhutan tour, carefully selected to ensure a relaxing and enjoyable experience.",
    "Sightseeing Fees & Visa: Sustainable Development Fee (SDF), all entrance fees to museums, monuments, and heritage sites are included, along with your Bhutanese Tourist Visa.",
    "Meals: Enjoy full-board meals throughout your journey, including breakfast, lunch, dinner, tea, and snacks.",
    "Transportation: All ground transportation during the tour will be in a comfortable private vehicle, as outlined in the itinerary.",
    "Guide: Benefit from the expertise of a licensed, professional English-speaking Bhutanese guide who is friendly, knowledgeable, and dedicated to enhancing your travel experience.",
    "Water: Mineral drinking water is provided during all tour activities.",
    "Government Taxes: All applicable government taxes and official expenses are included in your package.",
  ];

  const tourExclusions = [
    "International Airfare: Flights to and from Bhutan are not included in the package. However, Lumora Tours and Travels will assist you in booking the flights to and from Bhutan.",
    "Travel Insurance: Personal travel, medical, or accident insurance is not included.",
    "Personal Expenses: Items such as souvenirs, laundry, phone calls, or personal purchases are not covered.",
    "Optional Activities: Any optional excursions, activities, or experiences not mentioned in the itinerary are at your own cost.",
    "Tips & Gratuities: Tips for guides, drivers, hotel staff, and porters are not included and are left to your discretion.",
    "Alcoholic & Special Beverages: Alcoholic drinks and beverages beyond standard tea, coffee, and water are not included.",
    "Visa & Permit for Non-Standard Entry: Any special permits required outside the standard Bhutanese Tourist Visa are not included.",
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

  // --------------------- REUSABLE SECTION RENDERER ---------------------
  const renderSection = (
    title: string,
    items: string[],
    Icon: React.ElementType,
    color:string
  ) => (
    <section className="flex flex-col sm:flex-row gap-4 sm:gap-10">
      <h3 className="text-lg font-semibold mb-2 sm:mb-0 sm:w-1/4">
        {title}
      </h3>

      <ul className="space-y-3 sm:w-3/4">
        {items.map((text, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Icon className="w-5 h-5  mt-1 flex-shrink-0" color={color}/>
            <span className="text-muted-foreground leading-relaxed">
              {text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );

  // --------------------- MAIN RETURN ---------------------
  return (
    <Card className="w-full mx-auto mt-10 px-4 sm:px-6 lg:max-w-6xl">
      <CardHeader>
        <CardTitle className="text-xl font-sans">
          Tour Inclusions & Tour Exclusions
        </CardTitle>
        <BorderHorizontal borderStyle="w-full border-b border-gray-300 mt-4 mr-2" />
      </CardHeader>

      <CardContent className="space-y-10">
        {renderSection("Tour Inclusions", tourInclusions, Check, "green")}
        <BorderHorizontal borderStyle="w-full border-b border-red-300" />

        {renderSection("Tour Exclusions", tourExclusions, X, "red")}
        <BorderHorizontal borderStyle="w-full border-b border-red-300" />

        {renderSection("Visa Requirement", visaRequirements, FileCheck, "green")}
        <BorderHorizontal borderStyle="w-full border-b border-red-300" />

        {renderSection("Documents Required", documentRequired, ClipboardCheck, "green")}
      </CardContent>
    </Card>
  );
};

export default PolicyPage;
