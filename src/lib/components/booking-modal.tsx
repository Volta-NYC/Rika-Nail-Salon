"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Check, X } from "lucide-react"
import { getServiceOptions, type ServiceOptionGroup } from "@data/service-options"
import { formatPrice } from "@data/services"
import { bookingDraftKey, type BookableService, type BookingDraft } from "@/lib/booking"

type BookingModalProps = {
  booking: BookableService | null
  onClose: () => void
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `booking-${Date.now()}`
}

function optionKey(groupName: string) {
  return groupName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

export function BookingModal({ booking, onClose }: BookingModalProps) {
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})
  const [notes, setNotes] = useState("")

  const optionGroups = useMemo<ServiceOptionGroup[]>(() => {
    return booking ? getServiceOptions(booking.service.name) : []
  }, [booking])

  useEffect(() => {
    if (!booking) {
      return
    }

    setSelectedOptions({})
    setNotes("")
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [booking])

  if (!booking) {
    return null
  }

  const { service, categoryName } = booking

  function toggleChoice(group: ServiceOptionGroup, choice: string) {
    const key = optionKey(group.name)

    setSelectedOptions((current) => {
      const selected = current[key] ?? []
      const next = new Set(selected)
      const isNone = choice === "None of the above"

      if (group.maxSelections === 1) {
        return {
          ...current,
          [key]: selected.includes(choice) ? [] : [choice],
        }
      }

      if (next.has(choice)) {
        next.delete(choice)
      } else {
        if (isNone) {
          next.clear()
        } else {
          next.delete("None of the above")
        }

        if (next.size < group.maxSelections) {
          next.add(choice)
        }
      }

      return {
        ...current,
        [key]: Array.from(next),
      }
    })
  }

  function continueToSchedule() {
    const draft: BookingDraft = {
      id: makeId(),
      serviceName: service.name,
      categoryName,
      basePrice: service.price,
      serviceDescription: service.description,
      selectedOptions: optionGroups
        .map((group) => ({
          groupName: group.name,
          choices: selectedOptions[optionKey(group.name)] ?? [],
        }))
        .filter((group) => group.choices.length > 0),
      notes,
      createdAt: new Date().toISOString(),
    }

    window.sessionStorage.setItem(bookingDraftKey, JSON.stringify(draft))
    onClose()
    router.push("/book/schedule")
  }

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-end bg-ink/70 p-0 backdrop-blur sm:place-items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="flex max-h-[calc(100svh-1rem)] w-full flex-col overflow-hidden rounded-t-lg bg-cream shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:max-h-[calc(100svh-2.5rem)] sm:max-w-3xl sm:rounded-lg">
        <div className="shrink-0 flex items-start justify-between gap-5 border-b border-ink/10 px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
              {categoryName}
            </p>
            <h2 id="booking-modal-title" className="mt-2 font-serif-display text-3xl leading-tight">
              {service.name}
            </h2>
            <p className="mt-2 text-sm font-semibold text-clay">{formatPrice(service.price)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/10 bg-ivory text-ink"
            aria-label="Close booking options"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          {service.description ? (
            <p className="mb-6 text-sm leading-7 text-ink/62">{service.description}</p>
          ) : null}

          <div className="rounded-lg border border-gold/35 bg-ivory p-4">
            <p className="text-sm font-semibold text-ink">Suggested Add-Ons Available</p>
            <p className="mt-1 text-sm text-ink/58">
              Add-on prices may vary in salon. This booking flow captures your selections without
              charging a card.
            </p>
          </div>

          <div className="mt-5 grid gap-5">
            {optionGroups.map((group) => {
              const key = optionKey(group.name)
              const selected = selectedOptions[key] ?? []

              return (
                <section key={group.name} className="rounded-lg border border-ink/10 bg-ivory p-4">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <div>
                      <h3 className="font-semibold text-ink">{group.name}</h3>
                      <p className="mt-1 text-sm text-ink/55">
                        {group.maxSelections === 1
                          ? "Choose 1"
                          : `Choose up to ${group.maxSelections}`}
                      </p>
                    </div>
                    {group.optional ? (
                      <p className="text-sm font-medium italic text-ink/48">Optional</p>
                    ) : null}
                  </div>

                  <div className="mt-4 grid gap-3">
                    {group.choices.map((choice) => {
                      const active = selected.includes(choice.label)

                      return (
                        <button
                          key={choice.label}
                          type="button"
                          onClick={() => toggleChoice(group, choice.label)}
                          className={`flex items-start justify-between gap-4 rounded-md border px-4 py-3 text-left transition ${
                            active
                              ? "border-gold bg-gold/20 text-ink"
                              : "border-ink/10 bg-cream text-ink/75 hover:border-gold/60"
                          }`}
                        >
                          <span>
                            <span className="block text-sm font-semibold">{choice.label}</span>
                            {choice.note ? (
                              <span className="mt-1 block text-sm leading-6 text-ink/55">
                                {choice.note}
                              </span>
                            ) : null}
                          </span>
                          <span
                            className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                              active ? "border-gold bg-gold text-ink" : "border-ink/20"
                            }`}
                            aria-hidden="true"
                          >
                            {active ? <Check size={14} /> : null}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>

          <div className="mt-5">
            <label htmlFor="booking-notes" className="text-sm font-semibold text-ink/70">
              Notes for the salon
            </label>
            <textarea
              id="booking-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="Reference photo notes, allergies, timing requests, or anything else we should know."
              className="mt-2 w-full resize-none rounded-md border border-ink/12 bg-ivory px-4 py-3 text-sm outline-none transition placeholder:text-ink/35 focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-3 border-t border-ink/10 bg-ivory px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:pb-4">
          <p className="text-sm text-ink/58">
            Next: choose a professional and time.
          </p>
          <button
            type="button"
            onClick={continueToSchedule}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-clay"
          >
            <CalendarDays size={17} aria-hidden="true" />
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
