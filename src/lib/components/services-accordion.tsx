"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"
import { formatPrice, type ServiceCategory } from "@data/services"
import { BookingModal } from "@/lib/components/booking-modal"
import type { BookableService } from "@/lib/booking"

export function ServicesAccordion({ categories }: { categories: ServiceCategory[] }) {
  const allOpen = useMemo(() => new Set(categories.map((_, index) => index)), [categories])
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(allOpen)
  const [selectedService, setSelectedService] = useState<BookableService | null>(null)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const sync = () => {
      setOpenIndexes(media.matches ? new Set(categories.map((_, index) => index)) : new Set())
    }

    sync()
    media.addEventListener("change", sync)

    return () => media.removeEventListener("change", sync)
  }, [categories])

  function toggle(index: number) {
    setOpenIndexes((current) => {
      const next = new Set(current)

      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }

      return next
    })
  }

  return (
    <>
      <div className="grid gap-4">
        {categories.map((category, index) => {
          const open = openIndexes.has(index)
          const id = category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

          return (
            <section
              key={category.name}
              id={id}
              className="scroll-mt-32 rounded-lg border border-ink/10 bg-ivory shadow-[0_20px_80px_rgba(26,26,26,0.05)]"
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${id}-services`}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
              >
                <span>
                  <span className="font-serif-display text-2xl leading-tight sm:text-3xl">
                    {category.name}
                  </span>
                  <span className="mt-1 block text-sm text-ink/55">
                    {category.services.length} services
                  </span>
                </span>
                <ChevronDown
                  size={22}
                  className={`shrink-0 text-clay transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <div id={`${id}-services`} className={open ? "grid" : "hidden"}>
                {category.services.map((service) => (
                  <article
                    key={service.name}
                    className="grid gap-4 border-t border-ink/10 px-5 py-5 sm:grid-cols-[1fr_auto] sm:px-7"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-ink">{service.name}</h3>
                      {service.description ? (
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/62">
                          {service.description}
                        </p>
                      ) : (
                        <p className="mt-2 text-sm leading-7 text-ink/45">
                          Description not listed.
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 sm:items-end">
                      <p
                        className={`text-sm font-semibold sm:text-right ${
                          service.price === null ? "italic text-ink/54" : "text-clay"
                        }`}
                      >
                        {formatPrice(service.price)}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedService({
                            service,
                            categoryName: category.name,
                          })
                        }
                        className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-clay"
                      >
                        Book
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>
      <BookingModal booking={selectedService} onClose={() => setSelectedService(null)} />
    </>
  )
}
