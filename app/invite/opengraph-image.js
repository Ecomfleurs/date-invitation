import { ImageResponse } from 'next/og'

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
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Center glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'rgba(255,107,107,0.1)',
        }} />

        {/* Top border */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 5,
          background: 'linear-gradient(90deg, #FF6B6B, #FF9B9B, #FF6B6B)',
        }} />

        <div style={{ fontSize: 100, marginBottom: 32, zIndex: 1 }}>💌</div>

        <div style={{
          fontSize: 16,
          color: '#FF6B6B',
          letterSpacing: 6,
          textTransform: 'uppercase',
          marginBottom: 20,
          zIndex: 1,
        }}>
          Pour toi
        </div>

        <div style={{
          fontSize: 58,
          fontWeight: 900,
          color: '#F8F4EE',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: 28,
          zIndex: 1,
          padding: '0 80px',
        }}>
          Tu as reçu une invitation<br />
          <span style={{ color: '#FF6B6B' }}>très spéciale...</span>
        </div>

        <div style={{
          fontSize: 26,
          color: '#8b8fa8',
          textAlign: 'center',
          zIndex: 1,
          marginBottom: 40,
        }}>
          Clique pour découvrir et répondre
        </div>

        <div style={{ display: 'flex', gap: 24, zIndex: 1 }}>
          {['🍽️ Menu', '📅 Date', '💬 WhatsApp'].map((item) => (
            <div key={item} style={{
              display: 'flex',
              alignItems: 'center',
              background: '#161828',
              border: '1px solid #2a2d45',
              borderRadius: 50,
              padding: '10px 24px',
              fontSize: 20,
              color: '#8b8fa8',
            }}>
              {item}
            </div>
          ))}
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
