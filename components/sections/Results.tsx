"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function Results() {
  return (
    <section id="results" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 to-black/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-lime-400 tracking-widest uppercase mb-4">
            REAL RESULTS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Bodies built. Lives changed.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl">
            A few of my favorite client transformations. No filters, no shortcuts — just the work.
          </p>
        </div>

        {/* Transformations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {siteConfig.transformations.map((transformation, i) => {
            const whatsappMessage = `Hi Kaustubh, I saw ${transformation.name}'s transformation and want to know which plan fits me.`;
            const whatsappLink = createWhatsAppLink(
              siteConfig.whatsappNumber,
              whatsappMessage
            );

            return (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-lime-400/20 hover:border-lime-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/10 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
                <Image
                  src={transformation.image}
                  alt={`${transformation.name} transformation`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Timeline Badge */}
                <div className="absolute top-4 right-4 bg-lime-400/90 text-zinc-950 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {transformation.highlight}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="p-5 sm:p-6 bg-zinc-900/80 backdrop-blur-sm flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {transformation.name}
                  </h3>
                  <p className="text-lime-400 font-semibold text-sm sm:text-base mb-1">
                    {transformation.result}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {transformation.timeline}
                  </p>
                </div>
                
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 flex-grow">
                  {transformation.story}
                </p>

                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-gray-400">Age: {transformation.age}</span>
                  <span className="inline-block px-2 sm:px-3 py-1 bg-lime-400/10 border border-lime-400/30 rounded-full text-lime-400 font-medium">
                    Success
                  </span>
                </div>

                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center px-4 py-2 bg-lime-400/10 border border-lime-400/30 text-lime-400 text-sm font-semibold rounded-lg hover:bg-lime-400 hover:text-zinc-950 transition-all"
                >
                  Want this result? Chat on WhatsApp
                </Link>
              </div>
            </div>
            );
          })}

        </div>

        {/* Trust Statement */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-r from-lime-400/10 to-zinc-950/50 border border-lime-400/20 rounded-2xl">
          <p className="text-center text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto">
            These transformations happened because of consistency, not supplements or shortcuts. Every result here is from actual clients following a real plan designed specifically for their life.
          </p>
        </div>
      </div>
    </section>
  );
}
