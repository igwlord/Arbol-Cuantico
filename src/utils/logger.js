// Simple env-guarded logger for Vite (import.meta.env)
// - debug/info/warn: no-op in production
// - error: always logs
const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV

export const logger = {
  debug: (...args) => { if (isDev) console.debug(...args) },
  info: (...args) => { if (isDev) console.log(...args) },
  warn: (...args) => { if (isDev) console.warn(...args) },
  error: (...args) => { console.error(...args) },
}

export default logger
