import { Link, useNavigate } from 'react-router-dom'

const icon = {
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  home: <path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" />,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
}

const Icon = ({ name, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    {icon[name]}
  </svg>
)

function BottomNav({ onMenu }) {
  const navigate = useNavigate()

  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      <button type="button" onClick={onMenu}><Icon name="menu" />카테고리</button>
      <Link to="/mypage"><Icon name="user" />마이페이지</Link>
      <button
        type="button"
        className="bottom-home"
        aria-label="홈"
        onClick={() => {
          navigate('/')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <Icon name="home" size={32} />
      </button>
      <Link to="/mypage#likes"><Icon name="heart" />관심상품</Link>
      <Link to="/products?focus=1"><Icon name="search" />상품검색</Link>
    </nav>
  )
}

export default BottomNav
