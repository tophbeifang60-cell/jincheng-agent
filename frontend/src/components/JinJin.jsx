import { useState } from 'react'

const DEFAULT_MSG = '欢迎来到锦城！我是你的向导锦锦，点击地图景点开始探索吧～'

export default function JinJin({ message }) {
  const [open, setOpen] = useState(true)
  const msg = message || DEFAULT_MSG

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
      {open && (
        <div className="card-shu max-w-[220px] text-sm relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-1 right-2 text-gray-400 text-xs hover:text-shu-red"
          >✕</button>
          <p className="text-shu-ink font-song leading-relaxed pr-4">{msg}</p>
        </div>
      )}

      {/* 锦锦 QQ 人形象 */}
      <button
        onClick={() => setOpen(o => !o)}
        className="jinjin-float flex flex-col items-center select-none focus:outline-none"
        title="点击展开/收起"
      >
        <svg width="44" height="56" viewBox="0 0 44 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 头 */}
          <circle cx="22" cy="14" r="12" fill="#F5E6C8" stroke="#C0392B" strokeWidth="2"/>
          {/* 眼睛 */}
          <circle cx="17" cy="13" r="2" fill="#1A1A2E"/>
          <circle cx="27" cy="13" r="2" fill="#1A1A2E"/>
          {/* 笑嘴 */}
          <path d="M17 18 Q22 22 27 18" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* 身体 */}
          <rect x="13" y="26" width="18" height="16" rx="4" fill="#C0392B" stroke="#D4A017" strokeWidth="1.5"/>
          {/* 腿 */}
          <rect x="14" y="42" width="6" height="10" rx="3" fill="#1A1A2E"/>
          <rect x="24" y="42" width="6" height="10" rx="3" fill="#1A1A2E"/>
          {/* 发簪/头饰 */}
          <line x1="22" y1="2" x2="22" y2="6" stroke="#D4A017" strokeWidth="2"/>
          <circle cx="22" cy="1.5" r="2" fill="#D4A017"/>
        </svg>
        <span className="text-xs text-shu-brown font-song -mt-1">锦锦</span>
      </button>
    </div>
  )
}
