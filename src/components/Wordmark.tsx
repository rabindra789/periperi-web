import Link from 'next/link'
import Mark from './Mark'

interface WordmarkProps {
  className?: string
  asLink?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeStyles = {
  sm: { mark: 16, text: 'text-base' },
  md: { mark: 22, text: 'text-lg' },
  lg: { mark: 28, text: 'text-xl' },
  xl: { mark: 36, text: 'text-2xl' },
}

export default function Wordmark({ className = '', asLink = false, size = 'md' }: WordmarkProps) {
  const { mark, text } = sizeStyles[size]
  const content = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark size={mark} className="flex-shrink-0 text-[var(--color-accent)]" />
      <span className={`font-[var(--font-grotesk)] ${text} font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]`}>
        Periperi
      </span>
    </span>
  )

  if (asLink) {
    return (
      <Link href="/" aria-label="Periperi home" className="inline-flex items-center">
        {content}
      </Link>
    )
  }

  return content
}