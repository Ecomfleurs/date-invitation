/**
 * Encode a config object into a base64 URL-safe string
 */
export function encodeConfig(config) {
  const json = JSON.stringify(config)
  if (typeof window !== 'undefined') {
    return btoa(unescape(encodeURIComponent(json)))
  }
  return Buffer.from(json).toString('base64')
}

/**
 * Decode a base64 string back into a config object
 */
export function decodeConfig(encoded) {
  try {
    if (typeof window !== 'undefined') {
      return JSON.parse(decodeURIComponent(escape(atob(encoded))))
    }
    return JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8'))
  } catch (e) {
    return null
  }
}

/**
 * Build the invite URL from a config object
 */
export function buildInviteUrl(config) {
  const encoded = encodeConfig(config)
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || ''
  return `${base}/invite?config=${encoded}`
}

/**
 * Format a creneau date object to a human-readable French string
 */
export function formatCreneau(creneau) {
  const d = new Date(`${creneau.date}T${creneau.time}`)
  return (
    d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }) +
    ' à ' +
    creneau.time
  )
}

/**
 * Build the WhatsApp message text from invite answers
 */
export function buildWAMessage({ config, menu, creneauLabel, transport, suggestion }) {
  const isRomantic = config.mode === 'romantic'
  const emoji = isRomantic ? '💕' : '🎉'
  let msg = `${emoji} *Réponse de ${config.name}*\n\n`
  msg += `🍽️ Menu choisi : *${menu}*\n`
  if (suggestion) {
    msg += `📅 Créneau : 💬 *Je propose :* ${suggestion}\n`
  } else {
    msg += `📅 Créneau : *${creneauLabel}*\n`
  }
  msg += `🚗 Transport : *${transport}*\n`
  msg += isRomantic
    ? `\n${emoji} J'ai hâte ! À bientôt.`
    : `\n${emoji} Ça marche ! À bientôt.`
  return msg
}
