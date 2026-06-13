import LZString from 'lz-string'
import { DEFAULT_MENUS } from './constants'

const MODES = ['romantic', 'friend']

export function encodeConfig(config) {
  const compact = {
    m: MODES.indexOf(config.mode),
    n: config.name,
    p: config.phone,
    mu: config.menus.map(label => {
      const idx = DEFAULT_MENUS.findIndex(d => d.label === label)
      return idx >= 0 ? idx : label
    }),
    c: config.creneaux.map(({ date, time }) => ({ d: date, t: time })),
  }
  return LZString.compressToEncodedURIComponent(JSON.stringify(compact))
}

export function decodeConfig(encoded) {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded)
    const data = JSON.parse(json)
    if ('mode' in data) return data  // lien généré avant compression compacte
    return {
      mode: MODES[data.m] ?? 'romantic',
      name: data.n,
      phone: data.p,
      menus: data.mu.map(v => typeof v === 'number' ? DEFAULT_MENUS[v].label : v),
      creneaux: data.c.map(({ d, t }) => ({ date: d, time: t })),
    }
  } catch {
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
