"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToast } from "nextjs-toast-notify";
import { getApiEndpoint } from "@/app/api";
import apiClient from "@/app/api/apiClient";

// ──────────────────────────────────────────────────────────────
// API RESPONSE TYPE
// ──────────────────────────────────────────────────────────────
interface ApiResponse {
  message: string;
}

// ──────────────────────────────────────────────────────────────
// PROPS & FIELD TYPES
// ──────────────────────────────────────────────────────────────
interface ReviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingReview?: any;
}

interface Field {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  placeholder?: string;
  colSpan?: number;
  options?: { label: string; value: string }[];
}

export function ReviewDrawer({
  open,
  onOpenChange,
  editingReview,
}: ReviewDrawerProps) {
  const fields: Field[] = [
    { id: "name", label: "Full Name", type: "text", placeholder: "Enter your name" },
    { id: "email", label: "Email Address", type: "text", placeholder: "Enter your email" },
    { id: "rating", label: "Rating (1–5)", type: "number", placeholder: "5" },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
    {
      id: "comment",
      label: "Comment",
      type: "textarea",
      placeholder: "Write your review here...",
      colSpan: 2,
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    rating: Yup.number()
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5")
      .required("Rating is required"),
    comment: Yup.string().required("Comment is required"),
    status: Yup.string().oneOf(["true", "false"]).required("Status is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editingReview?.name || "",
      email: editingReview?.email || "",
      rating: editingReview?.rating || "",
      status: editingReview?.status?.toString() ?? "false",
      comment: editingReview?.comment || "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        const payload = {
          ...values,
          status: values.status === "true",
        };

        let res;
        if (editingReview) {
          res = await apiClient.put<ApiResponse>(
            getApiEndpoint.updateReview(editingReview.id),
            payload
          );
          showToast.success(res.data.message || "Review updated successfully!", {
            duration: 4000,
            position: "top-right",
            progress: true,
          });
        } else {
          res = await apiClient.post<ApiResponse>(
            getApiEndpoint.createReview(),
            payload
          );
          showToast.success(res.data.message || "Review submitted successfully!", {
            duration: 4000,
            position: "top-right",
            progress: true,
          });
        }

        resetForm();
        onOpenChange(false);
      } catch (err: any) {
        const errorMsg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to save review. Please try again.";

        showToast.error(errorMsg, {
          duration: 5000,
          position: "top-right",
          progress: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const hasError = (fieldId: string) =>
    formik.touched[fieldId as keyof typeof formik.touched] &&
    formik.errors[fieldId as keyof typeof formik.errors];

  const getColSpan = (colSpan?: number) => {
    switch (colSpan) {
      case 2:
        return "col-span-2";
      default:
        return "col-span-1";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[600px] rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {editingReview ? "Edit Review" : "Add New Review"}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Share your experience with us.
          </DialogDescription>
        </DialogHeader>

        <motion.form
          onSubmit={formik.handleSubmit}
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {fields.map((field) => (
            <div key={field.id} className={`space-y-1 ${getColSpan(field.colSpan)}`}>
              <Label htmlFor={field.id}>{field.label}</Label>

              {field.type === "select" ? (
                <select
                  id={field.id}
                  value={formik.values[field.id as keyof typeof formik.values] as string}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className={`w-full border p-2 rounded-md ${
                    hasError(field.id)
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formik.values[field.id as keyof typeof formik.values] as string}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  rows={4}
                  className={`w-full rounded-md border p-2 resize-none ${
                    hasError(field.id)
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formik.values[field.id as keyof typeof formik.values] as
                    | string
                    | number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className={`w-full ${
                    hasError(field.id)
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
              )}

              {hasError(field.id) && (
                <p className="text-red-500 text-sm">
                  {formik.errors[field.id as keyof typeof formik.errors] as string}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {formik.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : editingReview ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}
