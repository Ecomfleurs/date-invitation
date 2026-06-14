import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Tu as reçu une invitation très spéciale'
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
          fontSize: 56,
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: 1.3,
          marginBottom: 24,
        }}>
          Tu as reçu une invitation très spéciale...
        </div>

        <div style={{
          color: '#8b8fa8',
          fontSize: 30,
          textAlign: 'center',
        }}>
          Clique pour l'ouvrir et répondre
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
