import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SPOTS, FILTER_OPTIONS } from '../data/spots'
import ScenicMap from '../components/ScenicMap'
import SpotCard from '../components/SpotCard'
import FoodGallery from '../components/FoodGallery'

const DEFAULT_ROUTE_IDS = ['kuanzhai', 'chuanju', 'jinli']

const iconMap = {
  food: '食',
  photo: '影',
  heritage: '蜀',
  slow: '闲',
}

const filterCopy = {
  food: '烟火成都，从一碗热气开始。',
  photo: '找出片机位，看见锦城光影。',
  heritage: '从川剧、祠庙、旧街读懂蜀地文化。',
  slow: '不赶路，慢慢耍，才是成都味道。',
}

// 每条兴趣的专属路线 + 推荐语
const FILTER_ROUTES = {
  food:     { ids: ['kuanzhai', 'jinli', 'chaguan'], name: '舌尖上的成都', tip: '宽窄巷子小吃配锦里夜宵，最后茶馆歇脚——这条路线把成都烟火气一网打尽，记得留肚子！' },
  photo:    { ids: ['kuanzhai', 'jinli', 'dufu'],    name: '出片神路线',   tip: '宽窄巷子青砖灰瓦、锦里红灯古楼、草堂翠竹茅屋——三个机位三种风格，汉服、民国风、文艺范随便拍！' },
  heritage: { ids: ['wuhouci', 'jinli', 'chuanju'],  name: '蜀韵文化线',   tip: '武侯祠看三国，锦里逛古街，最后川剧变脸压轴，一天穿越千年蜀地文化。' },
  slow:     { ids: ['kuanzhai', 'dufu', 'chaguan'],  name: '佛系慢游线',   tip: '宽窄巷子逛一上午，草堂喝杯茶发发呆，下午泡茶馆听评书——不赶景点，只享成都慢时光。' },
}

function MiniTag({ children }) {
  return <span className="jc-mini-tag">{children}</span>
}

