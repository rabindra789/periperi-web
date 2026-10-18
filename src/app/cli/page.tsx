import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { LinkButton } from '@/components/Button'

const intended = [
  {
    title: 'Terminal-first',
    body: 'Scan any directory, git repository or workspace from the command line.',
  },
  {
    title: 'CI/CD ready',
    body: 'Exit codes for gates, severity thresholds and machine-readable outputs.',
  },
  {
    title: 'Machine-readable output',
    body: 'Structured output, including a CBOM, for review and automation.',
  },
  {
    title: 'Large repositories',
    body: 'Designed to handle large workspaces in automated pipelines.',
  },
  {
    title: 'Local execution',
    body: 'Runs entirely locally with no external API calls or telemetry.',
  },
  {
    title: 'Same detection logic',
    body: 'The identical evidence model, severity rules and validation logic as the extension.',
  },
]

// Honest status of the CLI. Nothing here is a released artifact.
const timeline = [
  {
    state: 'done' as const,
    label: 'In planning',
    body: 'Scope and interface sketched against the extension\u2019s engine.',
  },
  {
    state: 'current' as const,
    label: 'In development',
    body: 'Where the CLI sits today. Not published, no package, no install command.',
  },
  {
    state: 'todo' as const,
    label: 'Released',
    body: 'A published package with documented commands and CI guidance.',
  },
]

export default function CLIPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        {/* Hero */}
        <section
          className="border-b border-[var(--color-border)] pt-[calc(var(--header-height)+4rem)] pb-14"
          aria-labelledby="cli-heading"
        >
          <div className="container">
            <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <span className="inline-flex items-center gap-2 border border-dashed border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-1">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[var(--color-severity-info)]"
                      aria-hidden="true"
                    />
                    <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                      Standalone CLI · Planned — not yet released
                    </span>
                  </span>
                </Reveal>
                <Reveal delay={60}>
                  <h1
                    id="cli-heading"
                    className="balance mt-6 font-[var(--font-grotesk)] text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-[var(--color-text-primary)]"
                  >
                    Periperi,
                    <span className="text-[var(--color-accent)]"> in your terminal.</span>
                  </h1>
                </Reveal>
                <Reveal delay={120}>
                  <p className="pretty mt-5 max-w-xl font-[var(--font-sans)] text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    The same detection engine as the VS Code extension, aimed at CI/CD pipelines
                    and headless servers. It is not published yet — this page describes the
                    intended product, not a released one.
                  </p>
                </Reveal>
                <Reveal delay={180}>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <LinkButton
                      href="https://github.com/rabindra789/periperi/issues"
                      variant="primary"
                      size="lg"
                      external
                    >
                      Follow the progress
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </LinkButton>
                    <a
                      href="/vscode"
                      className="group inline-flex items-center gap-2 border-b border-[var(--color-border)] pb-1 font-[var(--font-sans)] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      Use the VS Code extension today
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Status timeline */}
              <div className="lg:col-span-5">
                <Reveal delay={120}>
                  <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
                    <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      Status
                    </p>
                    <ol className="mt-4 space-y-4" role="list">
                      {timeline.map((step) => (
                        <li key={step.label} className="flex gap-3">
                          <span className="mt-1.5 flex-shrink-0">
                            {step.state === 'done' && (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-severity-low)" strokeWidth="2.5" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                            {step.state === 'current' && (
                              <span className="block h-2.5 w-2.5 rounded-full border-2 border-[var(--color-accent)]" aria-hidden="true" />
                            )}
                            {step.state === 'todo' && (
                              <span className="block h-2.5 w-2.5 rounded-full border border-dashed border-[var(--color-border)]" aria-hidden="true" />
                            )}
                          </span>
                          <div className="min-w-0">
                            <p
                              className="font-[var(--font-desk)] text-sm font-medium"
                              style={{
                                color:
                                  step.state === 'current'
                                    ? 'var(--color-accent)'
                                    : 'var(--color-text-primary)',
                              }}
                            >
                              {step.label}
                              {step.state === 'current' && (
                                <span className="ml-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                                  now
                                </span>
                              )}
                            </p>
                            <p className="mt-0.5 font-[var(--font-sans)] text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                              {step.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Intended capabilities */}
        <section
          className="section border-b border-[var(--color-border)]"
          aria-labelledby="intended-heading"
        >
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2
                  id="intended-heading"
                  className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
                >
                  What it is
                  <span className="text-[var(--color-accent)]"> meant to do.</span>
                </h2>
                <p className="pretty mt-5 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Intended capabilities, drawn from the extension&apos;s existing engine. None of
                  this is available as a published package yet.
                </p>
              </div>

              <div className="ed-stagger scroll-story">
                {intended.map((cap, i) => (
                  <article
                    key={cap.title}
                    className="border-t border-[var(--color-border)] py-5 first:pt-0"
                    style={{ '--i': i / intended.length } as React.CSSProperties}
                  >
                    <h3 className="font-[var(--font-grotesk)] text-lg font-medium text-[var(--color-text-primary)]">
                      {cap.title}
                    </h3>
                    <p className="mt-2 font-[var(--font-sans)] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                      {cap.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Honest status note */}
        <section className="section" aria-labelledby="status-heading">
          <div className="container">
            <div className="max-w-3xl">
              <h2
                id="status-heading"
                className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
              >
                Not yet available.
              </h2>
              <p className="pretty mt-5 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                The standalone CLI is in planning and development. It has not been published or
                released as an installer. There are no package names, download links or
                installation commands at this time — any page claiming otherwise would be
                wrong.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton
                  href="https://github.com/rabindra789/periperi/issues"
                  variant="outline"
                  size="md"
                  external
                >
                  Join the discussion
                </LinkButton>
                <LinkButton
                  href="https://github.com/rabindra789/periperi/issues"
                  variant="ghost"
                  size="md"
                  external
                >
                  Request a CLI feature
                </LinkButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
