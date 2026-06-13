'use client'
import { useState } from 'react'
import ModeToggle from '@/components/ui/ModeToggle'
import MenuGrid from '@/components/ui/MenuGrid'
import CreneauxPicker from '@/components/ui/CreneauxPicker'
import TransportPicker from '@/components/ui/TransportPicker'
import PreviewCard from '@/components/ui/PreviewCard'
import { DEFAULT_MENUS } from '@/lib/constants'
import { buildInviteUrl } from '@/lib/encode'

export default function CreatePage() {
  const [mode, setMode] = useState('romantic')
  const [inviteName, setInviteName] = useState('')
  const [invitePhone, setInvitePhone] = useState('')
  const [orgPhone, setOrgPhone] = useState('')
  const [selectedMenus, setSelectedMenus] = useState(DEFAULT_MENUS.map(m => m.label))
  const [customMenus, setCustomMenus] = useState([])
  const [creneaux, setCreneaux] = useState([{ id: 1, date: '', time: '' }])
  const [transport, setTransport] = useState('Zemjan\nKekeno')
  const [generatedUrl, setGeneratedUrl] = useState(null)
  const [copied, setCopied] = useState(false)

  const allMenus = [...selectedMenus, ...customMenus]
  const filledCreneaux = creneaux.filter(c => c.date && c.time)

  const isValid = inviteName.trim() && orgPhone.trim() && allMenus.length > 0 && filledCreneaux.length > 0

  const toggleMenu = (label) => {
    setSelectedMenus(prev =>
      prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]
    )
  }

  const addCreneau = () => {
    if (creneaux.length >= 3) return
    setCreneaux(prev => [...prev, { id: Date.now(), date: '', time: '' }])
  }

  const removeCreneau = (id) => {
    setCreneaux(prev => prev.filter(c => c.id !== id))
  }

  const updateCreneau = (id, field, value) => {
    setCreneaux(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const generate = () => {
    const config = {
      mode,
      name: inviteName.trim(),
      phone: '229' + orgPhone.trim().replace(/\s/g, ''),
      menus: allMenus,
      creneaux: filledCreneaux.map(c => ({ date: c.date, time: c.time })),
      transport,
    }
    const url = buildInviteUrl(config)
    setGeneratedUrl(url)
    setTimeout(() => {
      document.getElementById('result-box')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareWA = () => {
    const name = inviteName.trim()
    const msg = mode === 'romantic'
      ? `💌 Hey ${name} ! J'ai préparé quelque chose de spécial pour toi...\n\n👉 ${generatedUrl}`
      : `🎉 Hey ${name} ! Un plan s'organise, viens voir !\n\n👉 ${generatedUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className={`min-h-screen bg-bg pb-20 theme-transition ${mode === 'friend' ? 'theme-friend' : ''}`}>

      {/* Header */}
      <div className="pt-6 px-5 pb-0 text-center">
        <p className="text-[11px] tracking-widest uppercase text-muted mb-2">Nouvelle invitation</p>
        <h1 className="font-display text-[26px] leading-snug">
          Crée ton<br />
          <span className="text-primary theme-transition">
            {mode === 'romantic' ? 'invitation romantique' : 'sortie entre amis'}
          </span>
        </h1>
      </div>

      {/* Mode */}
      <Section label="Type d'invitation">
        <ModeToggle mode={mode} onChange={setMode} />
      </Section>

      {/* Infos invité */}
      <Section label="Qui invites-tu ?">
        <input
          className="input-base mb-2.5"
          type="text"
          placeholder="Prénom de l'invité(e)"
          value={inviteName}
          onChange={e => setInviteName(e.target.value)}
        />
        <div className="flex gap-2.5">
          <div className="bg-inputbg border-2 border-border rounded-xl px-3.5 py-3.5 text-muted text-sm font-semibold whitespace-nowrap flex items-center gap-1.5">
            🇧🇯 +229
          </div>
          <input
            className="input-base flex-1"
            type="tel"
            placeholder="6X XX XX XX XX"
            value={invitePhone}
            onChange={e => setInvitePhone(e.target.value)}
          />
        </div>
      </Section>

      {/* Ton numéro */}
      <Section label="Ton numéro WhatsApp (tu recevras les réponses ici)">
        <div className="flex gap-2.5">
          <div className="bg-inputbg border-2 border-border rounded-xl px-3.5 py-3.5 text-muted text-sm font-semibold whitespace-nowrap flex items-center gap-1.5">
            🇧🇯 +229
          </div>
          <input
            className="input-base flex-1"
            type="tel"
            placeholder="6X XX XX XX XX"
            value={orgPhone}
            onChange={e => setOrgPhone(e.target.value)}
          />
        </div>
      </Section>

      {/* Menus */}
      <Section label="Menus proposés">
        <MenuGrid
          selected={selectedMenus}
          onToggle={toggleMenu}
          customMenus={customMenus}
          onAddCustom={m => setCustomMenus(prev => [...prev, m])}
          onRemoveCustom={i => setCustomMenus(prev => prev.filter((_, idx) => idx !== i))}
        />
      </Section>

      {/* Créneaux */}
      <Section label="Tes créneaux proposés (3 max)">
        <CreneauxPicker
          creneaux={creneaux}
          onAdd={addCreneau}
          onRemove={removeCreneau}
          onUpdate={updateCreneau}
        />
      </Section>

      {/* Transport */}
      <Section label="Transport suggéré">
        <TransportPicker selected={transport} onSelect={setTransport} />
      </Section>

      {/* Preview + Generate */}
      <div className="px-5 pt-7">
        <PreviewCard
          name={inviteName}
          menus={allMenus}
          creneaux={creneaux}
          transport={transport}
        />
        <button
          onClick={generate}
          disabled={!isValid}
          className={`w-full py-[18px] rounded-2xl font-display text-[17px] font-bold transition-all duration-300
            ${isValid
              ? 'bg-primary text-bg shadow-primary active:scale-95'
              : 'bg-border text-muted cursor-not-allowed'}`}
        >
          Générer le lien d'invitation 🔗
        </button>

        {/* Result box */}
        {generatedUrl && (
          <div id="result-box" className="bg-card border-2 border-primary rounded-2xl p-5 mt-5 glow-border theme-transition">
            <p className="font-display text-[15px] text-primary mb-3 theme-transition">
              🔗 Ton lien est prêt — copie et envoie !
            </p>
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-inputbg border border-border rounded-xl px-3.5 py-3 text-[12px] text-primary break-all font-mono mb-3.5"
            >
              {generatedUrl}
            </a>
            <div className="flex gap-2.5">
              <button
                onClick={copyLink}
                className="flex-1 py-3.5 rounded-xl bg-inputbg border-2 border-border text-[#F8F4EE] text-[13px] font-semibold"
              >
                {copied ? '✅ Copié !' : '📋 Copier le lien'}
              </button>
              <button
                onClick={shareWA}
                className="flex-1 py-3.5 rounded-xl bg-wa text-white text-[13px] font-semibold"
              >
                WhatsApp 💬
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="h-10" />
    </div>
  )
}

function Section({ label, children }) {
  return (
    <div className="px-5 pt-5">
      <p className="text-[11px] tracking-widest uppercase text-muted mb-2.5">{label}</p>
      {children}
    </div>
  )
}
