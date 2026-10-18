import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { LinkButton } from '@/components/Button'

const MARKETPLACE =
  'https://marketplace.visualstudio.com/items?itemName=TheSIxBugs.periperi'

const capabilities = [
  {
    title: 'Contextual findings',
    body: 'Evidence type, validation state, usage context and confidence arrive with every finding, so a comment mention never reads like a live vulnerability.',
  },
  {
    title: 'Inline annotations',
    body: 'Severity and rule IDs sit directly in the editor, next to the line that raised them.',
  },
  {
    title: 'Problems panel integration',
    body: 'Every finding appears in the VS Code Problems list with a full file:line reference.',
  },
  {
    title: 'Scan results explorer',
    body: 'A dedicated view for filtering, sorting and reading finding detail panels.',
  },
  {
    title: 'CBOM export',
    body: 'Export a Cryptographic Bill of Materials as JSON in the ECDAT CBOM Prototype 1.2 schema, for review and records.',
  },
  {
    title: 'Local and private',
    body: 'The engine runs as a local process over stdin/stdout. No backend, no telemetry, no network call — and scanned code or binaries are never executed.',
  },
]

const limitations = [
  'Focuses on patterns in source code, manifests, configs, certificates, keys and container manifests.',
  'Binary and container findings come from fingerprinting and manifest inspection, not execution or disassembly.',
  'Multi-line docstrings and cross-function spans are approximated.',
  'Binary findings are low severity and unresolved.',
  'Accuracy metrics are from synthetic test fixtures only, not real-world claims.',
  'Private key critical findings require parseable key material.',
]

export default function VSCodePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        {/* Hero */}
        <section
          className="border-b border-[var(--color-border)] pt-[calc(var(--header-height)+4rem)] pb-14"
          aria-labelledby="vscode-heading"
        >
          <div className="container">
            <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <span className="inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-1">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[var(--color-severity-low)]"
                      aria-hidden="true"
                    />
                    <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                      VS Code extension · v0.4.0 · Available
                    </span>
                  </span>
                </Reveal>
                <Reveal delay={60}>
                  <h1
                    id="vscode-heading"
                    className="balance mt-6 font-[var(--font-grotesk)] text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-[var(--color-text-primary)]"
                  >
                    Periperi for
                    <span className="text-[var(--color-accent)]"> VS Code.</span>
                  </h1>
                </Reveal>
                <Reveal delay={120}>
                  <p className="pretty mt-5 max-w-xl font-[var(--font-sans)] text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    Security scanning with contextual findings, classical and post-quantum risk,
                    directly in your editor. Nothing to host, nothing to sign up for.
                  </p>
                </Reveal>
                <Reveal delay={180}>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <LinkButton href={MARKETPLACE} variant="primary" size="lg" external>
                      Install for VS Code
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </LinkButton>
                    <a
                      href="https://github.com/rabindra789/periperi/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border-b border-[var(--color-border)] pb-1 font-[var(--font-sans)] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      Download VSIX from Releases
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={120}>
                  <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
                    <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      In the editor
                    </p>
                    <ul className="mt-4 space-y-3" role="list">
                      {[
                        ['Command palette', 'Scan Current File · Scan Workspace · Scan Artifact · Export CBOM'],
                        ['Diagnostics', 'Inline squiggles and Problems-panel entries with file:line'],
                        ['Status bar', 'A running findings summary, updated after every scan'],
                        ['Scan on save', 'Optional, on by default'],
                      ].map(([term, detail]) => (
                        <li key={term} className="border-t border-[var(--color-border)] pt-3 first:border-t-0 first:pt-0">
                          <p className="font-[var(--font-desk)] text-sm font-medium text-[var(--color-text-primary)]">
                            {term}
                          </p>
                          <p className="mt-0.5 font-[var(--font-mono)] text-[11.5px] leading-relaxed text-[var(--color-text-secondary)]">
                            {detail}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section
          className="section border-b border-[var(--color-border)]"
          aria-labelledby="capabilities-heading"
        >
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2
                  id="capabilities-heading"
                  className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
                >
                  Built for the
                  <span className="text-[var(--color-accent)]"> developer workflow.</span>
                </h2>
                <p className="pretty mt-5 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                  The extension wraps a local detection engine in the surfaces you already use:
                  diagnostics, the Problems panel, a results explorer and the command palette.
                </p>
              </div>

              <div className="ed-stagger scroll-story">
                {capabilities.map((cap, i) => (
                  <article
                    key={cap.title}
                    className="border-t border-[var(--color-border)] py-5 first:pt-0"
                    style={{ '--i': i / capabilities.length } as React.CSSProperties}
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

        {/* Limitations */}
        <section className="section" aria-labelledby="limitations-heading">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <h2
                  id="limitations-heading"
                  className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
                >
                  What Periperi does
                  <span className="text-[var(--color-accent)]"> and does not do.</span>
                </h2>
                <p className="pretty mt-5 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Stated plainly, so the tool can be trusted where it is strong and not asked
                  to do what it cannot.
                </p>
              </div>

              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6 md:p-8">
                <ul className="space-y-3" role="list">
                  {limitations.map((limitation) => (
                    <li
                      key={limitation}
                      className="flex items-start gap-3 font-[var(--font-sans)] text-[15px] leading-relaxed text-[var(--color-text-secondary)]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 flex-shrink-0 text-[var(--color-accent)]" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
