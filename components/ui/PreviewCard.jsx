'use client'

export default function PreviewCard({ name, menus, creneaux, transport }) {
  return (
    <div className="bg-card border-2 border-primary rounded-2xl p-5 glow-border theme-transition mb-5">
      <p className="font-display text-[15px] text-primary mb-3.5 theme-transition">✨ Aperçu de l'invitation</p>

      <Row icon="👤" value={name} empty="Prénom non renseigné" />
      <Row icon="🍽️" value={menus.length ? menus.join(' · ') : ''} empty="Sélectionne des menus" />
      <Row
        icon="📅"
        value={
          creneaux.filter(c => c.date && c.time).length
            ? creneaux
                .filter(c => c.date && c.time)
                .map(c => {
                  const d = new Date(`${c.date}T${c.time}`)
                  return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }) + ' ' + c.time
                })
                .join(' · ')
            : ''
        }
        empty="Aucun créneau ajouté"
      />
      <Row icon="🚗" value={transport || '—'} />
    </div>
  )
}

function Row({ icon, value, empty }) {
  return (
    <div className="flex gap-2.5 items-start mb-2.5 text-[13px]">
      <span className="text-base shrink-0 mt-0.5">{icon}</span>
      {value
        ? <span className="text-[#F8F4EE] leading-snug">{value}</span>
        : <span className="text-muted italic">{empty}</span>
      }
    </div>
  )
}
