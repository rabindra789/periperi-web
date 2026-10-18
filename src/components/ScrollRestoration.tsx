'use client'

import { useEffect } from 'react'

export default function ScrollRestoration() {
  useEffect(() => {
    if (typeof history !== 'undefined') {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])
  return null
}