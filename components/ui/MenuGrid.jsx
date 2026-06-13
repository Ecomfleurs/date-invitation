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
      alert('Erreur upload. Vérifie ta connexion et la clé ImgBB.')
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
              className={`relative bg-card border-2 rounded-2xl overflow-hidden transition-colors duration-300
                ${isSel ? 'border-primary' : 'border-border'}`}
            >
              {/* Image / emoji area */}
              <div
                onClick={() => onToggle(item.id)}
                className="relative w-full aspect-square flex items-center justify-center bg-inputbg cursor-pointer"
              >
                {item.image
                  ? <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                  : <span className="text-4xl">{defaultDef?.emoji || '🍽️'}</span>
                }
                {isSel && (
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[9px] font-black text-bg">
                    ✓
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-bg/70 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Label + actions */}
              <div className="px-2.5 py-2 flex items-center gap-1">
                <span
                  onClick={() => onToggle(item.id)}
                  className={`text-[11px] font-semibold leading-tight flex-1 cursor-pointer line-clamp-2 ${isSel ? 'text-[#F8F4EE]' : 'text-muted'}`}
                >
                  {item.label}
                </span>
                <button
                  onClick={() => fileRefs.current[item.id]?.click()}
                  className="w-7 h-7 flex items-center justify-center text-base shrink-0"
                  title="Ajouter une photo"
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
                {isCustom && (
                  <button
                    onClick={() => onRemove(item.id)}
                    className="w-7 h-7 flex items-center justify-center text-muted text-lg leading-none shrink-0"
                  >
                    ×
                  </button>
                )}
              </div>
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
