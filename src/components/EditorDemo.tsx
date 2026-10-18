'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Mark from './Mark'

type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info'

interface DemoFinding {
  id: string
  name: string
  ruleId: string
  category: string
  line: number
  severity: Severity
  confidence: number
  confidenceLevel: 'high' | 'medium' | 'low'
  validationState: string
  evidenceType: string
  usageContext: string
  fileRole: string
  evidence: string
  reason: string
  recommendation: string
  reference?: string
  quantum: string
}

// Illustrative findings produced by the real Periperi engine (ECDAT CBOM
// Prototype 1.2) against the sample file below.
const FINDINGS: DemoFinding[] = [
  {
    id: 'md5',
    name: 'MD5',
    ruleId: 'ALGORITHM-MD5',
    category: 'Algorithm',
    line: 14,
    severity: 'high',
    confidence: 0.9,
    confidenceLevel: 'high',
    validationState: 'contextually-risky',
    evidenceType: 'text-pattern',
    usageContext: 'code',
    fileRole: 'first-party-source',
    evidence: 'return hashlib.md5(payload).hexdigest()',
    reason:
      'The detected primitive is deprecated or below modern security expectations. The token sits in active first-party source.',
    recommendation: 'Replace it with SHA-256 or stronger for security-sensitive integrity use.',
    reference: 'NIST SP 800-131A Rev. 2 - MD5 is not approved for digital signature generation',
    quantum: 'not-applicable',
  },
  {
    id: 'tls10',
    name: 'TLS 1.0',
    ruleId: 'PROTOCOL-TLS-1-0',
    category: 'Protocol',
    line: 24,
    severity: 'high',
    confidence: 0.82,
    confidenceLevel: 'medium',
    validationState: 'candidate',
    evidenceType: 'text-pattern',
    usageContext: 'string',
    fileRole: 'first-party-source',
    evidence: 'ctx.set_ciphers("TLS 1.0")',
    reason: 'TLS 1.0 and TLS 1.1 are deprecated and should not be enabled.',
    recommendation: 'Disable TLS 1.0 and 1.1 and require TLS 1.2 or 1.3 on both client and server.',
    reference: 'RFC 8996 - TLS 1.0 and 1.1 are deprecated',
    quantum: 'not-applicable',
  },
  {
    id: 'sha1',
    name: 'SHA-1',
    ruleId: 'ALGORITHM-SHA-1',
    category: 'Algorithm',
    line: 29,
    severity: 'high',
    confidence: 0.9,
    confidenceLevel: 'high',
    validationState: 'contextually-risky',
    evidenceType: 'text-pattern',
    usageContext: 'code',
    fileRole: 'first-party-source',
    evidence: 'digest = hashlib.sha1(message).digest()',
    reason: 'The detected primitive is deprecated or below modern security expectations.',
    recommendation: 'Replace it with SHA-256 or stronger for security-sensitive integrity use.',
    reference: 'NIST SP 800-131A Rev. 2 and CISA guidance on SHA-1 collision weaknesses',
    quantum: 'not-applicable',
  },
  {
    id: 'rsa2048',
    name: 'RSA-2048',
    ruleId: 'ALGORITHM-RSA-2048',
    category: 'Algorithm',
    line: 9,
    severity: 'medium',
    confidence: 0.9,
    confidenceLevel: 'high',
    validationState: 'candidate',
    evidenceType: 'text-pattern',
    usageContext: 'code',
    fileRole: 'first-party-source',
    evidence: 'return RSA.generate(2048)',
    reason: 'The configuration is usable in some contexts but needs security review.',
    recommendation:
      'Plan a post-quantum migration for this public-key family; the target is ML-KEM (FIPS 203) for key transport, ML-DSA (FIPS 204) or SLH-DSA (FIPS 205) for signatures.',
    reference: 'NIST SP 800-57 Part 1 Rev. 5 - 2048-bit RSA provides about 112 bits of strength',
    quantum: 'not-applicable (candidate)',
  },
  {
    id: 'pbkdf2',
    name: 'PBKDF2',
    ruleId: 'KEY-DERIVATION-PBKDF2',
    category: 'Key Derivation',
    line: 19,
    severity: 'medium',
    confidence: 0.85,
    confidenceLevel: 'medium',
    validationState: 'candidate',
    evidenceType: 'text-pattern',
    usageContext: 'code',
    fileRole: 'first-party-source',
    evidence: 'return hashlib.pbkdf2_hmac("sha1", secret, salt, 1000)',
    reason: 'Password-based key derivation must use a reviewed KDF with a tuned cost parameter.',
    recommendation:
      'Use Argon2id, scrypt or PBKDF2 with a tuned cost parameter instead of a single-pass hash.',
    reference: 'NIST SP 800-132 - password-based KDFs need a tuned iteration count',
    quantum: 'not-applicable',
  },
  {
    id: 'sha256',
    name: 'SHA-256',
    ruleId: 'ALGORITHM-SHA-256',
    category: 'Algorithm',
    line: 30,
    severity: 'low',
    confidence: 0.9,
    confidenceLevel: 'high',
    validationState: 'candidate',
    evidenceType: 'text-pattern',
    usageContext: 'code',
    fileRole: 'first-party-source',
    evidence: 'return hmac.new(key, digest, hashlib.sha256).digest()',
    reason: 'No immediate classical weakness is identified by the prototype rule set.',
    recommendation:
      'Retain in the CBOM and review when cryptographic policy or threat assumptions change.',
    quantum: 'not-applicable',
  },
  {
    id: 'hmac',
    name: 'HMAC',
    ruleId: 'ALGORITHM-HMAC',
    category: 'Algorithm',
    line: 30,
    severity: 'low',
    confidence: 0.9,
    confidenceLevel: 'high',
    validationState: 'candidate',
    evidenceType: 'text-pattern',
    usageContext: 'code',
    fileRole: 'first-party-source',
    evidence: 'return hmac.new(key, digest, hashlib.sha256).digest()',
    reason: 'No immediate classical weakness is identified by the prototype rule set.',
    recommendation:
      'Retain in the CBOM and review when cryptographic policy or threat assumptions change.',
    quantum: 'not-applicable',
  },
]

