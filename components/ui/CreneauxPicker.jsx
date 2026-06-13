'use client'

export default function CreneauxPicker({ creneaux, onAdd, onRemove, onUpdate }) {
  return (
    <div className="flex flex-col gap-2">
      {creneaux.map((c, i) => {
        const filled = c.date && c.time
        return (
          <div
            key={c.id}
            className={`flex gap-2 items-center bg-card border-2 rounded-2xl px-3.5 py-3 transition-all duration-250
              ${filled ? 'border-primary' : 'border-border'}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all duration-250
              ${filled ? 'bg-primary text-bg' : 'bg-border text-muted'}`}>
              {i + 1}
            </div>
            <input
              type="date"
              value={c.date}
              onChange={(e) => onUpdate(c.id, 'date', e.target.value)}
              className="flex-[1.4] min-w-0"
            />
            <span className="text-muted text-xs">à</span>
            <input
              type="time"
              value={c.time}
              onChange={(e) => onUpdate(c.id, 'time', e.target.value)}
              className="flex-1 min-w-0"
            />
            <button
              onClick={() => onRemove(c.id)}
              className="text-muted text-lg px-1"
            >
              ×
            </button>
          </div>
        )
      })}

      {creneaux.length < 3 && (
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-border bg-transparent text-muted text-[13px] font-semibold mt-1"
        >
          + Ajouter un créneau
        </button>
      )}
    </div>
  )
}
