import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/map',       label: '舆图' },
  { to: '/routes',    label: '路线' },
  { to: '/challenge', label: '闯关' },
  { to: '/creative',  label: '文创' },
]

export default function NavBar() {
  const { pathname } = useLocation()
  return (
    <nav style={{
      background: '#FFFDF8',
      borderBottom: '1px solid #E0C38C',
      padding: '0 24px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      position: 'relative',
      boxShadow: '0 1px 8px rgba(0,0,0,.06)',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, transparent, var(--red) 30%, var(--red) 70%, transparent)',
      }}/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{
          background: 'var(--red)',
          color: '#fff',
          padding: '4px 12px',
          fontSize: 15,
          fontFamily: 'serif',
          fontWeight: 700,
          letterSpacing: 4,
          borderRadius: 6,
        }}>锦城蜀韵</div>
        <span style={{ fontSize: 11, color: 'var(--ink-light)', letterSpacing: 2, fontFamily: 'serif' }}>AI 文旅向导</span>
      </div>

      <div style={{ width: 1, height: 24, background: 'var(--border)', flexShrink: 0 }}/>

      {links.map(l => {
        const active = pathname === l.to || (l.to === '/map' && (pathname === '/' || pathname === '/map'))
        return (
          <Link key={l.to} to={l.to} style={{
            fontFamily: 'serif',
            fontSize: 14,
            letterSpacing: 3,
            color: active ? 'var(--red)' : 'var(--ink-light)',
            textDecoration: 'none',
            padding: '4px 2px',
            borderBottom: active ? '2px solid var(--red)' : '2px solid transparent',
            transition: 'color .2s, border-color .2s',
          }}
          onMouseEnter={e => { if (!active) { e.target.style.color='var(--red)' }}}
          onMouseLeave={e => { if (!active) { e.target.style.color='var(--ink-light)' }}}
          >{l.label}</Link>
        )
      })}
    </nav>
  )
}
