"use client";

import { Phone, Mail, Copy } from "lucide-react";
import { showToast } from "nextjs-toast-notify";

export default function TopBar() {
  const contacts = [
    {
      icon: <Phone size={16} />,
      value: "+975-77893346",
      label: "Phone number copied successfully!",
    },
    {
      icon: <Mail size={16} />,
      value: "info@lumorabhutan.com",
      label: "Email copied successfully!",
    },
  ];

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    showToast.success(message);
  };

  return (
    <div className="w-full bg-[#0c3c57] text-white text-sm">
      <div className="container mx-auto flex justify-center items-center py-2 px-4">
        <div className="flex gap-6 justify-around">
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {contact.icon}
              <span>{contact.value}</span>
              <Copy
                size={14}
                className="cursor-pointer hover:text-gray-300"
                onClick={() => handleCopy(contact.value, contact.label)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
