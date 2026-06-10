import { useState } from 'react'
import { SPOTS } from '../data/spots'

function Bamboo({ x, y }) {
  return (
    <g opacity="0.30">
      {[0, 11, 22].map(dx => (
        <g key={dx}>
          <line x1={x+dx} y1={y+30} x2={x+dx} y2={y-30} stroke="#4a7a41" strokeWidth="2" strokeLinecap="round"/>
          {[-8, 4, 16].map((dy, i) => (
            <ellipse key={i} cx={x+dx+(i-1)*7} cy={y+dy} rx="7" ry="2.5"
              fill="#5a9a3a" transform={`rotate(38,${x+dx},${y+dy})`}/>
          ))}
        </g>
      ))}
    </g>
  )
}

function Mountain({ x, y, w, h, op = 0.30 }) {
  return (
    <g opacity={op}>
      <polygon points={`${x},${y} ${x+w/2},${y-h} ${x+w},${y}`} fill="#8B9DAF"/>
      <polygon points={`${x+w*.15},${y} ${x+w*.55},${y-h*.65} ${x+w*.9},${y}`} fill="#A0B0C0" opacity=".7"/>
      <line x1={x+w/2} y1={y-h} x2={x+w/2+7} y2={y-h+13} stroke="rgba(179,58,43,.35)" strokeWidth="1.2" strokeLinecap="round"/>
    </g>
  )
}

function Temple({ x, y, op = 0.35 }) {
  return (
    <g opacity={op}>
      <rect x={x-14} y={y} width="28" height="18" fill="#8B6F5A"/>
      <polygon points={`${x-19},${y} ${x},${y-17} ${x+19},${y}`} fill="#B33A2B" opacity=".8"/>
      <line x1={x-17} y1={y} x2={x+17} y2={y} stroke="#D4A017" strokeWidth="1" opacity=".5"/>
      <rect x={x-4} y={y+6} width="8" height="12" fill="#5A4030" opacity=".6"/>
    </g>
  )
}

function Lantern({ x, y }) {
  return (
    <g opacity="0.55">
      <line x1={x} y1={y-14} x2={x} y2={y-8} stroke="#D4A017" strokeWidth="1" opacity=".5"/>
      <ellipse cx={x} cy={y} rx="4.5" ry="7" fill="#B33A2B" opacity=".8"/>
      <ellipse cx={x} cy={y} rx="4.5" ry="7" fill="none" stroke="#D4A017" strokeWidth="0.8" opacity=".6"/>
      <line x1={x} y1={y+7} x2={x} y2={y+12} stroke="#D4A017" strokeWidth="0.8" opacity=".4"/>
    </g>
  )
}

function Cloud({ x, y, op = 0.10 }) {
  return (
    <g opacity={op} fill="#D4A017" stroke="none">
      <circle cx={x}    cy={y}    r="6"/>
      <circle cx={x+10} cy={y-4}  r="7"/>
      <circle cx={x+20} cy={y}    r="6"/>
      <circle cx={x+30} cy={y-3}  r="7"/>
      <circle cx={x+40} cy={y}    r="5"/>
      <rect   x={x}     y={y}     width="40" height="8"/>
    </g>
  )
}

