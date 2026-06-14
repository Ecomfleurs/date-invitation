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
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {items.map((item) => {
          const isSel = item.selected
          const isUploading = uploading === item.id
          const defaultDef = DEFAULT_MENUS.find(d => d.label === item.label)
          const isCustom = !defaultDef

          return (
            <div
              key={item.id}
              className={`relative bg-card border-2 rounded-2xl p-3.5 text-center transition-colors duration-300
                ${isSel ? 'border-primary bg-glow' : 'border-border'}`}
            >
              {/* Remove button for custom menus */}
              {isCustom && (
                <button
                  onClick={() => onRemove(item.id)}
                  className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center text-muted text-base leading-none"
                >
                  ×
                </button>
              )}

              {/* Selected checkmark */}
              {isSel && (
                <span className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center text-[9px] font-black text-bg">
                  ✓
                </span>
              )}

              {/* Image or emoji — click to toggle selection */}
              <div onClick={() => onToggle(item.id)} className="cursor-pointer">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-20 object-cover rounded-xl mb-1.5"
                  />
                ) : (
                  <span className="text-2xl block mb-1.5">{defaultDef?.emoji || '🍽️'}</span>
                )}
                <span className={`text-[11px] font-semibold leading-tight block ${isSel ? 'text-[#F8F4EE]' : 'text-muted'}`}>
                  {item.label}
                </span>
              </div>

              {/* Upload button */}
              <button
                onClick={() => fileRefs.current[item.id]?.click()}
                className="mt-2 text-muted text-[10px] font-medium hover:text-primary transition-colors"
              >
                {item.image ? '🔄 Changer' : '📷 Ajouter photo'}
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={el => { fileRefs.current[item.id] = el }}
                onChange={e => handleFile(item.id, e.target.files[0])}
              />

              {/* Upload spinner overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-bg/70 flex items-center justify-center rounded-2xl">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {canAdd && !showAdd && (
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-dashed border-border text-muted text-[13px] font-semibold"
        >
          + Ajouter un menu ({items.length}/10)
        </button>
      )}

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
          <button
            onClick={handleAdd}
            className="bg-glow border-2 border-primary rounded-xl px-4 text-primary text-2xl"
          >
            +
          </button>
          <button
            onClick={() => { setShowAdd(false); setNewLabel('') }}
            className="text-muted text-xl px-2"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
