"use client"

import { useState } from "react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-ink/70">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-md border border-ink/12 bg-ivory px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-ink/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-md border border-ink/12 bg-ivory px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold text-ink/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full resize-none rounded-md border border-ink/12 bg-ivory px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </div>
      <p className="text-sm text-ink/58">For fastest response, call us directly.</p>
      <button
        type="submit"
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-clay"
      >
        Send Message
      </button>
      {submitted ? (
        <p className="rounded-md border border-sage/25 bg-sage/10 px-4 py-3 text-sm text-ink/70">
          This form is a front-end preview and does not send messages.
        </p>
      ) : null}
    </form>
  )
}
