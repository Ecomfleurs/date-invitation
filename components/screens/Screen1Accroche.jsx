'use client'
import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

const NO_TEXTS = [
  'Non 😢',
  'Vraiment non ? 😏',
  "T'es sûr(e) ? 🤔",
  'Attends... non ! 😅',
  'Pas question ! 😤',
  'Non non non 🙅',
  'Tu rigoles là ? 😂',
  'Jamais de la vie ! 😈',
  'Erreur 404 😵',
  'Stop me if you can 🏃',
]

export default function Screen1Accroche({ config, onYes }) {
  const isRomantic = config.mode === 'romantic'
  const [noPos, setNoPos] = useState({ x: null, y: null })
  const [noClicked, setNoClicked] = useState(false)
  const [fleeCount, setFleeCount] = useState(0)
  const lastFlee = useRef(0)

  const flee = useCallback((e) => {
    e.preventDefault()
    const now = Date.now()
    if (now - lastFlee.current < 150) return
    lastFlee.current = now
    const vw = window.innerWidth
    const vh = window.innerHeight
    const bw = 220, bh = 60
    setNoPos({
      x: Math.random() * (vw - bw),
      y: Math.random() * (vh - bh),
    })
    setFleeCount(prev => prev + 1)
  }, [])

  const handleNoClick = () => {
    setNoClicked(true)
    setTimeout(() => setNoClicked(false), 2000)
  }

  const noLabel = noClicked
    ? '😉 Erreur réseau !'
    : NO_TEXTS[fleeCount % NO_TEXTS.length]

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-5 bg-bg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.p
        className="text-[11px] tracking-widest uppercase text-muted mb-3"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isRomantic ? 'Quelqu\'un pense à toi...' : 'Un plan se prépare...'}
      </motion.p>

      <motion.h1
        className="font-display text-[26px] leading-snug text-center text-primary theme-transition mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {isRomantic
          ? `${config.name}, on sort ensemble ? 💕`
          : `${config.name}, on se retrouve ? 🎉`}
      </motion.h1>

      <motion.p
        className="text-[13px] text-muted text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isRomantic
          ? 'Une invitation très spéciale t\'attend...'
          : 'Y\'a un plan qui se prépare pour toi...'}
      </motion.p>

      <motion.div
        className="flex flex-col gap-3 w-full max-w-[340px]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={onYes}
          className="w-full py-5 rounded-2xl bg-primary text-bg font-display text-lg font-bold shadow-primary active:scale-95 transition-transform"
        >
          OUI ! 😍
        </button>
      </motion.div>

      <button
        onTouchStart={flee}
        onMouseEnter={flee}
        onClick={handleNoClick}
        className="fixed font-display font-bold text-[17px] px-8 py-4 rounded-2xl transition-all duration-150"
        style={{
          background: 'linear-gradient(135deg, var(--glow-strong), var(--primary))',
          color: '#fff',
          boxShadow: '0 8px 32px var(--glow-strong)',
          border: '2px solid rgba(255,255,255,0.15)',
          ...(noPos.x !== null
            ? { left: noPos.x, top: noPos.y }
            : { bottom: '10%', left: '50%', transform: 'translateX(-50%)' }
          )
        }}
      >
        {noLabel}
      </button>
    </motion.div>
  )
}
