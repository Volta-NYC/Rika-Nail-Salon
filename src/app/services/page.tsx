import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { business } from "@data/business"
import { serviceCategories } from "@data/services"
import { Reveal } from "@/lib/components/reveal"
import { ServicesAccordion } from "@/lib/components/services-accordion"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore all Rika Nail Salon services, including manicures, pedicures, extensions, gel manicures, dipping powder, massage, waxing, and kids nail care.",
  alternates: {
    canonical: "/services",
  },
}

export default function ServicesPage() {
  const totalServices = serviceCategories.reduce((total, category) => total + category.services.length, 0)

  return (
    <>
      <section className="bg-ink px-5 py-16 text-cream sm:px-8 md:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Services
          </p>
          <h1 className="mt-4 max-w-4xl font-serif-display text-5xl leading-tight sm:text-7xl">
            All {totalServices} services, organized for quick booking.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-cream/72">
            Prices and descriptions are taken from Rika Nail Salon's Vagaro service listing.
          </p>
        </Reveal>
      </section>

      <div className="sticky top-20 z-30 border-y border-ink/10 bg-ivory/95 px-5 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-ink/68">
            Ready to reserve a time? Choose a service to open booking options.
          </p>
          <Link
            href={business.bookingPath}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/55 bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-blush"
          >
            <CalendarDays size={17} aria-hidden="true" />
            Book Now
          </Link>
        </div>
      </div>

      <section className="bg-cream px-5 py-12 sm:px-8 md:py-18">
        <div className="mx-auto max-w-5xl">
          <ServicesAccordion categories={serviceCategories} />
        </div>
      </section>
    </>
  )
}
