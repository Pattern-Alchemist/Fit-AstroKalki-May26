"use client";

import { siteConfig } from "@/config/site";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { ArrowRight } from "lucide-react";

export default function FinalCta() {
  const whatsappLink = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    siteConfig.finalCta.whatsappMessage
  );

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-3xl mx-auto text-center">
        {/* Label */}
        <p className="text-xs sm:text-sm font-semibold text-lime-400 tracking-widest uppercase mb-6">
          {siteConfig.finalCta.label}
        </p>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          {siteConfig.finalCta.heading.split("\n").map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="text-transparent bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text">
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-zinc-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          {siteConfig.finalCta.subheading}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime-400 text-zinc-950 font-bold rounded-lg hover:bg-lime-300 transition-all hover:shadow-xl hover:shadow-lime-400/30 text-base sm:text-lg"
          >
            {siteConfig.finalCta.ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-zinc-700 text-white font-bold rounded-lg hover:border-lime-400 hover:text-lime-400 transition-all text-base sm:text-lg"
          >
            {siteConfig.finalCta.secondaryCtaText}
          </a>
        </div>
      </div>
    </section>
  );
}
