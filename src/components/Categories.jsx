import { Link } from 'react-router-dom'

const categories = [
  { name: '알뜰', icon: '/images/icons-1.png', to: '/products?cat=deal' },
  { name: '간편식', icon: '/images/icons-2.png', to: '/products?cat=meal' },
  { name: '건강', icon: '/images/icons-3.png', to: '/products?cat=health' },
  { name: '양념', icon: '/images/icons-4.png', to: '/products?cat=side' },
  { name: '채소', icon: '/images/icons-5.png', to: '/products?cat=veg' },
]

function Categories() {
  return (
    <nav className="categories" aria-label="카테고리">
      <ul>
        {categories.map((cat) => (
          <li key={cat.name}>
            <Link to={cat.to}>
              <img src={cat.icon} alt="" />
              <span>{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Categories
