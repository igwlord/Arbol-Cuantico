import React from 'react'
import { useUserPrefs } from '../context/UserPrefsContext'

export default function Typewriter({ text, onFinished, speed = 50 }) {
  const { prefs } = useUserPrefs()
  const [displayedText, setDisplayedText] = React.useState('')

  const skip = React.useCallback(() => {
    setDisplayedText(text)
    onFinished && onFinished()
  }, [text, onFinished])

  React.useEffect(() => {
    if (prefs.motion === 'reduced') { skip(); return }
    if (displayedText.length === text.length) { onFinished && onFinished(); return }
    const t = setTimeout(() => setDisplayedText(text.slice(0, displayedText.length + 1)), speed)
    return () => clearTimeout(t)
  }, [displayedText, text, onFinished, prefs.motion, skip, speed])

  return <p aria-live="polite" className="min-h-[1.2em]">{displayedText}</p>
}