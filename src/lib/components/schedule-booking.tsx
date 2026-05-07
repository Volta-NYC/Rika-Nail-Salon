"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { FormEvent } from "react"
import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, CalendarDays, Check, Clock, CreditCard, UserRound } from "lucide-react"
import { business } from "@data/business"
import { staff } from "@data/staff"
import { formatPrice } from "@data/services"
import {
  bookingConfirmationKey,
  bookingDraftKey,
  type BookingConfirmation,
  type BookingDraft,
} from "@/lib/booking"

const timeSlots = {
  weekday: [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
  ],
  sunday: [
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
  ],
}

function formatDateInput(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")

  return `${year}-${month}-${day}`
}

function readableDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

function nextDates() {
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return formatDateInput(date)
  })
}

export function ScheduleBooking() {
  const router = useRouter()
  const [draft, setDraft] = useState<BookingDraft | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [professional, setProfessional] = useState("Any available professional")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Pay at salon")
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardZip, setCardZip] = useState("")
  const [error, setError] = useState("")

  const dateOptions = useMemo(nextDates, [])
  const availableProfessionals = useMemo(
    () => [
      { name: "Any available professional", bookable: true },
      ...staff.filter((member) => member.bookable),
    ],
    [],
  )

  const availableTimes = useMemo(() => {
    if (!date) {
      return []
    }

    const day = new Date(`${date}T12:00:00`).getDay()
    return day === 0 ? timeSlots.sunday : timeSlots.weekday
  }, [date])

  useEffect(() => {
    const stored = window.sessionStorage.getItem(bookingDraftKey)
    if (stored) {
      try {
        setDraft(JSON.parse(stored) as BookingDraft)
      } catch {
        window.sessionStorage.removeItem(bookingDraftKey)
      }
    }
    setDate(dateOptions[0] ?? "")
    setLoaded(true)
  }, [dateOptions])

  function confirmBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!draft) {
      setError("Choose a service before scheduling.")
      return
    }

    if (!professional || !date || !time || !customerName || !customerPhone) {
      setError("Please choose a professional, date, time, name, and phone number.")
      return
    }

    if (paymentMethod === "Card placeholder" && (!cardName || !cardNumber || !cardExpiry || !cardZip)) {
      setError("Enter the placeholder card fields or choose Pay at salon.")
      return
    }

    const confirmation: BookingConfirmation = {
      ...draft,
      confirmationNumber: `RIKA-${Date.now().toString().slice(-6)}`,
      professional,
      date,
      time,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
      confirmedAt: new Date().toISOString(),
    }

    window.localStorage.setItem(bookingConfirmationKey, JSON.stringify(confirmation))
    window.sessionStorage.removeItem(bookingDraftKey)
    router.push("/book/confirmation")
  }

  if (!loaded) {
    return (
      <section className="grid min-h-[60vh] place-items-center bg-cream px-5">
        <p className="text-sm text-ink/58">Loading your booking...</p>
      </section>
    )
  }

  if (!draft) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-cream px-5 py-16">
        <div className="max-w-lg rounded-lg border border-ink/10 bg-ivory p-8 text-center shadow-[0_20px_80px_rgba(26,26,26,0.05)]">
          <h1 className="font-serif-display text-4xl">Choose a service first</h1>
          <p className="mt-4 text-sm leading-7 text-ink/58">
            Your booking session does not have a selected service yet.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream"
          >
            Start booking
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream px-5 py-10 sm:px-8 md:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Link
            href="/book"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-clay"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Change service
          </Link>
          <div className="rounded-lg border border-ink/10 bg-ivory p-6 shadow-[0_20px_80px_rgba(26,26,26,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
              Your Service
            </p>
            <h1 className="mt-3 font-serif-display text-4xl leading-tight">{draft.serviceName}</h1>
            <p className="mt-3 text-sm font-semibold text-clay">{formatPrice(draft.basePrice)}</p>
            {draft.selectedOptions.length ? (
              <div className="mt-6 border-t border-ink/10 pt-5">
                <h2 className="text-sm font-semibold text-ink">Selected add-ons</h2>
                <div className="mt-3 grid gap-3 text-sm text-ink/62">
                  {draft.selectedOptions.map((group) => (
                    <div key={group.groupName}>
                      <p className="font-semibold text-ink/75">{group.groupName}</p>
                      <p>{group.choices.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {draft.notes ? (
              <div className="mt-6 border-t border-ink/10 pt-5">
                <h2 className="text-sm font-semibold text-ink">Notes</h2>
                <p className="mt-2 text-sm leading-7 text-ink/62">{draft.notes}</p>
              </div>
            ) : null}
            <p className="mt-6 rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-6 text-ink/65">
              Payment is not processed on this website yet. This creates a placeholder appointment
              request for the salon.
            </p>
          </div>
        </aside>

        <form
          onSubmit={confirmBooking}
          className="rounded-lg border border-ink/10 bg-ivory p-5 shadow-[0_20px_80px_rgba(26,26,26,0.05)] sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
            Schedule
          </p>
          <h2 className="mt-3 font-serif-display text-4xl leading-tight">
            Choose a professional and time.
          </h2>

          <div className="mt-8 grid gap-8">
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <UserRound size={18} className="text-clay" aria-hidden="true" />
                Professional
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {availableProfessionals.map((member) => (
                  <button
                    key={member.name}
                    type="button"
                    onClick={() => setProfessional(member.name)}
                    className={`rounded-md border px-4 py-3 text-left transition ${
                      professional === member.name
                        ? "border-gold bg-gold/20"
                        : "border-ink/10 bg-cream hover:border-gold/60"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-ink">{member.name}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-ink/45">
                      {member.name === "Any available professional" ? "Fastest match" : "Bookable"}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <CalendarDays size={18} className="text-clay" aria-hidden="true" />
                Date
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {dateOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setDate(option)
                      setTime("")
                    }}
                    className={`rounded-md border px-3 py-3 text-sm font-semibold transition ${
                      date === option
                        ? "border-gold bg-gold/20 text-ink"
                        : "border-ink/10 bg-cream text-ink/65 hover:border-gold/60"
                    }`}
                  >
                    {readableDate(option)}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Clock size={18} className="text-clay" aria-hidden="true" />
                Time
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {availableTimes.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`rounded-md border px-3 py-3 text-sm font-semibold transition ${
                      time === slot
                        ? "border-gold bg-gold/20 text-ink"
                        : "border-ink/10 bg-cream text-ink/65 hover:border-gold/60"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-ink">Your details</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-ink/70">
                  Name
                  <input
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    className="mt-2 w-full rounded-md border border-ink/12 bg-cream px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-ink/70">
                  Phone
                  <input
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                    className="mt-2 w-full rounded-md border border-ink/12 bg-cream px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-ink/70 sm:col-span-2">
                  Email
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(event) => setCustomerEmail(event.target.value)}
                    className="mt-2 w-full rounded-md border border-ink/12 bg-cream px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
                  />
                </label>
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <CreditCard size={18} className="text-clay" aria-hidden="true" />
                Payment placeholder
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Pay at salon", "Card placeholder"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-md border px-4 py-3 text-left transition ${
                      paymentMethod === method
                        ? "border-gold bg-gold/20"
                        : "border-ink/10 bg-cream hover:border-gold/60"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-ink">{method}</span>
                    <span className="mt-1 block text-sm text-ink/55">
                      {method === "Pay at salon"
                        ? "No online charge."
                        : "Demo fields only. No card will be charged."}
                    </span>
                  </button>
                ))}
              </div>

              {paymentMethod === "Card placeholder" ? (
                <div className="mt-4 grid gap-4 rounded-lg border border-ink/10 bg-cream p-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-ink/70">
                    Name on card
                    <input
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                      className="mt-2 w-full rounded-md border border-ink/12 bg-ivory px-4 py-3 outline-none focus:border-gold"
                    />
                  </label>
                  <label className="text-sm font-semibold text-ink/70">
                    Card number
                    <input
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="mt-2 w-full rounded-md border border-ink/12 bg-ivory px-4 py-3 outline-none focus:border-gold"
                    />
                  </label>
                  <label className="text-sm font-semibold text-ink/70">
                    Expiration
                    <input
                      value={cardExpiry}
                      onChange={(event) => setCardExpiry(event.target.value)}
                      placeholder="MM/YY"
                      className="mt-2 w-full rounded-md border border-ink/12 bg-ivory px-4 py-3 outline-none focus:border-gold"
                    />
                  </label>
                  <label className="text-sm font-semibold text-ink/70">
                    ZIP
                    <input
                      value={cardZip}
                      onChange={(event) => setCardZip(event.target.value)}
                      className="mt-2 w-full rounded-md border border-ink/12 bg-ivory px-4 py-3 outline-none focus:border-gold"
                    />
                  </label>
                </div>
              ) : null}
            </section>
          </div>

          {error ? (
            <p className="mt-6 rounded-md border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-ink">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-cream transition hover:bg-clay sm:w-auto"
          >
            <Check size={18} aria-hidden="true" />
            Confirm appointment request
          </button>
        </form>
      </div>
    </section>
  )
}
