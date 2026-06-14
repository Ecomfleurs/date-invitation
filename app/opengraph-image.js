import { ImageResponse } from 'next/og'

export const alt = 'Date Invitation — Invitations WhatsApp personnalisées'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ background: '#0D0F1A', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

        <div style={{ position: 'absolute', top: 65, left: 350, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,107,107,0.1)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg, #FF6B6B, #FF9B9B, #FF6B6B)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg, #FF6B6B, #FF9B9B, #FF6B6B)' }} />

        <div style={{ display: 'flex', fontSize: 90, marginBottom: 24 }}>💌</div>

        <div style={{ display: 'flex', fontSize: 16, color: '#FF6B6B', letterSpacing: 6, marginBottom: 20 }}>
          DATE INVITATION
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 54, fontWeight: 900, color: '#F8F4EE', lineHeight: 1.2 }}>Invitations romantiques</span>
          <span style={{ fontSize: 54, fontWeight: 900, color: '#FF6B6B', lineHeight: 1.2 }}>&amp; sorties entre amis</span>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#8b8fa8', marginBottom: 40 }}>
          Menu · Date · Réponse WhatsApp — tout en un lien
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          {['🍽️ Menu', '📅 Date', '💬 WhatsApp', '💕 Romantique'].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', background: '#161828', border: '1px solid #2a2d45', borderRadius: 50, padding: '10px 22px', fontSize: 18, color: '#8b8fa8' }}>
              {item}
            </div>
          ))}
        </div>

      </div>
    ),
    { ...size }
  )
}
