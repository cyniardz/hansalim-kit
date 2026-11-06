import { useState } from 'react'
import data from '../data/product.json'
import PageHead from '../components/PageHead.jsx'
import { RecipeCard, recipeTabs, Tabs } from '../components/Recipes.jsx'

const sorts = {
  new: { label: '최신순', fn: (a, b) => b.id - a.id },
  asc: { label: '요리명 오름차순', fn: (a, b) => a.name.localeCompare(b.name, 'ko') },
  desc: { label: '요리명 내림차순', fn: (a, b) => b.name.localeCompare(a.name, 'ko') },
}

function RecipeList() {
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('new')
  const items = data.recipes
    .filter(recipeTabs.find((t) => t.id === tab).filter)
    .filter((r) => r.name.includes(q.trim()))
    .sort(sorts[sort].fn)

  return (
    <div className="page">
      <PageHead title="요리" desc="한살림 요리 조건 검색" />
      <form className="search page-search" role="search" onSubmit={(e) => e.preventDefault()}>
        <input type="search" placeholder="요리 검색" aria-label="요리 검색" value={q} onChange={(e) => setQ(e.target.value)} />
      </form>
      <Tabs tabs={recipeTabs} value={tab} onChange={setTab} />
      <div className="list-bar">
        <span>총 {items.length}개</span>
        <select aria-label="정렬" value={sort} onChange={(e) => setSort(e.target.value)}>
          {Object.entries(sorts).map(([id, s]) => <option key={id} value={id}>{s.label}</option>)}
        </select>
      </div>
      {items.length ? (
        <div className="grid">
          {items.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      ) : (
        <p className="empty">검색된 요리가 없습니다</p>
      )}
    </div>
  )
}

export default RecipeList
