'use client'

import { useRef, useState } from 'react'
import { useScrollProgress } from '@/lib/useScrollProgress'
import EditorDemo from './EditorDemo'

interface Stage {
  at: number
  title: string
  body: string
  focusId: string
}

// The scroll narrative: scan → focus a risky line → read the evidence →
// act on the recommendation. Each stage owns a progress window and the
// finding the demo should focus while it is active.
const STAGES: Stage[] = [
  {
    at: 0,
    title: 'Scan your code',
    body: 'Periperi runs locally on your machine. Your source code, config files, and keys never leave your computer.',
    focusId: 'md5',
  },
  {
    at: 0.32,
    title: 'Check the context',
    body: 'An outdated hash in a comment is harmless, but one used in live authentication is a real risk. Periperi tells them apart.',
    focusId: 'md5',
  },
  {
    at: 0.55,
    title: 'Review the evidence',
    body: 'See the code snippet, rule explanation, and confidence score so you can verify the finding yourself.',
    focusId: 'sha1',
  },
  {
    at: 0.76,
    title: 'Get practical recommendations',
    body: 'Each alert points to safer alternatives and official standards, including post-quantum upgrade targets.',
    focusId: 'rsa2048',
  },
]

function stageFor(p: number) {
  let active = 0
  for (let i = 0; i < STAGES.length; i++) {
    if (p >= STAGES[i].at) active = i
  }
  return active
}

export default function ProductStory() {
  // null until the scroll hook reports progress. The first render (server,
  // no-JS, and the instant before hydration) therefore shows the finished
  // state — nothing is hidden behind an animation.
  const [stage, setStage] = useState<number | null>(null)
  const stageRef = useRef<number | null>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  // Discrete state only: setState fires when the stage index changes, not
  // per frame. CSS handles the continuous parts through --p.
  const sectionRef = useScrollProgress<HTMLElement>({
    mode: 'sticky',
    writeTo: stickyRef,
    onProgress: (p) => {
      const next = stageFor(p)
      if (next !== stageRef.current) {
        stageRef.current = next
        setStage(next)
      }
    },
  })

  // Under reduced motion the hook pins progress to 1 and fires onProgress(1)
  // on mount, which lands on the final stage without a hydration mismatch.
  const active = stage ?? STAGES.length - 1
  const current = STAGES[active]
  const scanning = stage !== null && active === 0
  const revealed = stage === null || active >= 1

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--color-border)]"
      style={{ height: '320vh' }}
      aria-labelledby="product-story-heading"
    >
      <div
        ref={stickyRef}
        className="scroll-story sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-[var(--color-background-secondary)]/40 pt-[var(--header-height)]"
      >
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr] lg:items-center lg:gap-14">
            {/* Captions */}
            <div className="order-last min-w-0 lg:order-first">
              <p className="kicker">
                A finding, end to end
              </p>
              <h2
                id="product-story-heading"
                className="mt-3 font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[var(--color-text-primary)]"
              >
                From a line of code
                <span className="text-[var(--color-accent)]"> to a decision.</span>
              </h2>

              <ol className="mt-7 space-y-4" role="list">
                {STAGES.map((s, i) => {
                  const on = i === active
                  return (
                    <li
                      key={s.title}
                      className="flex gap-3.5 transition-opacity duration-300"
                      style={{ opacity: on ? 1 : 0.38 }}
                      aria-current={on ? 'step' : undefined}
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-300"
                        style={{ background: on ? 'var(--color-accent)' : 'var(--color-border)' }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <h3
                          className="font-[var(--font-grotesk)] text-[15px] font-semibold leading-snug transition-colors duration-300"
                          style={{ color: on ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
                        >
                          {s.title}
                        </h3>
                        <p className="mt-1 font-[var(--font-sans)] text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>

              {/* Stage progress rail — continuous, driven by --p */}
              <div
                className="mt-7 h-px w-full max-w-xs overflow-hidden bg-[var(--color-border)]"
                aria-hidden="true"
              >
                <span className="ed-draw block h-full bg-[var(--color-accent)]" />
              </div>
            </div>

            {/* Demo */}
            <div className="order-first min-w-0 lg:order-last">
              <EditorDemo
                focusId={current.focusId}
                revealed={revealed}
                phaseOverride={scanning ? 'scanning' : 'done'}
              />
              <p className="mt-3 font-[var(--font-sans)] text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                Interactive preview with illustrative data. Click any finding to inspect
                it — scrolling resumes the story. Periperi runs inside your editor and
                keeps your code on your machine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
