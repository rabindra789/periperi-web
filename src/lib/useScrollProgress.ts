'use client'

import { useLayoutEffect, useRef } from 'react'

export type ScrollProgressMode =
  /** Tall section that pins: 0 when the section top reaches the viewport top, 1 at the end of its scroll range. */
  | 'sticky'
  /** Element travelling into view: 0 as it enters the viewport, 1 once its top reaches `stopRatio` of the viewport height. */
  | 'enter'

export interface ScrollProgressOptions {
  mode?: ScrollProgressMode
  /** For `enter`: viewport fraction (0..1) at which progress reaches 1. Default 0.55. */
  stopRatio?: number
  /** Element that receives the `--p` CSS variable. Defaults to the observed element. */
  writeTo?: React.RefObject<HTMLElement>
  /** Set false to skip wiring (e.g. while a user is interacting). */
  enabled?: boolean
  /**
   * Called at most once per animation frame with the clamped 0..1 progress.
   * Use it to derive discrete state (e.g. the active step) — do NOT call
   * setState every frame; only update when your derived value changes.
   */
  onProgress?: (p: number) => void
}

/**
 * Writes a reversible 0..1 scroll progress value to an element as the CSS
 * variable `--p`, so CSS can drive the animation and no React state is
 * touched per frame.
 *
 * - one passive scroll listener + one rAF coalescing frame per instance
 * - IntersectionObserver pauses updates while the element is far offscreen
 * - `prefers-reduced-motion` pins `--p` to 1 and wires no listeners
 * - `--p` defaults to 1 in CSS, so no-JS users see the finished state
 */
export function useScrollProgress<T extends HTMLElement>(
  options: ScrollProgressOptions = {}
): React.RefObject<T> {
  const { mode = 'enter', stopRatio = 0.55, writeTo, enabled = true, onProgress } = options
  const ref = useRef<T>(null)
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const target = writeTo?.current ?? el

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      target.style.setProperty('--p', '1')
      onProgressRef.current?.(1)
      return
    }

    let raf = 0
    let visible = true

    const compute = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      let p: number
      if (mode === 'sticky') {
        const range = el.offsetHeight - vh
        p = range > 0 ? -rect.top / range : 0
      } else {
        const span = vh * (1 - stopRatio)
        p = span > 0 ? (vh - rect.top) / span : 1
      }
      const clamped = p < 0 ? 0 : p > 1 ? 1 : p
      target.style.setProperty('--p', clamped.toFixed(4))
      onProgressRef.current?.(clamped)
    }

    const update = () => {
      raf = 0
      if (!visible) return
      compute()
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
        if (visible) onScroll()
      },
      { rootMargin: '25% 0px 25% 0px' }
    )
    io.observe(el)

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [mode, stopRatio, writeTo, enabled])

  return ref
}
