import { CalendarDays } from "lucide-react"
import { business } from "@data/business"

export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-cream/95 px-4 py-3 shadow-[0_-12px_35px_rgba(26,26,26,0.12)] backdrop-blur md:hidden">
      <a
        href={business.vagaroUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream"
      >
        <CalendarDays size={17} aria-hidden="true" />
        Book Now
      </a>
    </div>
  )
}
