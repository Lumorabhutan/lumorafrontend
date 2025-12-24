"use client";

import dynamic from "next/dynamic";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";

const FullCalendar = dynamic(
  () => import("@fullcalendar/react"),
  { ssr: false }
);

type EventType = {
  title: string;
  start: string;
};

export default function TourCalendar() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    setEvents([
      { title: "Bhutan Tour", start: "2025-12-25" },
      { title: "Paro Trek", start: "2025-12-28" },
    ]);
  }, []);

  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-6">
        Tour Schedule
      </h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </section>
  );
}
