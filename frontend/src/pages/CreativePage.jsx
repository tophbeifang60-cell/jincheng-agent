import { useState } from 'react'
import { SPOTS } from '../data/spots'

const STYLES = [
  { key: 'xiaohongshu', label: '小红书版', icon: '📕', desc: '种草文案 + 打卡攻略' },
  { key: 'pengyouquan', label: '朋友圈版', icon: '💬', desc: '日常分享 + 情感表达' },
  { key: 'douyin',      label: '抖音版',   icon: '🎵', desc: '口播脚本 + 节奏快闪' },
  { key: 'youji',       label: '游记版',   icon: '📖', desc: '散文叙事 + 文化深度' },
]

const SPOT_TAGS_MAP = {
  '宽窄巷子':     ['#宽窄巷子', '#成都老街', '#盖碗茶', '#成都慢生活'],
  '锦里':         ['#锦里', '#三国文化', '#成都夜游', '#古风打卡'],
  '武侯祠':       ['#武侯祠', '#三国文化', '#历史文化', '#红墙竹影'],
  '杜甫草堂':     ['#杜甫草堂', '#诗歌文化', '#园林美学', '#文艺成都'],
  '川剧体验馆':   ['#川剧变脸', '#非遗文化', '#蜀韵', '#国粹'],
  '成都茶馆':     ['#成都茶馆', '#盖碗茶', '#慢生活', '#市井成都'],
  '人民公园':     ['#人民公园', '#成都慢生活', '#盖碗茶', '#市井烟火'],
  '春熙路':       ['#春熙路', '#成都购物', '#城市漫步', '#现代成都'],
}

const BONUS_TAGS = ['#成都旅行', '#周末去哪玩', '#锦城蜀韵', '#成都美食', '#川菜', '#旅行攻略']

function pickTags(spotName, count = 4) {
  const base = SPOT_TAGS_MAP[spotName] || ['#成都', '#旅行', '#打卡', '#周末去哪玩']
  const shuffled = [...BONUS_TAGS].sort(() => Math.random() - 0.5).slice(0, count)
  return [...base.slice(0, 4), ...shuffled].slice(0, 6)
}

function genTitle(style, spotName) {
  const map = {
    xiaohongshu: [
      `📍成都 ${spotName}｜去了不想走的宝藏地！`,
      `成都旅游｜${spotName} 超全打卡攻略来啦~`,
      `后悔没早来！${spotName} 简直太好逛了`,
    ],
    pengyouquan: [
      `${spotName}，今天也是被成都治愈的一天`,
      `在${spotName}，时间慢了半拍`,
      `成都的烟火气，全藏在${spotName}里`,
    ],
    douyin: [
      `🔥成都${spotName}也太顶了吧！`,
      `来人！把${spotName}安排进行程！`,
      `一句话让你打卡${spotName}！`,
    ],
    youji: [
      `蜀中记 · ${spotName}`,
      `${spotName}｜岁月深处的锦城记忆`,
      `游${spotName}——一砖一瓦皆蜀韵`,
    ],
  }
  const pool = map[style] || map.xiaohongshu
  return pool[Math.floor(Math.random() * pool.length)]
}

