import { useSearchParams } from 'react-router-dom'
import data from '../data/product.json'
import PageHead from '../components/PageHead.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../store.jsx'

const sorts = {
  popular: { label: '인기물품', fn: (a, b) => b.popular - a.popular || b.salesCount - a.salesCount },
  low: { label: '낮은금액순', fn: (a, b) => a.price - b.price },
  high: { label: '높은금액순', fn: (a, b) => b.price - a.price },
  name: { label: '가나다순', fn: (a, b) => a.name.localeCompare(b.name, 'ko') },
}

export const steps = [
  { no: '01', icon: '🧺', text: '농산물 비중이 50%가 넘도록 하여 원하는 물품을 장바구니에 담습니다.' },
  { no: '02', icon: '📅', text: '지정된 배송일을 확인하고 주문합니다.' },
  { no: '03', icon: '💳', text: '물품금액의 80%는 포인트로 차감되고, 20%만 본인이 결제합니다.' },
]

export function Steps() {
  return (
    <div className="steps">
      <h2>선택형 꾸러미 구매 방법</h2>
      <ol>
        {steps.map((s) => (
          <li key={s.no}>
            <strong>{s.no}</strong>
            <span className="steps-icon" aria-hidden="true">{s.icon}</span>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="steps-note">
        <strong>주문 전 꼭 기억하세요!</strong>
        <p>· 지역별로 정해진 배송요일(월~금) 기준 2일 전 밤 12시까지 주문 가능합니다.</p>
        <p>· 상단 배송일을 변경하여 일자별 주문 가능한 제품을 확인할 수 있습니다.</p>
      </div>
    </div>
  )
}

function Products() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const sort = params.get('sort') || 'popular'
  const q = params.get('q') || ''
  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('focus')
    setParams(next, { replace: true })
  }

  const items = products
    .filter((p) => cat === 'all' || (cat === 'deal' ? p.discountRate > 0 : p.category === cat))
    .filter((p) => !q || `${p.name} ${p.certs.join(' ')} ${p.status === 'new' ? '햇물품' : ''}`.includes(q.trim()))
    .sort(sorts[sort].fn)

  return (
    <div className="page">
      <PageHead title="#선택형 꾸러미" desc="원하는 물품을 선택해 주문하세요" />
      <Steps />

      <form className="search page-search" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="물품 검색"
          aria-label="물품 검색"
          autoFocus={params.has('focus')}
          value={q}
          onChange={(e) => set('q', e.target.value)}
        />
      </form>

      <div className="chips" role="tablist" aria-label="카테고리">
        {[{ id: 'all', label: '전체' }, ...data.categories].map((c) => (
          <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} className={cat === c.id ? 'on' : ''} onClick={() => set('cat', c.id === 'all' ? '' : c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="list-bar">
        <span>총 {items.length}개</span>
        <select aria-label="정렬" value={sort} onChange={(e) => set('sort', e.target.value)}>
          {Object.entries(sorts).map(([id, s]) => <option key={id} value={id}>{s.label}</option>)}
        </select>
      </div>

      {items.length ? (
        <div className="grid">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="empty">카테고리에 등록된 물품이 없습니다</p>
      )}
    </div>
  )
}

export default Products
