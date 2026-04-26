'use client'

import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { createWhatsAppLink } from '@/lib/whatsapp'

export default function WhoThisIsFor() {
  const whatsappLink = createWhatsAppLink(
    siteConfig.whatsappNumber,
    "Hi Kaustubh, I'm interested in your coaching. Can you help me?"
  )

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-12 md:mb-16 text-center">
          Is this for you?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* For */}
          <div className="rounded-2xl border border-lime-400/30 bg-zinc-900/50 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-lime-400 mb-6 flex items-center gap-2">
              <Check className="w-6 h-6" />
              This is for you if
            </h3>

            <ul className="space-y-4">
              {siteConfig.whoThisIsFor.for.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-lime-400 font-bold text-lg mt-1">•</span>
                  <span className="text-base text-zinc-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For */}
          <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-zinc-400 mb-6 flex items-center gap-2">
              <X className="w-6 h-6" />
              This is not for you if
            </h3>

            <ul className="space-y-4">
              {siteConfig.whoThisIsFor.notFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-zinc-500 font-bold text-lg mt-1">•</span>
                  <span className="text-base text-zinc-400 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <p className="text-base sm:text-lg text-zinc-400 mb-6">
            If you see yourself in the "This is for you" list, let's talk.
          </p>

          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-lime-400 text-zinc-950 font-bold rounded-lg hover:bg-lime-300 transition-all hover:shadow-lg hover:shadow-lime-400/30 text-lg"
          >
            Book my free consult on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  )
}
