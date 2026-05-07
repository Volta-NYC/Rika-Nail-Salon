import Image from "next/image"
import Link from "next/link"
import { AtSign, MapPin, Phone } from "lucide-react"
import { business } from "@data/business"

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink pb-24 text-cream md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-4">
            <span className="relative grid size-14 place-items-center overflow-hidden rounded-full bg-cream">
              <Image
                src={business.logoPath}
                alt="Rika Nail Salon logo"
                fill
                sizes="56px"
                className="object-contain p-2"
              />
            </span>
            <span className="font-serif-display text-3xl">Rika Nail Salon</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-cream/72">
            {business.description}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Visit
          </h2>
          <div className="mt-5 space-y-4 text-sm text-cream/78">
            <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{business.address.full}</span>
            </a>
            <a href={business.phoneHref} className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{business.phone}</span>
            </a>
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3"
            >
              <AtSign size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{business.instagram}</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Hours
          </h2>
          <dl className="mt-5 grid gap-2 text-sm text-cream/78">
            {business.hours.map((hour) => (
              <div key={hour.day} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt>{hour.dayShort}</dt>
                <dd>
                  {hour.open} - {hour.close}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href={business.bookingPath}
            className="mt-6 inline-block text-sm font-semibold text-gold underline-offset-4 hover:underline"
          >
            Book Online
          </Link>
        </div>
      </div>
    </footer>
  )
}
