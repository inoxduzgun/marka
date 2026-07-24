import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function BrandBrief() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    brand: '', contactName: '', email: '', projectType: 'ad', budget: '', desc: '',
  })

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const reqs = JSON.parse(localStorage.getItem('setcast_requests') || '[]')
    reqs.push({
      id: `b-${Date.now()}`,
      kind: 'brief',
      ...form,
      date: new Date().toISOString().slice(0, 10),
    })
    localStorage.setItem('setcast_requests', JSON.stringify(reqs))
    setSent(true)
  }

  return (
    <main className="page">
      <div className="container">
        <div className="page-head rise">
          <span className="kicker">SETCAST</span>
          <h1>{t('brief.title')}</h1>
          <p>{t('brief.sub')}</p>
        </div>

        <div className="how-grid" style={{ alignItems: 'start' }}>
          <div className="card rise d1">
            {sent ? (
              <p className="form-success" style={{ margin: 0 }}>{t('brief.sent')}</p>
            ) : (
              <form onSubmit={submit}>
                <div className="form-grid">
                  <div className="field">
                    <label>{t('brief.brand')} *</label>
                    <input value={form.brand} onChange={set('brand')} required />
                  </div>
                  <div className="field">
                    <label>{t('brief.contactName')} *</label>
                    <input value={form.contactName} onChange={set('contactName')} required />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="field">
                    <label>{t('brief.email')} *</label>
                    <input type="email" value={form.email} onChange={set('email')} required />
                  </div>
                  <div className="field">
                    <label>{t('brief.projectType')}</label>
                    <select value={form.projectType} onChange={set('projectType')}>
                      {Object.entries(t('brief.types')).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>{t('brief.budget')} <em style={{ textTransform: 'none' }}>({t('common.optional')})</em></label>
                  <input value={form.budget} onChange={set('budget')} placeholder="50.000₺ - 100.000₺" />
                </div>
                <div className="field">
                  <label>{t('brief.desc')} *</label>
                  <textarea value={form.desc} onChange={set('desc')} placeholder={t('brief.descPh')} required />
                </div>
                <button className="btn btn-gold" style={{ width: '100%' }}>{t('brief.send')}</button>
              </form>
            )}
          </div>

          <div className="card rise d2" style={{ position: 'sticky', top: 92 }}>
            <h3 style={{ color: 'var(--gold-bright)', fontSize: '1.15rem', marginBottom: 18 }}>
              ✦ {t('brief.subsTitle')}
            </h3>
            {t('brief.subs').map((s, i) => (
              <div className="how-step" key={i}>
                <span className="how-num">✓</span>
                <div><b>{s}</b></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
