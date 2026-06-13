'use client'
import { useState } from 'react'
import { DEFAULT_MENUS } from '@/lib/constants'

export default function MenuGrid({ selected, onToggle, customMenus, onAddCustom, onRemoveCustom }) {
  const [customInput, setCustomInput] = useState('')

  const handleAdd = () => {
    const v = customInput.trim()
    if (!v) return
    onAddCustom(v)
    setCustomInput('')
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {DEFAULT_MENUS.map((menu) => {
          const isSel = selected.includes(menu.label)
          return (
            <div
              key={menu.id}
              onClick={() => onToggle(menu.label)}
              className={`relative bg-card border-2 rounded-2xl p-3.5 text-center cursor-pointer transition-all duration-250
                ${isSel ? 'border-primary bg-glow' : 'border-border'}`}
            >
              {isSel && (
                <span className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center text-[9px] font-black text-bg">
                  ✓
                </span>
              )}
              <span className="text-2xl block mb-1.5">{menu.emoji}</span>
              <span className={`text-[11px] font-semibold leading-tight ${isSel ? 'text-[#F8F4EE]' : 'text-muted'}`}>
                {menu.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Custom menu input */}
      <div className="flex gap-2.5">
        <input
          className="input-base flex-1"
          type="text"
          placeholder="Ajouter un plat... (ex: Foutou)"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-glow border-2 border-primary rounded-xl px-4 text-primary text-2xl"
        >
          +
        </button>
      </div>

      {/* Custom tags */}
      {customMenus.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2.5">
          {customMenus.map((m, i) => (
            <div key={i} className="bg-glow border border-primary rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5">
              🍽️ {m}
              <button
                onClick={() => onRemoveCustom(i)}
                className="text-primary text-sm leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
