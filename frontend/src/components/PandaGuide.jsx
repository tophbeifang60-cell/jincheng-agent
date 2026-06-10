import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_MSGS = {
  '/':         '点我聊天嘛，关于成都的啥子问题都可以问我！',
  '/map':      '点我聊天嘛，关于成都的啥子问题都可以问我！',
  '/routes':   '路线规划好了，出发嘛！有问题也可以问我～',
  '/challenge':'答对问题，才能解锁下一站！需要帮助就问我～',
  '/creative': '文案生成好了，快去发小红书！有疑问随时问我～',
}

const FALLBACK_REPLIES = [
  "哎呀，我这会儿脑袋有点晕乎乎的～🐼 你先逛逛地图嘛，宽窄巷子的担担面巴适得很！",
  "信号不太好呢～不过我记得锦里那边晚上逛特别有感觉，红灯高挂，古风满满！",
  "唔～正在打盹儿，你先切（去）武侯祠看看嘛，红墙竹影拍照超好看的！",
  "嘿嘿，网络不太稳定～给你个tip：半日游就先去宽窄巷子，再去锦里，晚黑到春熙路吃火锅！",
  "熊猫导游暂时掉线啦～不过人民公园的盖碗茶和钟水饺一定要试试，安逸得板！",
]

function localMockReply(message) {
  const msg = message.toLowerCase()
  if (/宽窄巷子/.test(msg) && (/附近/.test(msg) || /吃/.test(msg) || /美食/.test(msg)))
    return "宽窄巷子附近好吃的多得很！🐼 担担面、三大炮、钟水饺、兔头，边走边吃安逸惨了～逛完去隔壁的魁星楼街，还有钵钵鸡和冰粉，保证你吃撑！"
  if (/半天/.test(msg) || /半日/.test(msg) || /怎么玩/.test(msg) || /路线/.test(msg))
    return "半天时间嘛，我给你安排：上午逛宽窄巷子（2小时），吃碗担担面；然后去锦里和武侯祠（2小时），晚黑如果还有精力就去春熙路吃顿火锅～这条路线紧凑又不赶，巴适得很！"
  if (/川剧/.test(msg) || /变脸/.test(msg) && /晚上/.test(msg))
    return "川剧变脸晚上看最安逸！很多剧场19:30开场，灯光效果好，变脸更有震撼力。推荐搭配锦里夜游，先逛锦里看红灯，再去看变脸，一晚上安排得明明白白！"
  if (/锦里/.test(msg) && (/宽窄/.test(msg) || /区别/.test(msg) || /对比/.test(msg) || /vs/i.test(msg)))
    return "锦里和宽窄巷子味道不一样哦～锦里主打三国文化+古风夜市，红灯高挂适合晚上逛；宽窄巷子是老成都院落+文艺小店，适合白天慢慢逛。简单说：锦里更热闹更有夜游氛围，宽窄更安静更有成都慢生活气息～两个都去才完整！"
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)]
}

