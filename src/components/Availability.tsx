import { LinkButton } from './Button'
import Reveal from './Reveal'

const vscodeFeatures = [
  'Scan the current file, the whole workspace, or a binary, certificate or key artifact',
  'Inline diagnostics and a Problems-panel list with file:line locations',
  'Status-bar summary with a running findings count',
  'Optional scan-on-save to keep results current',
  'CBOM export from the command palette',
]

export default function Availability() {
  return (
    <section
      className="section border-t border-[var(--color-border)]"
      aria-labelledby="availability-heading"
    >
      <div className="container">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="kicker mb-2">Availability</p>
            <h2
              id="availability-heading"
              className="font-[var(--font-grotesk)] text-[clamp(1.9rem,3.4vw,2.875rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[var(--color-text-primary)]"
            >
              Available today, with more on the way.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          <article className="flex flex-col rounded-sm border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-7 md:p-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 border border-[var(--color-severity-low)]/40 bg-[var(--color-severity-low)]/10 px-2.5 py-1 font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-severity-low)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-severity-low)]" aria-hidden="true" />
                Available now
              </span>
              <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                v0.4.0 · VS Code Marketplace
              </span>
            </div>

            <h3 className="font-[var(--font-grotesk)] text-2xl font-bold tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[1.75rem]">
              VS Code extension
            </h3>
            <p className="mt-3 max-w-xl font-[var(--font-sans)] text-[15px] leading-[1.65] text-[var(--color-text-secondary)]">
              The current product. Scan inside your editor and see findings where you work —
              inline, in the Problems panel, and in a dedicated report view.
            </p>

            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2" role="list">
              {vscodeFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 font-[var(--font-sans)] text-[15px] text-[var(--color-text-secondary)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 flex-shrink-0 text-[var(--color-accent)]" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <LinkButton
                href="https://marketplace.visualstudio.com/items?itemName=TheSIxBugs.periperi"
                variant="primary"
                size="lg"
                external
              >
                Install for VS Code
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </LinkButton>
            </div>
          </article>

          <article className="flex flex-col rounded-sm border border-dashed border-[var(--color-border)] p-7 md:p-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 border border-[var(--color-border)] px-2.5 py-1 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-severity-info)]" aria-hidden="true" />
                Planned
              </span>
            </div>

            <h3 className="font-[var(--font-grotesk)] text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text-primary)]">
              Standalone CLI
            </h3>
            <p className="mt-3 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
              The same detection engine for pipelines and headless servers.
            </p>
            <p className="mt-4 font-[var(--font-sans)] text-sm leading-relaxed text-[var(--color-text-secondary)]">
              In planning, not yet released. There is no published package or install command
              yet — follow along or help shape it.
            </p>

            <div className="mt-auto pt-8">
              <LinkButton href="/cli" variant="outline" size="md">
                CLI status &amp; roadmap
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </LinkButton>
            </div>
          </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
