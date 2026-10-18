interface SectionLabelProps {
  number: string
  label: string
  className?: string
}

export default function SectionLabel({ number, label, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`} aria-hidden="true">
      <span className="font-[var(--font-ark)] font-bold text-[var(--color-accent)] text-2xl md:text-3xl tracking-tight leading-none">
        {number}
      </span>
      <span className="font-[var(--font-desk)] font-medium uppercase tracking-wider text-[var(--color-text-secondary)] text-sm">
        {label}
      </span>
    </div>
  )
}