'use client'

export const THEMES = [
  { id: 'valentine', label: 'Valentine', emoji: '💕', from: '#fce4ec', to: '#e96d7b' },
  { id: 'luxury',   label: 'Luxury',    emoji: '🖤', from: '#1c1c1c', to: '#d4af37' },
  { id: 'night',    label: 'Night',     emoji: '🌙', from: '#0d1b2a', to: '#5b8af5' },
  { id: 'fantasy',  label: 'Fantasy',   emoji: '✨', from: '#1a0e2e', to: '#9d4edd' },
  { id: 'dracula',  label: 'Dracula',   emoji: '🧛', from: '#282a36', to: '#bd93f9' },
  { id: 'cupcake',  label: 'Cupcake',   emoji: '🧁', from: '#faf0f0', to: '#ef9fbc' },
]

export default function ThemePicker({ selected, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {THEMES.map((t) => {
        const isSel = selected === t.id
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border-2 transition-all duration-200 active:scale-95
              ${isSel ? 'border-primary scale-[1.04]' : 'border-border'}`}
            style={{ background: `linear-gradient(135deg, ${t.from}18, ${t.to}22)` }}
          >
            {/* Swatch couleur */}
            <div
              className="w-full h-7 rounded-lg"
              style={{ background: `linear-gradient(135deg, ${t.from}99, ${t.to})` }}
            />
            <span className="text-[10px] font-semibold text-[#F8F4EE] text-center leading-tight">
              {t.emoji} {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
