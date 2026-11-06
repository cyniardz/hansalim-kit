import { useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../data/product.json'
import { useStore } from '../store.jsx'

const groups = [
  { name: '선택형 꾸러미', icon: '/images/icons-2.png', subs: data.categories.map((c) => ({ to: `/products?cat=${c.id}`, label: c.label })) },
  { name: '이용안내', icon: '/images/icons-1.png', subs: [
    { to: '/guide?tab=apply', label: '임산부 꾸러미 신청' },
    { to: '/guide?tab=join', label: '아이디 만들기' },
    { to: '/guide?tab=order', label: '주문/배송/결제' },
    { to: '/guide?tab=return', label: '반품/문의' },
  ] },
  { name: '요리', icon: '/images/icons-5.png', subs: [{ to: '/recipes', label: '한살림 요리 검색' }] },
  { name: '한살림소개', icon: '/images/icons-3.png', subs: [
    { to: '/kit', label: '임산부꾸러미란?' },
    { to: '/intro?tab=hansalim', label: '한살림은' },
    { to: '/intro?tab=goods', label: '한살림 물품은' },
  ] },
]

function MenuDrawer({ open, onClose }) {
  const [openCat, setOpenCat] = useState(null)
  const { user, logout, likes, recent } = useStore()

  return (
    <div className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="drawer-dim" onClick={onClose}></div>
      <div className="drawer-panel" onClick={(e) => e.target.closest('a') && onClose()}>
        <div className="drawer-head">
          <div className="drawer-top">
            {user ? (
              <>
                <span>{user.name}님 안녕하세요</span>
                <span>·</span>
                <button type="button" onClick={logout}>로그아웃</button>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <span>·</span>
                <Link to="/join">아이디만들기</Link>
              </>
            )}
            <button type="button" className="drawer-close" aria-label="메뉴 닫기" onClick={onClose}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <ul className="drawer-quick">
            <li><Link to="/mypage">마이페이지</Link></li>
            <li><Link to="/mypage#orders">주문조회</Link></li>
            <li><Link to="/cart">장바구니</Link></li>
            <li><Link to="/mypage#likes">관심상품 ({likes.length})</Link></li>
            <li><Link to="/mypage#recent">최근본상품 ({recent.length})</Link></li>
          </ul>
        </div>

        <ul className="drawer-cats">
          {groups.map((g) => (
            <li key={g.name}>
              <button type="button" aria-expanded={openCat === g.name} onClick={() => setOpenCat(openCat === g.name ? null : g.name)}>
                <img src={g.icon} alt="" />
                {g.name}
                <span className="chevron">⌄</span>
              </button>
              {openCat === g.name && (
                <ul className="drawer-subs">
                  {g.subs.map((s) => (
                    <li key={s.to}><Link to={s.to}>{s.label}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <ul className="drawer-extra">
          <li><Link to="/products?cat=deal">알뜰 물품</Link></li>
          <li><a href="https://shop.hansalim.or.kr/" target="_blank" rel="noreferrer">한살림 영유아 물품</a></li>
        </ul>

        <ul className="drawer-footer">
          <li><Link to="/notice">공지사항</Link></li>
          <li><Link to="/guide?tab=return">반품/문의</Link></li>
          <li><Link to="/recipes">요리</Link></li>
          <li><Link to="/intro">한살림소개</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default MenuDrawer
