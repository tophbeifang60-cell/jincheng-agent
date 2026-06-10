const FOOD_IMAGE_MAP = {
  '三大炮': '/images/foods/sandapao-1.jpg',
  '钟水饺': '/images/foods/zhong-dumplings-1.png',
  '担担面': '/images/foods/dandan-noodles-1.png',
  '龙抄手': '/images/foods/long-wontons-1.jpg',
  '兔头': '/images/foods/rabbit-head-1.png',
  '冰粉': '/images/foods/bingfen-jelly-1.png',
  '肥肠粉': '/images/foods/feichang-noodles-1.png',
  '糖油果子': '/images/foods/sandapao-2.jpg',
  '钵钵鸡': '/images/foods/bobo-chicken-1.jpg',
  '麻婆豆腐': '/images/foods/mapo-tofu-1.png',
  '成都牛油老火锅': '/images/foods/chengdu-hotpot-1.png',
}

const STARS = (n) => Array.from({ length: 5 }, (_, i) => (
  <span key={i} style={{ color: i < n ? '#D4A017' : '#ccc', fontSize: 11 }}>★</span>
))

export default function FoodPanel({ spot, onClose }) {
  return (
    <div className="anim-pop" style={{
      background: 'var(--card)',
      border: '1.5px solid var(--border)',
      borderRadius: 8,
      padding: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', fontFamily: 'serif' }}>
          {spot.name} · 附近美食
        </span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-light)', fontSize: 13 }}>✕</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {spot.foodDetails.map(f => {
          const imgSrc = FOOD_IMAGE_MAP[f.name]
          return (
            <div key={f.name} style={{
              display: 'flex', gap: 10, background: '#FFFDF8',
              borderRadius: 6, border: '1px solid var(--border-light)', overflow: 'hidden',
            }}>
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={f.name}
                  style={{ width: 64, height: 64, objectFit: 'cover', flexShrink: 0 }}
                  onError={(e) => { if (!e.target.src.includes('fallback')) e.target.src = '/images/fallback.jpg' }}
                />
              ) : (
                <div style={{
                  width: 64, height: 64, flexShrink: 0,
                  background: 'var(--paper-deep)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, color: 'var(--ink-light)',
                }}>🍽</div>
              )}
              <div style={{ padding: '7px 8px 7px 0', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', fontFamily: 'serif' }}>{f.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', flexShrink: 0, marginLeft: 6 }}>{f.price}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '2px 0' }}>
                  <span>{STARS(f.stars)}</span>
                  <span style={{ fontSize: 10, color: 'var(--ink-light)' }}>{f.distance}</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--ink-light)', margin: 0, fontFamily: 'serif', lineHeight: 1.4 }}>{f.reason}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
