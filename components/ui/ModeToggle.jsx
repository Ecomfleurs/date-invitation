'use client'

export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <button
        onClick={() => onChange('romantic')}
        className={`flex flex-col items-center py-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-300
          ${mode === 'romantic'
            ? 'border-primary bg-glow text-[#F8F4EE] shadow-primary'
            : 'border-border bg-card text-muted'}`}
      >
        <span className="text-2xl mb-1">💕</span>
        Romantique
      </button>
      <button
        onClick={() => onChange('friend')}
        className={`flex flex-col items-center py-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-300
          ${mode === 'friend'
            ? 'border-primary bg-glow text-[#F8F4EE] shadow-primary'
            : 'border-border bg-card text-muted'}`}
      >
        <span className="text-2xl mb-1">🎉</span>
        Entre amis
      </button>
    </div>
  )
}
