import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Register() {
  const { t } = useLang()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', password2: '' })
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError(t('auth.errEmail'))
    if (form.password.length < 6) return setError(t('auth.errPassLen'))
    if (form.password !== form.password2) return setError(t('auth.errPassMatch'))
    const res = register(form.email.trim().toLowerCase(), form.password)
    if (res.error === 'exists') return setError(t('auth.errExists'))
    navigate('/profil-olustur')
  }

  return (
    <main className="page">
      <div className="container auth-wrap">
        <div className="card auth-card rise">
          <h1>{t('auth.registerTitle')}</h1>
          <p className="sub">{t('auth.registerSub')}</p>
          <form onSubmit={submit}>
            <div className="field">
              <label>{t('auth.email')}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ornek@eposta.com"
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
            <div className="field">
              <label>{t('auth.password2')}</label>
              <input
                type="password"
                value={form.password2}
                onChange={(e) => setForm({ ...form, password2: e.target.value })}
                required
              />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button className="btn btn-gold" style={{ width: '100%' }}>
              {t('auth.registerBtn')}
            </button>
          </form>
          <p className="auth-alt">
            {t('auth.haveAccount')} <Link to="/giris">{t('nav.login')}</Link>
          </p>
          <p className="tiny-note">{t('auth.demoNote')}</p>
        </div>
      </div>
    </main>
  )
}
