import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { findProduct, useStore } from '../store.jsx'
import { Price } from './ProductCard.jsx'
import { SectionHead } from './ProductSlider.jsx'

const pad = (n) => String(n).padStart(2, '0')

// 포트폴리오용 예시 타임딜: 이번 달 말일 자정까지 남은 시간
const left = () => {
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const s = Math.floor((end - now) / 1000)
  return `${Math.floor(s / 86400)}일 ${pad(Math.floor((s % 86400) / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
}

function TimeDeal() {
  const deal = findProduct(36)
  const { addCart } = useStore()
  const images = [deal.images.main, ...deal.images.details]
  const [time, setTime] = useState(left)
  const [current, setCurrent] = useState(images[0])

  useEffect(() => {
    const timer = setInterval(() => setTime(left()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="products timedeal">
      <SectionHead title="쉿! 지금만 이 가격" subtitle="#지금이 구매 타이밍 #이번 달까지만 이 가격" />

      <div className="deal-body">
        <div className="deal-img">
          <img src={current} alt={deal.name} />
          <p className="deal-timer">남은 시간 <strong>{time}</strong></p>
        </div>
        <div className="deal-info">
          <h3 className="card-name"><Link to={`/products/${deal.id}`}>{deal.name}</Link></h3>
          <p className="card-desc">{deal.summary}</p>
          <Price product={deal} />
          <button type="button" className="deal-cart" onClick={() => addCart(deal.id)}>장바구니 담기</button>
        </div>
      </div>

      <ul className="deal-thumbs">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              className={current === src ? 'on' : ''}
              aria-label={`${deal.name} 이미지 ${i + 1}`}
              onClick={() => setCurrent(src)}
            >
              <img src={src} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TimeDeal
