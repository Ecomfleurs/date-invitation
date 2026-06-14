import { ImageResponse } from 'next/og'

export const alt = 'Crée ton invitation en 2 min'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ background: '#0D0F1A', width: '100%', height: '100%', display: 'flex', position: 'relative' }}>

        {/* Glow décoratif */}
        <div style={{ position: 'absolute', top: -120, left: -120, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,107,107,0.12)' }} />
        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'rgba(255,107,107,0.08)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg, #FF6B6B, #FF9B9B, #FF6B6B)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg, #FF6B6B, #FF9B9B, #FF6B6B)' }} />

        {/* Colonne gauche */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 60px 60px 80px', flex: 1 }}>
          <div style={{ display: 'flex', fontSize: 18, color: '#FF6B6B', letterSpacing: 4, marginBottom: 24 }}>
            DATE INVITATION
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 24 }}>
            <span style={{ fontSize: 62, fontWeight: 900, color: '#F8F4EE', lineHeight: 1.1 }}>Invite quelqu'un</span>
            <span style={{ fontSize: 62, fontWeight: 900, color: '#FF6B6B', lineHeight: 1.1 }}>de spécial</span>
            <span style={{ fontSize: 62, fontWeight: 900, color: '#F8F4EE', lineHeight: 1.1 }}>en 2 minutes</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
            <span style={{ fontSize: 24, color: '#8b8fa8', lineHeight: 1.5 }}>Menu · Date · Réponse WhatsApp</span>
            <span style={{ fontSize: 24, color: '#8b8fa8', lineHeight: 1.5 }}>tout en un lien 🍽️💕</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#FF6B6B', color: '#0D0F1A', padding: '14px 28px', borderRadius: 50, fontSize: 20, fontWeight: 700 }}>
            Créer mon invitation →
          </div>
        </div>

        {/* Colonne droite — mini carte invitation */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 80px 60px 20px', width: 380 }}>
          <div style={{ display: 'flex', flexDirection: 'column', background: '#161828', border: '2px solid #FF6B6B', borderRadius: 28, padding: '32px 28px', width: '100%' }}>
            <div style={{ display: 'flex', fontSize: 13, color: '#FF6B6B', letterSpacing: 3, marginBottom: 20 }}>
              💌 Notre rendez-vous
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>👤</span>
              <span style={{ color: '#F8F4EE', fontSize: 18 }}>Ella</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>🍽️</span>
              <span style={{ color: '#F8F4EE', fontSize: 18 }}>Alloco / Brochettes</span>
            </div>
            <div style={{ display: 'flex', borderTop: '1px dashed #2a2d45', margin: '12px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>📅</span>
              <span style={{ color: '#F8F4EE', fontSize: 18 }}>Sam. 21 juin à 19h30</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 22 }}>🚗</span>
              <span style={{ color: '#F8F4EE', fontSize: 18 }}>Zemjan / Kekeno</span>
            </div>
          </div>
        </div>

      </div>
    ),
    { ...size }
  )
}
