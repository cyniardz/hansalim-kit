import { useState } from 'react'
import PageHead from '../components/PageHead.jsx'

// shortcut: 실제 공지 목록은 볼 수 없어 이용안내 내용으로 만든 예시 글이다, 실제 공지가 생기면 교체
const notices = [
  { no: 5, type: '안내', title: '배송 2일 전 주문 마감 안내', date: '2026-11-03', views: 128, body: '주문은 지역별로 정해진 배송요일(월~금) 기준 2일 전 밤 12시까지 가능합니다.' },
  { no: 4, type: '안내', title: '1회 주문 한도금액 안내 (40,000원 ~ 100,000원)', date: '2026-10-27', views: 214, body: '1회 주문 한도금액은 40,000원 이상, 100,000원 이하이며 농산물 비중 금액이 50% 이상이어야 결제가 가능합니다.' },
  { no: 3, type: '물품', title: '애호박 공급중단, 부추·꼬마새송이버섯 임시중단 안내', date: '2026-10-20', views: 301, body: '작황에 따라 일부 물품의 공급이 중단되었습니다. 공급이 재개되면 다시 안내드리겠습니다.' },
  { no: 2, type: '안내', title: '공급상자·보냉상자 회수 안내', date: '2026-10-13', views: 176, body: '다음 배송일에 상자를 집 앞에 두시면 배송실무자가 회수하겠습니다. 택배 배송 지역은 상자를 회수하지 않습니다.' },
  { no: 1, type: '안내', title: '잔여 포인트 소멸 안내', date: '2026-10-01', views: 452, body: '사용기간 경과 후 잔여포인트는 자동 소멸하므로 기간 내 꼭 모두 사용하시기 바랍니다.' },
]

function Notice() {
  const [open, setOpen] = useState(null)

  return (
    <div className="page">
      <PageHead title="공지사항" />
      <ul className="notice">
        {notices.map((n) => (
          <li key={n.no}>
            <button type="button" aria-expanded={open === n.no} onClick={() => setOpen(open === n.no ? null : n.no)}>
              <span className="notice-type">{n.type}</span>
              <strong>{n.title}</strong>
              <small>{n.date} · 조회 {n.views}</small>
            </button>
            {open === n.no && <p className="notice-body">{n.body}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notice