export default function ScenicMap({ activeTag, selectedId, routeSpotIds = [], onSelect }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg viewBox="0 0 820 520" style={{ width: '100%', height: '100%', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="inkBg" cx="45%" cy="40%" r="70%">
            <stop offset="0%"   stopColor="#FFFDF8"/>
            <stop offset="60%"  stopColor="#F7F1E3"/>
            <stop offset="100%" stopColor="#EBE0C9"/>
          </radialGradient>
          <radialGradient id="spotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#D4A017" stopOpacity=".8"/>
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="spotGlowRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#B33A2B" stopOpacity=".8"/>
            <stop offset="100%" stopColor="#B33A2B" stopOpacity="0"/>
          </radialGradient>
          <filter id="softBlur"><feGaussianBlur stdDeviation="1.2"/></filter>
          <filter id="glow4">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow8">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect width="820" height="520" fill="url(#inkBg)"/>

        {/* 星点装饰 */}
        {[[80,60],[230,35],[420,25],[610,45],[760,30],[50,200],[780,180],[100,450],[720,420],[380,490],[560,460]].map(([sx,sy],i)=>(
          <circle key={i} cx={sx} cy={sy} r={i%3===0?1.2:.7} fill="#D4A017" opacity=".25"/>
        ))}

        <Cloud x={30}  y={78}  op={.08}/>
        <Cloud x={680} y={55}  op={.08}/>
        <Cloud x={30}  y={460} op={.06}/>
        <Cloud x={680} y={460} op={.06}/>
        <Cloud x={330} y={490} op={.05}/>

        {/* 外框双线 */}
        <rect x="5" y="5" width="810" height="510" fill="none" stroke="#B33A2B" strokeWidth="2" rx="4" opacity=".9"/>
        <rect x="10" y="10" width="800" height="500" fill="none" stroke="#D4A017" strokeWidth="1" rx="2" opacity=".7"/>

        {/* 角花 */}
        {[[18,18],[802,18],[18,502],[802,502]].map(([cx,cy],i)=>(
          <g key={i} filter="url(#glow4)">
            <polygon points={`${cx},${cy-10} ${cx+10},${cy} ${cx},${cy+10} ${cx-10},${cy}`}
              fill="#D4A017" opacity=".8"/>
            <polygon points={`${cx},${cy-5} ${cx+5},${cy} ${cx},${cy+5} ${cx-5},${cy}`}
              fill="#B33A2B" opacity=".9"/>
          </g>
        ))}

        <Mountain x={28}  y={170} w={110} h={75}/>
        <Mountain x={95}  y={165} w={85}  h={55} op={.22}/>
        <Mountain x={655} y={125} w={130} h={85}/>
        <Mountain x={720} y={135} w={95}  h={62} op={.22}/>
        <Mountain x={675} y={445} w={110} h={58} op={.25}/>

        {/* 锦江 */}
        <path d="M 55 350 Q 170 308 295 330 Q 405 352 515 308 Q 625 265 755 280"
          fill="none" stroke="#8BBDD4" strokeWidth="18" strokeLinecap="round" opacity=".5"/>
        <path d="M 55 350 Q 170 308 295 330 Q 405 352 515 308 Q 625 265 755 280"
          fill="none" stroke="#5A9FC0" strokeWidth="7" strokeLinecap="round" opacity=".6"/>
        <path d="M 55 350 Q 170 308 295 330 Q 405 352 515 308 Q 625 265 755 280"
          fill="none" stroke="rgba(90,160,195,.35)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="14 18"/>
        <text x="360" y="372" fill="#5A9FC0" fontSize="11" fontFamily="serif"
          opacity=".65" letterSpacing="5">锦　　江</text>

        <path d="M 52 185 Q 100 228 132 278 Q 155 315 168 352"
          fill="none" stroke="#8BBDD4" strokeWidth="5" strokeLinecap="round" opacity=".4"/>
        <path d="M 748 95 Q 768 210 758 335 Q 752 390 758 468"
          fill="none" stroke="#8BBDD4" strokeWidth="4" strokeLinecap="round" opacity=".35"/>

        <Bamboo x={35}  y={55}/>
        <Bamboo x={720} y={65}/>
        <Bamboo x={30}  y={420}/>
        <Bamboo x={712} y={438}/>

        <Temple x={128} y={378}/>
        <Temple x={618} y={185}/>
        <Temple x={398} y={452}/>

        {[[198,225],[355,205],[482,245],[582,318],[262,395],[438,368]].map(([lx,ly],i)=>(
          <Lantern key={i} x={lx} y={ly}/>
        ))}

        {/* 印章标题 */}
        <rect x="300" y="14" width="220" height="34" rx="3" fill="#B33A2B" opacity=".9"/>
        <rect x="303" y="17" width="214" height="28" rx="1" fill="none" stroke="#D4A017" strokeWidth="1" opacity=".7"/>
        <text x="410" y="36.5" textAnchor="middle" fill="#fff" fontSize="14"
          fontFamily="serif" letterSpacing="6" filter="url(#glow4)">锦城蜀韵地图</text>

        {/* 路线连线 */}
        {routeSpotIds.length > 1 && routeSpotIds.map((id, i) => {
          if (i === 0) return null
          const a = SPOTS.find(s => s.id === routeSpotIds[i-1])
          const b = SPOTS.find(s => s.id === id)
          if (!a || !b) return null
          return (
            <line key={i}
              x1={(a.position.x/100)*820} y1={(a.position.y/100)*520}
              x2={(b.position.x/100)*820} y2={(b.position.y/100)*520}
              stroke="#B33A2B" strokeWidth="1.5" opacity=".6" className="route-dash"/>
          )
        })}

        {/* 景点点位 */}
        {SPOTS.map(spot => {
          const cx = (spot.position.x / 100) * 820
          const cy = (spot.position.y / 100) * 520
          const isSel   = selectedId === spot.id
          const isHov   = hovered === spot.id
          const isDim   = activeTag && !spot.tags.includes(activeTag)
          const inRoute = routeSpotIds.includes(spot.id)
          const r = isSel || isHov ? 13 : 10

          return (
            <g key={spot.id} style={{ cursor: 'pointer' }}
              opacity={isDim ? 0.2 : 1}
              onClick={() => onSelect(spot)}
              onMouseEnter={() => setHovered(spot.id)}
              onMouseLeave={() => setHovered(null)}>

              <circle cx={cx} cy={cy} r="28"
                fill={`url(#${isSel ? 'spotGlowRed' : 'spotGlow'})`}
                opacity={isSel || isHov ? .7 : inRoute ? .5 : .3}/>

              {(inRoute || isSel) && (
                <circle cx={cx} cy={cy} r="16" fill="none"
                  stroke={isSel ? '#B33A2B' : '#D4A017'} strokeWidth="1"
                  opacity=".6" strokeDasharray="3 2"/>
              )}

              <circle cx={cx} cy={cy} r={r}
                fill={isSel ? '#B33A2B' : inRoute ? '#D4A017' : '#C4A44A'}
                stroke={isSel ? '#D4A017' : '#B33A2B'}
                strokeWidth={isSel ? 2.5 : 1.5}
                filter={isHov || isSel ? 'url(#glow4)' : undefined}
                style={{ transition: 'r .15s, fill .15s' }}/>

              <circle cx={cx} cy={cy} r="2.5" fill="rgba(255,255,255,.9)"/>

              <rect x={cx-33} y={cy+15} width="66" height="17" rx="2"
                fill={isSel ? '#B33A2B' : '#FFFDF8'}
                stroke={isSel ? '#D4A017' : '#D4A017'}
                strokeWidth=".8" opacity={isSel ? 1 : .9}/>
              <text x={cx} y={cy+26.5} textAnchor="middle"
                fill={isSel ? '#fff' : '#4A4036'}
                fontSize="10" fontFamily="serif" letterSpacing="1.5">{spot.name}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
