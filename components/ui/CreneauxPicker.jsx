'use client'

export default function CreneauxPicker({ creneaux, onAdd, onRemove, onUpdate }) {
  return (
    <div className="flex flex-col gap-2.5">
      {creneaux.map((c, i) => {
        const filled = c.date && c.time
        return (
          <div
            key={c.id}
            className={`bg-card border-2 rounded-2xl px-4 pt-3.5 pb-4 transition-colors duration-300
              ${filled ? 'border-primary' : 'border-border'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0
                ${filled ? 'bg-primary text-bg' : 'bg-border text-muted'}`}>
                {i + 1}
              </div>
              <button
                onClick={() => onRemove(c.id)}
                className="text-muted text-2xl leading-none w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 bg-inputbg border border-border rounded-xl px-4 py-3.5 cursor-pointer">
                <span className="text-muted text-[11px] uppercase tracking-wider w-12 shrink-0">Date</span>
                <input
                  type="date"
                  value={c.date}
                  onChange={(e) => onUpdate(c.id, 'date', e.target.value)}
                  className="flex-1 min-w-0 bg-transparent text-[#F8F4EE] text-[14px] outline-none"
                />
              </label>
              <label className="flex items-center gap-3 bg-inputbg border border-border rounded-xl px-4 py-3.5 cursor-pointer">
                <span className="text-muted text-[11px] uppercase tracking-wider w-12 shrink-0">Heure</span>
                <input
                  type="time"
                  value={c.time}
                  onChange={(e) => onUpdate(c.id, 'time', e.target.value)}
                  className="flex-1 min-w-0 bg-transparent text-[#F8F4EE] text-[14px] outline-none"
                />
              </label>
            </div>
          </div>
        )
      })}

      {creneaux.length < 3 && (
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-border bg-transparent text-muted text-[13px] font-semibold"
        >
          + Ajouter un créneau
        </button>
      )}
    </div>
  )
}
