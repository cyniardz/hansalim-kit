import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SidePanel from './components/SidePanel.jsx'
import TopBanner from './components/TopBanner.jsx'
import Header from './components/Header.jsx'
import MenuDrawer from './components/MenuDrawer.jsx'
import BottomNav from './components/BottomNav.jsx'
import GuidePopup from './components/GuidePopup.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Guide from './pages/Guide.jsx'
import RecipeList from './pages/RecipeList.jsx'
import KitAbout from './pages/KitAbout.jsx'
import Intro from './pages/Intro.jsx'
import Notice from './pages/Notice.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Join from './pages/Join.jsx'
import MyPage from './pages/MyPage.jsx'

const scrollTo = (top) => window.scrollTo({ top, behavior: 'smooth' })

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, search, hash } = useLocation()

  // 페이지를 옮기면 맨 위로
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, search, hash])

  return (
    <>
      <SidePanel />
      <div className="mobile">
        <TopBanner />
        <Header onMenu={() => setMenuOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/kit" element={<KitAbout />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav onMenu={() => setMenuOpen(true)} />
        <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
        {pathname === '/' && <GuidePopup />}
      </div>
      <div className="scroll-btns">
        <button type="button" aria-label="맨 위로" onClick={() => scrollTo(0)}>▲</button>
        <button type="button" aria-label="맨 아래로" onClick={() => scrollTo(document.body.scrollHeight)}>▼</button>
      </div>
    </>
  )
}

export default App
