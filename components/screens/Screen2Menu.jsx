'use client'
import { motion } from 'framer-motion'
import { MENU_EMOJIS } from '@/lib/constants'

export default function Screen2Menu({ config, onSelect }) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-5 bg-bg overflow-hidden"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <p className="text-[11px] tracking-widest uppercase text-muted mb-2">Ton choix</p>
      <h2 className="font-display text-[22px] leading-snug text-center mb-1">
        Qu'est-ce qu'on va <span className="text-primary theme-transition">manger ?</span>
      </h2>
      <p className="text-[13px] text-muted text-center mb-6">Tape sur ta préférence</p>

      <div className="grid grid-cols-2 gap-2.5 w-full max-w-[360px]">
        {config.menus.map((menu, i) => (
          <motion.div
            key={i}
            onClick={() => setTimeout(() => onSelect(menu.label), 300)}
            whileTap={{ scale: 0.95 }}
            className="relative bg-card border-2 border-border rounded-2xl overflow-hidden cursor-pointer active:border-primary"
          >
            <div className="w-full aspect-square flex items-center justify-center bg-inputbg">
              {menu.image
                ? <img src={menu.image} alt={menu.label} className="w-full h-full object-cover" />
                : <span className="text-4xl">{MENU_EMOJIS[i] || '🍽️'}</span>
              }
            </div>
            <div className="px-3 py-2.5">
              <span className="text-[12px] font-semibold text-muted leading-tight line-clamp-2">{menu.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
