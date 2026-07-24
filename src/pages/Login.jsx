import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Login() {
  const { t } = useLang()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const res = login(form.email.trim().toLowerCase(), form.password)
    if (res.error) return setError(t('auth.errLogin'))
    navigate('/profilim')
  }

  return (
    <main className="page">
      <div className="container auth-wrap">
        <div className="card auth-card rise">
          <h1>{t('auth.loginTitle')}</h1>
          <p className="sub">{t('auth.loginSub')}</p>
          <form onSubmit={submit}>
            <div className="field">
              <label>{t('auth.email')}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>{t('auth.password')}</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button className="btn btn-gold" style={{ width: '100%' }}>
              {t('auth.loginBtn')}
            </button>
          </form>
          <p className="auth-alt">
            {t('auth.noAccount')} <Link to="/kayit">{t('nav.register')}</Link>
          </p>
          <p className="tiny-note">{t('auth.demoNote')}</p>
        </div>
      </div>
    </main>
  )
}
