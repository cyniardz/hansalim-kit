import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { findProduct, RULES, useStore, won } from '../store.jsx'

function MyPage() {
  const { user, logout, likes, recent } = useStore()
  const { hash } = useLocation()

  // #likes, #orders 같은 주소로 들어오면 그 영역으로 스크롤
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView()
  }, [hash, user])

  if (!user) {
    return (
      <div className="page">
        <PageHead title="마이페이지" />
        <div className="result-box">
          <p>로그인 후 이용할 수 있습니다.</p>
          <Link to="/login?next=/mypage" className="btn block">로그인</Link>
          <Link to="/join" className="btn-line block">아이디 만들기</Link>
        </div>
      </div>
    )
  }

  const used = RULES.total - user.points
  const list = (ids) => ids.map(findProduct).filter(Boolean)

  return (
    <div className="page">
      <PageHead title="마이페이지" desc={`${user.name}님 안녕하세요`} />

      <div className="point-card">
        <p>남은 꾸러미 포인트</p>
        <strong>{won(user.points)}</strong>
        <div className="bar"><span style={{ width: `${(user.points / RULES.total) * 100}%` }}></span></div>
        <small>총 {won(RULES.total)} 중 {won(used)} 사용</small>
      </div>

      <section className="detail-section" id="orders">
        <h3>주문내역 ({user.orders.length})</h3>
        {user.orders.length ? (
          <ul className="order-list">
            {user.orders.map((o) => (
              <li key={o.no}>
                <p><strong>{o.date}</strong> · 물품금액 {won(o.total)}</p>
                <p className="card-desc">{o.items.join(', ')}</p>
                <p className="card-desc">포인트 {won(o.usePoint)} · 본인 결제 {won(o.pay)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">주문내역이 없습니다.</p>
        )}
      </section>

      <section className="detail-section" id="likes">
        <h3>관심상품 ({likes.length})</h3>
        {likes.length ? <div className="grid">{list(likes).map((p) => <ProductCard key={p.id} product={p} />)}</div> : <p className="empty">관심상품이 없습니다.</p>}
      </section>

      <section className="detail-section" id="recent">
        <h3>최근 본 상품 ({recent.length})</h3>
        {recent.length ? <div className="grid">{list(recent).map((p) => <ProductCard key={p.id} product={p} />)}</div> : <p className="empty">최근 본 상품이 없습니다.</p>}
      </section>

      <button type="button" className="btn-line block" onClick={logout}>로그아웃</button>
    </div>
  )
}

export default MyPage
