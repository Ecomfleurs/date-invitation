'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildWAMessage, buildShareMessage } from '@/lib/encode'
import { trackEvent } from '@/lib/analytics'

export default function Screen4Recap({ config, answers }) {
  const { menu, creneau } = answers
  const isRomantic = config.mode === 'romantic'
  const [copied, setCopied] = useState(false)
  const [shareMsg, setShareMsg] = useState(null)

  const sendWhatsApp = () => {
    trackEvent('whatsapp_sent', { mode: config.mode })
    const msg = buildWAMessage({
      config,
      menu,
      creneauLabel: creneau.label,
      suggestion: creneau.isSuggestion ? creneau.value : '',
    })
    const phone = config.phone.replace(/\D/g, '')
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const shareOther = async () => {
    trackEvent('share_other_clicked', { mode: config.mode })
    const msg = buildShareMessage({
      config,
      menu,
      creneauLabel: creneau.label,
      suggestion: creneau.isSuggestion ? creneau.value : '',
    })
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ text: msg })
        trackEvent('share_other_sent', { mode: config.mode })
      } catch {}
      return
    }
    try {
      await navigator.clipboard.writeText(msg)
      trackEvent('share_other_copied', { mode: config.mode })
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      trackEvent('share_other_fallback_shown', { mode: config.mode })
      setShareMsg(msg)
    }
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

        <button
          onClick={shareOther}
          className="w-full mt-3 py-4 rounded-2xl bg-inputbg border-2 border-border text-[#F8F4EE] font-display text-[15px] font-semibold active:scale-95 transition-transform"
        >
          Partager autrement 📤
        </button>

        <AnimatePresence>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-[12px] text-muted mt-2.5"
            >
              ✅ Message copié ! Colle-le dans Messenger, SMS...
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {shareMsg && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3"
            >
              <p className="text-center text-[12px] text-muted mb-1.5">
                Sélectionne et copie ton message :
              </p>
              <textarea
                readOnly
                value={shareMsg}
                onFocus={e => e.target.select()}
                rows={4}
                className="w-full p-3 rounded-xl bg-inputbg border-2 border-border text-[#F8F4EE] text-[13px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
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
