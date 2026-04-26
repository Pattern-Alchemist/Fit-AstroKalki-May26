"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-lime-400 tracking-widest uppercase mb-4">
            {siteConfig.about.label}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-2xl">
            {siteConfig.about.heading}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Image */}
          <div className="relative aspect-square md:h-[500px] rounded-xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/portrait-moody-lighting.jpg"
              alt="Kaustubh - Trainer Portrait"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            {siteConfig.about.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Pull Quote */}
            <div className="border-l-4 border-lime-400 pl-6 py-4">
              <p className="text-lg sm:text-xl font-bold text-white italic">
                {siteConfig.about.pullQuote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
