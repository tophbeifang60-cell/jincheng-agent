const GRADIENTS = {
  spot:  'linear-gradient(135deg, #8a4b2a 0%, #c93a2d 50%, #15162e 100%)',
  food:  'linear-gradient(135deg, #5a3010 0%, #8a4b2a 60%, #d99a00 100%)',
  opera: 'linear-gradient(135deg, #15162e 0%, #2d0a0a 50%, #c93a2d 100%)',
  green: 'linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 60%, #4a7a3a 100%)',
}

export default function ImagePlaceholder({ type = 'spot', label = '', width = '100%', height = 120, className = '' }) {
  const bg = GRADIENTS[type] || GRADIENTS.spot
  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: bg,
        borderRadius: 6,
        border: '1px solid rgba(217,154,0,.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* 暗角 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.45) 100%)',
        pointerEvents: 'none',
      }}/>
      {/* 细网格纹 */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.08 }}>
        <defs>
          <pattern id={`grid-${type}-${label}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0L0 0 0 16" fill="none" stroke="#d99a00" strokeWidth=".5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${type}-${label})`}/>
      </svg>
      {label && (
        <span style={{
          position: 'relative',
          color: 'rgba(255,255,255,.85)',
          fontSize: 12,
          fontFamily: 'Georgia, STSong, serif',
          letterSpacing: 2,
          textShadow: '0 1px 4px rgba(0,0,0,.6)',
          textAlign: 'center',
          padding: '0 8px',
        }}>{label}</span>
      )}
    </div>
  )
}
