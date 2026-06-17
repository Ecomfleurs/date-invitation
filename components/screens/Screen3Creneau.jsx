'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatCreneau } from '@/lib/encode'
import { trackEvent } from '@/lib/analytics'

export default function Screen3Creneau({ config, onSelect }) {
  const [selected, setSelected] = useState(null)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [suggestion, setSuggestion] = useState('')

  const canContinue = selected !== null || suggestion.trim().length > 0

  const handleContinue = () => {
    if (suggestion.trim()) {
      trackEvent('creneau_selected', { type: 'suggestion' })
      onSelect({ label: '💬 ' + suggestion.trim(), isSuggestion: true, value: suggestion.trim() })
    } else {
      trackEvent('creneau_selected', { type: 'preset', index: selected })
      onSelect({ label: formatCreneau(config.creneaux[selected]), isSuggestion: false, value: config.creneaux[selected] })
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-5 bg-bg overflow-hidden"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <p className="text-[11px] tracking-widest uppercase text-muted mb-2">L'agenda</p>
      <h2 className="font-display text-[22px] leading-snug text-center mb-1">
        Quel moment te <span className="text-primary theme-transition">convient ?</span>
      </h2>
      <p className="text-[13px] text-muted text-center mb-5">Choisis un créneau</p>

      <div className="flex flex-col gap-2.5 w-full max-w-[360px]">
        {config.creneaux.map((c, i) => {
          const label = formatCreneau(c)
          const isSel = selected === i && !suggestion.trim()
          return (
            <motion.div
              key={i}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setSelected(i); setSuggestion(''); setShowSuggestion(false) }}
              className={`bg-card border-2 rounded-2xl px-4 py-4 cursor-pointer transition-all duration-250
                ${isSel ? 'border-primary bg-glow' : 'border-border'}`}
            >
              <div className={`text-[14px] font-semibold capitalize ${isSel ? 'text-[#F8F4EE]' : 'text-[#F8F4EE]'}`}>
                {label}
              </div>
              <div className={`text-[12px] mt-0.5 ${isSel ? 'text-primary' : 'text-muted'}`}>
                Créneau {i + 1}
              </div>
            </motion.div>
          )
        })}

        {/* Suggestion libre */}
        <p
          onClick={() => setShowSuggestion(!showSuggestion)}
          className="text-[12px] text-muted text-center underline cursor-pointer mt-1"
        >
          💬 Proposer un autre moment
        </p>

        {showSuggestion && (
          <textarea
            className="input-base resize-none"
            rows={2}
            placeholder="Ex: Dimanche 15 à 16h ça serait top !"
            value={suggestion}
            onChange={(e) => { setSuggestion(e.target.value); setSelected(null) }}
            autoFocus
          />
        )}

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full py-4 rounded-2xl font-semibold text-[15px] transition-all duration-250 mt-2
            ${canContinue
              ? 'bg-primary text-bg shadow-primary active:scale-95'
              : 'bg-border text-muted cursor-not-allowed'}`}
        >
          Continuer →
        </button>
      </div>
    </motion.div>
  )
}
