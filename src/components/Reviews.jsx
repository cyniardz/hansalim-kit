import data from '../data/product.json'

const recipeImage = Object.fromEntries(data.recipes.map((r) => [r.id, r.image]))
// 상품마다 첫 후기 하나씩, 그 상품으로 만든 요리 사진과 함께 보여준다
const reviews = data.products
  .filter((p) => p.reviews.length && p.recipeIds?.length)
  .slice(0, 8)
  .map((p) => ({ ...p.reviews[0], product: p.name, image: recipeImage[p.recipeIds[0]] }))

function Reviews() {
  return (
    <section className="products">
      <div className="section-head">
        <div>
          <h2>냠냠 맛있는 후기 😋 <small>(예시)</small></h2>
          <p>#내돈내산 #맛있게 냠냠 #재방문 100%</p>
        </div>
        
      </div>
      <div className="products-track">
        {reviews.map((r) => (
          <article className="card review-card" key={r.id}>
            <img src={r.image} alt="" loading="lazy" />
            <p className="review-product">{r.product}</p>
            <p className="review-text">{r.content}</p>
            <p className="review-meta">
              <span className="stars" aria-label={`별점 ${r.rating}점`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              <strong>{r.rating.toFixed(1)}</strong>
              <span className="review-author">{r.author} 님</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Reviews
