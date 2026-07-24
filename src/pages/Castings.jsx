import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import defaultCastings from '../data/castings.js'

const APPS_KEY = 'setcast_applications'
const loadApps = () => {
  try { return JSON.parse(localStorage.getItem(APPS_KEY)) || [] } catch { return [] }
}
export const loadCustomCastings = () => {
  try { return JSON.parse(localStorage.getItem('setcast_custom_castings')) || [] } catch { return [] }
}

export default function Castings() {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const [apps, setApps] = useState(loadApps)
  const [notice, setNotice] = useState('')

  const castings = [...loadCustomCastings(), ...defaultCastings]
  const hasApplied = (id) => user && apps.some((a) => a.castingId === id && a.email === user.email)

  const apply = (casting) => {
    setNotice('')
    if (!user) return setNotice(t('castings.loginFirst'))
    if (!user.profile) return setNotice(t('castings.profileFirst'))
    const next = [
      ...apps,
      {
        castingId: casting.id,
        email: user.email,
        name: `${user.profile.firstName} ${user.profile.lastName}`,
        date: new Date().toISOString().slice(0, 10),
      },
    ]
    setApps(next)
    localStorage.setItem(APPS_KEY, JSON.stringify(next))
  }

  return (
    <main className="page">
      <div className="container">
        <div className="page-head rise">
          <span className="kicker">SETCAST</span>
          <h1>{t('castings.title')}</h1>
          <p>{t('castings.sub')}</p>
        </div>

        {notice && (
          <p className="form-error" style={{ marginBottom: 18 }}>
            {notice}{' '}
            {!user && <Link to="/giris" style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>→ {t('nav.login')}</Link>}
            {user && !user.profile && <Link to="/profil-olustur" style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>→ {t('profile.completeNow')}</Link>}
          </p>
        )}

        <div className="casting-list">
          {castings.map((c, i) => (
            <div className={`card casting-card rise d${Math.min(i + 1, 4)}`} key={c.id}>
              <div>
                <span className="brand-line">{c.brand}</span>
                <h3>{typeof c.title === 'object' ? c.title[lang] : c.title}</h3>
                <p className="desc">
                  <b style={{ color: 'var(--gold-bright)' }}>{t('castings.lookingFor')}: </b>
                  {typeof c.desc === 'object' ? c.desc[lang] : c.desc}
                </p>
                <div className="casting-meta">
                  <span>🏷️ {t(`brief.types.${c.type}`)}</span>
                  <span>💰 <b>{c.fee}</b></span>
                  <span>📅 {t('castings.deadline')}: <b>{c.deadline}</b></span>
                </div>
              </div>
              <div className="casting-side">
                {c.open ? (
                  <span className="badge badge-green">● {t('castings.open')}</span>
                ) : (
                  <span className="badge badge-red">● {t('castings.closed')}</span>
                )}
                {c.open && (
                  hasApplied(c.id) ? (
                    <span className="badge">{t('castings.applied')}</span>
                  ) : (
                    <button className="btn btn-gold btn-sm" onClick={() => apply(c)}>
                      {t('castings.apply')}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
