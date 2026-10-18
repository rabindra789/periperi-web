'use client'

import { useScrollProgress } from '@/lib/useScrollProgress'

interface CodeToken {
  text: string
  tone: 'plain' | 'com' | 'bi' | 'fn'
  mark?: boolean
}

interface EvidenceCase {
  id: string
  label: string
  code: CodeToken[]
  severity: string
  severityLabel: string
  usage: string
  state: string
  note: string
}

const cases: EvidenceCase[] = [
  {
    id: 'comment',
    label: 'In a comment',
    code: [
      { text: '    ', tone: 'plain' as const },
      { text: '# MD5 kept as a cache key for older clients', tone: 'com' as const },
    ],
    severity: 'info',
    severityLabel: 'Info',
    usage: 'comment',
    state: 'candidate',
    note: 'Recorded as inventory, not a vulnerability. The token is a mention, not usage.',
  },
  {
    id: 'code',
    label: 'In active code',
    code: [
      { text: '    return ', tone: 'plain' as const },
      { text: 'hashlib', tone: 'bi' as const },
      { text: '.', tone: 'plain' as const },
      { text: 'md5', tone: 'fn' as const, mark: true },
      { text: '(payload).hexdigest()', tone: 'plain' as const },
    ],
    severity: 'high',
    severityLabel: 'High',
    usage: 'code',
    state: 'contextually-risky',
    note: 'Kept at full severity. The primitive is deprecated and sits in first-party source.',
  },
]

const TONE: Record<string, string> = {
  plain: 'var(--color-text-primary)',
  com: '#9C9E95',
  bi: '#5E7A86',
  fn: '#8A6D3B',
}

export default function EvidenceInContext() {
  // 'enter' progress: the section brightens the heading and activates the
  // two cards in turn as it travels into view. Cards use --i stagger.
  const sectionRef = useScrollProgress<HTMLElement>({ mode: 'enter', stopRatio: 0.35 })

  return (
    <section
      ref={sectionRef}
      className="section scroll-story border-t border-[var(--color-border)]"
      aria-labelledby="evidence-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <h2
              id="evidence-heading"
              className="ed-emphasis font-[var(--font-grotesk)] text-[clamp(1.9rem,3.4vw,2.875rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[var(--color-text-primary)]"
            >
              The same word,
              <span className="text-[var(--color-accent)]"> two different results.</span>
            </h2>
            <p className="mt-5 max-w-md font-[var(--font-sans)] text-[1rem] leading-[1.65] text-[var(--color-text-secondary)]">
              An algorithm name in a comment is just inventory. That same algorithm called in active code is a potential risk. Periperi checks usage context, file roles, and evidence before deciding what to flag.
            </p>

            {/* Two-step micro rail: which case is in focus */}
            <div className="mt-7 hidden items-center gap-3 lg:flex" aria-hidden="true">
              {cases.map((item, i) => (
                <span key={item.id} className="flex items-center gap-3">
                  {i > 0 && <span className="h-px w-10 bg-[var(--color-border)]" />}
                  <span className="flex items-center gap-2">
                    <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-border)]">
                      <span
                        className="ed-lit absolute inset-0 rounded-full bg-[var(--color-accent)]"
                        style={{ '--i': i / cases.length } as React.CSSProperties}
                      />
                    </span>
                    <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                      {item.severityLabel}
                    </span>
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="ed-stagger flex min-w-0 flex-col gap-4">
            {cases.map((item, i) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-background-secondary)]"
                style={{ '--i': i / cases.length } as React.CSSProperties}
              >
                <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-2.5">
                  <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                    {item.label}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 font-[var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-background)]"
                    style={{ background: `var(--color-severity-${item.severity})` }}
                  >
                    {item.severityLabel}
                  </span>
                </div>

                <div className="overflow-x-auto px-4 py-3 font-[var(--font-mono)] text-[12.5px] leading-relaxed">
                  <code className="whitespace-pre">
                    {item.code.map((token, j) => (
                      <span
                        key={j}
                        style={{ color: TONE[token.tone] }}
                        className={
                          token.mark
                            ? 'underline decoration-[var(--color-severity-high)] decoration-2 underline-offset-2'
                            : undefined
                        }
                      >
                        {token.text}
                      </span>
                    ))}
                  </code>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-[var(--color-border)] px-4 py-2.5">
                  <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                    usage context: <span className="text-[var(--color-text-primary)]">{item.usage}</span>
                  </span>
                  <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                    validation state: <span className="text-[var(--color-text-primary)]">{item.state}</span>
                  </span>
                </div>

                <p className="border-t border-[var(--color-border)] px-4 py-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {item.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
