'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { createWhatsAppLink } from '@/lib/whatsapp'

type ProgramAccent = 'lime' | 'orange' | 'cyan'

const accentMap: Record<
  ProgramAccent,
  {
    badge: string
    border: string
    glow: string
    button: string
    soft: string
    text: string
  }
> = {
  lime: {
    badge: 'bg-lime-400 text-zinc-950',
    border: 'border-lime-400/30 hover:border-lime-400/60',
    glow: 'hover:shadow-lime-400/10',
    button: 'bg-lime-400 text-zinc-950 hover:bg-lime-300',
    soft: 'bg-lime-400/10',
    text: 'text-lime-400',
  },
  orange: {
    badge: 'bg-orange-400 text-zinc-950',
    border: 'border-orange-400/30 hover:border-orange-400/60',
    glow: 'hover:shadow-orange-400/10',
    button: 'bg-orange-400 text-zinc-950 hover:bg-orange-300',
    soft: 'bg-orange-400/10',
    text: 'text-orange-300',
  },
  cyan: {
    badge: 'bg-cyan-400 text-zinc-950',
    border: 'border-cyan-400/30 hover:border-cyan-400/60',
    glow: 'hover:shadow-cyan-400/10',
    button: 'bg-cyan-400 text-zinc-950 hover:bg-cyan-300',
    soft: 'bg-cyan-400/10',
    text: 'text-cyan-300',
  },
}

export default function Programs() {
  const [showTable, setShowTable] = useState(false)

  return (
    <section
      id="programs"
      className="bg-gradient-to-b from-black via-zinc-950 to-zinc-900 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-lime-400">
            Programs
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Choose your transformation path.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
            Three focused coaching paths. Every program includes customised diet guidance,
            weekly assessments, accountability, and access to your somatic reset ecosystem.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {siteConfig.programs.map((program) => {
            const accent = accentMap[program.accent as ProgramAccent]
            const whatsappLink = createWhatsAppLink(siteConfig.whatsappNumber, program.ctaText)

            return (
              <article
                key={program.id}
                className={[
                  'group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-zinc-950/90 p-6 transition-all duration-300',
                  'shadow-xl backdrop-blur-sm',
                  accent.border,
                  accent.glow,
                  program.popular ? 'lg:-translate-y-2' : '',
                ].join(' ')}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${accent.soft}`}
                  aria-hidden="true"
                />

                <div className="mb-5 flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${accent.badge}`}
                  >
                    {program.badge}
                  </span>

                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {program.spots}
                  </span>
                </div>

                <div className="mb-5">
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {program.name}
                  </h3>
                  <p className={`mt-3 text-sm font-medium sm:text-base ${accent.text}`}>
                    {program.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                    {program.description}
                  </p>
                </div>

                <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {program.price}
                    </span>
                    <span className="pb-1 text-sm text-zinc-400">
                      {program.priceNote}
                    </span>
                  </div>

                  {program.oldPrice ? (
                    <p className="mt-2 text-sm text-zinc-500 line-through">
                      {program.oldPrice}
                    </p>
                  ) : null}

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-300">
                    <div className="rounded-xl bg-zinc-900/80 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Duration
                      </p>
                      <p className="mt-1 font-semibold text-white">{program.duration}</p>
                    </div>
                    <div className="rounded-xl bg-zinc-900/80 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Sessions
                      </p>
                      <p className="mt-1 font-semibold text-white">{program.sessions}</p>
                    </div>
                    <div className="rounded-xl bg-zinc-900/80 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Format
                      </p>
                      <p className="mt-1 font-semibold text-white">{program.format}</p>
                    </div>
                    <div className="rounded-xl bg-zinc-900/80 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Path
                      </p>
                      <p className="mt-1 font-semibold text-white">{program.shortName}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Who this is for
                  </p>
                  <p className="text-sm leading-7 text-zinc-300">{program.bestFor}</p>
                </div>

                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {program.includes.map((item: string) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${accent.text.replace(
                            'text-',
                            'bg-'
                          )}`}
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-6 text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Why people choose this
                  </p>
                  <ul className="space-y-2">
                    {program.bullets.map((item: string) => (
                      <li key={item} className="text-sm leading-6 text-zinc-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto space-y-4">
                  <p className="text-sm leading-6 text-zinc-400">{program.urgency}</p>

                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-200',
                      accent.button,
                    ].join(' ')}
                  >
                    {program.cta}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-lime-400/20 bg-gradient-to-r from-lime-400/10 via-zinc-950 to-cyan-400/10 p-6 md:mt-14 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">
                Included in all programs
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                More than workouts. This is guided transformation.
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                Every path is built around consistency, tracking, recovery, and real-life
                sustainability — not random workouts and crash diets.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {siteConfig.sharedProgramIncludes.map((item: string) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile toggle for comparison table */}
        <button
          onClick={() => setShowTable(!showTable)}
          className="md:hidden mt-10 w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-zinc-700 bg-zinc-900/50 hover:border-lime-400/50 transition-all"
        >
          <span className="font-bold text-white">Compare all programs</span>
          <ChevronDown
            className={`w-5 h-5 text-lime-400 transition-transform ${
              showTable ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Desktop always shows table, mobile shows on toggle */}
        <div className={`${!showTable ? 'hidden md:block' : 'block'} mt-10 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 md:mt-14`}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Program
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Format
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Duration
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Best for
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Price
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Spots
                  </th>
                </tr>
              </thead>

              <tbody>
                {siteConfig.programs.map((program) => (
                  <tr key={program.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-4 align-top">
                      <div className="font-semibold text-white">{program.name}</div>
                      <div className="mt-1 text-sm text-zinc-400">{program.tagline}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-zinc-300">{program.format}</td>
                    <td className="px-4 py-4 text-sm text-zinc-300">
                      {program.duration}, {program.sessions}
                    </td>
                    <td className="px-4 py-4 text-sm text-zinc-300">{program.bestFor}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-white">
                      {program.price}
                    </td>
                    <td className="px-4 py-4 text-sm text-zinc-300">{program.spots}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
