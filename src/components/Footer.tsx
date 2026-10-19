import Link from 'next/link'
import Wordmark from './Wordmark'

const currentYear = new Date().getFullYear()

const footerLinks = {
  product: [
    { href: '/vscode', label: 'VS Code Extension', external: false },
    { href: '/cli', label: 'Standalone CLI', external: false },
    { href: '/docs', label: 'Documentation', external: false },
    { href: 'https://github.com/rabindra789/periperi/releases', label: 'Releases', external: true },
  ],
  resources: [
    { href: 'https://github.com/rabindra789/periperi', label: 'Source Code', external: true },
    { href: 'https://github.com/rabindra789/periperi/issues', label: 'Report Issue', external: true },
    { href: 'https://github.com/rabindra789/periperi/contribute', label: 'Contributing', external: true },
    { href: '/docs', label: 'Documentation', external: false },
  ],
  repository: [
    { href: 'https://github.com/rabindra789/periperi/blob/master/README.md', label: 'README', external: true },
    { href: 'https://github.com/rabindra789/periperi/blob/master/CHANGELOG.md', label: 'Changelog', external: true },
    { href: 'https://github.com/rabindra789/periperi/blob/master/docs/ACCURACY_BASELINE.md', label: 'Accuracy Baseline', external: true },
    { href: 'https://marketplace.visualstudio.com/items?itemName=TheSIxBugs.periperi', label: 'Marketplace', external: true },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background-secondary)]" role="contentinfo">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center" aria-label="Periperi home">
              <Wordmark />
            </Link>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xs">
              Cryptographic discovery with contextual, evidence-backed findings and post-quantum risk — entirely on your machine.
            </p>
          </div>

          <nav aria-label="Product links">
            <h3 className="font-[var(--font-desk)] font-medium text-[var(--color-text-primary)] text-sm uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm"
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resource links">
            <h3 className="font-[var(--font-desk)] font-medium text-[var(--color-text-primary)] text-sm uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm flex items-center gap-1"
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                    {link.external && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Repository links">
            <h3 className="font-[var(--font-desk)] font-medium text-[var(--color-text-primary)] text-sm uppercase tracking-wider mb-4">Repository</h3>
            <ul className="space-y-2">
              {footerLinks.repository.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 md:mt-14 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-secondary)] text-sm">
            © {currentYear} Periperi. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/rabindra789/periperi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            <Link
              href="https://marketplace.visualstudio.com/items?itemName=TheSIxBugs.periperi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="VS Code Marketplace"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wider">Support this project</p>
          <iframe
            title="Buy me a coffee"
            srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8" /></head><body style="margin:0;display:flex;justify-content:center;align-items:center;overflow:hidden;background:transparent;"><script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="rabindra789" data-color="#FFDD00" data-emoji="☕" data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff"></script></body></html>`}
            className="h-[60px] w-[230px] border-0"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  )
}