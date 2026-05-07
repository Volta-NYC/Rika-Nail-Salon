"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { business } from "@data/business"
import { formatPrice } from "@data/services"
import { bookingConfirmationKey, type BookingConfirmation } from "@/lib/booking"

export function BookingConfirmationView() {
  const [booking, setBooking] = useState<BookingConfirmation | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(bookingConfirmationKey)
    if (stored) {
      setBooking(JSON.parse(stored) as BookingConfirmation)
    }
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <section className="grid min-h-[60vh] place-items-center bg-cream px-5">
        <p className="text-sm text-ink/58">Loading confirmation...</p>
      </section>
    )
  }

  if (!booking) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-cream px-5 py-16">
        <div className="max-w-lg rounded-lg border border-ink/10 bg-ivory p-8 text-center shadow-[0_20px_80px_rgba(26,26,26,0.05)]">
          <h1 className="font-serif-display text-4xl">No booking found</h1>
          <p className="mt-4 text-sm leading-7 text-ink/58">
            Start a booking to create a new appointment request.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream"
          >
            Start booking
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream px-5 py-12 sm:px-8 md:py-18">
      <div className="mx-auto max-w-3xl rounded-lg border border-ink/10 bg-ivory p-6 text-center shadow-[0_20px_80px_rgba(26,26,26,0.05)] sm:p-10">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-gold/20 text-clay">
          <CheckCircle2 size={34} aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-clay">
          Appointment request received
        </p>
        <h1 className="mt-3 font-serif-display text-5xl leading-tight">
          {booking.confirmationNumber}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ink/62">
          This is a local website booking request. Payment processing and salon-side calendar sync
          are placeholders until those systems are connected.
        </p>

        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-lg border border-ink/10 bg-cream p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Service
            </p>
            <p className="mt-2 font-semibold text-ink">{booking.serviceName}</p>
            <p className="mt-1 text-sm font-semibold text-clay">{formatPrice(booking.basePrice)}</p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-cream p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Time
            </p>
            <p className="mt-2 font-semibold text-ink">
              {booking.date} at {booking.time}
            </p>
            <p className="mt-1 text-sm text-ink/58">{booking.professional}</p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-cream p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Client
            </p>
            <p className="mt-2 font-semibold text-ink">{booking.customerName}</p>
            <p className="mt-1 text-sm text-ink/58">{booking.customerPhone}</p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-cream p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Payment
            </p>
            <p className="mt-2 font-semibold text-ink">{booking.paymentMethod}</p>
            <p className="mt-1 text-sm text-ink/58">No online charge was made.</p>
          </div>
        </div>

        {booking.selectedOptions.length ? (
          <div className="mt-4 rounded-lg border border-ink/10 bg-cream p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Add-ons
            </p>
            <div className="mt-3 grid gap-2 text-sm text-ink/65">
              {booking.selectedOptions.map((group) => (
                <p key={group.groupName}>
                  <span className="font-semibold text-ink">{group.groupName}:</span>{" "}
                  {group.choices.join(", ")}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream"
          >
            Book another service
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink"
          >
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
