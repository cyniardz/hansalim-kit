import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'
import { useStore } from '../store.jsx'

function Login() {
  const { login } = useStore()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const err = login(f.get('id').trim(), f.get('password'))
    if (err) return setError(err)
    navigate(params.get('next') || '/mypage')
  }

  return (
    <div className="page">
      <PageHead title="로그인" desc="한살림 회원님 안녕하세요" />
      <form className="form" onSubmit={onSubmit}>
        <label>아이디<input name="id" required autoComplete="username" /></label>
        <label>비밀번호<input name="password" type="password" required autoComplete="current-password" /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="btn block">로그인</button>
        <p className="form-help">아직 아이디가 없으신가요? <Link to="/join">아이디 만들기</Link></p>
        <p className="form-help note">포트폴리오용 가짜 로그인입니다. 정보는 이 브라우저에만 저장됩니다.</p>
      </form>
    </div>
  )
}

export default Login
