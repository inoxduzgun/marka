import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Header() {
  const { t, lang, changeLang } = useLang()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={close}>
          SET<em>CAST</em><span className="logo-dot" />
        </Link>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
        <nav className={`main-nav ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>{t('nav.home')}</NavLink>
          <NavLink to="/havuz" onClick={close}>{t('nav.pool')}</NavLink>
          <NavLink to="/castingler" onClick={close}>{t('nav.castings')}</NavLink>
          <NavLink to="/markalar" onClick={close}>{t('nav.brands')}</NavLink>
          <NavLink to="/yonetici" onClick={close}>{t('nav.admin')}</NavLink>
          {user ? (
            <>
              <NavLink to="/profilim" onClick={close}>{t('nav.profile')}</NavLink>
              <a href="#/" onClick={(e) => { e.preventDefault(); logout(); close(); navigate('/') }}>
                {t('nav.logout')}
              </a>
            </>
          ) : (
            <>
              <NavLink to="/giris" onClick={close}>{t('nav.login')}</NavLink>
              <NavLink to="/kayit" onClick={close}>{t('nav.register')}</NavLink>
            </>
          )}
        </nav>
        <div className="header-actions">
          <div className="lang-switch">
            <button className={lang === 'tr' ? 'on' : ''} onClick={() => changeLang('tr')}>TR</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => changeLang('en')}>EN</button>
          </div>
          {user ? (
            <Link to="/profilim" className="btn btn-ghost btn-sm">{t('nav.profile')}</Link>
          ) : (
            <Link to="/kayit" className="btn btn-gold btn-sm">{t('nav.register')}</Link>
          )}
        </div>
      </div>
    </header>
  )
}
