import { Link, useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'
import { Tabs } from '../components/Recipes.jsx'

// 실제 사이트 이용안내(PWGU0201) 내용
const sections = [
  {
    id: 'apply',
    label: '임산부 꾸러미 신청',
    body: (
      <>
        <h3>신청대상</h3>
        <ul className="dots">
          <li>25.1.1일 이후 출산한 산모 또는 신청일 현재 임신부</li>
          <li>단, 영양플러스 사업, 농식품바우처의 지원을 받는 임산부는 지원 대상에서 제외</li>
          <li className="note">* 과거에 영양플러스, 농식품바우처 사업의 지원을 받았으나 신청 시점에 대상이 아닌 경우 본 사업의 지원 대상에 포함</li>
        </ul>
        <h3>지원금액</h3>
        <ul className="dots">
          <li>총 구매 가능 금액 240,000원 [지자체 192,000원, 본인 48,000원(20% 자부담)]</li>
          <li>지원금액은 한살림 임산부 꾸러미 사이트에서만 사용할 수 있는 포인트로 지급됩니다.</li>
          <li>1회 공급 한도금액: 40,000원 이상 100,000원 이하</li>
          <li>농산물 비중 금액이 50% 이상 주문되어야 정상 결제가 가능합니다. (농림축산식품부 지침)</li>
        </ul>
        <h3>지원기간</h3>
        <ul className="dots">
          <li>대상자 확정(고유번호부여) 후 개별 문자 안내</li>
          <li>상세일정은 문자로 안내 진행됩니다. (각 지자체의 방침에 따라 지원기간이 다를 수 있음)</li>
          <li>대상자 확정 후 30일 이내 온라인몰 미가입자와 60일 이내 미주문 시 사업대상자에서 제외 됩니다. (농림축산식품부 지침)</li>
          <li>포인트를 모두 사용하시면 임산부 꾸러미 지원은 자동 종료됩니다.</li>
          <li>사용기간 경과 후 잔여포인트는 자동 소멸하므로 기간 내 꼭 모두 사용하시기 바랍니다.</li>
        </ul>
        <h3>지원물품</h3>
        <ul className="dots">
          <li>친환경 농산물 및 축산물, 가공식품</li>
          <li>유기/무농약 농산물, 유기축산물, 유기수산물, 유기가공식품, 무농약가공식품, 동물복지인증품 등</li>
          <li>각 지자체의 방침에 따라 지원 물품이 다를 수 있음</li>
        </ul>
        <h3>신청방법</h3>
        <ul className="dots">
          <li>지자체 승인 후에 꾸러미물품 이용을 위한 임산부 전용 한살림쇼핑몰에 가입을 하셔야 합니다.</li>
          <li>한살림 쇼핑몰 가입 및 이용안내는 지자체 승인 후에 문자를 통해서 안내 드립니다.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'join',
    label: '아이디 만들기',
    body: (
      <>
        <div className="remember">
          <strong>꼭 기억하세요!</strong>
          <ul className="dots">
            <li>회원가입 시 가입비, 출자금은 부과하지 않습니다.</li>
            <li>아이디를 만들고 나면 지원금이 꾸러미 포인트로 즉시 지급됩니다(‘마이페이지’ 조회).</li>
            <li>한살림 공급 방식에 따라 직접 배송을 원칙으로 하고, 지역에 따라 냉장 배송이 가능한 위탁배송으로 진행됩니다.</li>
            <li>직접 배송이 불가능한 지역은 택배로 배송됩니다. 단, 택배 특성상 변질이나 파손 위험이 있는 물품을 제외한 임산부 꾸러미 일부 물품에 한해 주문할 수 있습니다.</li>
          </ul>
        </div>
        <Link to="/join" className="btn block">가입하기</Link>
      </>
    ),
  },
  {
    id: 'order',
    label: '주문/배송/결제',
    body: (
      <>
        <h3>주문/배송 · 배송 2일 전 주문 마감!</h3>
        <p>주문은 지역별로 정해진 배송요일(월~금) 기준 2일 전 밤 12시까지 가능합니다. 이는 주문한 만큼 생산해 물품을 신선하게 전달하기 위해 외부 유통업체를 거치지 않고 생산자와 직거래하는 한살림만의 배송 방식입니다. 조금 불편할 수 있지만, 생산자와 소비자가 더불어 사는 방법입니다.</p>
        <p>회원별 지정된 배송요일은 가입 시 안내하며, 로그인 후 화면 상단 ‘배송일’ 또는 조합원상담실(1661-0800)을 통해서 확인할 수 있습니다.</p>
        <div className="remember">
          <strong>꼭 기억하세요!</strong>
          <ul className="dots">
            <li>1회 주문 한도금액은 40,000원 이상, 100,000원 이하 입니다.</li>
            <li>한살림은 환경보호를 위한 자원순환 일환으로 공급상자와 보냉상자를 재사용합니다. 다음 배송일에 상자를 집 앞에 두시면 배송실무자가 회수하겠습니다.</li>
            <li>택배 배송 지역의 경우 공급상자를 사용하지 않으며, 택배상자는 회수하지 않습니다.</li>
          </ul>
        </div>
        <h3>결제</h3>
        <div className="remember">
          <strong>꼭 기억하세요!</strong>
          <ul className="dots">
            <li>꾸러미 포인트는 회원이 임의대로 수정할 수 없으며, 1회당 최대 80,000원까지 주문 가능합니다. 포인트 모두 사용 시 ‘0’으로 표기됩니다.</li>
            <li>본인 부담금은 가상계좌 입금, 신용카드 결제가 가능합니다.</li>
            <li>본인 부담금 가상계좌 결제는 입금 확인 후 주문 완료됩니다.</li>
            <li>물품 주문 시 별도의 배송비는 부과하지 않습니다.</li>
          </ul>
        </div>
        <Link to="/products" className="btn block">선택형 꾸러미 주문하기</Link>
      </>
    ),
  },
  {
    id: 'return',
    label: '반품/문의',
    body: (
      <>
        <p>교환/반품시 한살림 조합원상담실로 문의해 주세요.</p>
        <ul className="dots">
          <li>물품 교환은 당사 배송 오류 또는 품질 이상인 경우에만 가능합니다.</li>
          <li>반품 및 교환은 꾸러미 전체가 아닌 해당 개별 물품에 대해서만 가능합니다.</li>
          <li>반품/교환 신청은 조합원상담실(1661-0800)로 연락주세요.</li>
          <li>상담시간 : 평일 9:30 ~ 17:30 (점심시간 12:00 ~ 13:00)</li>
          <li>휴무일 : 주말, 명절, 어린이날, 성탄절, 선거일(총선, 대선)</li>
        </ul>
        <a href="tel:16610800" className="btn block">조합원상담실 1661-0800</a>
      </>
    ),
  },
]

function Guide() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') || 'all'
  const shown = tab === 'all' ? sections : sections.filter((s) => s.id === tab)

  return (
    <div className="page">
      <PageHead title="이용안내" />
      <Tabs tabs={[{ id: 'all', label: '전체' }, ...sections]} value={tab} onChange={(id) => setParams(id === 'all' ? {} : { tab: id }, { replace: true })} />
      {shown.map((s) => (
        <section key={s.id} className="article">
          <h2>{sections.indexOf(s) + 1}. {s.label}</h2>
          {s.body}
        </section>
      ))}
    </div>
  )
}

export default Guide