function RoutePreview({ routeSpots, onSelect, onCreative, routeName }) {
  if (!routeSpots.length) return null

  return (
    <section className="jc-section jc-route-preview">
      <div className="jc-section-head">
        <div>
          <p className="jc-kicker">{routeName || 'HALF DAY ROUTE'}</p>
          <h2>{routeName ? `${routeName}` : '半日精选路线'}</h2>
        </div>
        <button className="jc-btn jc-btn-red" onClick={onCreative}>生成文案</button>
      </div>

      <div className="jc-route-line">
        {routeSpots.map((spot, index) => (
          <button className="jc-route-stop" key={spot.id} onClick={() => onSelect(spot)}>
            <span className="jc-route-index">0{index + 1}</span>
            <div>
              <strong>{spot.name}</strong>
              <p>{spot.duration} · {spot.shortIntro}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default function MapPage({ onPandaMsg }) {
  const [activeTag, setActiveTag] = useState(null)
  const [selectedSpot, setSelectedSpot] = useState(SPOTS[0] || null)
  const [routeIds, setRouteIds] = useState([])
  const navigate = useNavigate()

  const filteredSpots = activeTag
    ? SPOTS.filter((spot) => spot.tags.includes(activeTag))
    : SPOTS.slice(0, 3)

  const routeSpots = SPOTS.filter((spot) => routeIds.includes(spot.id))

  const handleFilter = (key) => {
    const next = activeTag === key ? null : key
    setActiveTag(next)

    if (next) {
      // 自动生成该兴趣的专属路线
      const preset = FILTER_ROUTES[next]
      setRouteIds(preset.ids)
      const route = SPOTS.filter((spot) => preset.ids.includes(spot.id))
      saveSpotsToStorage(route)
      if (route[0]) setSelectedSpot(route[0])
      onPandaMsg?.(preset.tip)
    } else {
      // 取消筛选，清空路线
      setRouteIds([])
      setSelectedSpot(SPOTS[0])
      onPandaMsg?.('点点地图，我带你逛成都。')
    }
  }

  const handleSelectSpot = (spot) => {
    setSelectedSpot(spot)
    onPandaMsg?.(`「${spot.name}」—— ${spot.shortIntro}`)
  }

  const saveSpotsToStorage = (spots) => {
    const saved = JSON.parse(localStorage.getItem('selectedSpots') || '[]')
    const merged = [...saved]

    spots.forEach((spot) => {
      if (!merged.find((item) => item.id === spot.id)) merged.push(spot)
    })

    localStorage.setItem('selectedSpots', JSON.stringify(merged))
  }

  const generateRoute = () => {
    const ids = activeTag
      ? SPOTS.filter((spot) => spot.tags.includes(activeTag)).slice(0, 3).map((spot) => spot.id)
      : DEFAULT_ROUTE_IDS

    setRouteIds(ids)

    const route = SPOTS.filter((spot) => ids.includes(spot.id))
    saveSpotsToStorage(route)

    if (route[0]) setSelectedSpot(route[0])
    onPandaMsg?.('这条半日路线巴适得很，边逛边吃边听故事。')
  }

  return (
    <main className="jc-page">
      <section className="jc-hero">
        <div className="jc-hero-bg" />

        <div className="jc-hero-inner">
          <aside className="jc-left-panel">
            <div className="jc-brand-block">
              <p className="jc-kicker">AI TRAVEL GUIDE</p>
              <h1>锦城蜀韵</h1>
              <p>成都文旅探索地图</p>
            </div>

            <div className="jc-panel-divider" />

            <div className="jc-filter-group">
              <p className="jc-panel-title">兴趣筛选</p>
              {FILTER_OPTIONS.map((item) => (
                <button
                  key={item.key}
                  className={`jc-filter-btn ${activeTag === item.key ? 'active' : ''}`}
                  onClick={() => handleFilter(item.key)}
                >
                  <span>{iconMap[item.key] || '游'}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <small>{filterCopy[item.key]}</small>
                  </div>
                </button>
              ))}
            </div>

            <div className="jc-panel-divider" />

            <div className="jc-quick-actions">
              <p className="jc-panel-title">快捷入口</p>
              <button onClick={generateRoute}>生成半日路线</button>
              <button onClick={() => navigate('/challenge')}>进入蜀文化闯关</button>
              <button onClick={() => navigate('/creative')}>生成打卡文案</button>
            </div>
          </aside>

          <section className="jc-map-stage">
            <div className="jc-map-header">
              <div>
                <p className="jc-kicker">CHENGDU MAP</p>
                <h2>成都蜀韵地图</h2>
                <p>点击景点探索 · 筛选兴趣 · 一键生成路线</p>
              </div>
              <button className="jc-btn jc-btn-red" onClick={generateRoute}>生成路线</button>
            </div>

            <div className="jc-map-shell">
              <ScenicMap
                activeTag={activeTag}
                selectedId={selectedSpot?.id}
                routeSpotIds={routeIds}
                onSelect={handleSelectSpot}
              />
            </div>
          </section>

          <aside className="jc-detail-panel">
            <SpotCard
              spot={selectedSpot}
              onPandaMsg={onPandaMsg}
              onClose={() => setSelectedSpot(null)}
            />
          </aside>
        </div>
      </section>

      {routeSpots.length > 0 && (
        <RoutePreview
          routeSpots={routeSpots}
          onSelect={handleSelectSpot}
          onCreative={() => navigate('/creative')}
          routeName={activeTag ? FILTER_ROUTES[activeTag]?.name : null}
        />
      )}

      <section className="jc-section">
        <div className="jc-section-head">
          <div>
            <p className="jc-kicker">RECOMMENDED</p>
            <h2>{activeTag ? `${FILTER_OPTIONS.find((item) => item.key === activeTag)?.label} 推荐景点` : '为你推荐的景点'}</h2>
          </div>
          <button className="jc-link-btn" onClick={() => setActiveTag(null)}>查看全部</button>
        </div>

        <div className="jc-spot-grid">
          {filteredSpots.map((spot) => (
            <button key={spot.id} className="jc-spot-tile" onClick={() => handleSelectSpot(spot)}>
              <div className="jc-tile-image">
                <img
                  src={spot.cover}
                  alt={spot.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { if (!e.target.src.includes('fallback')) e.target.src = '/images/fallback.jpg' }}
                />
              </div>
              <div className="jc-tile-body">
                <h3>{spot.name}</h3>
                <p>{spot.shortIntro}</p>
                <div className="jc-tags">
                  {(spot.vibes || []).slice(0, 3).map((vibe) => (
                    <MiniTag key={vibe}>{vibe}</MiniTag>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="jc-section jc-opera-section">
        <div className="jc-opera-card">
          <div className="jc-opera-visual">
            <img
              src="/images/culture/sichuan-opera-2.jpg"
              alt="川剧变脸"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { if (!e.target.src.includes('fallback')) e.target.src = '/images/fallback.jpg' }}
            />
            <button aria-label="播放预览">▶</button>
          </div>
          <div className="jc-opera-content">
            <p className="jc-kicker">SICHUAN OPERA</p>
            <h2>今晚 19:30 · 川剧变脸体验</h2>
            <p>
              变脸不是简单换面具，而是川剧身段、节奏、灯光和脸谱机关共同完成的舞台瞬间。
            </p>
            <div className="jc-tags">
              <MiniTag>非遗体验</MiniTag>
              <MiniTag>夜游推荐</MiniTag>
              <MiniTag>适合拍照</MiniTag>
            </div>
          </div>
        </div>
      </section>

      <section className="jc-section jc-food-section">
        <div className="jc-section-head">
          <div>
            <p className="jc-kicker">CHENGDU FOOD</p>
            <h2>成都美食图鉴</h2>
          </div>
        </div>
        <FoodGallery />
      </section>
    </main>
  )
}
