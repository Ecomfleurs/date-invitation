import { sendGAEvent } from '@next/third-parties/google'

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return
  try {
    sendGAEvent('event', name, params)
  } catch {}
}
