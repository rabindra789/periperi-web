import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'

const fontSpecimens = [
  { name: 'NANO', weight: 'Light', cssClass: 'font-nano', style: { fontWeight: '300' }, role: 'Secondary editorial headlines and large supporting statements', render: 'Space Grotesk (placeholder)' },
  { name: 'ACME', weight: 'Light', cssClass: 'font-acme', style: { fontWeight: '300' }, role: 'Explanatory section headings and selected feature introductions', render: 'Space Grotesk (placeholder)' },
  { name: 'APEX', weight: 'Bold', cssClass: 'font-apex', style: { fontWeight: '700' }, role: 'Oversized hero headlines and major campaign-style headings', render: 'Space Grotesk (placeholder)' },
  { name: 'GEO', weight: 'Light', cssClass: 'font-geo', style: { fontWeight: '300' }, role: 'Short descriptive text and supporting editorial copy', render: 'Inter (placeholder)' },
  { name: 'DESK', weight: 'Medium', cssClass: 'font-desk', style: { fontWeight: '500' }, role: 'Navigation, buttons, labels, and compact interface text', render: 'Inter (placeholder)' },
  { name: 'BITEC', weight: 'Bold', cssClass: 'font-bitec', style: { fontWeight: '700' }, role: 'Short technical emphasis, product labels, and metric typography', render: 'Space Grotesk (placeholder)' },
  { name: 'ARK', weight: 'Bold', cssClass: 'font-ark', style: { fontWeight: '700' }, role: 'Compact display headings or section identifiers', render: 'Space Grotesk (placeholder)' },
  { name: 'KAYON', weight: 'Light', cssClass: 'font-kayon', style: { fontWeight: '300' }, role: 'Large lightweight text treatments, pull quotes, or secondary hero copy', render: 'Space Grotesk (placeholder)' },
]

const researchNotes = [
  { name: 'NANO', finding: 'Multiple unrelated free fonts share this name (e.g. Axel Pfaender, 1999; Harrison Luke). No single authoritative, licensed webfont identified.' },
  { name: 'ACME', finding: 'A Google Font "Acme" exists (SIL OFL) but ships a single regular weight — does not match the requested "Light" weight.' },
  { name: 'APEX', finding: 'Commercial and ambiguous: TypeType, Fontiko, and Oracle APEX icon set all use the name. No licensed single source confirmed.' },
  { name: 'GEO', finding: 'A Google Font "Geo" exists (SIL OFL) but is a single-weight display face; role match unconfirmed.' },
  { name: 'DESK', finding: 'No authoritative typeface identified under this name.' },
  { name: 'BITEC', finding: 'No authoritative typeface identified under this name; possibly a commercial foundry release.' },
  { name: 'ARK', finding: 'Commercial and ambiguous (TypeType tag). No licensed source confirmed.' },
  { name: 'KAYON', finding: 'No authoritative typeface identified; possibly a commercial release.' },
]

