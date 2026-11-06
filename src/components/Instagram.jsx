import data from '../data/product.json'

// shortcut: 인스타그램 사진이 없어 레시피 사진 10장을 쓴다, 실제 사진이 생기면 교체
const photos = data.recipes.slice(0, 10)

function Instagram() {
  return (
    <section className="products">
      <div className="section-head">
        <div>
          <h2 className="insta-title">Instagram</h2>
        </div>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="more-btn">전체보기</a>
      </div>
      <ul className="insta-grid">
        {photos.map((p) => (
          <li key={p.id}>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img src={p.image} alt={p.name} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Instagram
