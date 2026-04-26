"use client";

import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";

export default function Process() {
  return (
    <section id="process" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-lime-400 tracking-widest uppercase mb-4">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Four steps. Zero guesswork.
          </h2>
        </div>

        {/* Process Steps */}
        <div className="space-y-6 md:space-y-8">
          {siteConfig.process.map((step, i) => (
            <div
              key={i}
              className="group p-6 md:p-8 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-lime-400/50 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col md:flex-row md:items-start gap-6 md:gap-8 hover:shadow-lg hover:shadow-lime-400/10"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-lime-400 to-lime-300 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-black text-zinc-950">
                    {step.step}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-zinc-300 leading-relaxed">
                  {step.copy}
                </p>
              </div>

              {/* Arrow */}
              {i < siteConfig.process.length - 1 && (
                <div className="hidden lg:flex flex-shrink-0 text-lime-400/30 group-hover:text-lime-400/60 transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
