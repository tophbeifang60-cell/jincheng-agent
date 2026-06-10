import { FOOD_GALLERY } from '../data/foods'

const STARS = (n) => Array.from({ length: 5 }, (_, i) => (
  <span key={i} style={{ color: i < Math.round(n) ? '#D4A017' : 'var(--border-light)', fontSize: 10 }}>★</span>
))

export default function FoodGallery() {
  return (
    <section style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 3, height: 16, background: 'var(--red)', borderRadius: 2 }}/>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--red)', fontFamily: 'serif', letterSpacing: 3 }}>成都美食图鉴</span>
      </div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
        {FOOD_GALLERY.map(f => (
          <div key={f.id} style={{
            flexShrink: 0, width: 148,
            background: 'var(--card)',
            border: '1px solid var(--border-light)',
            borderRadius: 8, overflow: 'hidden',
            transition: 'border-color .18s, transform .18s, box-shadow .18s',
            boxShadow: '0 1px 4px rgba(0,0,0,.04)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--red)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 4px 14px rgba(179,58,43,.1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-light)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,.04)' }}
          >
            <img
              src={f.image}
              alt={f.name}
              style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }}
              onError={(e) => { if (!e.target.src.includes('fallback')) e.target.src = '/images/fallback.jpg' }}
            />
            <div style={{ padding: '10px 11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', fontFamily: 'serif' }}>{f.name}</span>
                <span style={{ fontSize: 12, color: 'var(--red)', fontWeight: 700 }}>{f.price}</span>
              </div>
              <div style={{ marginBottom: 3 }}>{STARS(4)}</div>
              <p style={{ fontSize: 10, color: 'var(--ink-light)', fontFamily: 'serif', lineHeight: 1.5, margin: 0 }}>{f.intro}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
