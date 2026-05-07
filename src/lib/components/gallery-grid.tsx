"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect, useState } from "react"
import type { GalleryImage } from "@data/gallery"

const ratios = ["4 / 5", "1 / 1", "5 / 4", "3 / 4", "4 / 3", "2 / 3"]

export function GalleryGrid({
  images,
  preview = false,
}: {
  images: GalleryImage[]
  preview?: boolean
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex === null ? null : images[activeIndex]

  useEffect(() => {
    if (activeIndex === null) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null)
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + images.length) % images.length,
        )
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? current : (current + 1) % images.length))
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [activeIndex, images.length])

  function goPrevious() {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + images.length) % images.length,
    )
  }

  function goNext() {
    setActiveIndex((current) => (current === null ? current : (current + 1) % images.length))
  }

  return (
    <>
      <div className={preview ? "grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" : "masonry columns-1 sm:columns-2 lg:columns-3"}>
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            className={
              preview
                ? "group relative overflow-hidden rounded-lg bg-ink/5 text-left shadow-sm"
                : "masonry-item group relative w-full overflow-hidden rounded-lg bg-ink/5 text-left shadow-sm"
            }
            style={{ aspectRatio: preview ? ratios[(index + 2) % ratios.length] : ratios[index % ratios.length] }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.18) }}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open gallery image ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                preview
                  ? "(min-width: 768px) 25vw, 50vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover transition duration-700 group-hover:scale-105"
              priority={preview && index < 2}
            />
            <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/12" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/88 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
          >
            <button
              type="button"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-cream text-ink shadow-lg"
              onClick={() => setActiveIndex(null)}
              aria-label="Close gallery image"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-lg"
              onClick={goPrevious}
              aria-label="Previous gallery image"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>

            <motion.div
              key={activeImage.src}
              className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-lg bg-ink"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              type="button"
              className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-lg"
              onClick={goNext}
              aria-label="Next gallery image"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
