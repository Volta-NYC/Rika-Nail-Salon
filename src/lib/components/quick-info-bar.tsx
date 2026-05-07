"use client"

import { useEffect, useState } from "react"
import { Clock, MapPin, Navigation, Phone } from "lucide-react"
import { business } from "@data/business"

export function QuickInfoBar() {
  const [todayIndex, setTodayIndex] = useState<number | null>(null)

  useEffect(() => {
    setTodayIndex(new Date().getDay())
  }, [])

  const today = todayIndex === null ? business.hours[0] : business.hours[todayIndex]

  return (
    <section className="relative z-10 border-y border-ink/10 bg-ivory">
      <div className="mx-auto grid max-w-7xl gap-0 divide-y divide-ink/10 px-5 sm:px-8 md:grid-cols-4 md:divide-x md:divide-y-0">
        <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="group flex gap-4 py-5">
          <MapPin size={20} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
              Address
            </span>
            <span className="mt-1 block text-sm font-medium text-ink group-hover:text-clay">
              {business.address.full}
            </span>
          </span>
        </a>

        <a href={business.phoneHref} className="group flex gap-4 py-5 md:px-6">
          <Phone size={20} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
              Phone
            </span>
            <span className="mt-1 block text-sm font-medium text-ink group-hover:text-clay">
              {business.phone}
            </span>
          </span>
        </a>

        <div className="flex gap-4 py-5 md:px-6">
          <Clock size={20} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
              Today
            </span>
            <span className="mt-1 block text-sm font-semibold text-ink">
              {today.dayShort}: {today.open} - {today.close}
            </span>
          </span>
        </div>

        <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="group flex gap-4 py-5 md:px-6">
          <Navigation size={20} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
              Directions
            </span>
            <span className="mt-1 block text-sm font-medium text-ink group-hover:text-clay">
              Open in Google Maps
            </span>
          </span>
        </a>
      </div>
    </section>
  )
}
