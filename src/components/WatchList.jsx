import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, useStore } from '../store.jsx'
import { CartIcon, Price } from './ProductCard.jsx'
import { SectionHead } from './ProductSlider.jsx'

const items = products.filter((p) => p.badge === 'recommend')

function WatchList() {
  const { addCart } = useStore()
  const [openId, setOpenId] = useState(items[0].id)

  return (
    <section className="products">
      <SectionHead title="모두가 눈여겨 보는 물품 👀" subtitle="#관심집중 #한살림 바른 먹을거리" />
      <ul className="watch">
        {items.map((p) => {
          const open = openId === p.id
          return (
            <li key={p.id}>
              <button type="button" className="watch-head" aria-expanded={open} onClick={() => setOpenId(open ? null : p.id)}>
                {p.name}
                <span className="chevron">⌄</span>
              </button>
              {open && (
                <div className="watch-body">
                  <Link to={`/products/${p.id}`}><img src={p.images.main} alt={p.name} /></Link>
                  <div>
                    <h3 className="card-name">{p.name}</h3>
                    <p className="card-desc">{p.summary}</p>
                    <Price product={p} />
                  </div>
                  <button type="button" className="watch-cart" aria-label={`${p.name} 장바구니 담기`} onClick={() => addCart(p.id)}>
                    <CartIcon size={22} />
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default WatchList
