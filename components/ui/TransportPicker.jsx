'use client'
import { TRANSPORTS } from '@/lib/constants'

export default function TransportPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {TRANSPORTS.map((t) => {
        const isSel = selected === t.label || selected === t.id
        return (
          <div
            key={t.id}
            onClick={() => onSelect(t.label)}
            className={`bg-card border-2 rounded-2xl p-3.5 text-center cursor-pointer transition-all duration-250
              ${isSel ? 'border-primary bg-glow' : 'border-border'}`}
          >
            <span className="text-2xl block mb-1.5">{t.emoji}</span>
            <span className={`text-[10px] font-semibold leading-tight whitespace-pre-line ${isSel ? 'text-[#F8F4EE]' : 'text-muted'}`}>
              {t.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
