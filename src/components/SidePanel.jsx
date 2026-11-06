import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const tags = ['콩나물', '두부', '우유', '요구르트', '무농약', '유기농', '백미', '현미', '고구마', '버섯', '꼬마와땅', '햇물품']

function SidePanel() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const go = (word) => navigate(`/products?q=${encodeURIComponent(word)}`)

  return (
    <aside className="side-panel">
      <form
        className="search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          go(q.trim())
        }}
      >
        <input type="search" placeholder="물품 검색" aria-label="물품 검색" value={q} onChange={(e) => setQ(e.target.value)} />
        <button type="submit" aria-label="검색">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
        </button>
      </form>

      <ul className="tags">
        {tags.map((tag) => (
          <li key={tag}>
            <button type="button" onClick={() => go(tag)}>{tag}</button>
          </li>
        ))}
      </ul>

      <a href="https://shop.hansalim.or.kr/" target="_blank" rel="noreferrer" className="side-banner">
        <img src="/images/banner-1.png" alt="한살림 영유아 브랜드 꼬마와땅 물품 바로가기" />
      </a>
      <Link to="/kit" className="side-banner">
        <img src="/images/banner-2.jpg" alt="엄마와 아이의 건강 한살림이 응원합니다" />
      </Link>
    </aside>
  )
}

export default SidePanel
