'use client'

import { useEffect, useRef, useState } from 'react'
import { LinkButton } from './Button'
import EditorDemo from './EditorDemo'
import Mark from './Mark'
import Wordmark from './Wordmark'

const MARKETPLACE =
  'https://marketplace.visualstudio.com/items?itemName=TheSIxBugs.periperi'

const ENTRANCE_SEEN_KEY = 'periperi-hero-entrance-seen'

const badgeText = 'VS Code extension · v0.4.0 · Free & Local'
const headingText = 'Security insights right where you write code.'
const paragraphText = `Periperi finds cryptographic algorithms, keys, certificates, and libraries in your projects. It shows you the evidence behind every finding, so you know what is an actual risk and what is just a false alarm.`

type Phase = 'splash' | 'fly' | 'reveal' | 'done'

export default function Hero() {
  const demoRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('done')
  const [contentVisible, setContentVisible] = useState(false)

  // On mount: decide whether to play entrance animation
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem(ENTRANCE_SEEN_KEY)

    if (reduce || seen) {
      setPhase('done')
      setContentVisible(true)
      return
    }

    // Reset to splash, then sequence through phases
    setPhase('splash')
    setContentVisible(false)

    let cancelled = false

    // Phase 1: Show centered logo for 900ms
    const t1 = setTimeout(() => {
      if (cancelled) return
      setPhase('fly') // Logo flies up

      // Phase 2: Logo fly animation plays for 500ms, then show hero content
      const t2 = setTimeout(() => {
        if (cancelled) return
        setPhase('reveal')

        // Phase 3: Content fades in; after a short delay mark as done
        const t3 = setTimeout(() => {
          if (cancelled) return
          setPhase('done')
          setContentVisible(true)
          sessionStorage.setItem(ENTRANCE_SEEN_KEY, 'true')
        }, 100)

        // Slight stagger before marking content visible to let the transition start
        const t4 = setTimeout(() => {
          if (cancelled) return
          setContentVisible(true)
        }, 80)

        return () => {
          clearTimeout(t3)
          clearTimeout(t4)
        }
      }, 480)

      return () => clearTimeout(t2)
    }, 900)

    return () => {
      cancelled = true
      clearTimeout(t1)
    }
  }, [])

  // Parallax effect on scroll
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || phase !== 'done') return

    const onScroll = () => {
      const el = demoRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vpH = window.innerHeight
      if (rect.bottom < 0 || rect.top > vpH) return
      const progress = 1 - Math.max(0, Math.min(1, rect.bottom / vpH))
      const translateY = Math.round(progress * -60)
      el.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [phase])

  // Splash: full-screen centered logo
  if (phase === 'splash') {
    return (
      <section
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-background)]"
        aria-labelledby="hero-heading"
        aria-live="polite"
      >
        <div
          className="flex flex-col items-center gap-5"
          style={{
            animation: 'heroSplashIn 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <Mark className="text-[var(--color-accent)]" size={72} />
          <Wordmark className="text-[var(--color-text-primary)]" size="xl" />
        </div>
      </section>
    )
  }

  // Fly: logo animates upward / shrinks
  if (phase === 'fly') {
    return (
      <section
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-background)]"
        aria-labelledby="hero-heading"
      >
        <div
          className="flex flex-col items-center gap-5"
          style={{
            transform: 'translateY(-45vh) scale(0.42)',
            opacity: 0,
            transition: 'transform 480ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-in 200ms',
          }}
        >
          <Mark className="text-[var(--color-accent)]" size={72} />
          <Wordmark className="text-[var(--color-text-primary)]" size="xl" />
        </div>
      </section>
    )
  }

  // Reveal + Done: Full hero content
  const isRevealing = phase === 'reveal'

  return (
    <section
      className="relative overflow-hidden border-b border-[var(--color-border)] pt-[var(--header-height)]"
      aria-labelledby="hero-heading"
    >
      <div className="container">
        <div className="grid gap-y-10 py-8 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:py-14">
          {/* Left column — copy */}
          <div className="lg:col-span-5">
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? 'translateY(0)' : 'translateY(18px)',
                transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-1">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-severity-low)]"
                  aria-hidden="true"
                />
                <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                  {badgeText}
                </span>
              </span>

              {/* Heading */}
              <h1
                id="hero-heading"
                className="mt-6 font-[var(--font-grotesk)] text-[clamp(2.5rem,4.5vw,4.125rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[var(--color-text-primary)]"
              >
                {headingText}
              </h1>

              {/* Body */}
              <p className="mt-5 max-w-lg font-[var(--font-sans)] text-[1.0625rem] leading-[1.65] text-[var(--color-text-secondary)] lg:text-[1.125rem]">
                {paragraphText}
              </p>

              {/* CTAs — staggered slightly after body */}
              <div
                className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transform: contentVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 120ms',
                }}
              >
                <LinkButton href={MARKETPLACE} variant="primary" size="lg" external>
                  Install for VS Code
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </LinkButton>
                <a
                  href="/docs"
                  className="group inline-flex items-center gap-2 border-b border-[var(--color-border)] pb-1 font-[var(--font-sans)] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  Read the documentation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              {/* Trust note — staggered after CTAs */}
              <p
                className="mt-7 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]"
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 220ms',
                }}
              >
                Runs locally · No telemetry · No network calls
              </p>
            </div>
          </div>

          {/* Right column — demo */}
          <div
            className="lg:col-span-7"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms',
            }}
          >
            <div ref={demoRef} className="will-change-transform">
              <EditorDemo />
            </div>
            <p
              className="mt-3 font-[var(--font-sans)] text-[12px] leading-relaxed text-[var(--color-text-secondary)]"
              style={{
                opacity: contentVisible ? 1 : 0,
                transition: 'opacity 400ms ease 350ms',
              }}
            >
              Interactive preview with illustrative data. Periperi runs inside your editor and
              keeps your code on your machine.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}