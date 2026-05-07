import type { Metadata } from "next"
import { business } from "@data/business"
import { BookingServiceList } from "@/lib/components/booking-service-list"
import { Reveal } from "@/lib/components/reveal"

export const metadata: Metadata = {
  title: "Book Online",
  description:
    "Book Rika Nail Salon services online, choose service add-ons, then select a professional and appointment time.",
  alternates: {
    canonical: "/book",
  },
}

export default function BookPage() {
  return (
    <>
      <section className="bg-ink px-5 py-16 text-cream sm:px-8 md:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Book Online
          </p>
          <h1 className="mt-4 max-w-4xl font-serif-display text-5xl leading-tight sm:text-7xl">
            Choose your service and add-ons.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-cream/72">
            Select a service, customize the same optional add-ons shown in the original booking
            popup, then choose your professional and time.
          </p>
          <p className="mt-4 text-sm text-cream/60">
            Payments are placeholders for now. For urgent changes, call {business.phone}.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream">
        <BookingServiceList />
      </section>
    </>
  )
}
