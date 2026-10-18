'use client'

import { useScrollProgress } from '@/lib/useScrollProgress'

interface Capability {
  title: string
  body: string
  chips?: string[]
}

const capabilities: Capability[] = [
  {
    title: 'Context-first severity',
    body: 'Comments, documentation, and test files are treated as inventory rather than critical vulnerabilities, keeping your alert list relevant.',
    chips: ['evidence type', 'usage context', 'file role', 'validation state', 'confidence'],
  },
  {
    title: 'Clear cryptographic rules',
    body: 'Flags deprecated algorithms, expired certificates, outdated TLS versions, weak keys, and unsafe random generators with straightforward explanations.',
  },
  {
    title: 'Post-quantum migration support',
    body: 'Identifies algorithms vulnerable to quantum threats and points to current NIST and FIPS replacement standards.',
    chips: ['X + Y > Z'],
  },
  {
    title: 'CBOM export',
    body: 'Export a Cryptographic Bill of Materials as JSON whenever you need an inventory for security reviews or audits.',
    chips: ['ECDAT CBOM Prototype 1.2'],
  },
  {
    title: 'Built into your editor',
    body: 'View findings in your code gutter and the VS Code Problems panel without switching tools.',
  },
  {
    title: 'Runs locally',
    body: 'Everything runs on your machine. There is no telemetry, no cloud analysis, and your code never leaves your device.',
  },
  {
    title: 'Backed by standards',
    body: 'Every recommendation references published standards from NIST, RFC, or CISA.',
  },
]

const coverageTags = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'Go',
  'Rust',
  'C / C++',
  'PHP',
  'Ruby',
  'C#',
  'Kotlin',
  'Swift',
  'YAML / JSON',
  'certificates',
  'keys',
  'binaries',
]

export default function Capabilities() {
  // Rows brighten in sequence as the section scrolls into view. No pinning,
  // no word-reveal — just a restrained stagger.
  const sectionRef = useScrollProgress<HTMLElement>({ mode: 'enter', stopRatio: 0.4 })

  return (
    <section
      id="product"
      ref={sectionRef}
      className="section scroll-story border-t border-[var(--color-border)]"
      aria-labelledby="capabilities-heading"
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="kicker mb-2">Capabilities</p>
            <h2
              id="capabilities-heading"
              className="font-[var(--font-grotesk)] text-[clamp(1.9rem,3.4vw,2.875rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[var(--color-text-primary)]"
            >
              What Periperi finds
              <span className="text-[var(--color-accent)]"> and why it matters.</span>
            </h2>
            <p className="mt-5 max-w-md font-[var(--font-sans)] text-[1rem] leading-[1.65] text-[var(--color-text-secondary)]">
              A cryptographic discovery pass over your workspace: what is there, how risky it is,
              and what to do about it.
            </p>
          </div>

          <div className="ed-stagger">
            <div
              className="border-t border-[var(--color-border)] py-5"
              style={{ '--i': 0 } as React.CSSProperties}
            >
              <h3 className="font-[var(--font-grotesk)] text-[1.125rem] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]">
                Broad detection coverage
              </h3>
              <p className="mt-2 font-[var(--font-sans)] text-[14.5px] leading-[1.65] text-[var(--color-text-secondary)]">
                Algorithms, libraries, protocols, keys, certificates and HSM / key-management
                references across common languages, configuration files and artifacts.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" role="list">
                {coverageTags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-sm border border-[var(--color-border)] px-2.5 py-1 font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {capabilities.map((cap, i) => (
              <article
                key={cap.title}
                className="border-t border-[var(--color-border)] py-5"
                style={{ '--i': (i + 1) / (capabilities.length + 1) } as React.CSSProperties}
              >
                <h3 className="font-[var(--font-grotesk)] text-[1.125rem] font-semibold tracking-[-0.015em] text-[var(--color-text-primary)]">
                  {cap.title}
                </h3>
                <p className="mt-2 font-[var(--font-sans)] text-[14.5px] leading-[1.65] text-[var(--color-text-secondary)]">
                  {cap.body}
                </p>
                {cap.chips && (
                  <ul className="mt-3 flex flex-wrap gap-2" role="list">
                    {cap.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-sm bg-[var(--color-background-secondary)] px-2.5 py-1 font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
