"use client";

import { Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[#0c3c57] text-white text-sm">
      <div className="container mx-auto flex justify-center items-center py-2 px-4">
        <div className="flex gap-6 justify-around">
          <div className="flex items-center gap-2">
            <Phone size={16} /> <span>+97517949827</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} /> <span>Booking@example.com</span>
          </div>
        </div>
    
      </div>
    </div>
  );
}
