import type { Service } from "@data/services"

export const bookingDraftKey = "rikaBookingDraft"
export const bookingConfirmationKey = "rikaLatestBooking"

export type SelectedOptionGroup = {
  groupName: string
  choices: string[]
}

export type BookingDraft = {
  id: string
  serviceName: string
  categoryName: string
  basePrice: number | null
  serviceDescription: string | null
  selectedOptions: SelectedOptionGroup[]
  notes: string
  createdAt: string
}

export type BookingConfirmation = BookingDraft & {
  confirmationNumber: string
  professional: string
  date: string
  time: string
  customerName: string
  customerEmail: string
  customerPhone: string
  paymentMethod: string
  confirmedAt: string
}

export type BookableService = {
  service: Service
  categoryName: string
}
