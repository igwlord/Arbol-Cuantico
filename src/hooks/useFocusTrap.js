import { useEffect, useRef } from 'react'

// Simple focus trap for modals/dialogs
// Params:
// - containerRef: the modal content container to trap focus within
// - isOpen: boolean whether the modal is open
// - initialFocusRef: ref to element to focus when opening (falls back to first focusable)
// - closeOnEscape: if true, ESC will trigger onClose
// - onClose: function to call on ESC or when requested
// - returnFocusRef: ref to element to restore focus to when closing (usually the button that opened the modal)
export default function useFocusTrap({ containerRef, isOpen, initialFocusRef, closeOnEscape = true, onClose, returnFocusRef }) {
  const lastActiveElementRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    lastActiveElementRef.current = document.activeElement

    const container = containerRef?.current
    if (!container) return

    const focusableSelectors = [
      'a[href]','area[href]','button:not([disabled])','input:not([disabled]):not([type="hidden"])','select:not([disabled])','textarea:not([disabled])','iframe','object','embed','[tabindex]:not([tabindex="-1"])','[contenteditable]'
    ]

    const getFocusable = () => Array.from(container.querySelectorAll(focusableSelectors.join(','))).filter(el => el.offsetParent !== null || el.getClientRects().length > 0)

    // Focus initial element
    const initial = initialFocusRef?.current || getFocusable()[0]
    if (initial) initial.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        const focusable = getFocusable()
        if (focusable.length === 0) {
          e.preventDefault()
          container.focus()
          return
        }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      } else if (e.key === 'Escape' && closeOnEscape) {
        e.preventDefault()
        onClose && onClose()
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      // restore focus
      const toFocus = returnFocusRef?.current || lastActiveElementRef.current
      if (toFocus && typeof toFocus.focus === 'function') {
        setTimeout(() => toFocus.focus(), 0)
      }
    }
  }, [isOpen, containerRef, initialFocusRef, closeOnEscape, onClose, returnFocusRef])
}
