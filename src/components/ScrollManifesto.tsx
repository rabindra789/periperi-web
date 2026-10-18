'use client'

import { useRef } from 'react'
import { useScrollProgress } from '@/lib/useScrollProgress'

const STORY_HEADING = ['Evidence', 'over', 'noise.']

const STORY_BODY =
  'Security tools should explain their decisions. Periperi reviews your code context: an old algorithm in a comment or test file is noted as inventory, but that same algorithm used in live code is flagged as a real risk. We show you the exact line, rule, and reasoning every time, so you can decide what needs fixing.'

export default function ScrollManifesto() {
  const storyRef = useRef<HTMLDivElement>(null)
  const sectionRef = useScrollProgress<HTMLElement>({
    mode: 'sticky',
    writeTo: storyRef,
  })

  const words = STORY_BODY.split(' ')
  const last = words.length - 1

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--color-border)]"
      style={{ height: '240vh' }}
      aria-labelledby="story-heading"
    >
      <div
        ref={storyRef}
        className="scroll-story sticky top-0 h-screen overflow-hidden bg-[var(--color-background)]"
      >
        <div className="container flex h-full flex-col justify-center pt-[var(--header-height)]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
              <p className="kicker mb-4">Our core philosophy</p>
              <p
                className="max-w-2xl font-[var(--font-sans)] text-[clamp(1.125rem,1.8vw,1.45rem)] font-normal leading-[1.7] text-[var(--color-text-primary)]"
              >
                {words.map((word, i) => (
                  <span
                    key={`${i}-${word}`}
                    className="sw transition-opacity duration-150"
                    style={{ '--i': i / last } as React.CSSProperties}
                  >
                    {word}
                    {i < last ? ' ' : ''}
                  </span>
                ))}
              </p>
            </div>

            <div className="order-first text-left lg:order-last lg:text-right">
              <h2
                id="story-heading"
                className="scroll-story-heading font-[var(--font-grotesk)] text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.035em] text-[var(--color-accent)]"
              >
                {STORY_HEADING.join(' ')}
              </h2>
            </div>
          </div>
        </div>

        {/* Scroll-rail on the scrollbar side */}
        <div
          className="absolute top-1/2 right-4 hidden h-40 w-px -translate-y-1/2 overflow-hidden bg-[var(--color-border)] lg:block"
          aria-hidden="true"
        >
          <span className="absolute left-0 top-0 w-px bg-[var(--color-accent)] scroll-story-rail-fill" />
          <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] scroll-story-rail-dot" />
        </div>
      </div>
    </section>
  )
}
