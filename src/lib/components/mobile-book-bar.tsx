import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { business } from "@data/business"

export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-cream/95 px-4 py-3 shadow-[0_-12px_35px_rgba(26,26,26,0.12)] backdrop-blur md:hidden">
      <Link
        href={business.bookingPath}
        className="flex items-center justify-center gap-2 rounded-full border border-gold/55 bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-[0_12px_34px_rgba(201,169,110,0.24)]"
      >
        <CalendarDays size={17} aria-hidden="true" />
        Book Now
      </Link>
    </div>
  )
}
