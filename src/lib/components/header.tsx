"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { CalendarDays, Menu, X } from "lucide-react"
import { business } from "@data/business"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Rika Nail Salon home"
          onClick={() => setOpen(false)}
        >
          <span className="relative grid size-12 place-items-center overflow-hidden rounded-full border border-gold/40 bg-ink shadow-sm">
            <Image
              src={business.logoPath}
              alt="Rika Nail Salon logo"
              fill
              sizes="48px"
              className="scale-[1.75] object-cover"
              priority
            />
          </span>
          <span>
            <span className="block font-serif-display text-xl leading-none tracking-normal">
              Rika
            </span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/60">
              Nail Salon
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active ? "text-ink" : "text-ink/58 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={business.vagaroUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/55 bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-[0_12px_34px_rgba(201,169,110,0.24)] transition hover:bg-blush focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-cream"
          >
            <CalendarDays size={17} aria-hidden="true" />
            Book Now
          </a>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-ink/12 bg-ivory text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink/10 bg-cream px-5 pb-5 md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 py-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-ink/80 hover:bg-ivory"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={business.vagaroUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/55 bg-gold px-5 py-3 text-sm font-semibold text-ink"
          >
            <CalendarDays size={17} aria-hidden="true" />
            Book Now
          </a>
        </div>
      ) : null}
    </header>
  )
}
