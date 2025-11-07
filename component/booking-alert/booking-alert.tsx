"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";

export function BookingForm({
  onSubmit,
}: {
  onSubmit?: (data: { name: string; email: string; date: string; time: string }) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // simulate network
    setLoading(false);
    setSubmitted(true);
    onSubmit?.(formData);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
        <CheckCircle2 className="text-green-600 w-10 h-10" />
        <h3 className="text-lg font-semibold">Booking Confirmed!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you, {formData.name}. We’ll contact you at {formData.email}.
        </p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center">Book Your Event</h2>
        <p className="text-sm text-muted-foreground text-center">
          Fill out your booking details below.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" value={formData.time} onChange={handleChange} />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
