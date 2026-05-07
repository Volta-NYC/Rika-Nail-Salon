import type { StaffMember } from "@data/staff"

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function StaffCard({ member }: { member: StaffMember }) {
  return (
    <article className="min-w-[12rem] rounded-lg border border-ink/10 bg-ivory p-5 shadow-[0_18px_60px_rgba(26,26,26,0.06)]">
      <div className="grid size-16 place-items-center rounded-full border border-gold/45 bg-blush/45 font-serif-display text-xl text-ink">
        {initials(member.name)}
      </div>
      <h3 className="mt-5 font-serif-display text-2xl leading-tight">{member.name}</h3>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/52">
        {member.bookable ? "Bookable" : "Call to book"}
        {member.messageable ? " + Message" : ""}
      </p>
    </article>
  )
}
