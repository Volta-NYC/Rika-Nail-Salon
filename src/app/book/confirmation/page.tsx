import type { Metadata } from "next"
import { BookingConfirmationView } from "@/lib/components/booking-confirmation-view"

export const metadata: Metadata = {
  title: "Booking Confirmation",
  description: "Review your Rika Nail Salon booking confirmation.",
  alternates: {
    canonical: "/book/confirmation",
  },
}

export default function ConfirmationPage() {
  return <BookingConfirmationView />
}
