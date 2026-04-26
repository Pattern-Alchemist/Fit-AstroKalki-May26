"use client";

import { siteConfig } from "@/config/site";

export default function CertificationsMarquee() {
  const items = [...siteConfig.certifications, ...siteConfig.certifications];

  return (
    <section className="bg-zinc-900/50 border-y border-zinc-800 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Marquee Container */}
          <div className="flex gap-8 animate-marquee hover:pause">
            {items.map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-3 whitespace-nowrap text-sm sm:text-base"
              >
                <span className="text-xl">{cert.icon}</span>
                <span className="text-zinc-300 font-medium">{cert.label}</span>
                <div className="w-1 h-1 rounded-full bg-lime-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
