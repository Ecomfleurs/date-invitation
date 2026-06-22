'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { decodeConfig } from '@/lib/encode'
import Screen1Accroche from '@/components/screens/Screen1Accroche'

const Screen2Menu = dynamic(() => import('@/components/screens/Screen2Menu'))
const Screen3Creneau = dynamic(() => import('@/components/screens/Screen3Creneau'))
const Screen4Recap = dynamic(() => import('@/components/screens/Screen4Recap'))

export default function InvitePage() {
  const searchParams = useSearchParams()
  const [config, setConfig] = useState(null)
  const [error, setError] = useState(false)
  const [screen, setScreen] = useState(1)
  const [answers, setAnswers] = useState({ menu: '', creneau: null })

  useEffect(() => {
    const cfg = searchParams.get('config')
    if (!cfg) { setError(true); return }
    const decoded = decodeConfig(cfg)
    if (!decoded) { setError(true); return }
    setConfig(decoded)
  }, [searchParams])

  // Applique le thème DaisyUI sur <html> pour changer l'ambiance accent color
  useEffect(() => {
    if (!config) return
    if (config.mode === 'romantic' && config.theme) {
      document.documentElement.setAttribute('data-theme', config.theme)
      return () => document.documentElement.removeAttribute('data-theme')
    }
  }, [config])

  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center px-5 bg-bg text-center">
        <span className="text-5xl mb-4">😕</span>
        <h1 className="font-display text-2xl mb-2">Lien invalide</h1>
        <p className="text-muted text-sm">Ce lien d'invitation ne fonctionne pas.<br />Demande un nouveau lien.</p>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isRomantic = config.mode === 'romantic'

  return (
    <div className={`bg-bg theme-transition ${isRomantic ? '' : 'theme-friend'}`}>
      {screen === 1 && (
        <Screen1Accroche config={config} onYes={() => setScreen(2)} />
      )}
      {screen === 2 && (
        <Screen2Menu
          config={config}
          onSelect={(menu) => {
            setAnswers(prev => ({ ...prev, menu }))
            setScreen(3)
          }}
        />
      )}
      {screen === 3 && (
        <Screen3Creneau
          config={config}
          onSelect={(creneau) => {
            setAnswers(prev => ({ ...prev, creneau }))
            setScreen(4)
          }}
        />
      )}
      {screen === 4 && (
        <Screen4Recap config={config} answers={answers} />
      )}
    </div>
  )
}
