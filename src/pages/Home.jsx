import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import Categories from '../components/Categories.jsx'
import ProductSlider from '../components/ProductSlider.jsx'
import About from '../components/About.jsx'
import TimeDeal from '../components/TimeDeal.jsx'
import VideoSection from '../components/VideoSection.jsx'
import Recipes from '../components/Recipes.jsx'
import WatchList from '../components/WatchList.jsx'
import Reviews from '../components/Reviews.jsx'
import Instagram from '../components/Instagram.jsx'
import { products } from '../store.jsx'

const popular = products.filter((p) => p.popular)
const fresh = products.filter((p) => p.status === 'new')
const sauces = products.filter((p) => p.category === 'side' && !p.popular)

function Home() {
  return (
    <>
      <HeroSlider />
      <Categories />
      <ProductSlider items={popular} title="임산부 인기물품" subtitle="#한살림 임산부 인기물품" />
      <Link to="/products" className="strip-banner">
        <img src="/images/banner-4.png" alt="원하는 물품을 직접 담아 만드는 선택형 꾸러미. 농산물을 50%이상 담아 친환경 생산 농가도 돕고 건강한 식탁을 차려보세요." />
      </Link>
      <ProductSlider items={fresh} green title="따끈따끈 햇물품" subtitle="#새로 들어온 햇물품 #유기농 #꼬마와땅" />
      <About />
      <TimeDeal />
      <VideoSection items={sauces} />
      <Recipes />
      <WatchList />
      <Reviews />
      <Instagram />
    </>
  )
}

export default Home
