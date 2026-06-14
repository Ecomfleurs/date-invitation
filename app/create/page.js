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
  const [orgPhone, setOrgPhone] = useState('')
  const [menuItems, setMenuItems] = useState(
    DEFAULT_MENUS.map(m => ({ id: m.id, label: m.label, emoji: m.emoji, image: null, selected: true }))
  )
  const [creneaux, setCreneaux] = useState([{ id: 1, date: '', time: '' }])
  const [transport, setTransport] = useState('Zemjan\nKekeno')
  const [generatedUrl, setGeneratedUrl] = useState(null)
  const [copied, setCopied] = useState(false)

  const selectedMenuItems = menuItems.filter(m => m.selected)
  const filledCreneaux = creneaux.filter(c => c.date && c.time)
  const isValid = inviteName.trim() && orgPhone.trim() && selectedMenuItems.length > 0 && filledCreneaux.length > 0

  const toggleMenu = (id) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, selected: !m.selected } : m))
  }

  const addCustomMenu = ({ label, image }) => {
    setMenuItems(prev => [...prev, { id: `c-${Date.now()}`, label, emoji: '🍽️', image, selected: true }])
  }

  const removeMenu = (id) => {
    setMenuItems(prev => prev.filter(m => m.id !== id))
  }

  const updateMenuImage = (id, image) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, image } : m))
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
      menus: selectedMenuItems.map(m => ({ label: m.label, image: m.image })),
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
        <button
          onClick={() => {
            const msg = `💌 Invite quelqu'un de spécial à ta façon —\nmenu, date, sortie amis ou rendez-vous romantique... tout en un lien 🍽️💕\n\n👉 ${window.location.origin}/create`
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
          }}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wa text-white text-[12px] font-semibold"
        >
          Partager l'app 💬
        </button>
      </div>

      <Section label="Type d'invitation">
        <ModeToggle mode={mode} onChange={setMode} />
      </Section>

      <Section label="Qui invites-tu ?">
        <input
          className="input-base"
          type="text"
          placeholder="Prénom de l'invité(e)"
          value={inviteName}
          onChange={e => setInviteName(e.target.value)}
        />
      </Section>

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

      <Section label={`Menus proposés (${menuItems.length}/10)`}>
        <MenuGrid
          items={menuItems}
          onToggle={toggleMenu}
          onAddCustom={addCustomMenu}
          onRemove={removeMenu}
          onImageUpdate={updateMenuImage}
        />
      </Section>

      <Section label="Tes créneaux proposés (3 max)">
        <CreneauxPicker
          creneaux={creneaux}
          onAdd={addCreneau}
          onRemove={removeCreneau}
          onUpdate={updateCreneau}
        />
      </Section>

      <Section label="Transport suggéré">
        <TransportPicker selected={transport} onSelect={setTransport} />
      </Section>

      <div className="px-5 pt-7">
        <PreviewCard
          name={inviteName}
          menus={selectedMenuItems.map(m => m.label)}
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
