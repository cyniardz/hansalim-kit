import { useState } from 'react'
import { Steps } from '../pages/Products.jsx'

// 포트폴리오 시연용: 저장하지 않아서 새로고침하면 항상 다시 뜬다
function GuidePopup() {
  const [show, setShow] = useState(true)
  if (!show) return null

  return (
    <div className="popup" role="dialog" aria-modal="true" aria-label="선택형 꾸러미 구매 방법">
      <div className="popup-box">
        <div className="popup-steps">
          <Steps />
        </div>
        <div className="popup-btns">
          <button type="button" onClick={() => setShow(false)}>오늘 하루 열지 않기</button>
          <button type="button" onClick={() => setShow(false)}>닫기 ✕</button>
        </div>
      </div>
    </div>
  )
}

export default GuidePopup
