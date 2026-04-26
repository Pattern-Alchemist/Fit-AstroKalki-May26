'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { createWhatsAppLink } from '@/lib/whatsapp'

export default function StickyWhatsAppBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const whatsappLink = createWhatsAppLink(
    siteConfig.whatsappNumber,
    siteConfig.floatingWhatsapp.message
  )

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-lime-400/30 px-4 py-3 z-40 lg:hidden animate-in slide-in-from-bottom-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-lime-400 leading-tight">
            Free 15-min WhatsApp consult
          </p>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Replies usually within 15–30 mins
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-lime-400 text-zinc-950 text-sm font-bold rounded-lg hover:bg-lime-300 transition-all whitespace-nowrap"
          >
            Chat now
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 hover:bg-zinc-900 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
