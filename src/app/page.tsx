import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MoveRight } from "lucide-react"
import { business } from "@data/business"
import { galleryImages } from "@data/gallery"
import { categoryStartingPrice, formatPrice, serviceCategories } from "@data/services"
import { staff } from "@data/staff"
import { GalleryGrid } from "@/lib/components/gallery-grid"
import { QuickInfoBar } from "@/lib/components/quick-info-bar"
import { Reveal } from "@/lib/components/reveal"
import { StaffCard } from "@/lib/components/staff-card"

function categoryId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function Hero() {
  return (
    <section className="relative min-h-[76svh] overflow-hidden bg-ink text-cream">
      <Image
        src={galleryImages[28]?.src ?? galleryImages[0].src}
        alt="Rika Nail Salon nail art"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,26,26,0.78),rgba(26,26,26,0.48)_45%,rgba(26,26,26,0.18))]" />
      <div className="relative mx-auto flex min-h-[76svh] max-w-7xl items-end px-5 pb-16 pt-24 sm:px-8 md:pb-20">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Brooklyn, New York
          </p>
          <h1 className="mt-5 max-w-3xl font-serif-display text-6xl leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
            Rika Nail Salon
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-cream/82 sm:text-lg">
            {business.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.vagaroUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-blush"
            >
              <CalendarDays size={18} aria-hidden="true" />
              Book Now
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold text-cream transition hover:border-gold hover:text-gold"
            >
              View Gallery
              <MoveRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function HomePage() {
  const previewImages = galleryImages.slice(15, 23)

  return (
    <>
      <Hero />
      <QuickInfoBar />

      <section className="bg-cream px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                Services
              </p>
              <h2 className="mt-3 max-w-2xl font-serif-display text-4xl leading-tight sm:text-5xl">
                Polished essentials, spa rituals, extensions, and art-minded care.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:text-clay hover:underline"
            >
              Full service menu
              <MoveRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((category, index) => {
              const startingPrice = categoryStartingPrice(category)

              return (
                <Reveal key={category.name} delay={index * 0.035}>
                  <Link
                    href={`/services#${categoryId(category.name)}`}
                    className="group block min-h-48 rounded-lg border border-ink/10 bg-ivory p-6 shadow-[0_20px_70px_rgba(26,26,26,0.06)] transition hover:-translate-y-1 hover:border-gold/60"
                  >
                    <span className="block size-2 rounded-full bg-clay" />
                    <h3 className="mt-8 font-serif-display text-3xl leading-tight">
                      {category.name}
                    </h3>
                    <p className="mt-4 text-sm font-medium text-ink/58">
                      {startingPrice === null ? "Price upon request" : `from ${formatPrice(startingPrice)}`}
                    </p>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-cream sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Gallery
              </p>
              <h2 className="mt-3 max-w-2xl font-serif-display text-4xl leading-tight sm:text-5xl">
                Nail work with color, texture, and close-up detail.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold underline-offset-4 hover:underline"
            >
              View all photos
              <MoveRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="mt-10">
            <GalleryGrid images={previewImages} preview />
          </div>
        </div>
      </section>

      <section className="bg-ivory px-5 py-20 sm:px-8 md:py-28">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            About
          </p>
          <blockquote className="mt-5 font-serif-display text-3xl leading-snug text-ink sm:text-5xl">
            "{business.description}"
          </blockquote>
        </Reveal>
      </section>

      <section className="bg-cream px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                Staff
              </p>
              <h2 className="mt-3 max-w-2xl font-serif-display text-4xl leading-tight sm:text-5xl">
                A large, bookable team for everyday care and detailed sets.
              </h2>
            </div>
            <a
              href={business.vagaroUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:text-clay hover:underline"
            >
              Book with Vagaro
              <MoveRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
          <div className="mt-10 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {staff.map((member) => (
              <StaffCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
      </div>
    </div>
  )
}