type Tok = readonly [text: string, cls: string]
type CodeLine = { n: number; toks: readonly Tok[] }

const TOKEN_COLOR: Record<string, string> = {
  kw: '#A8634B',
  bi: '#5E7A86',
  fn: '#8A6D3B',
  str: '#6F7E45',
  num: '#A8574F',
  com: '#9C9E95',
  cls: '#7E5E86',
  plain: 'var(--color-text-primary)',
}

const p = (text: string): Tok => [text, 'plain']

const CODE: readonly CodeLine[] = [
  { n: 1, toks: [p('import '), ['hashlib', 'bi']] },
  { n: 2, toks: [p('import '), ['hmac', 'bi']] },
  { n: 3, toks: [p('import '), ['ssl', 'bi']] },
  { n: 4, toks: [['from', 'kw'], p(' '), ['Cryptodome.PublicKey', 'bi'], p(' '), ['import', 'kw'], p(' '), ['RSA', 'cls']] },
  { n: 5, toks: [] },
  { n: 6, toks: [] },
  { n: 7, toks: [['def', 'kw'], p(' '), ['create_keypair', 'fn'], p('():')] },
  { n: 8, toks: [p('    '), ['# RSA-2048 identity key', 'com']] },
  {
    n: 9,
    toks: [
      p('    '),
      ['return', 'kw'],
      p(' '),
      ['RSA', 'cls'],
      ['.', 'plain'],
      ['generate', 'fn'],
      p('('),
      ['2048', 'num'],
      p(')'),
    ],
  },
  { n: 10, toks: [] },
  { n: 11, toks: [] },
  {
    n: 12,
    toks: [
      ['def', 'kw'],
      p(' '),
      ['legacy_fingerprint', 'fn'],
      p('(payload: '),
      ['bytes', 'bi'],
      p(') -> '),
      ['str', 'bi'],
      p(':'),
    ],
  },
  { n: 13, toks: [p('    '), ['# MD5 kept as a cache key for older clients', 'com']] },
  {
    n: 14,
    toks: [
      p('    '),
      ['return', 'kw'],
      p(' '),
      ['hashlib', 'bi'],
      ['.', 'plain'],
      ['md5', 'fn'],
      p('(payload)'),
      ['.', 'plain'],
      ['hexdigest', 'fn'],
      p('()'),
    ],
  },
  { n: 15, toks: [] },
  { n: 16, toks: [] },
  {
    n: 17,
    toks: [
      ['def', 'kw'],
      p(' '),
      ['derive_token', 'fn'],
      p('(secret: '),
      ['bytes', 'bi'],
      p(', salt: '),
      ['bytes', 'bi'],
      p(') -> '),
      ['bytes', 'bi'],
      p(':'),
    ],
  },
  { n: 18, toks: [p('    '), ['# PBKDF2 with a low iteration count', 'com']] },
  {
    n: 19,
    toks: [
      p('    '),
      ['return', 'kw'],
      p(' '),
      ['hashlib', 'bi'],
      ['.', 'plain'],
      ['pbkdf2_hmac', 'fn'],
      p('('),
      ['"sha1"', 'str'],
      p(', secret, salt, '),
      ['1000', 'num'],
      p(')'),
    ],
  },
  { n: 20, toks: [] },
  { n: 21, toks: [] },
  {
    n: 22,
    toks: [
      ['def', 'kw'],
      p(' '),
      ['tls_context', 'fn'],
      p('() -> '),
      ['ssl', 'bi'],
      ['.', 'plain'],
      ['SSLContext', 'cls'],
      p(':'),
    ],
  },
  {
    n: 23,
    toks: [
      p('    '),
      ['ctx', 'plain'],
      p(' = '),
      ['ssl', 'bi'],
      ['.', 'plain'],
      ['SSLContext', 'cls'],
      p('('),
      ['ssl', 'bi'],
      ['.', 'plain'],
      ['PROTOCOL_TLS_CLIENT', 'plain'],
      p(')'),
    ],
  },
  {
    n: 24,
    toks: [p('    '), ['ctx', 'plain'], ['.', 'plain'], ['set_ciphers', 'fn'], p('('), ['"TLS 1.0"', 'str'], p(')')],
  },
  { n: 25, toks: [p('    '), ['return', 'kw'], p(' '), ['ctx', 'plain']] },
  { n: 26, toks: [] },
  { n: 27, toks: [] },
  {
    n: 28,
    toks: [
      ['def', 'kw'],
      p(' '),
      ['sign', 'fn'],
      p('(message: '),
      ['bytes', 'bi'],
      p(', key) -> '),
      ['bytes', 'bi'],
      p(':'),
    ],
  },
  {
    n: 29,
    toks: [
      p('    '),
      ['digest', 'plain'],
      p(' = '),
      ['hashlib', 'bi'],
      ['.', 'plain'],
      ['sha1', 'fn'],
      p('(message)'),
      ['.', 'plain'],
      ['digest', 'fn'],
      p('()'),
    ],
  },
  {
    n: 30,
    toks: [
      p('    '),
      ['return', 'kw'],
      p(' '),
      ['hmac', 'bi'],
      ['.', 'plain'],
      ['new', 'fn'],
      p('(key, digest, '),
      ['hashlib', 'bi'],
      ['.', 'plain'],
      ['sha256', 'fn'],
      p(')'),
      ['.', 'plain'],
      ['digest', 'fn'],
      p('()'),
    ],
  },
]

