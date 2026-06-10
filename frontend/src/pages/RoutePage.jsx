import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MOCK_ROUTES = [
  {
    id: 1,
    name: '半日烟火成都',
    duration: '4 小时',
    desc: '从宽窄巷子的清晨走到锦里夜灯初上，一路小吃飘香，三国文化与市井烟火交织，是最经典的成都半日。',
    spots: ['宽窄巷子', '武侯祠', '锦里'],
  },
  {
    id: 2,
    name: '蜀韵文化巡礼',
    duration: '6 小时',
    desc: '杜甫草堂的诗意、武侯祠的厚重、川剧变脸的震撼——一天之内穿越千年蜀文化。',
    spots: ['杜甫草堂', '武侯祠', '川剧体验馆'],
  },
  {
    id: 3,
    name: '慢生活一日',
    duration: '8 小时',
    desc: '不赶路，慢慢耍。从人民公园盖碗茶到春熙路逛吃，最后在茶馆听一段评书，感受成都的慢。',
    spots: ['人民公园', '春熙路', '成都茶馆'],
  },
  {
    id: 4,
    name: '舌尖上的成都',
    duration: '5 小时',
    desc: '从宽窄巷子的小吃摊到锦里的夜宵街，再泡一壶盖碗茶——成都的烟火气全在这一碗一碟之间。',
    spots: ['宽窄巷子', '锦里', '成都茶馆'],
  },
  {
    id: 5,
    name: '非遗深度体验',
    duration: '7 小时',
    desc: '蜀绣、竹编、漆器、川剧变脸——一天之内亲手触摸蜀地千年技艺，感受非遗之美。',
    spots: ['锦里', '川剧体验馆', '武侯祠'],
  },
]

const S = {
  main: { maxWidth: 720, margin: '0 auto', padding: '36px 20px' },
  heading: {
    fontSize: 22, fontWeight: 700, color: 'var(--red)',
    fontFamily: 'serif', letterSpacing: 5, textAlign: 'center',
    marginBottom: 6,
  },
  sub: {
    textAlign: 'center', fontSize: 12, color: 'var(--ink-light)',
    fontFamily: 'serif', letterSpacing: 3, marginBottom: 24,
  },
  card: {
    background: 'var(--card)',
    border: '1px solid var(--border-light)',
    borderRadius: 10, padding: '16px 18px', marginBottom: 12,
    boxShadow: '0 1px 6px rgba(0,0,0,.04)',
  },
  cardName: { fontSize: 16, fontWeight: 700, color: 'var(--red)', fontFamily: 'serif', letterSpacing: 2 },
  badge: {
    fontSize: 11, color: 'var(--red)',
    border: '1px solid var(--red)', padding: '2px 9px', borderRadius: 20,
    fontFamily: 'serif', background: 'rgba(179,58,43,.04)',
  },
  desc: { fontSize: 12, color: 'var(--ink-light)', fontFamily: 'serif', marginTop: 6, lineHeight: 1.6 },
  spot: {
    fontSize: 11, padding: '2px 8px', borderRadius: 20,
    background: 'rgba(212,160,23,.08)', border: '1px solid var(--border)',
    color: 'var(--ink)', fontFamily: 'serif',
  },
  btnRow: { display: 'flex', justifyContent: 'center', gap: 14, marginTop: 28 },
}

export default function RoutePage() {
  const navigate = useNavigate()

  return (
    <main style={S.main}>
      <h2 style={S.heading}>推荐路线</h2>
      <p style={S.sub}>根据你的偏好，为你定制专属蜀韵之旅</p>
      <div>
        {MOCK_ROUTES.map(r => (
          <div key={r.id} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={S.cardName}>{r.name}</span>
              <span style={S.badge}>{r.duration}</span>
            </div>
            <p style={S.desc}>{r.desc}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
              {r.spots.map(s => (
                <span key={s} style={S.spot}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={S.btnRow}>
        <button className="btn-primary" onClick={() => navigate('/challenge')}>蜀文化闯关</button>
        <button className="btn-dark"    onClick={() => navigate('/creative')}>生成文案</button>
      </div>
    </main>
  )
}
