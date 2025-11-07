"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BookingForm } from "../booking-alert/booking-alert";

interface HeroVideoSectionProps {
  title: string;
  subtitle: string;
  bookUs?: boolean;
  contactUs?: boolean;
  video?: boolean;
  videoUrl?: string;
  backgroundImage: string | StaticImageData;
}

export default function HeroVideoSection({
  title,
  subtitle,
  bookUs,
  contactUs,
  video = false,
  videoUrl = "https://www.youtube.com/embed/Scxs7L0vhZ4?autoplay=1",
  backgroundImage,
}: HeroVideoSectionProps) {
  const [openVideo, setOpenVideo] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={subtitle}
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Overlay content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="uppercase tracking-widest text-sm mb-2"
        >
          {title}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          {subtitle}
        </motion.h1>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Video Button */}
          {video && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            >
              <Dialog open={openVideo} onOpenChange={setOpenVideo}>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-green-600 hover:bg-green-700 rounded-full w-16 h-16"
                  >
                    <Play className="h-8 w-8 text-white" />
                  </Button>
                </DialogTrigger>

                {/* ✅ Video Player Dialog */}
                <DialogContent className="max-w-3xl p-0 bg-black overflow-hidden">
                  <VisuallyHidden>
                    <DialogTitle>Watch Video</DialogTitle>
                  </VisuallyHidden>

                  <div className="aspect-video w-full h-full">
                    <iframe
                      src={videoUrl}
                      title="Video player"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-[60vh] md:h-[70vh] rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}

          {/* Booking Popup */}
          {bookUs && (
            <Dialog open={openBooking} onOpenChange={setOpenBooking}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  Book Us
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-md rounded-2xl p-6 bg-white">
                <VisuallyHidden>
                  <DialogTitle>Booking Form</DialogTitle>
                </VisuallyHidden>

                <Card className="border-none shadow-none">
                  <CardHeader>
                    <h2 className="text-2xl font-semibold text-center">
                      Book Your Event
                    </h2>
                    <p className="text-sm text-muted-foreground text-center">
                      Fill out your booking details below.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => setOpenBooking(false)}
                    >
                      Confirm Booking
                    </Button>
                  </CardFooter>
                </Card>
              </DialogContent>
            </Dialog>
          )}

          {/* Contact Us */}
          {contactUs && (
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Contact Us
            </Button>
          )}
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}
