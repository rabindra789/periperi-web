'use client'

import { useEffect, useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  /** Stagger in ms */
  delay?: number
  className?: string
  /** Start visible (used when the element is above the fold on load). */
  immediate?: boolean
  style?: React.CSSProperties
}

/**
 * One-shot entrance transition driven by IntersectionObserver.
 *
 * Content is NEVER hidden by default: the hidden state only applies once
 * `html[data-motion="on"]` has been set by the client, so no-JS renders,
 * reduced-motion users and search engines always see the finished state.
 * With reduced motion the element is simply visible with no transition.
 */
export default function Reveal({ children, delay = 0, className = '', immediate = false, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.classList.add('is-in')
      return
    }
    document.documentElement.setAttribute('data-motion', 'on')

    if (immediate) {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-in')
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [immediate])

  return (
    <div
      ref={ref}
      className={`reveal-item ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}
