import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MOCK_GAMES = [
  {
    question: '川剧变脸最多能一次变换多少张脸谱？',
    options: ['3张', '5张', '7张', '9张'],
    answer: 2,
    hint: '顶级变脸大师可以在短时间内连续变 7 张脸谱，至今工艺仍属绝密。',
  },
  {
    question: '成都的"锦里"与哪座祠庙紧邻？',
    options: ['杜甫草堂', '武侯祠', '青羊宫', '文殊院'],
    answer: 1,
    hint: '锦里紧邻武侯祠，以三国文化为主题，夜晚红灯高悬最为热闹。',
  },
  {
    question: '成都人说的"巴适"是什么意思？',
    options: ['漂亮', '舒服/好', '赶快', '麻烦'],
    answer: 1,
    hint: '"巴适"是四川方言中最常用的词之一，形容事物让人觉得舒服、安逸。',
  },
  {
    question: '以下哪种小吃不属于成都传统小吃？',
    options: ['三大炮', '担担面', '生煎包', '钟水饺'],
    answer: 2,
    hint: '生煎包是上海及江南地区的传统小吃，不是成都本地的。',
  },
  {
    question: '宽窄巷子由几条巷子组成？',
    options: ['2条', '3条', '4条', '5条'],
    answer: 1,
    hint: '宽窄巷子包含三条巷子：宽巷子（闲生活）、窄巷子（慢生活）、井巷子（新生活）。',
  },
]

const S = {
  main: { maxWidth: 540, margin: '0 auto', padding: '32px 20px' },
  heading: { fontSize: 22, fontWeight: 700, color: 'var(--red)', fontFamily: 'serif', letterSpacing: 5, textAlign: 'center', marginBottom: 4 },
  prog: { textAlign: 'center', fontSize: 12, color: 'var(--ink-light)', fontFamily: 'serif', letterSpacing: 2, marginBottom: 20 },
  card: { background: 'var(--card)', border: '1px solid var(--border-light)', borderRadius: 10, padding: '20px 22px', marginBottom: 10, boxShadow: '0 1px 6px rgba(0,0,0,.04)' },
  q: { fontSize: 16, color: 'var(--ink)', fontFamily: 'serif', lineHeight: 1.7, marginBottom: 16 },
  optBase: {
    display: 'block', width: '100%', textAlign: 'left',
    background: 'var(--card)', border: '1px solid var(--border-light)',
    borderRadius: 8, padding: '10px 16px', marginBottom: 8,
    fontSize: 13, fontFamily: 'inherit', color: 'var(--ink)',
    cursor: 'pointer', transition: 'all .15s', letterSpacing: 1,
  },
  hint: {
    background: 'rgba(212,160,23,.08)', borderLeft: '3px solid var(--gold)',
    padding: '10px 14px', borderRadius: '0 6px 6px 0',
    fontSize: 12, color: 'var(--ink-light)', fontFamily: 'serif', lineHeight: 1.6, marginBottom: 10,
  },
}

export default function ChallengePage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const navigate = useNavigate()

  if (!started) return (
    <main style={{ ...S.main, textAlign: 'center', paddingTop: 60 }}>
      <h2 style={S.heading}>蜀文化闯关</h2>
      <p style={{ fontFamily: 'serif', fontSize: 15, color: 'var(--ink-light)', margin: '12px 0 28px', lineHeight: 1.8 }}>
        共 {MOCK_GAMES.length} 题 · 测测你对成都蜀文化的了解
      </p>
      <button className="btn-primary" onClick={() => setStarted(true)} style={{ fontSize: 15, padding: '14px 36px' }}>
        开始闯关
      </button>
    </main>
  )

  if (done) return (
    <main style={{ ...S.main, textAlign: 'center', paddingTop: 60 }}>
      <h2 style={S.heading}>闯关完成</h2>
      <p style={{ fontFamily: 'serif', fontSize: 22, color: 'var(--ink)', margin: '20px 0' }}>
        得分 <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: 28 }}>{score}</span>
        <span style={{ color: 'var(--ink-light)', fontSize: 14 }}> / {MOCK_GAMES.length}</span>
      </p>
      <button className="btn-primary" onClick={() => navigate('/creative')}>生成文案</button>
    </main>
  )

  const q = MOCK_GAMES[current]
  const answered = selected !== null

  const handleSelect = (i) => {
    if (answered) return
    setSelected(i)
    if (i === q.answer) setScore(s => s + 1)
  }

  return (
    <main style={S.main}>
      <h2 style={S.heading}>蜀文化闯关</h2>
      <p style={S.prog}>第 {current + 1} 题 / 共 {MOCK_GAMES.length} 题</p>

      <div style={S.card}>
        <p style={S.q}>{q.question}</p>
        <div>
          {q.options.map((opt, i) => {
            let extra = {}
            if (answered) {
              if (i === q.answer)        extra = { borderColor: '#4a7c3f', background: 'rgba(74,124,63,.1)', color: '#4a7c3f' }
              else if (i === selected)   extra = { borderColor: 'var(--red)', background: 'rgba(179,58,43,.08)', color: 'var(--red)' }
            } else {
              extra = { cursor: 'pointer' }
            }
            return (
              <button key={i} style={{ ...S.optBase, ...extra }}
                onMouseEnter={e => { if (!answered) { e.currentTarget.style.borderColor='var(--red)'; e.currentTarget.style.background='rgba(179,58,43,.03)' }}}
                onMouseLeave={e => { if (!answered) { e.currentTarget.style.borderColor='var(--border-light)'; e.currentTarget.style.background='var(--card)' }}}
                onClick={() => handleSelect(i)}>{opt}</button>
            )
          })}
        </div>
      </div>

      {answered && <div style={S.hint}>{q.hint}</div>}

      {answered && (
        <div style={{ textAlign: 'center' }}>
          <button className="btn-primary" onClick={() => {
            setSelected(null)
            if (current + 1 >= MOCK_GAMES.length) setDone(true)
            else setCurrent(c => c + 1)
          }}>
            {current + 1 >= MOCK_GAMES.length ? '查看结果' : '下一题'}
          </button>
        </div>
      )}
    </main>
  )
}