function genBody(style, spot, spotName) {
  const intro = spot?.shortIntro || '成都的好地方'
  const tip = spot?.photoTips || ''
  const food = spot?.foods?.length ? spot.foods[0] : ''
  const act = spot?.activities?.length ? spot.activities[0] : ''

  const map = {
    xiaohongshu: [
      `🌸 今天终于打卡了${spotName}！${intro}${
        food ? `一路逛一路吃，${food}简直绝了！` : ''
      }${tip ? `拍照小tips：${tip}` : ''}

✨ 姐妹们答应我，来成都一定要安排上！`,
      `💡 ${spotName}逛吃攻略来啦～

${intro}${act ? `推荐体验：${act}，` : ''}超级出片！

📷 ${tip || '建议上午去，人少光好。'}

真的是一步一景，每个角落都好拍！`,
    ],
    pengyouquan: [
      `在${spotName}坐了一下午。${intro}

${tip || '阳光正好，时光很慢。'}${food ? `

顺便尝了${food}，味道巴适。` : ''}

成都的日子，就该这样慢慢过。`,
      `又发现一个好地方——${spotName}。

${intro}${act ? `今天体验了${act}，` : ''}很放松，很喜欢。

成都的温柔，都藏在这些老街老巷里了。`,
    ],
    douyin: [
      `家人们谁懂啊！${spotName}来了就不想走！🔥

${intro}

✅ 必打卡：${act || '拍照出片'}
✅ 必吃：${food || '当地小吃'}
✅ 必拍：${tip || '找好机位'}
就问你冲不冲！`,
      `一分钟告诉你${spotName}怎么玩！⚡️
🗺 路线：先逛主街，再钻小巷
📸 拍照：${tip || '早上七点人最少'}
🍜 美食：${food || '路边摊最地道'}
记不住就点赞收藏！`,
    ],
    youji: [
      `初秋时节，到访${spotName}。

${intro}漫步其间，${tip || '光影斑驳，树影婆娑，仿佛穿越了时光。'}
${
        food ? `尝一份${food}，舌尖上是蜀地千年传承的味道。` : ''
      }${act ? `若有余暇，不妨${act}，感受一番蜀中人情。` : ''}

成都的魅力，需要慢慢品的。不急，我们慢慢来。`,
      `蜀地之美，在${spotName}可见一斑。

${intro}${
        act ? `在这里，你可以${act}，` : ''
      }也可什么也不做，寻一处竹椅坐下，听风穿过叶间沙沙作响。${tip || ''}

这便是成都——一座来了就不想离开的城市。`,
    ],
  }

  const pool = map[style] || map.xiaohongshu
  return pool[Math.floor(Math.random() * pool.length)]
}

// 所有可选地点（与 SPOTS 数据对齐）
const spotNames = SPOTS.map(s => s.name)

