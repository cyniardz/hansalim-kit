import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'
import { RULES, useStore, won } from '../store.jsx'

function Join() {
  const { join } = useStore()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const id = f.id.trim()
    if (!/^[a-z0-9]{4,12}$/.test(id)) return setError('아이디는 영문 소문자와 숫자 4~12자로 입력해 주세요.')
    if (f.password.length < 6) return setError('비밀번호는 6자 이상으로 입력해 주세요.')
    if (f.password !== f.password2) return setError('비밀번호가 서로 다릅니다.')
    if (!f.agree) return setError('이용약관과 개인정보처리방침에 동의해 주세요.')
    const err = join({ id, name: f.name.trim(), password: f.password })
    if (err) return setError(err)
    navigate('/mypage')
  }

  return (
    <div className="page">
      <PageHead title="아이디 만들기" desc={`가입하면 꾸러미 포인트 ${won(RULES.total)}이 즉시 지급됩니다.`} />
      <form className="form" onSubmit={onSubmit} noValidate>
        <label>이름<input name="name" required autoComplete="name" /></label>
        <label>아이디<input name="id" required autoComplete="username" placeholder="영문 소문자·숫자 4~12자" /></label>
        <label>비밀번호<input name="password" type="password" required autoComplete="new-password" placeholder="6자 이상" /></label>
        <label>비밀번호 확인<input name="password2" type="password" required autoComplete="new-password" /></label>
        <label className="check"><input name="agree" type="checkbox" /> 이용약관 및 개인정보처리방침에 동의합니다.</label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="btn block">가입하기</button>
        <p className="form-help">이미 아이디가 있으신가요? <Link to="/login">로그인</Link></p>
        <p className="form-help note">포트폴리오용 가짜 가입입니다. 회원가입 시 가입비, 출자금은 부과하지 않습니다. 정보는 이 브라우저에만 저장됩니다.</p>
      </form>
    </div>
  )
}

export default Join
