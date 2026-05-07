import type { Metadata } from "next"
import { galleryImages } from "@data/gallery"
import { GalleryGrid } from "@/lib/components/gallery-grid"
import { Reveal } from "@/lib/components/reveal"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse Rika Nail Salon's nail art and salon style gallery from Brooklyn, NY.",
  alternates: {
    canonical: "/gallery",
  },
}

export default function GalleryPage() {
  return (
    <>
      <section className="bg-ink px-5 py-16 text-cream sm:px-8 md:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Gallery
          </p>
          <h1 className="mt-4 max-w-4xl font-serif-display text-5xl leading-tight sm:text-7xl">
            A closer look at Rika Nail Salon's latest nail work.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-cream/72">
            Tap any image to open the lightbox and move through the full set.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream px-5 py-12 sm:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </>
  )
}
