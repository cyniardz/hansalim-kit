import { useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'
import { Tabs } from '../components/Recipes.jsx'

const tabs = [
  { id: 'hansalim', label: '한살림은' },
  { id: 'goods', label: '한살림 물품은' },
]

// 실제 사이트 한살림소개(PWGU0101)는 이미지로 되어 있어 홈 소개 문구와 이용안내 기준을 글로 옮겼다
function Intro() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') || 'hansalim'

  return (
    <div className="page">
      <PageHead title="한살림소개" />
      <Tabs tabs={tabs} value={tab} onChange={(id) => setParams({ tab: id }, { replace: true })} />
      {tab === 'hansalim' ? (
        <section className="article">
          <img className="page-visual" src="/images/banner-5.png" alt="" />
          <h2 className="lead">한살림은</h2>
          <p>생명을 살리는 마음으로 농사짓고 물품을 만드는 생산자와, 그 가치를 알고 귀하게 여기는 소비자가 함께 만든 생활협동조합입니다.</p>
          <p>조합원의 출자와 이용으로 운영되며, 인터넷과 모바일앱, 매장에서 조합원으로 가입할 수 있습니다.</p>
          <p>전국 23개 지역한살림과 230여 개 매장이 있으며, 70만여 세대 소비자조합원과 2,200여 세대 생산자가 함께하고 있습니다.</p>
        </section>
      ) : (
        <section className="article">
          <img className="page-visual" src="/images/product-00.png" alt="" />
          <h2 className="lead">한살림 물품은</h2>
          <p>주문한 만큼 생산해 물품을 신선하게 전달하기 위해 외부 유통업체를 거치지 않고 생산자와 직거래합니다.</p>
          <ul className="dots">
            <li>유기/무농약 농산물, 유기축산물, 유기수산물, 유기가공식품, 무농약가공식품, 동물복지인증품 등 친환경 물품을 공급합니다.</li>
            <li>한살림 물품 생산·취급기준에 따라 우리땅에서 건강하게 생산한 먹을거리를 담습니다.</li>
            <li>환경보호를 위한 자원순환 일환으로 공급상자와 보냉상자를 재사용합니다.</li>
          </ul>
        </section>
      )}
    </div>
  )
}

export default Intro
