import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Landing() {
  const { t } = useLang()

  const stats = [
    ['500+', t('landing.statActors')],
    ['40+', t('landing.statBrands')],
    ['120+', t('landing.statProjects')],
    ['12', t('landing.statCities')],
  ]

  const models = [
    ['🎯', t('landing.modelBrandTitle'), t('landing.modelBrandText')],
    ['🎬', t('landing.modelActorTitle'), t('landing.modelActorText')],
    ['📽️', t('landing.modelFilmTitle'), t('landing.modelFilmText')],
  ]

  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="kicker rise">{t('landing.kicker')}</span>
          <h1 className="rise d1">
            {t('landing.heroTitle1')}<br />
            <span className="line2">{t('landing.heroTitle2')}</span>
          </h1>
          <p className="hero-text rise d2">{t('landing.heroText')}</p>
          <div className="hero-ctas rise d3">
            <Link to="/kayit" className="btn btn-gold">{t('landing.ctaActor')}</Link>
            <Link to="/markalar" className="btn btn-ghost">{t('landing.ctaBrand')}</Link>
          </div>
          <div className="stats rise d4">
            {stats.map(([n, label]) => (
              <div className="stat" key={label}>
                <b>{n}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="demo-note">{t('landing.demoNote')}</p>
        </div>
      </section>

      <section className="section" id="nasil">
        <div className="container">
          <div className="section-head">
            <h2>{t('landing.howTitle')}</h2>
            <p>{t('landing.howSub')}</p>
          </div>
          <div className="how-grid">
            <div className="how-col card">
              <h3>🎭 {t('landing.forActors')}</h3>
              {t('landing.actorSteps').map(([title, text], i) => (
                <div className="how-step" key={i}>
                  <span className="how-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <b>{title}</b>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="how-col card">
              <h3>🏷️ {t('landing.forBrands')}</h3>
              {t('landing.brandSteps').map(([title, text], i) => (
                <div className="how-step" key={i}>
                  <span className="how-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <b>{title}</b>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{t('landing.modelTitle')}</h2>
            <p>{t('landing.modelSub')}</p>
          </div>
          <div className="model-grid">
            {models.map(([icon, title, text]) => (
              <div className="card model-card" key={title}>
                <span className="icon">{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-band">
            <h2>{t('landing.contactTitle')}</h2>
            <p>{t('landing.contactText')}</p>
            <a href="mailto:info@setcast-demo.com" className="btn btn-gold">
              {t('landing.contactBtn')}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
