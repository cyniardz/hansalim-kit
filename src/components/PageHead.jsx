import { Link } from 'react-router-dom'

function PageHead({ title, desc }) {
  return (
    <div className="page-head">
      <p className="crumb"><Link to="/">홈</Link> &gt; {title}</p>
      <h1>{title}</h1>
      {desc && <p className="page-desc">{desc}</p>}
    </div>
  )
}

export default PageHead
