export type BusinessHour = {
  day: string
  dayShort: string
  open: string
  close: string
}

export const business = {
  name: "Rika Nail Salon",
  address: {
    street: "299 Flatbush Ave",
    city: "Brooklyn",
    state: "NY",
    postalCode: "11217",
    full: "299 Flatbush Ave, Brooklyn, NY 11217",
  },
  phone: "(929) 999-7922",
  phoneHref: "tel:+19299997922",
  type: "Nails",
  walkIns: true,
  kidFriendly: true,
  amenities: ["WiFi", "Disabled Access"],
  spokenLanguages: ["English"],
  paymentMethods: [
    "Visa",
    "MasterCard",
    "Discover",
    "American Express",
    "Debit card",
    "Cash",
  ],
  covid19:
    "We are following guidelines to protect against the spread of COVID-19, according to our customers.",
  instagram: "@rikanail299",
  instagramUrl: "https://www.instagram.com/rikanail299/",
  vagaroUrl: "https://www.vagaro.com/rikanailsalon",
  bookingPath: "/book",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=299%20Flatbush%20Ave%2C%20Brooklyn%2C%20NY%2011217",
  description:
    "A professional and friendly uppermost salon where you receive the finest nails care & total beauty spa in Brooklyn, NY. We strive to assure that our customers receive the best-personalized and professional nails care services in a comfortable, inviting atmosphere.",
  logoPath: "/images/logo.png",
  geo: {
    latitude: 40.6808,
    longitude: -73.971,
  },
  hours: [
    { day: "Sunday", dayShort: "Sun", open: "10:30 AM", close: "7:30 PM" },
    { day: "Monday", dayShort: "Mon", open: "10:00 AM", close: "8:00 PM" },
    { day: "Tuesday", dayShort: "Tue", open: "10:00 AM", close: "8:00 PM" },
    { day: "Wednesday", dayShort: "Wed", open: "10:00 AM", close: "8:00 PM" },
    { day: "Thursday", dayShort: "Thu", open: "10:00 AM", close: "8:00 PM" },
    { day: "Friday", dayShort: "Fri", open: "10:00 AM", close: "8:00 PM" },
    { day: "Saturday", dayShort: "Sat", open: "10:00 AM", close: "8:00 PM" },
  ] satisfies BusinessHour[],
}

export type Business = typeof business
