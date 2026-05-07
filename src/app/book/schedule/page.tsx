import type { Metadata } from "next"
import { ScheduleBooking } from "@/lib/components/schedule-booking"

export const metadata: Metadata = {
  title: "Choose Professional & Time",
  description: "Choose a Rika Nail Salon professional, appointment time, and placeholder payment method.",
  alternates: {
    canonical: "/book/schedule",
  },
}

export default function SchedulePage() {
  return <ScheduleBooking />
}
