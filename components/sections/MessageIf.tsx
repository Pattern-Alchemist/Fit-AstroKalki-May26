'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { createWhatsAppLink } from '@/lib/whatsapp'

export default function MessageIf() {
  const whatsappLink = createWhatsAppLink(
    siteConfig.whatsappNumber,
    "Hi Kaustubh, I'm sending 'START' as requested."
  )

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 md:mb-12">
          {siteConfig.messageIfSection.title}
        </h2>

        <div className="space-y-4 mb-12 md:mb-16">
          {siteConfig.messageIfSection.triggers.map((trigger, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 rounded-xl border border-lime-400/20 bg-zinc-900/50 hover:border-lime-400/50 transition-all"
            >
              <p className="text-base sm:text-lg text-white leading-relaxed">
                {trigger}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 sm:p-12 rounded-3xl border border-lime-400/30 bg-gradient-to-br from-lime-400/10 to-zinc-950/50">
          <p className="text-sm sm:text-base text-zinc-400 mb-6">
            If any of these hit home, your next move is clear:
          </p>

          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-lime-400 text-zinc-950 font-black text-lg rounded-xl hover:bg-lime-300 transition-all hover:shadow-lg hover:shadow-lime-400/30"
          >
            Send '{siteConfig.messageIfSection.cta.split("'")[1]}' on WhatsApp
          </Link>

          <p className="text-xs sm:text-sm text-zinc-500 mt-6">
            Simple. Direct. Honest.
          </p>
        </div>
      </div>
    </section>
  )
}
