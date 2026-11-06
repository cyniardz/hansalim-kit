import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { CartIcon } from './ProductCard.jsx'

export const menus = [
  { to: '/', label: '홈' },
  { to: '/products', label: '#선택형 꾸러미' },
  { to: '/guide', label: '이용안내' },
  { to: '/recipes', label: '요리' },
  { to: '/kit', label: '임산부꾸러미란?' },
  { to: '/intro', label: '한살림소개' },
  { to: '/notice', label: '공지사항' },
]

function Header({ onMenu }) {
  const { cartCount } = useStore()

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          한살림<span>임산부꾸러미</span>
        </Link>
        <div className="header-icons">
          <Link to="/cart" className="cart" aria-label={`장바구니, 담긴 물품 ${cartCount}개`}>
            <CartIcon size={28} />
            <span className="badge">{cartCount}</span>
          </Link>
          <button type="button" aria-label="전체 메뉴 열기" onClick={onMenu}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="gnb">
        <ul>
          {menus.map((m) => (
            <li key={m.to}>
              <NavLink to={m.to} end className={({ isActive }) => (isActive ? 'active' : '')}>
                {m.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
