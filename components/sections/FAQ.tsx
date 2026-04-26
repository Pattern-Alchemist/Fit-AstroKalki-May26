"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs sm:text-sm font-semibold text-lime-400 tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Questions, answered.
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 md:space-y-4">
          {siteConfig.faq.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-zinc-800 overflow-hidden bg-zinc-900/30 hover:border-lime-400/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-zinc-900/50 transition-colors group"
                aria-expanded={openIndex === i}
              >
                <h3 className="text-base md:text-lg font-bold text-white pr-4">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-lime-400 transition-transform duration-300 group-hover:text-lime-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="border-t border-zinc-800 px-6 md:px-8 py-4 md:py-6 bg-zinc-900/50 animate-in fade-in slide-in-from-top-2">
                  <p className="text-base text-zinc-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
