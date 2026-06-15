import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') || ''
  const mode = searchParams.get('mode') || 'romantic'
  const isRomantic = mode !== 'friend'

  const emoji = isRomantic ? '💌' : '🎉'
  const accent = isRomantic ? '#FF6B6B' : '#A8E063'
  const heading = name ? `Hey ${name} !` : 'Tu as été invité(e) !'

  return new ImageResponse(
    (
      <div style={{
        background: '#0D0F1A',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>

        {/* Glow centre */}
        <div style={{ position: 'absolute', top: 65, left: 350, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,107,107,0.08)' }} />

        {/* Bordures haut / bas */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${accent}, #ffffff33, ${accent})` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${accent}, #ffffff33, ${accent})` }} />

        {/* Emoji */}
        <div style={{ display: 'flex', fontSize: 90, marginBottom: 20 }}>
          {emoji}
        </div>

        {/* Nom */}
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 900, color: '#F8F4EE', marginBottom: 16 }}>
          {heading}
        </div>

        {/* Sous-titre */}
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: accent, marginBottom: 48 }}>
          Tu as reçu une invitation spéciale
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#161828', border: '2px solid #2a2d45', borderRadius: 50, padding: '16px 40px' }}>
          <span style={{ fontSize: 22, color: '#8b8fa8' }}>Clique pour l'ouvrir →</span>
        </div>

      </div>
    ),
    { width: 1200, height: 630 }
  )
}
