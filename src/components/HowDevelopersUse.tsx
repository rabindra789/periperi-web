'use client'

import { useScrollProgress } from '@/lib/useScrollProgress'

const steps = [
  {
    n: '01',
    title: 'Run a scan',
    body: 'Open the command palette and run Periperi: Scan Workspace. You can also turn on scan-on-save to check files as you work.',
    mock: (
      <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2.5">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-accent)]">›</span>
          <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-primary)]">
            Periperi: Scan Workspace
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden bg-[var(--color-border)]">
          <span className="ed-scan-bar block h-full w-1/3 bg-[var(--color-accent)]" />
        </div>
      </div>
    ),
  },
  {
    n: '02',
    title: 'Check the findings',
    body: 'Click any finding to see why it was flagged, where it appears, and how serious the risk is.',
    mock: (
      <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-severity-high)]" aria-hidden="true" />
          <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-primary)]">MD5</span>
          <span className="ml-auto font-[var(--font-mono)] text-[10px] uppercase text-[var(--color-severity-high)]">
            High
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-severity-medium)]" aria-hidden="true" />
          <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-primary)]">PBKDF2</span>
          <span className="ml-auto font-[var(--font-mono)] text-[10px] uppercase text-[var(--color-severity-medium)]">
            Medium
          </span>
        </div>
      </div>
    ),
  },
  {
    n: '03',
    title: 'Export your report',
    body: 'Review items in the Problems panel or export a complete Cryptographic Bill of Materials as JSON.',
    mock: (
      <div className="flex items-center gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-2.5">
        <span className="font-[var(--font-mono)] text-[12px] text-[var(--color-text-secondary)]">{'{ }'}</span>
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-primary)]">
          ecdat-cbom.json
        </span>
      </div>
    ),
  },
]

export default function HowDevelopersUse() {
  // The connector line draws itself as the section scrolls into view, and
  // each step's marker lights up in turn.
  const sectionRef = useScrollProgress<HTMLElement>({ mode: 'enter', stopRatio: 0.45 })

  return (
    <section
      ref={sectionRef}
      className="section scroll-story border-t border-[var(--color-border)]"
      aria-labelledby="workflow-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="kicker mb-2">Workflow</p>
          <h2
            id="workflow-heading"
            className="font-[var(--font-grotesk)] text-[clamp(1.9rem,3.4vw,2.875rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[var(--color-text-primary)]"
          >
            How developers use Periperi
          </h2>
          <p className="mt-4 font-[var(--font-sans)] text-[1rem] leading-[1.65] text-[var(--color-text-secondary)]">
            Three moves, entirely inside the editor you already use. Nothing to host, nothing to
            sign up for.
          </p>
        </div>

        <div className="relative">
          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-10">
            {steps.map((step, i) => (
              <li key={step.n} className="relative flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background-secondary)] font-[var(--font-mono)] text-[11px] font-semibold text-[var(--color-accent)]">
                    {/* Accent ring that lights up as user scrolls through */}
                    <span
                      className="ed-lit absolute inset-[-1px] rounded-full border-2 border-[var(--color-accent)]"
                      style={{ '--i': i / steps.length } as React.CSSProperties}
                      aria-hidden="true"
                    />
                    {step.n}
                  </span>
                  <div className="h-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-[var(--font-grotesk)] text-[1.125rem] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-sm font-[var(--font-sans)] text-[14.5px] leading-[1.65] text-[var(--color-text-secondary)]">
                  {step.body}
                </p>
                <div className="mt-5">{step.mock}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
