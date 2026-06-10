import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PREFERENCES } from '../data/mockData'

export default function HomePage() {
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()

  const toggle = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-song font-bold text-shu-red tracking-widest mb-2">锦城蜀韵</h1>
      <p className="text-shu-brown font-song mb-8">选择你的游玩偏好，锦锦为你定制专属路线</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {PREFERENCES.map(p => (
          <button
            key={p.id}
            onClick={() => toggle(p.id)}
            className={`card-shu flex flex-col items-center py-6 gap-2 transition-all ${
              selected.includes(p.id) ? 'border-shu-red bg-red-50' : ''
            }`}
          >
            <span className="text-3xl">{p.icon}</span>
            <span className="font-song text-shu-ink">{p.label}</span>
          </button>
        ))}
      </div>
      <button
        className="btn-shu"
        disabled={selected.length === 0}
        onClick={() => navigate('/routes', { state: { prefs: selected } })}
      >
        开启蜀韵之旅 →
      </button>
    </main>
  )
}
