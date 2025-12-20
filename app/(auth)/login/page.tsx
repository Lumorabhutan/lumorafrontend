"use client";

import BorderHorizontal from "@/component/border-horizontal/border-horizontal";
import FormikController from "@/component/input-fields-controller/input-fields-controller";
import TextCompoment from "@/component/text/text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formloginFields,
  initialValues,
} from "@/data/formik-fields/login-fields";
import { validationSignSchema } from "@/data/Validations/register-validation";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, Formik, FormikHelpers } from "formik";
import { LockKeyhole } from "lucide-react";
import Footer from "@/component/footer";
import { useRouter } from "next/navigation";
import apiClient from "@/app/api/apiClient";
import { getApiEndpoint } from "@/app/api";
import { showToast } from "nextjs-toast-notify";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Updated interface to match your real API response
export interface SignInResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignInAttributes {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (
    values: SignInAttributes,
    { resetForm }: FormikHelpers<SignInAttributes>
  ) => {
    try {
      // Make login request
      const response = await apiClient.post<SignInResponse>(
        getApiEndpoint.login(),
        values
      );
       const token = Cookies.get("accessToken");
       console.log("Login response token:", token);
      // Destructure tokens directly from root
      const { accessToken, refreshToken, message } = response.data;

      if (!accessToken) {
        showToast.error("Login failed: No token received", {
          duration: 5000,
          position: "top-right",
        });
        return;
      }

      // Store tokens in cookies
 
      // Success message
      showToast.success(message || "Login successful!", {
        duration: 4000,
        position: "top-right",
        progress: true,
      });

      // Decode JWT to get role
      try {
        const decoded = jwtDecode<JwtPayload & { role?: string }>(accessToken);
        const userRole = decoded.role;

        if (!userRole) {
          console.log("No role in token");
          Cookies.remove("accessToken");
          router.push("/");
          return;
        }

        const normalizedRole = userRole.toLowerCase();

        // Client role → redirect to register or home
        if (normalizedRole === "client") {
          router.push("/register");
          return;
        }

        // Allowed roles → go to dashboard
        if (["admin", "manager", "user", "accounts"].includes(normalizedRole)) {
          console.log("Logged in as:", userRole);
          router.push("/dashboard");
          return;
        }

        // Unknown role
        Cookies.remove("accessToken");
        router.push("/");
      } catch (decodeError) {
        console.error("Invalid JWT token:", decodeError);
        Cookies.remove("accessToken");
        router.push("/");
      }

      resetForm();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Login failed. Please check your credentials.";

      showToast.error(errorMessage, {
        duration: 5000,
        position: "top-right",
        progress: true,
      });
    }
  };

  return (
    <div>
      <div className="h-full mb-40">
        <div className="h-full flex justify-center mt-20">
          <Card className="rounded-sm w-[360px] h-full">
            <CardHeader>
              <CardTitle className="font-bold text-xl font-sans">
                Sign In
              </CardTitle>
              <BorderHorizontal borderStyle="w-full border-b border-gray-300 mt-2 mr-2" />
            </CardHeader>

            <CardContent>
              <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSignSchema}
              >
                {() => (
                  <Form className="flex flex-col gap-4">
                    {formloginFields.map((field, index) => (
                      <FormikController
                        key={field.name ?? index}
                        fieldConfig={field}
                        className="flex flex-col"
                        inputWidthIconStyle="border w-full h-[50px] px-4 rounded-md bg-white pl-10 text-gray-400 hover:text-gray-600"
                        label={field.label}
                        name={field.name}
                      />
                    ))}

                    <div className="flex flex-row justify-between">
                      <div className="text-center flex items-center gap-4">
                        <Checkbox className="border-gray-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=checked]:text-white" />
                        <span className="text-sm text-gray-900">Remember Me</span>
                      </div>

                      <button
                        type="button"
                        className="text-green-600 hover:text-green-500"
                        onClick={() => router.push("/forgot-password")}
                      >
                        <TextCompoment
                          text="Forgot your password?"
                          className="text-sm font-serif"
                        />
                      </button>
                    </div>

                    <Button
                      className="mt-4 w-full h-[50px] rounded-lg text-lg bg-green-600 hover:bg-green-700 border shadow-md hover:shadow-lg transition"
                      type="submit"
                    >
                      <LockKeyhole className="mr-2" />
                      <TextCompoment text="Login" className="text-white font-serif" />
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}