export default function CreativePage() {
  const [spotIdx, setSpotIdx] = useState(2) // 默认锦里（jinli 是 SPOTS[1]）
  const [style, setStyle] = useState('xiaohongshu')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const savedSpots = JSON.parse(localStorage.getItem('selectedSpots') || '[]')

  const currentSpot = SPOTS[spotIdx]
  const spotName = currentSpot?.name || spotNames[0]

  const generate = (overrideStyle) => {
    const s = overrideStyle || style
    setLoading(true)
    setResult(null)

    // 模拟生成延迟
    setTimeout(() => {
      const title = genTitle(s, spotName)
      const body = genBody(s, currentSpot, spotName)
      const tags = pickTags(spotName)
      setResult({ title, body, tags, style: s })
      setLoading(false)
    }, 400)
  }

  const selectFromRoute = (sp) => {
    const idx = SPOTS.findIndex(s => s.id === sp.id)
    if (idx >= 0) setSpotIdx(idx)
    setResult(null)
  }

  const fullText = result
    ? `${result.title}\n\n${result.body}\n\n${result.tags.join(' ')}`
    : ''

  const doCopy = () => {
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main style={{ maxWidth: 620, margin: '0 auto', padding: '36px 20px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--red)', fontFamily: 'serif', letterSpacing: 5, textAlign: 'center', marginBottom: 24 }}>
        文创文案生成
      </h2>

      {savedSpots.length > 0 && (
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border-light)',
          borderRadius: 10, padding: '16px 18px', marginBottom: 16,
        }}>
          <p style={{ fontFamily: 'serif', color: 'var(--ink)', fontSize: 13, marginBottom: 8 }}>已加入路线 — 点击选择地点</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {savedSpots.map(s => (
              <button key={s.id} onClick={() => selectFromRoute(s)}
                style={{
                  padding: '4px 12px', borderRadius: 20,
                  border: spotName === s.name ? '1px solid var(--red)' : '1px solid var(--border)',
                  background: spotName === s.name ? 'rgba(179,58,43,.08)' : 'var(--card)',
                  color: spotName === s.name ? 'var(--red)' : 'var(--ink)',
                  fontFamily: 'serif', fontSize: 12, cursor: 'pointer', transition: 'all .15s',
                }}
              >{s.name}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{
        background: 'var(--card)', border: '1px solid var(--border-light)',
        borderRadius: 10, padding: '18px 20px', marginBottom: 16,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div>
          <label style={{ fontFamily: 'serif', color: 'var(--ink)', fontSize: 13, display: 'block', marginBottom: 6 }}>打卡地点</label>
          <select value={spotIdx} onChange={e => { setSpotIdx(Number(e.target.value)); setResult(null) }}
            style={{
              width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px',
              fontFamily: 'serif', fontSize: 13, background: 'var(--card)', color: 'var(--ink)',
            }}>
            {spotNames.map((name, i) => <option key={name} value={i}>{name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontFamily: 'serif', color: 'var(--ink)', fontSize: 13, display: 'block', marginBottom: 6 }}>游玩风格</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['历史', '美食', '自然', '文化'].map(t => (
              <button key={t} onClick={() => {}}
                style={{
                  padding: '5px 14px', borderRadius: 20,
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                  color: 'var(--ink)',
                  fontFamily: 'serif', fontSize: 13, cursor: 'default',
                  opacity: 0.6,
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={() => generate()} disabled={loading} style={{ fontSize: 14 }}>
          {loading ? '生成中...' : '生成文案'}
        </button>
      </div>

      {result && (
        <div style={{
          background: '#FFFDF8', border: '1px solid var(--border-light)',
          borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{ padding: '22px 24px 16px' }}>
            <div style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'serif', marginBottom: 8, letterSpacing: 2 }}>
              {STYLES.find(s => s.key === result.style)?.icon} {STYLES.find(s => s.key === result.style)?.label}
            </div>

            <h3 style={{
              fontSize: 20, fontWeight: 700, color: 'var(--red)',
              fontFamily: 'serif', margin: '0 0 14px', lineHeight: 1.5, letterSpacing: 1,
            }}>{result.title}</h3>

            <p style={{
              fontFamily: 'serif', color: '#2C2C2C', fontSize: 16, lineHeight: 1.9,
              whiteSpace: 'pre-wrap', margin: '0 0 18px',
            }}>{result.body}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {result.tags.map(t => (
                <span key={t} style={{
                  fontSize: 12, fontFamily: 'serif', color: '#fff', background: 'var(--red)',
                  padding: '3px 10px', borderRadius: 14, letterSpacing: 0.5,
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--border-light)' }} />

          <div style={{ padding: '14px 20px', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <button onClick={doCopy}
              style={{
                padding: '7px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
                fontFamily: 'serif', border: '1px solid var(--red)',
                background: copied ? 'var(--red)' : 'var(--card)',
                color: copied ? '#fff' : 'var(--red)',
                transition: 'all .15s', fontWeight: 700,
              }}>
              {copied ? '已复制 ✓' : '一键复制'}
            </button>

            <button onClick={() => generate()}
              style={{
                padding: '7px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
                fontFamily: 'serif', border: '1px solid var(--border)',
                background: 'var(--card)', color: 'var(--ink)',
                transition: 'all .15s',
              }}>
              重新生成
            </button>

            <div style={{ width: 1, height: 20, background: 'var(--border-light)', margin: '0 4px' }} />

            {STYLES.map(s => (
              <button key={s.key} onClick={() => { setStyle(s.key); generate(s.key) }}
                style={{
                  padding: '7px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
                  fontFamily: 'serif', transition: 'all .15s',
                  border: result.style === s.key ? '1px solid var(--gold)' : '1px solid var(--border)',
                  background: result.style === s.key ? 'rgba(212,160,23,.1)' : 'var(--card)',
                  color: result.style === s.key ? 'var(--gold)' : 'var(--ink-light)',
                  fontWeight: result.style === s.key ? 700 : 400,
                }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
