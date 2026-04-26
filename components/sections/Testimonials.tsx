"use client";

import { siteConfig } from "@/config/site";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs sm:text-sm font-semibold text-lime-400 tracking-widest uppercase mb-4">
            WORDS FROM CLIENTS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-3xl mx-auto">
            Don&apos;t take my word for it.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {siteConfig.testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-lime-400/50 hover:bg-zinc-900/80 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/10 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-lime-400 text-lime-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed mb-6 flex-1 italic">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="border-t border-zinc-800 pt-4">
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-zinc-400">{testimonial.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
