import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard.jsx'

export function useProgress() {
  const [progress, setProgress] = useState(0)
  const onScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }
  const bar = (
    <div className="progress" aria-hidden="true">
      <span style={{ width: `${25 + progress * 75}%` }}></span>
    </div>
  )
  return [onScroll, bar]
}

export function SectionHead({ title, subtitle, to = '/products', green }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {to && <Link to={to} className={green ? 'more-btn green' : 'more-btn'}>전체보기</Link>}
    </div>
  )
}

function ProductSlider({ items, title, subtitle, green, to, children }) {
  const [onScroll, bar] = useProgress()

  return (
    <section className="products">
      <SectionHead title={title} subtitle={subtitle} green={green} to={to} />
      {children}
      <div className="products-track" onScroll={onScroll}>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {bar}
    </section>
  )
}

export default ProductSlider
