import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { LinkButton } from '@/components/Button'

const roadmap = [
  {
    state: 'available' as const,
    title: 'VS Code extension',
    body: 'Available now (v0.4.0). Continuous improvements based on community feedback.',
  },
  {
    state: 'planned' as const,
    title: 'Standalone CLI',
    body: 'Planned. Terminal-first scanning for CI/CD and headless environments.',
  },
  {
    state: 'later' as const,
    title: 'Enhanced detection',
    body: 'Expanded rule coverage, better context classification and reduced false positives.',
  },
  {
    state: 'later' as const,
    title: 'Integration ecosystem',
    body: 'Better IDE integrations, CI actions and tooling ecosystem support.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        {/* Hero */}
        <section
          className="border-b border-[var(--color-border)] pt-[calc(var(--header-height)+4rem)] pb-14"
          aria-labelledby="about-heading"
        >
          <div className="container">
            <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <h1
                    id="about-heading"
                    className="balance font-[var(--font-grotesk)] text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-[var(--color-text-primary)]"
                  >
                    About
                    <span className="text-[var(--color-accent)]"> Periperi.</span>
                  </h1>
                </Reveal>
                <Reveal delay={60}>
                  <p className="pretty mt-5 max-w-xl font-[var(--font-sans)] text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    A developer-focused security scanning tool built around one idea: a finding
                    is only useful if you can see the evidence behind it.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose */}
        <section className="section" aria-labelledby="purpose-heading">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2
                  id="purpose-heading"
                  className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
                >
                  Making findings
                  <span className="text-[var(--color-accent)]"> actionable.</span>
                </h2>
              </div>

              <div className="max-w-2xl space-y-6">
                <p className="font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Periperi aims to reduce security finding noise by providing rich context:
                  evidence type, validation state, usage context and confidence reasoning.
                  Instead of just &quot;MD5 found&quot;, Periperi tells you if it&apos;s in
                  active first-party code, a comment, documentation, a vendored dependency or a
                  configuration file.
                </p>
                <p className="font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                  That context is what makes triage fast. Real risks rise to the top; mentions
                  and inventory stay where they belong. The reasoning ships with every rating,
                  so a result can be argued with rather than trusted blindly.
                </p>
                <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                  Local-only · No telemetry · No network calls
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section
          className="section border-t border-[var(--color-border)] bg-[var(--color-background-secondary)]"
          aria-labelledby="roadmap-heading"
        >
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <h2
                  id="roadmap-heading"
                  className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
                >
                  What&apos;s next.
                </h2>
                <p className="pretty mt-5 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                  The current product, and the direction beyond it.
                </p>
              </div>

              <ol className="space-y-5" role="list">
                {roadmap.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-2 flex-shrink-0">
                      {item.state === 'available' && (
                        <span className="block h-2 w-2 rounded-full bg-[var(--color-severity-low)]" aria-hidden="true" />
                      )}
                      {item.state === 'planned' && (
                        <span className="block h-2 w-2 rounded-full bg-[var(--color-severity-info)]" aria-hidden="true" />
                      )}
                      {item.state === 'later' && (
                        <span className="block h-2 w-2 rounded-full bg-[var(--color-border)]" aria-hidden="true" />
                      )}
                    </span>
                    <div className="min-w-0 border-t border-[var(--color-border)] pt-1">
                      <h3 className="font-[var(--font-grotesk)] text-lg font-medium text-[var(--color-text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-[var(--font-sans)] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="section" aria-labelledby="community-heading">
          <div className="container">
            <div className="max-w-2xl">
              <h2
                id="community-heading"
                className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
              >
                Community-driven.
              </h2>
              <p className="pretty mt-5 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                The Periperi source code is publicly available on GitHub for review, and
                contributions are welcome.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton
                  href="https://github.com/rabindra789/periperi"
                  variant="primary"
                  size="md"
                  external
                >
                  View source on GitHub
                </LinkButton>
                <LinkButton
                  href="https://github.com/rabindra789/periperi/contribute"
                  variant="outline"
                  size="md"
                  external
                >
                  Contribute
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
