'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { createWhatsAppLink } from '@/lib/whatsapp'

export default function IntentCTA() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm font-semibold text-lime-400 tracking-widest uppercase mb-4">
            NOT SURE WHERE TO START?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Tell me what you want.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            Pick the option that matches your situation, and I'll send you the right message.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {siteConfig.intentCtaOptions.map((option) => {
            const whatsappLink = createWhatsAppLink(
              siteConfig.whatsappNumber,
              option.message
            )

            return (
              <Link
                key={option.id}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-6 rounded-2xl border border-lime-400/30 bg-zinc-900/50 hover:border-lime-400/60 hover:bg-zinc-900 transition-all group"
              >
                <p className="text-base sm:text-lg font-bold text-white group-hover:text-lime-400 transition-colors">
                  {option.label}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                  Custom message sent
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 p-4 sm:p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
          <p className="text-sm text-zinc-400">
            <span className="text-lime-400 font-semibold">WhatsApp preferred.</span> It&apos;s the
            fastest way to reach me, and I reply usually within 15–30 minutes.
          </p>
        </div>
      </div>
    </section>
  )
}
