"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/component/navbar/navbar";

export default function NavbarClient() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return <Navbar />;
}
