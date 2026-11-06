import { Link } from 'react-router-dom'
import data from '../data/product.json'

const snsUrl = {
  facebook: 'https://www.facebook.com/hansalim',
  instagram: 'https://www.instagram.com/hansalim_official/',
  youtube: 'https://www.youtube.com/@hansalim',
  kakaotalk: 'https://pf.kakao.com/',
  blog: 'https://blog.naver.com/hansalim_official',
}

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li><Link to="/intro">한살림소개</Link></li>
        <li><a href="#">이용약관</a></li>
        <li><a href="#">개인정보처리방침</a></li>
        <li><Link to="/guide">이용안내</Link></li>
      </ul>

      <img className="footer-logo" src={data.assets.logos.footer} alt="한살림" />

      <h2>상담실 1661-0800</h2>
      <div className="footer-cs">
        <p>평일 9:30 ~ 17:30<br />점심시간 12:00 ~ 13:00</p>
        <p>휴무일 : 주말, 명절, 어린이날,<br />성탄절, 선거일(총선, 대선)</p>
      </div>

      <h2>결제 안내</h2>
      <p>물품금액의 80%는 꾸러미 포인트로 차감되고, 본인 부담금 20%는 가상계좌 입금·신용카드로 결제합니다. 별도 배송비는 없습니다.</p>

      <ul className="footer-sns">
        {data.assets.sns.map((s) => (
          <li key={s.id}>
            <a href={snsUrl[s.id]} target="_blank" rel="noreferrer" aria-label={s.id}>
              <img src={s.image} alt="" />
            </a>
          </li>
        ))}
      </ul>

      <hr />
      <h2>(주)한살림사업연합</h2>
      <p>
        대표자 : 김순규, 권옥자 · 사업자등록번호 : 126-81-61730<br />
        통신판매업신고번호 : 2021-경기안성-0060<br />
        안성사무소 : 경기 안성시 대덕면 안성대로 1526(보동리 285-3)<br />
        서울사무소 : 서울시 서초구 바우뫼로 217 (양재동 4-17)<br />
        이곳의 모든 저작권은 한살림에게 있습니다.
      </p>
      <p className="footer-copy">※ {data.meta.sampleNotice}</p>
    </footer>
  )
}

export default Footer
