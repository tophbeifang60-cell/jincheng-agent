const MASKS = [
  { color: '#B33A2B', name: '朱红面', meaning: '忠勇' },
  { color: '#2C2C2C', name: '黑脸',   meaning: '刚烈' },
  { color: '#D4A017', name: '金面',   meaning: '神仙' },
  { color: '#3B5998', name: '蓝面',   meaning: '阴险' },
  { color: '#F5F0E8', name: '白脸',   meaning: '奸诈' },
  { color: '#4A7A3A', name: '绿面',   meaning: '莽撞' },
]

function MaskIcon({ color, name, meaning }) {
  const textFill = color === '#F5F0E8' ? '#4A4036' : '#fff'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <svg width="38" height="46" viewBox="0 0 38 46">
        <ellipse cx="19" cy="22" rx="16" ry="20" fill={color}/>
        <ellipse cx="19" cy="22" rx="16" ry="20" fill="none" stroke="#D4A017" strokeWidth="1.2"/>
        <ellipse cx="12" cy="16" rx="5" ry="7" fill="white" opacity=".88"/>
        <ellipse cx="26" cy="16" rx="5" ry="7" fill="white" opacity=".88"/>
        <circle cx="12" cy="17" r="2.5" fill="#1a1a1a"/>
        <circle cx="26" cy="17" r="2.5" fill="#1a1a1a"/>
        <path d="M10 30 Q19 37 28 30" fill="none" stroke="#D4A017" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      <span style={{ fontSize: 10, color: '#B33A2B', fontFamily: 'serif' }}>{name}</span>
      <span style={{ fontSize: 9, color: 'var(--ink-light)', fontFamily: 'serif' }}>{meaning}</span>
    </div>
  )
}

export default function OperaPanel({ onClose, onPandaMsg }) {
  return (
    <div className="anim-pop" style={{
      background: 'var(--card)',
      border: '1.5px solid var(--border)',
      borderRadius: 8,
      padding: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--red)', fontFamily: 'serif', letterSpacing: 3 }}>川剧变脸</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-light)', fontSize: 13 }}>✕</button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <img
          src="/images/culture/sichuan-opera-1.jpg"
          alt="川剧变脸"
          style={{ width: 90, height: 110, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
          onError={(e) => { if (!e.target.src.includes('fallback')) e.target.src = '/images/fallback.jpg' }}
        />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'serif', lineHeight: 1.6, margin: 0 }}>
            川剧变脸是国家二级保护技术，演员在极短时间内连续变换不同脸谱。
            技法分"抹脸"、"吹脸"、"扯脸"，其中"扯脸"可一气变 7 张。
          </p>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: 'var(--ink-light)', letterSpacing: 2, marginBottom: 8, fontFamily: 'serif' }}>六种经典脸谱</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 4 }}>
          {MASKS.map(m => <MaskIcon key={m.name} {...m}/>)}
        </div>
      </div>

      <div style={{
        border: '1px solid var(--border)', borderRadius: 6,
        background: 'var(--paper)', padding: '12px 0',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        marginBottom: 10, cursor: 'pointer',
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#B33A2B" opacity=".7"/>
          <circle cx="16" cy="16" r="14" fill="none" stroke="#D4A017" strokeWidth="1.2"/>
          <polygon points="13,10 24,16 13,22" fill="white"/>
        </svg>
        <span style={{ fontSize: 11, color: 'var(--red)', fontFamily: 'serif' }}>变脸精彩片段</span>
        <span style={{ fontSize: 10, color: 'var(--ink-light)', fontFamily: 'serif' }}>mock — 接入视频后替换</span>
      </div>

      <button className="btn-dark" style={{ width: '100%', fontSize: 12 }}
        onClick={() => onPandaMsg('川剧最厉害的不只是变脸，还有唱腔、喷火和身段，每一样都是几十年的功夫。')}>
        让熊猫讲解变脸秘密
      </button>
    </div>
  )
}
