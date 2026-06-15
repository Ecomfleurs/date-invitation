import { Suspense } from 'react'
import InviteClient from './InviteClient'
import { decodeConfig } from '@/lib/encode'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://date-invitation-blond.vercel.app'

export async function generateMetadata({ searchParams }) {
  const configParam = searchParams?.config
  if (!configParam) return {}

  try {
    const decoded = decodeConfig(configParam)
    if (!decoded) return {}

    const name = decoded.name || ''
    const mode = decoded.mode || 'romantic'
    const emoji = mode === 'friend' ? '🎉' : '💌'
    const imageUrl = `${BASE_URL}/api/og/invite?name=${encodeURIComponent(name)}&mode=${mode}`

    return {
      title: `${emoji} Hey ${name} — Invitation spéciale`,
      openGraph: {
        title: `${emoji} Hey ${name} !`,
        description: "Tu as reçu une invitation spéciale. Clique pour l'ouvrir.",
        images: [{ url: imageUrl, width: 1200, height: 630, alt: `Invitation pour ${name}` }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${emoji} Hey ${name} !`,
        images: [imageUrl],
      },
    }
  } catch {
    return {}
  }
}

export default function InvitePage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-[#0D0F1A]">
        <div className="w-8 h-8 border-2 border-[#FF6B6B] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <InviteClient />
    </Suspense>
  )
}