export default function PandaGuide({ message }) {
  const [tipOpen, setTipOpen] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEnd = useRef(null)
  const { pathname } = useLocation()
  const pandaMsg = message || PAGE_MSGS[pathname] || PAGE_MSGS['/']

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const API_BASE =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) {
        const errText = await res.text().catch(() => 'unknown')
        console.error('[PandaGuide] API 返回错误:', res.status, errText)
        throw new Error(`HTTP ${res.status}: ${errText}`)
      }
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      console.error('[PandaGuide] 请求 /api/chat 失败:', err.message || err)
      setMessages(prev => [...prev, { role: 'assistant', content: localMockReply(text) }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="panda-guide-wrapper">
      {/* Tip bubble */}
      {tipOpen && !chatOpen && (
        <div className="panda-tip-bubble anim-pop">
          <button className="panda-tip-close" onClick={() => setTipOpen(false)}>✕</button>
          <p className="panda-tip-text">{pandaMsg}</p>
          <div className="panda-tip-arrow" />
          <div className="panda-tip-arrow-inner" />
        </div>
      )}

      {/* Chat dialog */}
      {chatOpen && (
        <div className="panda-chat-panel anim-fadeup">
          <div className="panda-chat-header">
            <div className="panda-chat-header-left">
              <svg width="28" height="32" viewBox="0 0 64 78" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="16" r="10" fill="#222"/>
                <circle cx="14" cy="16" r="6.5" fill="#3a3a3a"/>
                <circle cx="50" cy="16" r="10" fill="#222"/>
                <circle cx="50" cy="16" r="6.5" fill="#3a3a3a"/>
                <ellipse cx="32" cy="28" rx="22" ry="21" fill="#f4f4f0" stroke="#ddd" strokeWidth="1"/>
                <ellipse cx="22" cy="24" rx="7.5" ry="6.5" fill="#222" opacity=".82"/>
                <ellipse cx="42" cy="24" rx="7.5" ry="6.5" fill="#222" opacity=".82"/>
                <circle cx="22" cy="24" r="4" fill="white"/>
                <circle cx="22" cy="25" r="2" fill="#111"/>
                <circle cx="21" cy="23.5" r=".9" fill="white"/>
                <circle cx="42" cy="24" r="4" fill="white"/>
                <circle cx="42" cy="25" r="2" fill="#111"/>
                <circle cx="41" cy="23.5" r=".9" fill="white"/>
                <ellipse cx="32" cy="32" rx="3.5" ry="2.5" fill="#222"/>
                <path d="M27 36 Q32 41 37 36" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="16" y="47" width="32" height="24" rx="10" fill="#B33A2B"/>
                <rect x="16" y="47" width="32" height="24" rx="10" fill="none" stroke="#D4A017" strokeWidth="1.5"/>
              </svg>
              <div>
                <strong>熊猫向导</strong>
                <small>锦城蜀韵 AI 文旅智能体</small>
              </div>
            </div>
            <button className="panda-chat-close" onClick={() => setChatOpen(false)}>✕</button>
          </div>

          <div className="panda-chat-messages">
            {messages.length === 0 && (
              <p className="panda-chat-empty">有啥子问题尽管问我！成都吃喝玩乐我都熟～🐼</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`panda-chat-msg ${m.role === 'user' ? 'is-user' : 'is-panda'}`}>
                <div className="panda-chat-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="panda-chat-msg is-panda">
                <div className="panda-chat-bubble panda-chat-loading">
                  <span className="loading-dot" />
                  <span className="loading-dot" />
                  <span className="loading-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          <div className="panda-chat-input-row">
            <input
              className="panda-chat-input"
              placeholder="想问啥子？比如：宽窄巷子附近有什么吃的？"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="panda-chat-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              发送
            </button>
          </div>
        </div>
      )}

      {/* Panda button */}
      <button
        onClick={() => { setChatOpen(o => !o); setTipOpen(false) }}
        className="panda-button anim-float"
        title="点击打开熊猫AI问答"
      >
        <svg width="64" height="78" viewBox="0 0 64 78" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="16" r="10" fill="#222"/>
          <circle cx="14" cy="16" r="6.5" fill="#3a3a3a"/>
          <circle cx="50" cy="16" r="10" fill="#222"/>
          <circle cx="50" cy="16" r="6.5" fill="#3a3a3a"/>
          <ellipse cx="32" cy="28" rx="22" ry="21" fill="#f4f4f0" stroke="#ddd" strokeWidth="1"/>
          <ellipse cx="22" cy="24" rx="7.5" ry="6.5" fill="#222" opacity=".82"/>
          <ellipse cx="42" cy="24" rx="7.5" ry="6.5" fill="#222" opacity=".82"/>
          <g className="anim-blink">
            <circle cx="22" cy="24" r="4" fill="white"/>
            <circle cx="22" cy="25" r="2" fill="#111"/>
            <circle cx="21" cy="23.5" r=".9" fill="white"/>
          </g>
          <g className="anim-blink">
            <circle cx="42" cy="24" r="4" fill="white"/>
            <circle cx="42" cy="25" r="2" fill="#111"/>
            <circle cx="41" cy="23.5" r=".9" fill="white"/>
          </g>
          <ellipse cx="32" cy="32" rx="3.5" ry="2.5" fill="#222"/>
          <path d="M27 36 Q32 41 37 36" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="18" cy="34" r="5" fill="#ffb0b0" opacity=".3"/>
          <circle cx="46" cy="34" r="5" fill="#ffb0b0" opacity=".3"/>
          <rect x="16" y="47" width="32" height="24" rx="10" fill="#B33A2B"/>
          <rect x="16" y="47" width="32" height="24" rx="10" fill="none" stroke="#D4A017" strokeWidth="1.5"/>
          <path d="M16 52 Q32 59 48 52" fill="#D4A017" opacity=".9"/>
          <ellipse cx="32" cy="62" rx="9" ry="8" fill="#f4f4f0" opacity=".55"/>
          <circle cx="32" cy="56" r="5" fill="#D4A017" stroke="#B33A2B" strokeWidth=".8"/>
          <text x="32" y="59" textAnchor="middle" fontSize="5" fill="#fff" fontFamily="serif">锦</text>
          <rect x="18" y="70" width="10" height="8" rx="5" fill="#222"/>
          <rect x="36" y="70" width="10" height="8" rx="5" fill="#222"/>
          <ellipse cx="54" cy="54" rx="6" ry="5" fill="#f4f4f0" stroke="#ddd" strokeWidth="1"/>
          <rect x="49" y="57" width="9" height="5" rx="2.5" fill="#B33A2B"/>
          <ellipse cx="10" cy="54" rx="6" ry="5" fill="#f4f4f0" stroke="#ddd" strokeWidth="1"/>
          <rect x="6" y="57" width="9" height="5" rx="2.5" fill="#B33A2B"/>
        </svg>
        <div className="panda-button-label">熊猫向导</div>
      </button>
    </div>
  )
}
