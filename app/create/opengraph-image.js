import { ImageResponse } from 'next/og'

export const alt = 'Crée ton invitation en 2 min'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        background: '#0D0F1A',
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow top-left */}
        <div style={{
          position: 'absolute',
          top: -120,
          left: -120,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(255,107,107,0.12)',
        }} />
        {/* Glow bottom-right */}
        <div style={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'rgba(255,107,107,0.08)',
        }} />

        {/* Top border */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 5,
          background: 'linear-gradient(90deg, #FF6B6B, #FF9B9B, #FF6B6B)',
        }} />

        {/* Left column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 60px 60px 80px',
          flex: 1,
        }}>
          <div style={{ fontSize: 18, color: '#FF6B6B', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24 }}>
            Date Invitation
          </div>
          <div style={{
            fontSize: 62,
            fontWeight: 900,
            color: '#F8F4EE',
            lineHeight: 1.1,
            marginBottom: 24,
          }}>
            Invite quelqu'un<br />
            <span style={{ color: '#FF6B6B' }}>de spécial</span><br />
            en 2 minutes
          </div>
          <div style={{ fontSize: 24, color: '#8b8fa8', marginBottom: 40, lineHeight: 1.5 }}>
            Menu · Date · Réponse WhatsApp<br />tout en un lien 🍽️💕
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#FF6B6B',
            color: '#0D0F1A',
            padding: '14px 28px',
            borderRadius: 50,
            fontSize: 20,
            fontWeight: 700,
          }}>
            Créer mon invitation →
          </div>
        </div>

        {/* Right column — mini invite card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 80px 60px 20px',
          width: 380,
        }}>
          <div style={{
            background: '#161828',
            border: '2px solid #FF6B6B',
            borderRadius: 28,
            padding: '32px 28px',
            width: '100%',
            boxShadow: '0 0 40px rgba(255,107,107,0.2)',
          }}>
            <div style={{ fontSize: 13, color: '#FF6B6B', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>
              💌 Notre rendez-vous
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 22 }}>👤</span>
              <span style={{ color: '#F8F4EE', fontSize: 18 }}>Ella</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 22 }}>🍽️</span>
              <span style={{ color: '#F8F4EE', fontSize: 18 }}>Alloco / Brochettes</span>
            </div>
            <div style={{ borderTop: '1px dashed #2a2d45', margin: '16px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 22 }}>📅</span>
              <span style={{ color: '#F8F4EE', fontSize: 18 }}>Sam. 21 juin à 19h30</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 22 }}>🚗</span>
              <span style={{ color: '#F8F4EE', fontSize: 18 }}>Zemjan / Kekeno</span>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 5,
          background: 'linear-gradient(90deg, #FF6B6B, #FF9B9B, #FF6B6B)',
        }} />
      </div>
    ),
    { ...size }
  )
}
