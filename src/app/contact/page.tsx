import type { Metadata } from "next"
import Link from "next/link"
import { AtSign, CalendarDays, MapPin, Phone } from "lucide-react"
import { business } from "@data/business"
import { ContactForm } from "@/lib/components/contact-form"
import { Reveal } from "@/lib/components/reveal"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rika Nail Salon at 299 Flatbush Ave, Brooklyn, NY 11217, view hours, get directions, and book an appointment online.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink px-5 py-16 text-cream sm:px-8 md:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </p>
          <h1 className="mt-4 max-w-4xl font-serif-display text-5xl leading-tight sm:text-7xl">
            Visit Rika Nail Salon on Flatbush Ave.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-cream/72">
            Book online, call directly, or stop by the Brooklyn studio.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream px-5 py-12 sm:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal className="overflow-hidden rounded-lg border border-ink/10 bg-ivory shadow-[0_20px_80px_rgba(26,26,26,0.05)]">
            <iframe
              title="Map to Rika Nail Salon"
              src="https://www.google.com/maps?q=299%20Flatbush%20Ave%2C%20Brooklyn%2C%20NY%2011217&output=embed"
              className="h-[28rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal className="rounded-lg border border-ink/10 bg-ivory p-6 shadow-[0_20px_80px_rgba(26,26,26,0.05)] sm:p-8">
            <h2 className="font-serif-display text-4xl">Book or get in touch</h2>
            <div className="mt-7 grid gap-4 text-sm text-ink/70">
              <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="flex gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-clay" aria-hidden="true" />
                <span>{business.address.full}</span>
              </a>
              <a href={business.phoneHref} className="flex gap-3">
                <Phone size={19} className="mt-0.5 shrink-0 text-clay" aria-hidden="true" />
                <span>{business.phone}</span>
              </a>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3"
              >
                <AtSign size={19} className="mt-0.5 shrink-0 text-clay" aria-hidden="true" />
                <span>{business.instagram}</span>
              </a>
            </div>
            <Link
              href={business.bookingPath}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-gold/55 bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-blush"
            >
              <CalendarDays size={17} aria-hidden="true" />
              Book an Appointment
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-5 py-12 sm:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <h2 className="font-serif-display text-4xl">Hours</h2>
            <div className="mt-6 overflow-hidden rounded-lg border border-ink/10 bg-cream">
              <table className="w-full text-left text-sm">
                <tbody>
                  {business.hours.map((hour) => (
                    <tr key={hour.day} className="border-b border-ink/10 last:border-0">
                      <th className="px-5 py-4 font-semibold text-ink">{hour.day}</th>
                      <td className="px-5 py-4 text-right text-ink/65">
                        {hour.open} - {hour.close}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="rounded-lg border border-ink/10 bg-cream p-6 shadow-[0_20px_80px_rgba(26,26,26,0.05)] sm:p-8">
            <h2 className="font-serif-display text-4xl">Contact form</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
