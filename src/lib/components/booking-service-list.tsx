"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { serviceCategories, formatPrice, type ServiceCategory } from "@data/services"
import { BookingModal } from "@/lib/components/booking-modal"
import type { BookableService } from "@/lib/booking"

type BookingServiceListProps = {
  categories?: ServiceCategory[]
}

export function BookingServiceList({ categories = serviceCategories }: BookingServiceListProps) {
  const [query, setQuery] = useState("")
  const [selectedService, setSelectedService] = useState<BookableService | null>(null)

  const filteredCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) {
      return categories
    }

    return categories
      .map((category) => ({
        ...category,
        services: category.services.filter((service) => {
          return `${category.name} ${service.name} ${service.description ?? ""}`
            .toLowerCase()
            .includes(normalized)
        }),
      }))
      .filter((category) => category.services.length > 0)
  }, [categories, query])

  return (
    <>
      <div className="sticky top-20 z-20 border-y border-ink/10 bg-cream/95 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto max-w-5xl">
          <label htmlFor="service-search" className="sr-only">
            Search services
          </label>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-clay"
              aria-hidden="true"
            />
            <input
              id="service-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services"
              className="w-full rounded-full border border-ink/10 bg-ivory py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-ink/35 focus:border-gold focus:ring-2 focus:ring-gold/25"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:px-8 md:py-14">
        {filteredCategories.length ? (
          filteredCategories.map((category) => (
            <section key={category.name} className="scroll-mt-32">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                    Category
                  </p>
                  <h2 className="mt-2 font-serif-display text-3xl">{category.name}</h2>
                </div>
                <p className="text-sm text-ink/50">{category.services.length} services</p>
              </div>

              <div className="grid gap-3">
                {category.services.map((service) => (
                  <article
                    key={service.name}
                    className="grid gap-4 rounded-lg border border-ink/10 bg-ivory p-5 shadow-[0_16px_60px_rgba(26,26,26,0.05)] sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-ink">{service.name}</h3>
                        <p
                          className={`text-sm font-semibold ${
                            service.price === null ? "italic text-ink/54" : "text-clay"
                          }`}
                        >
                          {formatPrice(service.price)}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-ink/58">
                        {service.description ?? "Description not listed."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedService({
                          service,
                          categoryName: category.name,
                        })
                      }
                      className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition hover:bg-clay"
                    >
                      Select
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="rounded-lg border border-ink/10 bg-ivory p-8 text-center">
            <h2 className="font-serif-display text-3xl">No services found</h2>
            <p className="mt-3 text-sm text-ink/58">Try a different search term.</p>
          </div>
        )}
      </div>

      <BookingModal booking={selectedService} onClose={() => setSelectedService(null)} />
    </>
  )
}
