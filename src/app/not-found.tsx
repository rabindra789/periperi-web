import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LinkButton } from '@/components/Button'

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        role="main"
        className="flex min-h-[70vh] items-center pt-[var(--header-height)]"
      >
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              Error 404
            </p>
            <h1 className="balance mt-4 font-[var(--font-grotesk)] text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--color-text-primary)]">
              This page
              <span className="text-[var(--color-accent)]"> does not exist.</span>
            </h1>
            <p className="pretty mt-5 max-w-lg font-[var(--font-sans)] text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The page you are looking for has been moved, renamed, or never existed. The links
              below are the reliable ones.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <LinkButton href="/" variant="primary" size="lg">
                Return home
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </LinkButton>
              <a
                href="/docs"
                className="group inline-flex items-center gap-2 border-b border-[var(--color-border)] pb-1 font-[var(--font-sans)] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Documentation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="https://github.com/rabindra789/periperi"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border-b border-[var(--color-border)] pb-1 font-[var(--font-sans)] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                GitHub repository
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            <div className="mt-12 border-t border-[var(--color-border)] pt-6">
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                Or jump to a section
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  ['/#product', 'Product'],
                  ['/vscode', 'VS Code'],
                  ['/cli', 'CLI status'],
                  ['/docs', 'Docs'],
                  ['/about', 'About'],
                  ['/fonts', 'Fonts'],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    className="border-b border-transparent pb-0.5 font-[var(--font-desk)] text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
