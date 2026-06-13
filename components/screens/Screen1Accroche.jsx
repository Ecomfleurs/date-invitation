'use client'
import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function Screen1Accroche({ config, onYes }) {
  const isRomantic = config.mode === 'romantic'
  const [noPos, setNoPos] = useState({ x: null, y: null })
  const [noClicked, setNoClicked] = useState(false)

  const flee = useCallback((e) => {
    e.preventDefault()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const bw = 140, bh = 52
    setNoPos({
      x: Math.random() * (vw - bw),
      y: Math.random() * (vh - bh),
    })
  }, [])

  const handleNoClick = () => {
    setNoClicked(true)
    setTimeout(() => setNoClicked(false), 2000)
  }

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

      {/* Fleeing No button */}
      <button
        onTouchStart={flee}
        onMouseEnter={flee}
        onClick={handleNoClick}
        className="fixed px-8 py-3.5 rounded-full bg-card border-2 border-border text-muted text-sm font-semibold transition-all duration-150"
        style={
          noPos.x !== null
            ? { left: noPos.x, top: noPos.y }
            : { bottom: '10%', left: '50%', transform: 'translateX(-50%)' }
        }
      >
        {noClicked ? '😉 Erreur réseau !' : 'Non 😢'}
      </button>
    </motion.div>
  )
}
