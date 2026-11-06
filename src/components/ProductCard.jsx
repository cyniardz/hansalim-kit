import { Link } from 'react-router-dom'
import { useStore, won } from '../store.jsx'

const statusLabel = { new: '햇물품', soldout: '공급중단', paused: '임시중단' }
export const unavailable = (p) => p.status === 'soldout' || p.status === 'paused'

export const CartIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 8h14l-1 13H6L5 8z" />
    <path d="M9 8V6a3 3 0 016 0v2" />
  </svg>
)

export function Tags({ product }) {
  return (
    <p className="card-tags">
      {product.status && <span className={`tag-status ${product.status}`}>{statusLabel[product.status]}</span>}
      {product.popular && <span className="tag-hot">인기</span>}
      {product.certs.map((c) => <span key={c}>{c}</span>)}
    </p>
  )
}

export function Price({ product }) {
  return (
    <>
      {product.discountRate > 0 && <del className="card-price-old">{won(product.originalPrice)}</del>}
      <p className="card-price">
        <strong>{won(product.price)}</strong>
        {product.discountRate > 0 && <span className="card-rate">{product.discountRate}%</span>}
      </p>
    </>
  )
}

function ProductCard({ product }) {
  const { likes, toggleLike, addCart } = useStore()
  const liked = likes.includes(product.id)
  const off = unavailable(product)

  return (
    <article className={`card ${off ? 'off' : ''}`}>
      <div className="card-img">
        <Link to={`/products/${product.id}`}>
          <img src={product.images.main} alt={product.name} loading="lazy" />
          {off && <span className="card-off">{statusLabel[product.status]}</span>}
        </Link>
        <button
          type="button"
          className={`card-like ${liked ? 'on' : ''}`}
          aria-label={liked ? '관심상품 해제' : '관심상품 담기'}
          aria-pressed={liked}
          onClick={() => toggleLike(product.id)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
          </svg>
        </button>
        <button type="button" className="card-cart" disabled={off} aria-label={`${product.name} 장바구니 담기`} onClick={() => addCart(product.id)}>
          <CartIcon />
        </button>
      </div>
      <Tags product={product} />
      <h3 className="card-name"><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
      <p className="card-desc">{product.summary}</p>
      <Price product={product} />
    </article>
  )
}

export default ProductCard
