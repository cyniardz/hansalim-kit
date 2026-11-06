import { useState } from 'react'
import data from '../data/product.json'
import { useStore } from '../store.jsx'
import { CartIcon } from './ProductCard.jsx'
import { SectionHead, useProgress } from './ProductSlider.jsx'

// 레시피 데이터에 분류가 없어 이름으로 고기·생선 요리를 가른다
export const isMeat = (r) => /소고기|한우|생선|동태|불고기|샤브|장조림|떡갈비/.test(r.name)
export const recipeTabs = [
  { id: 'all', label: '전체', filter: () => true },
  { id: 'veg', label: '채소', filter: (r) => !isMeat(r) },
  { id: 'meat', label: '고기·생선', filter: isMeat },
]

export function RecipeCard({ recipe }) {
  const { addCart } = useStore()
  return (
    <article className="card recipe-card">
      <div className="card-img">
        <img src={recipe.image} alt={recipe.name} loading="lazy" />
        <button
          type="button"
          className="card-cart"
          aria-label={`${recipe.name} 재료 ${recipe.productIds.length}개 장바구니 담기`}
          onClick={() => recipe.productIds.forEach((id) => addCart(id))}
        >
          <CartIcon />
        </button>
      </div>
      <h3 className="card-name">{recipe.name}</h3>
      <p className="card-desc">{recipe.summary}</p>
    </article>
  )
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="recipe-tabs" role="tablist">
      {tabs.map((t) => (
        <button key={t.id} type="button" role="tab" aria-selected={value === t.id} className={value === t.id ? 'on' : ''} onClick={() => onChange(t.id)}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

function Recipes() {
  const [tab, setTab] = useState('veg')
  const [onScroll, bar] = useProgress()
  const items = data.recipes.filter(recipeTabs.find((t) => t.id === tab).filter)

  return (
    <section className="products recipes">
      <SectionHead title="요리" subtitle="#냠냠 #힘이 불끈 #한살림 요리" to="/recipes" />
      <Tabs tabs={recipeTabs.slice(1)} value={tab} onChange={setTab} />
      <div className="products-track" key={tab} onScroll={onScroll}>
        {items.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
      {bar}
    </section>
  )
}

export default Recipes