export default function FontSpecimenPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        {/* Hero */}
        <section
          className="border-b border-[var(--color-border)] pt-[calc(var(--header-height)+4rem)] pb-12"
          aria-labelledby="specimen-heading"
        >
          <div className="container">
            <div className="max-w-3xl">
              <Reveal>
                <h1
                  id="specimen-heading"
                  className="balance font-[var(--font-grotesk)] text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-[var(--color-text-primary)]"
                >
                  Font
                  <span className="text-[var(--color-accent)]"> specimen.</span>
                </h1>
              </Reveal>
              <Reveal delay={60}>
                <p className="pretty mt-5 font-[var(--font-sans)] text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  A comparison sheet for the eight requested typefaces. None could be verified
                  as a specific, legally embeddable webfont, so the site currently renders them
                  with documented open-source placeholders.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-6 flex max-w-2xl items-start gap-3 border border-[var(--color-severity-medium)]/40 bg-[var(--color-severity-medium)]/5 px-4 py-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-severity-medium)" strokeWidth="2" className="mt-0.5 flex-shrink-0" aria-hidden="true">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <p className="font-[var(--font-sans)] text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    <span className="font-medium text-[var(--color-text-primary)]">
                      No licensed font files are bundled.
                    </span>{' '}
                    The names below are the requested references only. Display roles render with
                    Space Grotesk; text roles render with Inter — both self-hosted under the SIL
                    Open Font License.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Specimens */}
        <section className="section" aria-labelledby="font-list-heading">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <h2
                id="font-list-heading"
                className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
              >
                Eight styles.
              </h2>
            </div>

            <div>
              {fontSpecimens.map((font) => (
                <article
                  key={font.name}
                  className="border-t border-[var(--color-border)] py-8 first:border-t-0 first:pt-0"
                >
                  <div className="mb-4 flex flex-wrap items-baseline gap-3">
                    <span
                      className={`${font.cssClass} text-[2.5rem] leading-none text-[var(--color-text-primary)] md:text-[3.5rem]`}
                      style={font.style}
                    >
                      {font.name}
                    </span>
                    <span className="font-[var(--font-desk)] text-sm font-medium text-[var(--color-accent)]">
                      {font.weight}
                    </span>
                    <span className="border border-[var(--color-border)] px-2 py-1 font-[var(--font-sans)] text-xs text-[var(--color-text-secondary)]">
                      Rendering: {font.render}
                    </span>
                  </div>

                  <div
                    className={`${font.cssClass} mb-4 break-all text-[var(--color-text-primary)]`}
                    style={font.style}
                  >
                    <p className="mb-2 break-all text-lg sm:text-2xl md:text-3xl">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                    <p className="mb-2 break-all text-lg sm:text-2xl md:text-3xl">abcdefghijklmnopqrstuvwxyz</p>
                    <p className="mb-2 break-all text-lg sm:text-2xl md:text-3xl">0123456789 !@#$%^&amp;*()_+-=[]&#123;&#125;|;&apos;:&quot;,&lt;&gt;./?</p>
                    <p className="break-words text-lg text-[var(--color-text-secondary)] sm:text-xl md:text-2xl">
                      Security findings with evidence — Know what your code is carrying.
                    </p>
                  </div>

                  <div className="border-t border-[var(--color-border)] pt-4">
                    <p className="font-[var(--font-sans)] text-sm text-[var(--color-text-secondary)]">
                      <span className="font-[var(--font-desk)] font-medium text-[var(--color-text-primary)]">
                        Proposed role:
                      </span>{' '}
                      {font.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Research notes */}
        <section
          className="section border-t border-[var(--color-border)] bg-[var(--color-background-secondary)]"
          aria-labelledby="research-heading"
        >
          <div className="container">
            <div className="mb-8 max-w-2xl">
              <h2
                id="research-heading"
                className="balance font-[var(--font-grotesk)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)]"
              >
                Verification status.
              </h2>
              <p className="pretty mt-4 font-[var(--font-sans)] text-base leading-relaxed text-[var(--color-text-secondary)]">
                What was found when searching for each requested typeface. No unlicensed files
                were downloaded or embedded.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="py-3 pr-6 font-[var(--font-desk)] text-sm font-medium uppercase tracking-wider text-[var(--color-text-primary)]">
                      Name
                    </th>
                    <th className="py-3 font-[var(--font-desk)] text-sm font-medium uppercase tracking-wider text-[var(--color-text-primary)]">
                      Finding
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {researchNotes.map((note) => (
                    <tr key={note.name} className="border-b border-[var(--color-border)]/60">
                      <td className="whitespace-nowrap py-3 pr-6 align-top font-[var(--font-mono)] text-sm font-medium text-[var(--color-accent)]">
                        {note.name}
                      </td>
                      <td className="py-3 align-top font-[var(--font-sans)] text-sm text-[var(--color-text-secondary)]">
                        {note.finding}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
