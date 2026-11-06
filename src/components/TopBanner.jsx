import { useState } from 'react'
import { Link } from 'react-router-dom'

function TopBanner() {
  const [show, setShow] = useState(true)
  if (!show) return null

  return (
    <div className="top-banner">
      <Link to="/kit">임산부 친환경농산물 꾸러미 240,000원 지원</Link>
      <button type="button" aria-label="띠배너 닫기" onClick={() => setShow(false)}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
    </div>
  )
}

export default TopBanner
