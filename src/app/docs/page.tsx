import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { LinkButton } from '@/components/Button'

const docs = [
  {
    title: 'README',
    description: 'Project overview, installation, features and usage for the VS Code extension.',
    href: 'https://github.com/rabindra789/periperi/blob/master/README.md',
  },
  {
    title: 'Changelog',
    description: 'Release history, breaking changes and migration notes.',
    href: 'https://github.com/rabindra789/periperi/blob/master/CHANGELOG.md',
  },
  {
    title: 'Accuracy baseline',
    description: 'Detection accuracy methodology and synthetic corpus metrics.',
    href: 'https://github.com/rabindra789/periperi/blob/master/docs/ACCURACY_BASELINE.md',
  },
  {
    title: 'Review 0.3.3',
    description: 'Code review and quality assessment documentation.',
    href: 'https://github.com/rabindra789/periperi/blob/master/docs/REVIEW_0.3.3.md',
  },
  {
    title: 'Release cleanup',
    description: 'Release management and cleanup procedures.',
    href: 'https://github.com/rabindra789/periperi/blob/master/docs/RELEASE_CLEANUP.md',
  },
]

export default function DocsPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        {/* Hero */}
        <section
          className="border-b border-[var(--color-border)] pt-[calc(var(--header-height)+4rem)] pb-12"
          aria-labelledby="docs-heading"
        >
          <div className="container">
            <div className="max-w-3xl">
              <Reveal>
                <h1
                  id="docs-heading"
                  className="balance font-[var(--font-grotesk)] text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-[var(--color-text-primary)]"
                >
                  Documentation.
                </h1>
              </Reveal>
              <Reveal delay={60}>
                <p className="pretty mt-5 font-[var(--font-sans)] text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  Guides for using Periperi, understanding findings and configuring your
                  workflow. Everything here lives in the repository, so it versions with the
                  code it describes.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Documents — a scannable list, not a card grid */}
        <section className="section" aria-labelledby="resources-heading">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2
                  id="resources-heading"
                  className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
                >
                  The documents.
                </h2>
                <p className="pretty mt-5 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Five tracked documents on GitHub. Each link opens the file in the repository,
                  where it can be read, cited and downloaded.
                </p>
              </div>

              <div>
                {docs.map((doc, i) => (
                  <a
                    key={doc.title}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-6 border-t border-[var(--color-border)] py-5 transition-colors first:border-t-0 first:pt-0 hover:text-[var(--color-accent)]"
                  >
                    <span className="min-w-0">
                      <span className="block font-[var(--font-grotesk)] text-lg font-medium text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
                        {doc.title}
                      </span>
                      <span className="mt-1 block font-[var(--font-sans)] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                        {doc.description}
                      </span>
                    </span>
                    <span className="flex flex-shrink-0 items-center gap-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                      {String(i + 1).padStart(2, '0')}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Help */}
        <section
          className="section border-t border-[var(--color-border)] bg-[var(--color-background-secondary)]"
          aria-labelledby="help-heading"
        >
          <div className="container">
            <div className="max-w-2xl">
              <h2
                id="help-heading"
                className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
              >
                Need a hand?
              </h2>
              <p className="pretty mt-5 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                Start with the README, then open an issue if something is unclear or wrong.
                Reports from real workspaces are the most useful feedback the project gets.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton
                  href="https://github.com/rabindra789/periperi/blob/master/README.md"
                  variant="primary"
                  size="md"
                  external
                >
                  Read the README
                </LinkButton>
                <LinkButton
                  href="https://github.com/rabindra789/periperi/issues"
                  variant="outline"
                  size="md"
                  external
                >
                  Report an issue
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
