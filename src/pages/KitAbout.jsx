import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'

// 실제 사이트 임산부꾸러미란?(PWGU0301) 내용
function KitAbout() {
  return (
    <div className="page">
      <PageHead title="임산부꾸러미란?" />
      <img className="page-visual" src="/images/banner-2.jpg" alt="엄마와 아이의 건강 한살림이 응원합니다" />
      <section className="article">
        <h2 className="lead">한살림이 지방자치단체와 협력해 임산부에게 친환경 농산물 꾸러미를 지원합니다.</h2>
        <p>‘임산부 꾸러미’에는 한살림 물품 생산·취급기준에 따라 우리땅에서 건강하게 생산한 먹을거리를 풍성하게 담았습니다.</p>
        <p>임산부는 적은 비용으로 친환경 농산물 꾸러미를 집 앞에서 편하게 받을 수 있어 출산과 육아의 부담을 덜고, 농민들은 새로운 공급처를 확보해 보다 안정적으로 농사지을 수 있습니다.</p>
        <p>나아가 국산 농산물을 이용함으로써 온실가스 발생량, 불필요한 자원 낭비 등을 줄여 지구를 살리는 일에 함께할 수 있습니다.</p>
        <p className="quote">엄마가 건강해야 아이가 건강하고 가족이 행복합니다. 한살림이 ‘임산부 친환경 농산물 꾸러미 지원 사업’을 통해 엄마와 아이의 건강한 미래를 응원하겠습니다.</p>
      </section>

      <section className="article">
        <h3>지원대상</h3>
        <ul className="dots">
          <li>25.1.1일 이후 출산한 산모 또는 신청일 현재 임신부</li>
          <li>단, 영양플러스 사업, 농식품바우처의 지원을 받는 임산부는 지원 대상에서 제외</li>
          <li className="note">* 과거에 영양플러스, 농식품바우처 사업의 지원을 받았으나 신청 시점에 대상이 아닌 경우 본 사업의 지원 대상에 포함</li>
        </ul>
        <h3>지원내용</h3>
        <div className="kit-money">
          <div><span>1인당 연간 이용 가능</span><strong>240,000원</strong></div>
          <div><span>자부담 20%</span><strong>48,000원</strong></div>
        </div>
        <p>자부담 20%(48,000원)만 부담하면 1인당 연간 240,000원 상당의 친환경 꾸러미 물품 이용 가능</p>
        <Link to="/guide" className="btn block">이용안내 보기</Link>
      </section>
    </div>
  )
}

export default KitAbout
