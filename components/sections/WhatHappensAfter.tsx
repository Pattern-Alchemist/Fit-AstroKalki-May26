'use client'

import { siteConfig } from '@/config/site'

export default function WhatHappensAfter() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            What happens after you message me?
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
            No pressure, no auto-sales funnels. Just clarity so you know what to expect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {siteConfig.whatHappensAfter.map((item, i) => (
            <div
              key={i}
              className="relative p-6 sm:p-8 rounded-2xl border border-lime-400/20 bg-zinc-900/50 hover:border-lime-400/50 transition-all"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-lime-400 text-zinc-950 rounded-full flex items-center justify-center font-black text-lg">
                {item.step}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 mt-2">
                {item.title}
              </h3>

              <p className="text-base text-zinc-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-r from-lime-400/10 to-zinc-950/50 border border-lime-400/20 rounded-2xl text-center">
          <p className="text-base sm:text-lg text-zinc-300">
            <span className="text-lime-400 font-semibold">No catch.</span> If after the call I
            feel we&apos;re not a good fit, I&apos;ll tell you honestly instead of trying to
            force a sale.
          </p>
        </div>
      </div>
    </section>
  )
}
