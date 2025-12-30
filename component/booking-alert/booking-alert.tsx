"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "@/app/api/apiClient";
import { getApiEndpoint } from "@/app/api";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";

interface BookingFormValues {
  email: string;
  name: string;
  mobileNo: string;
  country: string;
  travelType: string;
  travelStartDate: string;
  travelEndDate: string;
  adultNum: string;
  childNum: string;
  numTravelers: string;
  totalAmount: string;
  specialRequest: string;
}

export interface Country {
  name: string;
  callingCode: string;
}

export interface TravelType {
  id: number;
  title: string;
  subtitle?: string;
  originalPrice?: number;
  discountPercent?: number;
}

interface BookingFormProps {
  onClose?: () => void;
}

export function BookingForm({ onClose }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [travelTypes, setTravelTypes] = useState<TravelType[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    // Fetch countries with calling codes from REST Countries API
    fetch("https://restcountries.com/v3.1/all?fields=name,idd")
      .then((res) => res.json())
      .then((data) => {
        const formatted: Country[] = data
          .filter((c: any) => c.idd?.root && c.idd?.suffixes?.length > 0)
          .map((c: any) => ({
            name: c.name.common,
            callingCode: c.idd.root + (c.idd.suffixes[0] || ""),
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(formatted);
        setLoadingCountries(false);
      })
      .catch((err) => {
        console.error("Failed to load countries:", err);
        setLoadingCountries(false);
      });

    // Fetch travel types from your API
    apiClient.get(getApiEndpoint.getTrips()).then((res) => {
      setTravelTypes(res.data.data || []);
    });
  }, []);

  const initialValues: BookingFormValues = {
    email: "",
    name: "",
    mobileNo: "",
    country: "",
    travelType: "",
    travelStartDate: "",
    travelEndDate: "",
    adultNum: "1",
    childNum: "0",
    numTravelers: "1",
    totalAmount: "0",
    specialRequest: "No",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Full Name is required"),
    mobileNo: Yup.string().required("Mobile Number is required"),
    country: Yup.string().required("Country is required"),
    travelType: Yup.string().required("Travel type is required"),
    travelStartDate: Yup.date().required("Start Date is required"),
    travelEndDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("travelStartDate"), "End date must be after start date"),
    adultNum: Yup.number().required().min(1, "At least 1 adult"),
    childNum: Yup.number().min(0),
    numTravelers: Yup.number().required().min(1),
  });

  const fields = [
    { id: "email", label: "Email", type: "email" },
    { id: "name", label: "Full Name", type: "text" },
    { id: "travelStartDate", label: "Travel Start Date", type: "date" },
    { id: "travelEndDate", label: "Travel End Date", type: "date" },
    { id: "adultNum", label: "Adults (12+)", type: "number" },
    { id: "childNum", label: "Children (0–12)", type: "number" },
    { id: "numTravelers", label: "Total Travelers", type: "number" },
  ] as const;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
        <CheckCircle2 className="w-20 h-20 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          Booking Successful!
        </h3>
        <p className="text-gray-600 max-w-md">
          Thank you! We’ve received your booking and will contact you shortly via email or WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <div className="max-h-[80vh] overflow-y-auto px-2">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">Book Your Trip</h2>
          <p className="text-sm text-gray-500 mt-2">
            Fill in your details to confirm your booking
          </p>
        </CardHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                ...values,
                adultNum: Number(values.adultNum),
                childNum: Number(values.childNum),
                numTravelers: Number(values.numTravelers),
                totalAmount: 0,
              };

              await apiClient.post(getApiEndpoint.createBooking(), payload);

              setSubmitted(true);
              setTimeout(() => onClose?.(), 2000);
            } catch (error) {
              console.error("Booking failed:", error);
              alert("Something went wrong. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => {
            // Auto-calculate total travelers
            useEffect(() => {
              const total =
                (Number(values.adultNum) || 0) + (Number(values.childNum) || 0);
              setFieldValue("numTravelers", total.toString());
            }, [values.adultNum, values.childNum, setFieldValue]);

            // Update mobile number when country changes
            useEffect(() => {
              const selected = countries.find((c) => c.name === values.country);
              if (selected && values.country) {
                const localPart = values.mobileNo.replace(/^\+\d+\s?/, "").trim();
                setFieldValue("mobileNo", `${selected.callingCode} ${localPart}`);
              }
            }, [values.country, countries, setFieldValue]);

            const currentCode =
              countries.find((c) => c.name === values.country)?.callingCode ||
              (loadingCountries ? "..." : "+?");

            return (
              <Form>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {fields.map((field) => (
                    <div key={field.id} className="space-y-1">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        value={values[field.id as keyof BookingFormValues]}
                        onChange={(e) => setFieldValue(field.id, e.target.value)}
                        disabled={field.id === "numTravelers"}
                        className="disabled:opacity-70"
                      />
                      <p className="text-red-600 text-sm min-h-5">
                        <ErrorMessage name={field.id} />
                      </p>
                    </div>
                  ))}

                  {/* Country Dropdown */}
                  <div className="space-y-1">
                    <Label>Country</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Input
                            value={values.country}
                            readOnly
                            placeholder={loadingCountries ? "Loading countries..." : "Select country..."}
                            className="cursor-pointer pr-10"
                            disabled={loadingCountries}
                          />
                          <svg
                            className="w-5 h-5 absolute right-3 top-3 text-gray-500 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            {countries.map((c) => (
                              <CommandItem
                                key={c.name}
                                onSelect={() => setFieldValue("country", c.name)}
                              >
                                {c.name}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="country" />
                    </p>
                  </div>

                  {/* Mobile Number with Country Code */}
                  <div className="space-y-1 md:col-span-2">
                    <Label>Mobile Number</Label>
                    <div className="flex">
                      <div className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-4 text-gray-700 font-medium text-sm">
                        {currentCode}
                      </div>
                      <Input
                        type="tel"
                        placeholder="Enter mobile number"
                        value={values.mobileNo.replace(/^\+\d+\s?/, "").trim()}
                        onChange={(e) => {
                          const input = e.target.value.replace(/\D/g, "");
                          const selected = countries.find((c) => c.name === values.country);
                          const code = selected?.callingCode || "";
                          setFieldValue("mobileNo", code ? `${code} ${input}` : input);
                        }}
                        className="rounded-l-none border-l-0"
                      />
                    </div>
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="mobileNo" />
                    </p>
                  </div>

                  {/* Travel Type Dropdown - Now Full Width */}
                  <div className="space-y-1 md:col-span-2">
                    <Label>Travel Type</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Input
                            value={
                              travelTypes.find(
                                (t) => `${t.title}-${t.subtitle}` === values.travelType
                              )
                                ? `${travelTypes.find((t) => `${t.title}-${t.subtitle}` === values.travelType)?.title} (${travelTypes.find((t) => `${t.title}-${t.subtitle}` === values.travelType)?.subtitle})`
                                : ""
                            }
                            readOnly
                            placeholder="Select travel type..."
                            className="cursor-pointer pr-10"
                          />
                          <svg
                            className="w-5 h-5 absolute right-3 top-3 text-gray-500 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search travel type..." />
                          <CommandList>
                            <CommandEmpty>No travel type found.</CommandEmpty>
                            {travelTypes.map((t) => (
                              <CommandItem
                                key={t.id}
                                onSelect={() =>
                                  setFieldValue("travelType", `${t.title}-${t.subtitle}`)
                                }
                              >
                                {t.title} {t.subtitle && `(${t.subtitle})`}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="travelType" />
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Booking...
                      </>
                    ) : (
                      "Confirm & Book Now"
                    )}
                  </Button>
                </CardFooter>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Card>
  );
}