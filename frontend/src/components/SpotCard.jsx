import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FoodPanel from './FoodPanel'
import OperaPanel from './OperaPanel'

export default function SpotCard({ spot, onPandaMsg, onClose }) {
  const navigate = useNavigate()
  const [panel, setPanel] = useState(null)
  const [added, setAdded] = useState(false)

  if (!spot) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24 }}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="24" stroke="var(--border)" strokeWidth="1"/>
        <circle cx="26" cy="26" r="16" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4 3"/>
        <path d="M26 16 L26 30 M26 34 L26 36" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
      </svg>
      <p style={{ fontSize: 12, textAlign: 'center', fontFamily: 'serif', color: 'var(--ink-light)', letterSpacing: 2, lineHeight: 1.8 }}>
        点击地图景点<br/>查看详情
      </p>
    </div>
  )

  const addToRoute = () => {
    const saved = JSON.parse(localStorage.getItem('selectedSpots') || '[]')
    if (!saved.find(s => s.id === spot.id))
      localStorage.setItem('selectedSpots', JSON.stringify([...saved, spot]))
    setAdded(true)
  }

  const stars = (n) => Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < Math.round(n) ? '#D4A017' : 'var(--border-light)', fontSize: 11 }}>★</span>
  ))

  return (
    <div className="anim-pop" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <img
          src={spot.cover}
          alt={spot.name}
          style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block' }}
          onError={(e) => { if (!e.target.src.includes('fallback')) e.target.src = '/images/fallback.jpg' }}
        />
        <button onClick={onClose} style={{
          position: 'absolute', top: 7, right: 7,
          background: 'rgba(255,255,255,.85)', color: 'var(--ink)',
          border: '1px solid var(--border)', borderRadius: 4,
          width: 24, height: 24, cursor: 'pointer', fontSize: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      </div>

      {spot.gallery && spot.gallery.length > 0 && (
        <div style={{ display: 'flex', gap: 4 }}>
          {spot.gallery.slice(0, 3).map((img, i) => (
            <div key={i} style={{
              flex: 1, height: 44, borderRadius: 4, overflow: 'hidden',
              border: '1px solid var(--border-light)',
            }}>
              <img
                src={img}
                alt={`${spot.name} ${i + 2}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { if (!e.target.src.includes('fallback')) e.target.src = '/images/fallback.jpg' }}
              />
            </div>
          ))}
        </div>
      )}

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--red)', fontFamily: 'serif', margin: 0, letterSpacing: 2 }}>{spot.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
            {stars(spot.rating)}
            <span style={{ fontSize: 10, color: 'var(--ink-light)', marginLeft: 2 }}>{spot.rating}</span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-light)', margin: '4px 0 0', fontFamily: 'serif', lineHeight: 1.6 }}>{spot.shortIntro}</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {spot.vibes.map(v => (
          <span key={v} style={{
            fontSize: 10, padding: '2px 7px', borderRadius: 20,
            border: '1px solid var(--red)', color: 'var(--red)',
            fontFamily: 'serif', background: 'rgba(179,58,43,.04)',
          }}>{v}</span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {[['停留时间', spot.duration], ['适合人群', spot.suitableFor]].map(([k, v]) => (
          <div key={k} style={{ background: 'rgba(212,160,23,.06)', borderRadius: 4, padding: '6px 9px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: 10, color: 'var(--ink-light)', marginBottom: 2, fontFamily: 'serif', letterSpacing: 1 }}>{k}</div>
            <div style={{ fontSize: 11, color: 'var(--ink)', fontFamily: 'serif', lineHeight: 1.4 }}>{v}</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ fontSize: 10, color: 'var(--ink-light)', marginBottom: 5, fontFamily: 'serif', letterSpacing: 2 }}>推荐玩法</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {spot.activities.map((a, i) => (
            <span key={a} style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 3,
              background: 'rgba(179,58,43,.04)', border: '1px solid var(--border)',
              color: 'var(--ink)', fontFamily: 'serif',
            }}>{spot.activityIcons?.[i] || '·'} {a}</span>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(212,160,23,.06)', borderLeft: '2px solid var(--gold)', padding: '6px 10px', borderRadius: '0 4px 4px 0' }}>
        <div style={{ fontSize: 10, color: 'var(--ink-light)', marginBottom: 2, fontFamily: 'serif', letterSpacing: 1 }}>拍照建议</div>
        <p style={{ fontSize: 11, color: 'var(--ink)', fontFamily: 'serif', margin: 0, lineHeight: 1.5 }}>{spot.photoTips}</p>
      </div>

      {panel === 'food'  && <FoodPanel  spot={spot} onClose={() => setPanel(null)}/>}
      {panel === 'opera' && <OperaPanel onClose={() => setPanel(null)} onPandaMsg={msg => { onPandaMsg?.(msg); setPanel(null) }}/>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 'auto' }}>
        <button className="btn-dark" onClick={() => onPandaMsg?.(spot.story)}>讲故事</button>
        <button className="btn-primary" onClick={addToRoute} style={added ? { background: '#4a7c3f', borderColor: '#4a7c3f' } : {}}>
          {added ? '已加入路线' : '加入路线'}
        </button>
        <button className="btn-dark" onClick={() => setPanel(p => p==='food' ? null : 'food')}>附近美食</button>
        {spot.hasOpera
          ? <button className="btn-dark" onClick={() => setPanel(p => p==='opera' ? null : 'opera')}>查看川剧</button>
          : <button className="btn-dark" onClick={() => navigate('/challenge')}>进入闯关</button>
        }
        <button className="btn-primary" style={{ gridColumn: 'span 2' }} onClick={() => navigate('/creative')}>生成文案</button>
      </div>
    </div>
  )
}
