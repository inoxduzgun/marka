import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import Avatar from '../components/Avatar.jsx'
import castings from '../data/castings.js'

function getApplications(email) {
  try {
    return (JSON.parse(localStorage.getItem('setcast_applications')) || []).filter(
      (a) => a.email === email
    )
  } catch {
    return []
  }
}

export default function Profile() {
  const { t, lang } = useLang()
  const { user } = useAuth()

  if (!user) {
    return (
      <main className="page">
        <div className="container auth-wrap">
          <div className="card auth-card" style={{ textAlign: 'center' }}>
            <h1>{t('profile.title')}</h1>
            <p className="sub" style={{ margin: '14px 0 22px' }}>{t('castings.loginFirst')}</p>
            <Link to="/giris" className="btn btn-gold">{t('nav.login')}</Link>
          </div>
        </div>
      </main>
    )
  }

  const p = user.profile
  if (!p) {
    return (
      <main className="page">
        <div className="container auth-wrap">
          <div className="card auth-card" style={{ textAlign: 'center' }}>
            <h1>{t('profile.title')}</h1>
            <p className="sub" style={{ margin: '14px 0 22px' }}>{t('profile.incomplete')}</p>
            <Link to="/profil-olustur" className="btn btn-gold">{t('profile.completeNow')}</Link>
          </div>
        </div>
      </main>
    )
  }

  const apps = getApplications(user.email)
  const spec = (label, val) => val ? (
    <tr><td>{label}</td><td>{val}</td></tr>
  ) : null

  return (
    <main className="page">
      <div className="container">
        <div className="profile-head rise">
          <Avatar firstName={p.firstName} lastName={p.lastName} hue={200} photo={p.photo} />
          <div>
            <h1>{p.firstName} {p.lastName}</h1>
            <p className="sub">{p.city} • {p.age} {t('actor.years')}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
              <span className="badge badge-green">✓ {t('profile.kvkkOk')}</span>
              <Link to="/profil-olustur" className="btn btn-ghost btn-sm">{t('profile.edit')}</Link>
            </div>
          </div>
        </div>

        <div className="profile-grid">
          <div className="card rise d1">
            <h3>{t('profile.contact')}</h3>
            <table className="spec-table">
              <tbody>
                {spec(t('auth.email'), user.email)}
                {spec(t('wizard.phone'), p.phone)}
                {spec(t('wizard.social'), p.social)}
                {spec(t('wizard.city'), p.city)}
              </tbody>
            </table>
          </div>
          <div className="card rise d2">
            <h3>{t('profile.physical')}</h3>
            <table className="spec-table">
              <tbody>
                {spec(t('wizard.height'), p.height && `${p.height} cm`)}
                {spec(t('wizard.weight'), p.weight && `${p.weight} kg`)}
                {spec(t('wizard.sizeTop'), p.sizeTop)}
                {spec(t('wizard.sizeBottom'), p.sizeBottom)}
                {spec(t('wizard.sizeShoe'), p.sizeShoe)}
              </tbody>
            </table>
          </div>
          <div className="card rise d3">
            <h3>{t('profile.appearance')}</h3>
            <table className="spec-table">
              <tbody>
                {spec(t('wizard.gender'), p.gender && t('wizard.genders')[p.gender])}
                {spec(t('wizard.eyeColor'), p.eyeColor && t('colors.eye')[p.eyeColor])}
                {spec(t('wizard.hairColor'), p.hairColor && t('colors.hair')[p.hairColor])}
                {spec(t('wizard.experience'), p.experience && t('wizard.expLevels')[p.experience])}
                {spec(t('wizard.skills'), p.skills)}
              </tbody>
            </table>
          </div>
          <div className="card rise d4">
            <h3>{t('actor.videoTitle')}</h3>
            <div className="video-placeholder">
              <div className="play-circle">▶</div>
              <span>{p.videoName ? `🎬 ${p.videoName}` : t('profile.videoPlaceholder')}</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 22 }}>
          <h3 style={{ color: 'var(--gold-bright)', fontSize: '1.05rem', marginBottom: 14 }}>
            {t('profile.applications')}
          </h3>
          {apps.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>{t('profile.noApplications')}</p>
          ) : (
            apps.map((a) => {
              const c = castings.find((x) => x.id === a.castingId)
              return (
                <div className="admin-row" key={a.castingId}>
                  <div className="who">
                    <b>{c ? c.title[lang] : `#${a.castingId}`}</b>
                    <p>{c?.brand}</p>
                  </div>
                  <span className="badge">{t('castings.applied')}</span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}