const SEVERITY_LABEL: Record<Severity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  info: 'Info',
}

interface EditorDemoProps {
  /** Scroll-driven focused finding. A user click overrides this until unmounted. */
  focusId?: string
  /** Scroll-driven reveal of the findings list. */
  revealed?: boolean
  /** Scroll-driven scan phase. When provided it wins over the mount animation. */
  phaseOverride?: 'scanning' | 'done'
}

export default function EditorDemo({ focusId, revealed: revealedProp, phaseOverride }: EditorDemoProps = {}) {
  const [phase, setPhase] = useState<'scanning' | 'done'>('done')
  const [revealed, setRevealed] = useState(true)
  const [selectedId, setSelectedId] = useState(FINDINGS[0].id)
  const [userSelected, setUserSelected] = useState(false)
  const started = useRef(false)
  const codeRef = useRef<HTMLDivElement>(null)

  // Scroll drives selection until the user clicks, which takes over.
  const effectiveSelectedId = userSelected ? selectedId : (focusId ?? selectedId)
  const effectiveRevealed = revealedProp ?? revealed
  const effectivePhase = phaseOverride ?? phase

  const selected = FINDINGS.find((f) => f.id === effectiveSelectedId) ?? FINDINGS[0]
  const counts = FINDINGS.reduce(
    (acc, f) => ({ ...acc, [f.severity]: (acc[f.severity] || 0) + 1 }),
    {} as Record<Severity, number>
  )
  const highPlus = (counts.high || 0) + (counts.critical || 0)

  useLayoutEffect(() => {
    // Scroll-controlled instances skip the mount scan animation.
    if (phaseOverride !== undefined || revealedProp !== undefined) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    if (started.current) return
    started.current = true
    setPhase('scanning')
    setRevealed(false)
  }, [phaseOverride, revealedProp])

  useEffect(() => {
    if (phaseOverride !== undefined) return
    if (phase !== 'scanning') return
    const timer = window.setTimeout(() => {
      setPhase('done')
      setRevealed(true)
    }, 1300)
    return () => window.clearTimeout(timer)
  }, [phase, phaseOverride])

  useEffect(() => {
    const container = codeRef.current
    if (!container) return
    const el = container.querySelector<HTMLElement>(`[data-line="${selected.line}"]`)
    if (!el) return

    // Scroll only the internal code container, NEVER the window/page
    const containerTop = container.scrollTop
    const containerHeight = container.clientHeight
    const elTop = el.offsetTop
    const elHeight = el.offsetHeight

    if (elTop < containerTop) {
      container.scrollTop = elTop
    } else if (elTop + elHeight > containerTop + containerHeight) {
      container.scrollTop = elTop + elHeight - containerHeight
    }
  }, [selected.line])

  return (
    <div className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] shadow-[0_24px_60px_-40px_rgba(37,39,36,0.45)]">
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-background-secondary)] px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#E0A9A0]" />
          <span className="h-3 w-3 rounded-full bg-[#E4CDA0]" />
          <span className="h-3 w-3 rounded-full bg-[#B9C7A6]" />
        </div>
        <div className="min-w-0 flex-1 text-center">
          <span className="truncate font-[var(--font-mono)] text-[12px] text-[var(--color-text-secondary)]">
            legacy_tokens.py — periperi
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
          <Mark size={13} />
          Periperi
        </span>
      </div>

      <div className="grid md:grid-cols-[42px_216px_1fr]">
        {/* Activity rail */}
        <div className="hidden flex-col items-center gap-4 border-r border-[var(--color-border)] bg-[var(--color-background-secondary)] py-4 md:flex" aria-hidden="true">
          <span className="text-[var(--color-text-secondary)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h6l2 2h10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>
          </span>
          <span className="text-[var(--color-text-secondary)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
          <span className="text-[var(--color-text-secondary)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 9v6" /></svg>
          </span>
          <span className="relative text-[var(--color-accent)]">
            <span className="absolute -left-4 top-0 h-full w-[2px] bg-[var(--color-accent)]" />
            <Mark size={20} />
          </span>
        </div>

        {/* Periperi findings panel */}
        <div className="border-b border-[var(--color-border)] bg-[var(--color-background-secondary)] md:border-b-0 md:border-r">
          <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2">
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              Crypto findings
            </span>
            <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-text-secondary)]">
              {effectivePhase === 'done' ? `${FINDINGS.length}` : '—'}
            </span>
          </div>

          <div className="mx-3.5 mb-2 flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1.5" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">Filter findings</span>
          </div>

          <ul className="max-h-[220px] overflow-y-auto md:max-h-[340px]" role="list" aria-label="Periperi findings">
            {FINDINGS.map((finding, index) => {
              const isSelected = finding.id === effectiveSelectedId
              return (
                <li key={finding.id} className="border-t border-[var(--color-border)] first:border-t-0">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedId(finding.id)
                      setUserSelected(true)
                    }}
                    className={`flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition-colors duration-150 ${
                      isSelected ? 'bg-[var(--color-background)]' : 'hover:bg-[var(--color-background)]/60'
                    }`}
                    style={{
                      opacity: effectiveRevealed ? 1 : 0,
                      transform: effectiveRevealed ? 'translateY(0)' : 'translateY(4px)',
                      transition: 'opacity 420ms var(--ease-out-expo), transform 420ms var(--ease-out-expo), background-color 150ms',
                      transitionDelay: effectiveRevealed ? `${index * 55}ms` : '0ms',
                      borderLeft: isSelected ? '2px solid var(--color-accent)' : '2px solid transparent',
                    }}
                  >
                    <span
                      className="mt-[5px] h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ background: `var(--color-severity-${finding.severity})` }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate font-[var(--font-mono)] text-[12px] font-medium text-[var(--color-text-primary)]">
                          {finding.name}
                        </span>
                        <span
                          className="flex-shrink-0 font-[var(--font-mono)] text-[10px] uppercase"
                          style={{ color: `var(--color-severity-${finding.severity})` }}
                        >
                          {SEVERITY_LABEL[finding.severity]}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate font-[var(--font-mono)] text-[10.5px] text-[var(--color-text-secondary)]">
                        {finding.category.toLowerCase()} · line {finding.line}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Editor */}
        <div className="relative flex min-w-0 flex-col border-b border-[var(--color-border)] md:border-b-0">
          {effectivePhase === 'scanning' && (
            <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[var(--color-border)]" aria-hidden="true">
              <span className="ed-scan-bar block h-full w-1/3 bg-[var(--color-accent)]" />
            </div>
          )}

          <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2">
            <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
              services / identity /{' '}
              <span className="text-[var(--color-text-primary)]">legacy_tokens.py</span>
            </span>
          </div>

          <div
            ref={codeRef}
            className="max-h-[300px] flex-1 overflow-auto py-2 font-[var(--font-mono)] text-[12px] leading-[1.65] md:max-h-[380px]"
          >
            <table className="w-full border-collapse" aria-label="legacy_tokens.py source with Periperi findings">
              <tbody>
                {CODE.map((line) => {
                  const finding = FINDINGS.find((f) => f.line === line.n)
                  const isSelected = finding?.id === effectiveSelectedId
                  return (
                    <tr
                      key={line.n}
                      data-line={line.n}
                      className="transition-colors duration-150"
                      style={
                        finding
                          ? {
                              background: isSelected
                                ? `color-mix(in srgb, var(--color-severity-${finding.severity}) 14%, transparent)`
                                : `color-mix(in srgb, var(--color-severity-${finding.severity}) 7%, transparent)`,
                            }
                          : undefined
                      }
                    >
                      <td className="relative w-[1%] select-none whitespace-nowrap pl-4 pr-3 text-right align-top text-[var(--color-text-secondary)]/60">
                        {finding && (
                          <span
                            className="absolute left-1.5 top-1/2 h-3 w-[3px] -translate-y-1/2 rounded-full"
                            style={{ background: `var(--color-severity-${finding.severity})` }}
                            aria-hidden="true"
                          />
                        )}
                        {line.n}
                      </td>
                      <td className="whitespace-pre pr-6 align-top">
                        {line.toks.map(([text, cls], i) => (
                          <span
                            key={i}
                            style={{
                              color: TOKEN_COLOR[cls] ?? TOKEN_COLOR.plain,
                              fontStyle: cls === 'com' ? 'italic' : undefined,
                            }}
                          >
                            {text}
                          </span>
                        ))}
                        {finding && (
                          <span
                            className="ml-3 hidden font-[var(--font-sans)] text-[10.5px] italic md:inline"
                            style={{ color: `var(--color-severity-${finding.severity})` }}
                          >
                            {`◂ Peri${isSelected ? ' selected' : ''}: ${finding.name}`}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Selected finding detail */}
      <div
        className="border-t border-[var(--color-border)] bg-[var(--color-background-secondary)]"
        role="region"
        aria-label="Selected finding detail"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 pt-4 pb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 font-[var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-background)]"
            style={{ background: `var(--color-severity-${selected.severity})` }}
          >
            {SEVERITY_LABEL[selected.severity]}
          </span>
          <span className="font-[var(--font-mono)] text-[13px] font-medium text-[var(--color-text-primary)]">
            {selected.name}
          </span>
          <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
            {selected.ruleId}
          </span>
          <span className="ml-auto font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
            {selected.fileRole} · line {selected.line}
          </span>
        </div>

        <div
          className="px-5 pb-5"
          style={{ transition: 'opacity 260ms var(--ease-out-expo)' }}
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-y border-[var(--color-border)] py-3 sm:grid-cols-4">
            {[
              ['Validation state', selected.validationState],
              ['Evidence type', selected.evidenceType],
              ['Usage context', selected.usageContext],
              ['Confidence', `${selected.confidence.toFixed(2)} (${selected.confidenceLevel})`],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                  {term}
                </dt>
                <dd className="mt-0.5 font-[var(--font-mono)] text-[12px] text-[var(--color-text-primary)]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                Why this was raised
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-text-primary)]">
                {selected.reason}
              </p>
              <p className="mt-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                Evidence
              </p>
              <code className="mt-1.5 block overflow-x-auto whitespace-pre rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 font-[var(--font-mono)] text-[11.5px] text-[var(--color-text-primary)]">
                {selected.evidence}
              </code>
            </div>

            <div>
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                Recommendation
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-text-primary)]">
                {selected.recommendation}
              </p>
              {selected.reference && (
                <p className="mt-3 font-[var(--font-sans)] text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                  {selected.reference}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[var(--color-border)] bg-[var(--color-background)] px-4 py-1.5">
        <span className="flex items-center gap-1.5 font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
          <span className="text-[var(--color-accent)]">
            <Mark size={12} />
          </span>
          {effectivePhase === 'scanning' ? (
            <>Periperi: scanning legacy_tokens.py…</>
          ) : (
            <>
              Periperi: {FINDINGS.length} findings · {highPlus} high
            </>
          )}
        </span>
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
          Python 3.12 · UTF-8 · Ln {selected.line}, Col 1 · ECDAT CBOM Prototype 1.2
        </span>
      </div>
    </div>
  )
}
