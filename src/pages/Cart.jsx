import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'
import { checkout, RULES, useStore, won } from '../store.jsx'

function Cart() {
  const { lines, setQty, user, order } = useStore()
  const [done, setDone] = useState(null)
  const [errors, setErrors] = useState([])
  const r = checkout(lines, user ? user.points : RULES.total)
  const farmPct = r.total ? Math.round((r.farm / r.total) * 100) : 0

  if (done) {
    return (
      <div className="page">
        <PageHead title="주문 완료" />
        <div className="result-box">
          <p>주문이 완료되었습니다.</p>
          <p>포인트 차감 <strong>{won(done.usePoint)}</strong> · 본인 결제 <strong>{won(done.pay)}</strong></p>
          <Link to="/mypage#orders" className="btn block">주문내역 보기</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <PageHead title="장바구니" />
      {lines.length === 0 ? (
        <div className="result-box">
          <p>장바구니에 담긴 물품이 없습니다.</p>
          <Link to="/products" className="btn block">선택형 꾸러미 담으러 가기</Link>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {lines.map(({ id, qty, product: p }) => (
              <li key={id}>
                <Link to={`/products/${id}`}><img src={p.images.main} alt="" /></Link>
                <div>
                  <p className="card-name">{p.name}</p>
                  <p className="card-desc">{won(p.price)}</p>
                  <div className="qty small">
                    <button type="button" aria-label={`${p.name} 수량 빼기`} onClick={() => setQty(id, qty - 1)}>−</button>
                    <output>{qty}</output>
                    <button type="button" aria-label={`${p.name} 수량 더하기`} onClick={() => setQty(id, Math.min(p.maxQuantity, qty + 1))}>+</button>
                  </div>
                </div>
                <strong>{won(p.price * qty)}</strong>
                <button type="button" className="cart-del" aria-label={`${p.name} 삭제`} onClick={() => setQty(id, 0)}>✕</button>
              </li>
            ))}
          </ul>

          <div className="farm-meter" aria-label={`농산물 비중 ${farmPct}%`}>
            <p>농산물 비중 <strong className={farmPct >= 50 ? 'ok' : 'ng'}>{farmPct}%</strong> (50% 이상 필요)</p>
            <div><span style={{ width: `${farmPct}%` }}></span><i style={{ left: '50%' }}></i></div>
          </div>

          <dl className="sum">
            <dt>물품금액</dt><dd>{won(r.total)}</dd>
            <dt>꾸러미 포인트 (80%, 1회 최대 {won(RULES.pointMax)})</dt><dd>− {won(r.usePoint)}</dd>
            <dt>본인 부담금</dt><dd><strong>{won(r.pay)}</strong></dd>
          </dl>
          {user && <p className="card-desc">남은 포인트 {won(user.points)}</p>}

          {(errors.length ? errors : r.errors).map((e) => <p key={e} className="form-error" role="alert">{e}</p>)}

          {user ? (
            <button
              type="button"
              className="btn block"
              disabled={r.errors.length > 0}
              onClick={() => {
                const snapshot = r
                const err = order()
                if (err) setErrors(err)
                else setDone(snapshot)
              }}
            >
              주문하기
            </button>
          ) : (
            <Link to="/login?next=/cart" className="btn block">로그인하고 주문하기</Link>
          )}
        </>
      )}
    </div>
  )
}

export default Cart
