import LZString from 'lz-string'
import { DEFAULT_MENUS } from './constants'

const MODES = ['romantic', 'friend']

export function encodeConfig(config) {
  const compact = {
    m: MODES.indexOf(config.mode),
    n: config.name,
    p: config.phone,
    mu: config.menus.map(({ label, image }) => {
      const idx = DEFAULT_MENUS.findIndex(d => d.label === label)
      if (idx >= 0) return image ? [idx, image] : idx
      return image ? [label, image] : label
    }),
    c: config.creneaux.map(({ date, time }) => ({ d: date, t: time })),
    ...(config.theme ? { th: config.theme } : {}),
  }
  return LZString.compressToEncodedURIComponent(JSON.stringify(compact))
}

export function decodeConfig(encoded) {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded)
    const data = JSON.parse(json)
    if ('mode' in data) {
      // old format (lz-string with long keys)
      return {
        ...data,
        menus: data.menus.map(m => typeof m === 'string' ? { label: m, image: null } : m),
      }
    }
    return {
      mode: MODES[data.m] ?? 'romantic',
      name: data.n,
      phone: data.p,
      menus: data.mu.map(v => {
        if (typeof v === 'number') return { label: DEFAULT_MENUS[v].label, image: null }
        if (Array.isArray(v)) {
          const label = typeof v[0] === 'number' ? DEFAULT_MENUS[v[0]].label : v[0]
          return { label, image: v[1] || null }
        }
        return { label: v, image: null }
      }),
      creneaux: data.c.map(({ d, t }) => ({ date: d, time: t })),
      theme: data.th || null,
    }
  } catch {
    return null
  }
}

export function buildInviteUrl(config) {
  const encoded = encodeConfig(config)
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || ''
  return `${base}/invite?config=${encoded}`
}

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
