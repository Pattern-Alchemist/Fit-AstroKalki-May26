"use client";

import { siteConfig } from "@/config/site";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappLink = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    siteConfig.floatingWhatsapp.message
  );

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-75 group-hover:opacity-100" />

        {/* Button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-green-500/50 group-hover:scale-110">
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 bg-zinc-950 text-white text-sm font-semibold rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg border border-green-500/30">
          {siteConfig.floatingWhatsapp.label}
        </div>
      </div>
    </a>
  );
}
