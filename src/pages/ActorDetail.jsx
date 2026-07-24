import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import actors from '../data/actors.js'
import Avatar from '../components/Avatar.jsx'

export default function ActorDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const [requested, setRequested] = useState(false)
  const actor = actors.find((a) => a.id === Number(id))

  if (!actor) {
    return (
      <main className="page">
        <div className="container">
          <div className="empty-state">404</div>
        </div>
      </main>
    )
  }

  const request = () => {
    // Talep, yönetici panelinde görünmesi için localStorage'a yazılır
    const reqs = JSON.parse(localStorage.getItem('setcast_requests') || '[]')
    reqs.push({
      id: `r-${Date.now()}`,
      kind: 'actorRequest',
      brand: 'Demo Ziyaretçi',
      actorName: `${actor.firstName} ${actor.lastName}`,
      actorId: actor.id,
      date: new Date().toISOString().slice(0, 10),
    })
    localStorage.setItem('setcast_requests', JSON.stringify(reqs))
    setRequested(true)
  }

  const spec = (label, val) => (
    <tr><td>{label}</td><td>{val}</td></tr>
  )

  return (
    <main className="page">
      <div className="container">
        <Link to="/havuz" className="btn btn-ghost btn-sm" style={{ marginBottom: 26 }}>
          ← {t('actor.backToPool')}
        </Link>
        <div className="detail-layout">
          <div className="rise">
            <Avatar firstName={actor.firstName} lastName={actor.lastName} hue={actor.hue} />
            <div style={{ marginTop: 18 }}>
              {requested ? (
                <p className="form-success">{t('actor.requested')}</p>
              ) : (
                <button className="btn btn-gold" style={{ width: '100%' }} onClick={request}>
                  {t('actor.request')}
                </button>
              )}
              <p className="tiny-note">{t('actor.requestNote')}</p>
            </div>
          </div>
          <div className="rise d1">
            <span className="kicker">{actor.city}</span>
            <h1 className="detail-name">{actor.firstName} {actor.lastName}</h1>
            <p style={{ color: 'var(--muted)' }}>
              {actor.age} {t('actor.years')} • {t('wizard.genders')[actor.gender] || ''} • {t('wizard.expLevels')[actor.exp]}
            </p>
            <div className="skill-tags" style={{ marginTop: 14 }}>
              {actor.skills.map((s) => <span className="badge badge-muted" key={s}>{s}</span>)}
            </div>
            <table className="spec-table">
              <tbody>
                {spec(t('wizard.height'), `${actor.height} cm`)}
                {spec(t('wizard.weight'), `${actor.weight} kg`)}
                {spec(t('wizard.eyeColor'), t('colors.eye')[actor.eye])}
                {spec(t('wizard.hairColor'), t('colors.hair')[actor.hair])}
                {spec(t('wizard.sizeTop'), actor.sizeTop)}
                {spec(t('wizard.sizeBottom'), actor.sizeBottom)}
                {spec(t('wizard.sizeShoe'), actor.sizeShoe)}
                {spec(t('actor.social'), actor.social)}
              </tbody>
            </table>
            <h3 style={{ margin: '26px 0 14px' }}>{t('actor.videoTitle')}</h3>
            <div className="video-placeholder">
              <div className="play-circle">▶</div>
              <span>{t('actor.videoPlaceholder')}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
