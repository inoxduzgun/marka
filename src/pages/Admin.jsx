import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import demoRequests from '../data/requests.js'
import defaultCastings from '../data/castings.js'

const load = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || [] } catch { return [] }
}

export default function Admin() {
  const { t, lang } = useLang()
  const [tab, setTab] = useState('requests')
  const [created, setCreated] = useState(false)
  const [castingForm, setCastingForm] = useState({
    title: '', brand: '', type: 'ad', desc: '', fee: '', deadline: '',
  })

  const storedRequests = load('setcast_requests')
  const requests = [...storedRequests, ...demoRequests]
  const applications = load('setcast_applications')
  const users = load('setcast_users')
  const customCastings = load('setcast_custom_castings')
  const castings = [...customCastings, ...defaultCastings]

  const set = (key) => (e) => setCastingForm({ ...castingForm, [key]: e.target.value })

  const createCasting = (e) => {
    e.preventDefault()
    const next = [
      {
        id: Date.now(),
        title: castingForm.title,
        brand: castingForm.brand,
        type: castingForm.type,
        desc: castingForm.desc,
        fee: castingForm.fee,
        deadline: castingForm.deadline,
        open: true,
      },
      ...customCastings,
    ]
    localStorage.setItem('setcast_custom_castings', JSON.stringify(next))
    setCreated(true)
    setCastingForm({ title: '', brand: '', type: 'ad', desc: '', fee: '', deadline: '' })
    setTimeout(() => setCreated(false), 3000)
  }

  const tabs = [
    ['requests', t('admin.tabRequests'), requests.length],
    ['castings', t('admin.tabCastings'), castings.length],
    ['applications', t('admin.tabApplications'), applications.length],
    ['users', t('admin.tabUsers'), users.length],
  ]

  return (
    <main className="page">
      <div className="container">
        <div className="page-head rise">
          <span className="kicker">SETCAST</span>
          <h1>{t('admin.title')}</h1>
          <p>{t('admin.sub')}</p>
        </div>

        <div className="tabs rise d1">
          {tabs.map(([key, label, count]) => (
            <button key={key} className={tab === key ? 'on' : ''} onClick={() => setTab(key)}>
              {label} ({count})
            </button>
          ))}
        </div>

        {tab === 'requests' && (
          <div className="card rise">
            {requests.length === 0 && <p style={{ color: 'var(--muted)' }}>{t('admin.noRequests')}</p>}
            {requests.map((r) => (
              <div className="admin-row" key={r.id}>
                <div className="who">
                  <b>{r.brand}</b>
                  <p>
                    {r.kind === 'actorRequest'
                      ? `${t('admin.requestFor')}: ${r.actorName}`
                      : typeof r.desc === 'object' ? r.desc[lang] : r.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className="badge badge-muted">
                    {r.kind === 'brief' ? t('admin.briefFrom') : t('admin.requestFor')}
                  </span>
                  <span className="badge">{t('admin.statusNew')}</span>
                  <span className="when">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'castings' && (
          <div className="how-grid" style={{ alignItems: 'start' }}>
            <div className="card rise">
              <h3 style={{ color: 'var(--gold-bright)', fontSize: '1.1rem', marginBottom: 18 }}>
                {t('admin.newCasting')}
              </h3>
              {created && <p className="form-success">{t('admin.created')}</p>}
              <form onSubmit={createCasting}>
                <div className="field">
                  <label>{t('admin.ctitle')} *</label>
                  <input value={castingForm.title} onChange={set('title')} required />
                </div>
                <div className="form-grid">
                  <div className="field">
                    <label>{t('admin.cbrand')} *</label>
                    <input value={castingForm.brand} onChange={set('brand')} required />
                  </div>
                  <div className="field">
                    <label>{t('admin.ctype')}</label>
                    <select value={castingForm.type} onChange={set('type')}>
                      {Object.entries(t('brief.types')).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>{t('admin.cdesc')} *</label>
                  <textarea value={castingForm.desc} onChange={set('desc')} required />
                </div>
                <div className="form-grid">
                  <div className="field">
                    <label>{t('admin.cfee')}</label>
                    <input value={castingForm.fee} onChange={set('fee')} placeholder="10.000₺ / gün" />
                  </div>
                  <div className="field">
                    <label>{t('admin.cdeadline')}</label>
                    <input type="date" value={castingForm.deadline} onChange={set('deadline')} />
                  </div>
                </div>
                <button className="btn btn-gold" style={{ width: '100%' }}>{t('admin.create')}</button>
              </form>
            </div>
            <div className="card rise d1">
              {castings.map((c) => (
                <div className="admin-row" key={c.id}>
                  <div className="who">
                    <b>{typeof c.title === 'object' ? c.title[lang] : c.title}</b>
                    <p>{c.brand} • {c.fee}</p>
                  </div>
                  {c.open
                    ? <span className="badge badge-green">{t('castings.open')}</span>
                    : <span className="badge badge-red">{t('castings.closed')}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'applications' && (
          <div className="card rise">
            {applications.length === 0 && <p style={{ color: 'var(--muted)' }}>{t('admin.noApplications')}</p>}
            {applications.map((a, i) => {
              const c = [...customCastings, ...defaultCastings].find((x) => x.id === a.castingId)
              return (
                <div className="admin-row" key={i}>
                  <div className="who">
                    <b>{a.name}</b>
                    <p>{a.email} → {c ? (typeof c.title === 'object' ? c.title[lang] : c.title) : `#${a.castingId}`}</p>
                  </div>
                  <span className="when">{a.date}</span>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'users' && (
          <div className="card rise">
            {users.length === 0 && <p style={{ color: 'var(--muted)' }}>{t('admin.noUsers')}</p>}
            {users.map((u) => (
              <div className="admin-row" key={u.email}>
                <div className="who">
                  <b>{u.profile ? `${u.profile.firstName} ${u.profile.lastName}` : u.email}</b>
                  <p>{u.email}{u.profile ? ` • ${u.profile.city} • ${u.profile.age}` : ''}</p>
                </div>
                {u.profile
                  ? <span className="badge badge-green">✓ {t('profile.kvkkOk')}</span>
                  : <span className="badge badge-muted">{t('profile.incomplete')}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
