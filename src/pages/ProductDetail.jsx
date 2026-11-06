import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import data from '../data/product.json'
import PageHead from '../components/PageHead.jsx'
import { Price, Tags, unavailable } from '../components/ProductCard.jsx'
import { findProduct, useStore, won } from '../store.jsx'

const catLabel = Object.fromEntries(data.categories.map((c) => [c.id, c.label]))

// 물품이 바뀌면 key로 상태(수량·메시지·이미지)를 새로 시작한다
function ProductDetail() {
  const { id } = useParams()
  return <Detail key={id} p={findProduct(id)} />
}

function Detail({ p }) {
  const { addCart, likes, toggleLike, viewed } = useStore()
  const [qty, setQty] = useState(1)
  const [msg, setMsg] = useState('')
  const [img, setImg] = useState(null)

  useEffect(() => {
    if (p) viewed(p.id)
  }, [p]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!p) return <div className="page"><PageHead title="물품 상세" /><p className="empty">물품을 찾을 수 없습니다. <Link to="/products">물품 목록으로</Link></p></div>

  const images = [p.images.main, ...p.images.details]
  const off = unavailable(p)
  const max = Math.min(p.maxQuantity, p.stock)
  const recipes = data.recipes.filter((r) => r.productIds.includes(p.id))
  const liked = likes.includes(p.id)

  return (
    <div className="page detail">
      <PageHead title={catLabel[p.category]} />
      <img className="detail-img" src={img || images[0]} alt={p.name} />
      {images.length > 1 && (
        <ul className="deal-thumbs">
          {images.map((src, i) => (
            <li key={src}>
              <button type="button" className={(img || images[0]) === src ? 'on' : ''} aria-label={`이미지 ${i + 1}`} onClick={() => setImg(src)}>
                <img src={src} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="detail-info">
        <Tags product={p} />
        <h2>{p.name}</h2>
        <p className="card-desc">{p.summary}</p>
        <Price product={p} />
        <dl className="specs">
          <dt>원산지</dt><dd>{p.specs.origin}</dd>
          <dt>보관방법</dt><dd>{p.specs.storage}</dd>
          <dt>유통기한</dt><dd>{p.specs.shelfLife}</dd>
          {p.allergens.length > 0 && (<><dt>알레르기</dt><dd>{p.allergens.join(', ')}</dd></>)}
          <dt>배송</dt><dd>{data.shippingPolicy.types[p.shippingType]?.label} · 별도 배송비 없음</dd>
        </dl>

        {off ? (
          <p className="detail-off">현재 {p.status === 'soldout' ? '공급이 중단된' : '임시로 공급이 중단된'} 물품입니다.</p>
        ) : (
          <>
            <div className="qty">
              <span>수량</span>
              <button type="button" aria-label="수량 빼기" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <output aria-live="polite">{qty}</output>
              <button type="button" aria-label="수량 더하기" onClick={() => setQty(Math.min(max, qty + 1))}>+</button>
              <strong>{won(p.price * qty)}</strong>
            </div>
            <div className="detail-btns">
              <button type="button" className={`btn-line ${liked ? 'on' : ''}`} aria-pressed={liked} onClick={() => toggleLike(p.id)}>
                {liked ? '♥ 관심상품' : '♡ 관심상품'}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  addCart(p.id, qty)
                  setMsg('장바구니에 담았습니다.')
                }}
              >
                장바구니 담기
              </button>
            </div>
            {msg && <p className="form-msg" role="status">{msg} <Link to="/cart">장바구니 보기 ›</Link></p>}
          </>
        )}
      </div>

      {recipes.length > 0 && (
        <section className="detail-section">
          <h3>이 물품으로 만드는 요리</h3>
          <ul className="mini-list">
            {recipes.map((r) => (
              <li key={r.id}><img src={r.image} alt="" /><span>{r.name}</span></li>
            ))}
          </ul>
        </section>
      )}

      <section className="detail-section">
        <h3>물품 후기 <small>(예시)</small> ★ {p.rating.average} ({p.rating.count})</h3>
        <ul className="review-list">
          {p.reviews.map((r) => (
            <li key={r.id}>
              <p><span className="stars">{'★'.repeat(r.rating)}</span> {r.author} · {r.date}</p>
              <p>{r.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default ProductDetail
