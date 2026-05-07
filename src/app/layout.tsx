import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/lib/components/header"
import { Footer } from "@/lib/components/footer"
import { MobileBookBar } from "@/lib/components/mobile-book-bar"
import { business } from "@data/business"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rika Nail Salon — Premium Nail Art & Spa in Brooklyn, NY",
    template: "%s | Rika Nail Salon",
  },
  description: business.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rika Nail Salon — Premium Nail Art & Spa in Brooklyn, NY",
    description: business.description,
    type: "website",
    images: [
      {
        url: "/images/gallery/photo-29.png",
        width: 1200,
        height: 900,
        alt: "Rika Nail Salon nail art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rika Nail Salon — Premium Nail Art & Spa in Brooklyn, NY",
    description: business.description,
    images: ["/images/gallery/photo-29.png"],
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: business.name,
  description: business.description,
  image: business.logoPath,
  logo: business.logoPath,
  url: siteUrl,
  telephone: business.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postalCode,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  paymentAccepted: business.paymentMethods.join(", "),
  amenityFeature: business.amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity,
    value: true,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:30",
      closes: "19:30",
    },
    ...["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day,
      opens: "10:00",
      closes: "20:00",
    })),
  ],
  sameAs: [business.instagramUrl, business.vagaroUrl],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} min-h-screen antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBookBar />
      </body>
    </html>
  )
}
