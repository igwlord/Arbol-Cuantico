// A small hook to lock body scroll in an iOS-friendly way using position: fixed
// Handles multiple concurrent locks via a simple ref counter
import { useEffect } from 'react'

let lockCount = 0
let savedScrollY = 0
let prevBodyStyles = {}

function lockScroll() {
  if (lockCount > 0) {
    lockCount++
    return
  }
  lockCount = 1

  savedScrollY = window.scrollY || window.pageYOffset || 0

  // Save previous inline styles to restore later
  const body = document.body
  prevBodyStyles = {
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
    overflowY: body.style.overflowY,
  }

  // iOS-friendly body lock
  body.style.position = 'fixed'
  body.style.top = `-${savedScrollY}px`
  body.style.width = '100%'
  body.style.overflowY = 'scroll'
}

function unlockScroll() {
  if (lockCount === 0) return
  lockCount--
  if (lockCount > 0) return

  const body = document.body
  // Restore styles
  body.style.position = prevBodyStyles.position || ''
  body.style.top = prevBodyStyles.top || ''
  body.style.width = prevBodyStyles.width || ''
  body.style.overflowY = prevBodyStyles.overflowY || ''

  // Restore scroll position
  const y = Math.abs(parseInt(prevBodyStyles.top || '0', 10)) || savedScrollY || 0
  window.scrollTo(0, y)
}

export default function useBodyScrollLock(locked) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (locked) {
      lockScroll()
      return () => unlockScroll()
    }
    // If not locked, ensure no lingering lock on mount/unmount
    return () => {}
  }, [locked])
}
