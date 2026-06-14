'use client'
import { useState, useRef } from 'react'
import { DEFAULT_MENUS } from '@/lib/constants'

async function uploadToImgBB(file) {
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  const form = new FormData()
  form.append('key', process.env.NEXT_PUBLIC_IMGBB_API_KEY)
  form.append('image', base64)
  const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: form })
  const { data } = await res.json()
  return data.display_url
}

export default function MenuGrid({ items, onToggle, onAddCustom, onRemove, onImageUpdate }) {
  const [newLabel, setNewLabel] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [uploading, setUploading] = useState(null)
  const fileRefs = useRef({})

  const canAdd = items.length < 10

  const handleFile = async (id, file) => {
    if (!file) return
    setUploading(id)
    try {
      const url = await uploadToImgBB(file)
      onImageUpdate(id, url)
    } catch {
      alert('Erreur upload. Vérifie ta connexion et la clé ImgBB dans Vercel.')
    } finally {
      setUploading(null)
    }
  }

  const handleAdd = () => {
    const label = newLabel.trim()
    if (!label) return
    onAddCustom({ label, image: null })
    setNewLabel('')
    setShowAdd(false)
  }

  return (
    <div>
      <div className="grid grid-cols-5 gap-x-3 gap-y-4 mb-4">
        {items.map((item) => {
          const isSel = item.selected
          const isUploading = uploading === item.id
          const defaultDef = DEFAULT_MENUS.find(d => d.label === item.label)
          const isCustom = !defaultDef

          return (
            <div key={item.id} className="flex flex-col items-center gap-1.5">
              <div className="relative w-full aspect-square">
                {/* Circle */}
                <div
                  onClick={() => onToggle(item.id)}
                  className={`w-full h-full rounded-full border-[3px] overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-300
                    ${isSel ? 'border-primary bg-glow' : 'border-border bg-card'}`}
                >
                  {item.image
                    ? <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                    : <span className="text-3xl">{defaultDef?.emoji || '🍽️'}</span>
                  }
                </div>

                {/* Selected checkmark */}
                {isSel && (
                  <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[9px] font-black text-bg">
                    ✓
                  </div>
                )}

                {/* Camera button */}
                <button
                  onClick={() => fileRefs.current[item.id]?.click()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-card border-2 border-border rounded-full flex items-center justify-center text-xs"
                >
                  📷
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={el => { fileRefs.current[item.id] = el }}
                  onChange={e => handleFile(item.id, e.target.files[0])}
                />

                {/* Remove button for all menus */}
                <button
                  onClick={() => onRemove(item.id)}
                  className="absolute -top-0.5 -left-0.5 w-5 h-5 bg-card border-2 border-border rounded-full flex items-center justify-center text-muted text-xs leading-none"
                >
                  ×
                </button>

                {/* Upload spinner */}
                {isUploading && (
                  <div className="absolute inset-0 rounded-full bg-bg/70 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] font-semibold text-center leading-tight w-full line-clamp-2 ${isSel ? 'text-[#F8F4EE]' : 'text-muted'}`}>
                {item.label}
              </span>
            </div>
          )
        })}

        {/* Add button as circle */}
        {canAdd && !showAdd && (
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => setShowAdd(true)}
              className="w-full aspect-square rounded-full border-[3px] border-dashed border-border bg-card flex items-center justify-center text-muted text-2xl"
            >
              +
            </button>
            <span className="text-[10px] text-muted">{items.length}/10</span>
          </div>
        )}
      </div>

      {showAdd && (
        <div className="flex gap-2.5">
          <input
            className="input-base flex-1"
            type="text"
            placeholder="Ex: Foutou poisson"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
          <button onClick={handleAdd} className="bg-glow border-2 border-primary rounded-xl px-4 text-primary text-2xl">+</button>
          <button onClick={() => { setShowAdd(false); setNewLabel('') }} className="text-muted text-xl px-2">×</button>
        </div>
      )}
    </div>
  )
}
