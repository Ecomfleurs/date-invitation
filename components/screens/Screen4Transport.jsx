'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TRANSPORTS } from '@/lib/constants'

export default function Screen4Transport({ onSelect }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (t) => {
    setSelected(t.id)
    setTimeout(() => onSelect(t.label), 300)
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-5 bg-bg overflow-hidden"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <p className="text-[11px] tracking-widest uppercase text-muted mb-2">Le trajet</p>
      <h2 className="font-display text-[22px] leading-snug text-center mb-1">
        Comment tu <span className="text-primary theme-transition">viens ?</span>
      </h2>
      <p className="text-[13px] text-muted text-center mb-6">On s'organise</p>

      <div className="grid grid-cols-3 gap-2.5 w-full max-w-[360px]">
        {TRANSPORTS.map((t) => (
          <motion.div
            key={t.id}
            whileTap={{ scale: 0.93 }}
            onClick={() => handleSelect(t)}
            className={`bg-card border-2 rounded-2xl p-3.5 text-center cursor-pointer transition-all duration-250
              ${selected === t.id ? 'border-primary bg-glow' : 'border-border'}`}
          >
            <span className="text-2xl block mb-1.5">{t.emoji}</span>
            <span className={`text-[10px] font-semibold leading-tight whitespace-pre-line ${selected === t.id ? 'text-[#F8F4EE]' : 'text-muted'}`}>
              {t.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
