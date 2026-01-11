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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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
}

export interface Country {
  name: string;
  callingCode: string;
}

export interface TravelType {
  id: number;
  title: string;
  subtitle?: string;
}

interface BookingFormProps {
  onClose?: () => void;
}

export function BookingForm({ onClose }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [travelTypes, setTravelTypes] = useState<TravelType[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [countrySearch, setCountrySearch] = useState("");
  const [travelTypeSearch, setTravelTypeSearch] = useState("");

  // Fetch countries and travel types
  useEffect(() => {
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
        console.error(err);
        setLoadingCountries(false);
      });

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
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Full Name is required"),
    mobileNo: Yup.string().required("Mobile Number is required"),
    country: Yup.string().required("Country is required"),
    travelType: Yup.string().required("Travel Type is required"),
    travelStartDate: Yup.date().required("Start date is required"),
    travelEndDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("travelStartDate"), "End date must be after start date"),
    adultNum: Yup.number().required().min(1, "At least 1 adult"),
    childNum: Yup.number().min(0),
    numTravelers: Yup.number().required().min(1),
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
        <CheckCircle2 className="w-20 h-20 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">Booking Successful!</h3>
        <p className="text-gray-600 max-w-md">
          Thank you! We’ve received your booking and will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <div className="max-h-[80vh] overflow-y-auto px-2 touch-auto" style={{ WebkitOverflowScrolling: "touch" }}>
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">Book Your Trip</h2>
          <p className="text-sm text-gray-500 mt-2">Fill in your details to confirm your booking</p>
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
            } catch {
              alert("Something went wrong. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => {
            // Auto-calculate total travelers
            useEffect(() => {
              const total = (Number(values.adultNum) || 0) + (Number(values.childNum) || 0);
              setFieldValue("numTravelers", total.toString());
            }, [values.adultNum, values.childNum]);

            const currentCode =
              countries.find((c) => c.name === values.country)?.callingCode || "+?";

            const filteredCountries = countries.filter((c) =>
              c.name.toLowerCase().includes(countrySearch.toLowerCase())
            );

            const filteredTravelTypes = travelTypes.filter((t) =>
              t.title.toLowerCase().includes(travelTypeSearch.toLowerCase()) ||
              (t.subtitle?.toLowerCase().includes(travelTypeSearch.toLowerCase()) ?? false)
            );

            return (
              <Form>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                    />
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="email" />
                    </p>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      value={values.name}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                    />
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="name" />
                    </p>
                  </div>

                  {/* Country */}
                  <div className="space-y-1">
                    <Label>Country</Label>
                    <Select
                      value={values.country}
                      onValueChange={(v) => setFieldValue("country", v)}
                      disabled={isSubmitting || loadingCountries}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto touch-auto">
                        <div className="p-2">
                          <Input
                            placeholder="Search country..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="mb-2"
                          />
                        </div>
                        {filteredCountries.map((c) => (
                          <SelectItem key={c.name} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="country" />
                    </p>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <Label>Mobile Number</Label>
                    <div className="flex">
                      <div className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-4 text-gray-700 font-medium text-sm">
                        {currentCode}
                      </div>
                      <Input
                        type="tel"
                        value={values.mobileNo.replace(/^\+\d+\s?/, "").trim()}
                        onChange={(e) => {
                          const input = e.target.value.replace(/\D/g, "");
                          setFieldValue("mobileNo", `${currentCode} ${input}`);
                        }}
                        className="rounded-l-none border-l-0"
                      />
                    </div>
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="mobileNo" />
                    </p>
                  </div>

                  {/* Travel Type */}
                  <div className="space-y-1 md:col-span-2">
                    <Label>Travel Type</Label>
                    <Select
                      value={values.travelType}
                      onValueChange={(v) => setFieldValue("travelType", v)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select travel type" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto touch-auto">
                        <div className="p-2">
                          <Input
                            placeholder="Search travel type..."
                            value={travelTypeSearch}
                            onChange={(e) => setTravelTypeSearch(e.target.value)}
                            className="mb-2"
                          />
                        </div>
                        {filteredTravelTypes.map((t) => (
                          <SelectItem
                            key={t.id}
                            value={`${t.title}${t.subtitle ? ` - ${t.subtitle}` : ""}`}
                          >
                            {t.title} {t.subtitle && `(${t.subtitle})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="travelType" />
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="space-y-1">
                    <Label>Travel Start Date</Label>
                    <Input
                      type="date"
                      value={values.travelStartDate}
                      onChange={(e) => setFieldValue("travelStartDate", e.target.value)}
                    />
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="travelStartDate" />
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Label>Travel End Date</Label>
                    <Input
                      type="date"
                      value={values.travelEndDate}
                      onChange={(e) => setFieldValue("travelEndDate", e.target.value)}
                    />
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="travelEndDate" />
                    </p>
                  </div>

                  {/* Adults */}
                  <div className="space-y-1">
                    <Label>Adults (12+)</Label>
                    <Input
                      type="number"
                      value={values.adultNum}
                      onChange={(e) => setFieldValue("adultNum", e.target.value)}
                    />
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="adultNum" />
                    </p>
                  </div>

                  {/* Children */}
                  <div className="space-y-1">
                    <Label>Children (0-12)</Label>
                    <Input
                      type="number"
                      value={values.childNum}
                      onChange={(e) => setFieldValue("childNum", e.target.value)}
                    />
                    <p className="text-red-600 text-sm min-h-5">
                      <ErrorMessage name="childNum" />
                    </p>
                  </div>

                  {/* Total Travelers */}
                  <div className="space-y-1">
                    <Label>Total Travelers</Label>
                    <Input
                      type="number"
                      value={values.numTravelers}
                      disabled
                      className="disabled:opacity-70"
                    />
                  </div>

                  {/* Special Request */}
            
                </CardContent>

                <CardFooter className="flex flex-col gap-4 my-3">
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
