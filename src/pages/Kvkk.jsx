import { useLang } from '../i18n/LanguageContext.jsx'
import kvkkText from '../data/kvkkText.js'

export default function Kvkk() {
  const { t, lang } = useLang()
  return (
    <main className="page">
      <div className="container kvkk-page">
        <div className="page-head rise">
          <span className="kicker">SETCAST</span>
          <h1>{t('kvkk.title')}</h1>
        </div>
        <p className="legal-warning rise d1">⚠️ {t('kvkk.note')}</p>
        <div className="rise d2">
          {kvkkText[lang].map((s) => (
            <div key={s.h}>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
