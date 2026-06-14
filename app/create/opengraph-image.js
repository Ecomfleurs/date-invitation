import { ImageResponse } from 'next/og'

export const runtime = 'edge'
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
        gap: 0,
      }}>
        {/* Decorative top border */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: '#FF6B6B',
        }} />

        <div style={{ fontSize: 96, marginBottom: 32 }}>💌</div>

        <div style={{
          color: '#FF6B6B',
          fontSize: 60,
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: 24,
        }}>
          Crée ton invitation en 2 min
        </div>

        <div style={{
          color: '#8b8fa8',
          fontSize: 30,
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          Menu · Date · Sortie entre amis ou date romantique
        </div>

        <div style={{
          marginTop: 40,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}>
          <div style={{
            background: '#FF6B6B',
            color: '#0D0F1A',
            padding: '12px 28px',
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 'bold',
          }}>
            🍽️ Envoie sur WhatsApp 💕
          </div>
        </div>

        {/* Decorative bottom border */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: '#FF6B6B',
        }} />
      </div>
    ),
    { ...size }
  )
}
