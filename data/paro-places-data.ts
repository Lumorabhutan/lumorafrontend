import { TourAboutData } from "@/component/tour-highlights/tour-highlights";
import { Ban, BookOpen, Clock, DollarSign, MapPin, MapPinHouse, Ticket, Users } from "lucide-react";

 export const culturalData = [
    {
      day: 1,
      title: "Enjoy the Natural Scenery in the Bay",
      description:
        "Start your adventure by soaking in the stunning natural beauty of the bay. Take a scenic boat tour, explore hidden coves, and relax on pristine beaches...",
    },
    {
      day: 2,
      title: "Hiking and Climbing the Majestic Mountains",
      description: "…",
    },
    // …more days
  ];
  export const tourInfo = [
    { icon: Ticket, typename: "Tour code", value: "T0394843" },
    { icon: MapPin, typename: "Start", value: "Paro Town" },
    { icon: MapPinHouse, typename: "End", value: "Thimphu City" },
    { icon: Users, typename: "Type tour", value: "Group tour" },
    { icon: Clock, typename: "Age range", value: "1 - 80" },
    { icon: BookOpen, typename: "Language", value: "English" },
    { icon: DollarSign, typename: "Payments", value: "Pay later" },
    { icon: Ban, typename: "Cancel tour", value: "Yes/Free" },
  ];

  export const defaultItems = [
    {
      day: "Day 1",
      title: "Enjoy the Natural Scenery in the Bay",
      content:
        "Start your journey with stunning coastal views. Explore the pristine beaches, watch the sunset over the bay, and enjoy fresh seafood at local restaurants.",
    },
    {
      day: "Day 2",
      title: "Hiking and Climbing the Majestic Mountains",
      content:
        "Challenge yourself with mountain trails offering breathtaking panoramic views. Professional guides will lead you through scenic routes suitable for various skill levels.",
    },
    {
      day: "Day 3",
      title: "Swim and Experience Adventurous Games",
      content:
        "Dive into crystal-clear waters for swimming, snorkeling, and thrilling water sports. Try kayaking, paddleboarding, or join exciting beach games with fellow travelers.",
    },
    {
      day: "Day 4",
      title: "Explore Primeval Tropical Forests and Wildlife",
      content:
        "Venture into lush tropical forests teeming with diverse wildlife. Spot exotic birds, rare species, and immerse yourself in the rich biodiversity of the region.",
    },
  ];
  export const mockTourData: TourAboutData = {
    city: "Noriva",
    country: "Moliva",
    highlights: [
      {
        title: "Thimphu City Exploration",
        description:
          "Discover Bhutan’s charming capital, where traditional architecture blends seamlessly with modern life. Visit the Buddha Dordenma statue, Tashichho Dzong, and local markets.",
      },
      {
        title: "Cultural Immersion",
        description:
          "Experience Bhutanese traditions through visits to monasteries, museums, and craft centers showcasing the country’s art, textiles, and heritage.",
      },
      {
        title: "Paro Valley Sightseeing",
        description:
          "Wander through the scenic Paro Valley, known for its lush landscapes, ancient temples, and serene atmosphere.",
      },
      {
        title: "Hike to Tiger’s Nest Monastery (Taktsang)",
        description:
          "Embark on a memorable trek to Bhutan’s most iconic landmark, dramatically perched on a cliff overlooking the Paro Valley.",
      },
      {
        title: "Breathtaking Himalayan Landscapes: ",
        description:
          "Enjoy panoramic mountain views, prayer-flag-strewn passes, and tranquil moments surrounded by the pristine natural beauty of the Himalayas.",
      },
    ],
    description: `Embark on a soul-stirring journey to the Kingdom of Happiness with Lumora Tours and Travels. Our Shortest Bhutan Sojourn offers a beautifully curated glimpse into Bhutan’s timeless charm, where every moment reflects peace, culture, and natural splendor`,
  };


export   const photoSets = {
    Gallery1: [
      {
        id: 1,
        url: "Beautiful Valley.jpg",
        alt: "Mountain peak at sunset",
        span: "row-span-2"
      },
      {
        id: 2,
        url: "Beautiful Dzong.jpg",
        alt: "Mossy landscape with stone",
        span: ""
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80",
        alt: "Person on mountain edge",
        span: ""
      },
      {
        id: 4,
        url: "Dochula_overview.jpg",
        alt: "Tropical island aerial view",
        span: ""
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
        alt: "Fjord with hiker",
        span: ""
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        alt: "Canyon with river",
        span: ""
      },
      {
        id: 7,
        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        alt: "Hiker on mountain peak",
        span: ""
      },
      {
        id: 8,
        url: "chorten.jpg",
        alt: "Rice terraces",
        span: ""
      }
    ],
    Gallery2: [
      {
        id: 9,
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
        alt: "Starry night sky",
        span: "col-span-2"
      },
      {
        id: 10,
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        alt: "Mountain lake reflection",
        span: ""
      },
      {
        id: 11,
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
        alt: "Forest path",
        span: ""
      },
      {
        id: 12,
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
        alt: "Misty mountains",
        span: ""
      },
      {
        id: 13,
        url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
        alt: "Northern lights",
        span: ""
      },
      {
        id: 14,
        url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
        alt: "Mountain valley",
        span: ""
      },
      {
        id: 15,
        url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
        alt: "Snowy peaks",
        span: ""
      },
      {
        id: 16,
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        alt: "Forest lake",
        span: ""
      }
    ],
    Gallery3: [
      {
        id: 17,
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        alt: "Tropical beach",
        span: "row-span-2"
      },
      {
        id: 18,
        url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80",
        alt: "Ocean waves",
        span: ""
      },
      {
        id: 19,
        url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
        alt: "Sandy shore",
        span: ""
      },
      {
        id: 20,
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
        alt: "Sunset over water",
        span: ""
      },
      {
        id: 21,
        url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        alt: "Island paradise",
        span: ""
      },
      {
        id: 22,
        url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
        alt: "Coastal cliffs",
        span: ""
      },
      {
        id: 23,
        url: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80",
        alt: "Beach footprints",
        span: ""
      },
      {
        id: 24,
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        alt: "Tropical waters",
        span: ""
      }
    ]
  };
