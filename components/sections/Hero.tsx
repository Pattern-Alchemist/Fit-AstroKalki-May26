"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const whatsappLink = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    siteConfig.finalCta.whatsappMessage
  );

  return (
    <section
      id="hero"
      className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-zinc-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="inline-block">
              <p className="text-xs sm:text-sm font-semibold text-lime-400 tracking-widest uppercase">
                {siteConfig.hero.preheading}
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
              {siteConfig.hero.heading.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <>
                      <span className="text-transparent bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text">
                        {line}
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              {siteConfig.hero.subheading}
            </p>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-zinc-800">
              {siteConfig.hero.trustStats.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl sm:text-3xl font-black text-lime-400">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-lime-400 text-zinc-950 font-bold rounded-lg hover:bg-lime-300 transition-all hover:shadow-xl hover:shadow-lime-400/30 text-sm sm:text-base"
              >
                {siteConfig.hero.ctaText}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#programs"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border border-zinc-700 text-white font-bold rounded-lg hover:border-lime-400 hover:text-lime-400 transition-all text-sm sm:text-base"
              >
                {siteConfig.hero.secondaryCtaText}
              </a>
            </div>

            {/* Trust Line */}
            <p className="text-sm text-zinc-400 pt-4 max-w-xl">
              {siteConfig.heroTrustLine}
            </p>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              <Image
                src="/images/gym-night-portrait.jpg"
                alt="Kaustubh - Personal Trainer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-20" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-30 bg-zinc-950/90 backdrop-blur-sm border border-lime-400/30 rounded-lg px-4 py-2 sm:px-6 sm:py-3">
              <p className="text-xs sm:text-sm font-semibold text-white">
                Certified in <span className="text-lime-400">Multiple Disciplines</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
