import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  { src: '/images/banner-2.jpg', alt: '엄마와 아이의 건강 한살림이 응원합니다', to: '/kit' },
  { src: '/images/banner-1.png', alt: '한살림 영유아 브랜드 꼬마와땅', to: '/products?q=꼬마와땅' },
  { src: '/images/banner-3.jpg', alt: '선택형 꾸러미 구매 방법', to: '/guide' },
]

function HeroSlider() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const go = (i) => {
    const track = trackRef.current
    const next = (i + slides.length) % slides.length
    track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
  }

  // 5초마다 다음 장으로. 사용자가 넘겨 index가 바뀌면 타이머를 새로 시작한다.
  useEffect(() => {
    const timer = setTimeout(() => go(index + 1), 5000)
    return () => clearTimeout(timer)
  }, [index])

  const onScroll = () => {
    const track = trackRef.current
    setIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  return (
    <section className="hero" aria-label="메인 배너">
      <ul className="hero-track" ref={trackRef} onScroll={onScroll}>
        {slides.map((slide) => (
          <li key={slide.src}>
            <Link to={slide.to}><img src={slide.src} alt={slide.alt} /></Link>
          </li>
        ))}
      </ul>
      <div className="hero-pager">
        <button type="button" aria-label="이전 배너" onClick={() => go(index - 1)}>‹</button>
        <span>{index + 1} / {slides.length}</span>
        <button type="button" aria-label="다음 배너" onClick={() => go(index + 1)}>›</button>
      </div>
    </section>
  )
}

export default HeroSlider
