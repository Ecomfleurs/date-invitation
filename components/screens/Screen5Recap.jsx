'use client'
import { motion } from 'framer-motion'
import { buildWAMessage } from '@/lib/encode'

export default function Screen5Recap({ config, answers }) {
  const { menu, creneau, transport } = answers
  const isRomantic = config.mode === 'romantic'

  const sendWhatsApp = () => {
    const msg = buildWAMessage({
      config,
      menu,
      creneauLabel: creneau.label,
      transport,
      suggestion: creneau.isSuggestion ? creneau.value : '',
    })
    const phone = config.phone.replace(/\D/g, '')
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-5 bg-bg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-[11px] tracking-widest uppercase text-muted mb-4">Tout est prêt !</p>

      <motion.div
        className="bg-card border-2 border-primary rounded-2xl p-5 w-full max-w-[360px] glow-border theme-transition"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <p className="font-display text-[16px] text-primary text-center mb-4 theme-transition">
          {isRomantic ? '💌 Notre rendez-vous' : '🎉 Notre sortie'}
        </p>

        <TicketRow icon="👤" value={config.name} />
        <TicketRow icon="🍽️" value={menu} />
        <hr className="border-dashed border-border my-3.5" />
        <TicketRow icon="📅" value={creneau.label} />
        <TicketRow icon="🚗" value={transport} />
      </motion.div>

      <motion.div
        className="w-full max-w-[360px] mt-5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={sendWhatsApp}
          className="w-full py-5 rounded-2xl bg-wa text-white font-display text-lg font-bold shadow-wa active:scale-95 transition-transform"
        >
          Envoyer mes choix par WhatsApp 💌
        </button>
      </motion.div>
    </motion.div>
  )
}

function TicketRow({ icon, value }) {
  return (
    <div className="flex gap-2.5 items-start mb-3 text-[13px]">
      <span className="text-base shrink-0 mt-0.5">{icon}</span>
      <span className="text-[#F8F4EE] leading-snug">{value}</span>
    </div>
  )
}
