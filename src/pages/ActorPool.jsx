import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import actors from '../data/actors.js'
import Avatar from '../components/Avatar.jsx'

const FAVS_KEY = 'setcast_favs'
const loadFavs = () => {
  try { return JSON.parse(localStorage.getItem(FAVS_KEY)) || [] } catch { return [] }
}

const initialFilters = { gender: '', city: '', ageMin: '', ageMax: '', hair: '', eye: '', exp: '' }

export default function ActorPool() {
  const { t } = useLang()
  const [filters, setFilters] = useState(initialFilters)
  const [favs, setFavs] = useState(loadFavs)
  const [onlyFavs, setOnlyFavs] = useState(false)

  const toggleFav = (id) => {
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]
    setFavs(next)
    localStorage.setItem(FAVS_KEY, JSON.stringify(next))
  }

  const set = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })

  const filtered = useMemo(() => {
    return actors.filter((a) => {
      if (onlyFavs && !favs.includes(a.id)) return false
      if (filters.gender && a.gender !== filters.gender) return false
      if (filters.city && a.city !== filters.city) return false
      if (filters.ageMin && a.age < Number(filters.ageMin)) return false
      if (filters.ageMax && a.age > Number(filters.ageMax)) return false
      if (filters.hair && a.hair !== filters.hair) return false
      if (filters.eye && a.eye !== filters.eye) return false
      if (filters.exp && a.exp !== filters.exp) return false
      return true
    })
  }, [filters, onlyFavs, favs])

  const cities = [...new Set(actors.map((a) => a.city))]

  return (
    <main className="page">
      <div className="container">
        <div className="page-head rise">
          <span className="kicker">SETCAST</span>
          <h1>{t('pool.title')}</h1>
          <p>{t('pool.sub')}</p>
        </div>

        <div className="pool-layout">
          <aside className="filter-panel card rise d1">
            <h3>{t('pool.filters')}</h3>
            <div className="field">
              <label>{t('pool.gender')}</label>
              <select value={filters.gender} onChange={set('gender')}>
                <option value="">{t('pool.all')}</option>
                {Object.entries(t('wizard.genders')).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>{t('pool.city')}</label>
              <select value={filters.city} onChange={set('city')}>
                <option value="">{t('pool.all')}</option>
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>{t('pool.ageRange')}</label>
              <div className="range-row">
                <input type="number" placeholder="18" value={filters.ageMin} onChange={set('ageMin')} />
                <span>—</span>
                <input type="number" placeholder="60" value={filters.ageMax} onChange={set('ageMax')} />
              </div>
            </div>
            <div className="field">
              <label>{t('pool.hair')}</label>
              <select value={filters.hair} onChange={set('hair')}>
                <option value="">{t('pool.all')}</option>
                {Object.entries(t('colors.hair')).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>{t('pool.eye')}</label>
              <select value={filters.eye} onChange={set('eye')}>
                <option value="">{t('pool.all')}</option>
                {Object.entries(t('colors.eye')).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>{t('pool.exp')}</label>
              <select value={filters.exp} onChange={set('exp')}>
                <option value="">{t('pool.all')}</option>
                {Object.entries(t('wizard.expLevels')).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <label className="check-row" style={{ marginBottom: 16 }}>
              <input type="checkbox" checked={onlyFavs} onChange={(e) => setOnlyFavs(e.target.checked)} />
              <span>⭐ {t('pool.onlyFavs')} ({favs.length})</span>
            </label>
            <button
              className="btn btn-ghost btn-sm"
              style={{ width: '100%' }}
              onClick={() => { setFilters(initialFilters); setOnlyFavs(false) }}
            >
              {t('pool.clear')}
            </button>
          </aside>

          <div>
            <p className="result-count rise d1">{filtered.length} {t('pool.results')}</p>
            {filtered.length === 0 ? (
              <div className="empty-state">{t('pool.noResults')}</div>
            ) : (
              <div className="actor-grid">
                {filtered.map((a, i) => (
                  <div className={`actor-card rise d${Math.min(i % 4 + 1, 4)}`} key={a.id}>
                    <button
                      className={`fav-btn ${favs.includes(a.id) ? 'on' : ''}`}
                      onClick={() => toggleFav(a.id)}
                      title={favs.includes(a.id) ? t('pool.unfav') : t('pool.fav')}
                    >
                      {favs.includes(a.id) ? '★' : '☆'}
                    </button>
                    <Link to={`/oyuncu/${a.id}`}>
                      <Avatar firstName={a.firstName} lastName={a.lastName} hue={a.hue} />
                    </Link>
                    <div className="actor-card-body">
                      <b>{a.firstName} {a.lastName}</b>
                      <p className="meta">
                        {a.age} {t('actor.years')} • {a.city} • {a.height} cm
                      </p>
                      <Link to={`/oyuncu/${a.id}`} className="btn btn-ghost btn-sm" style={{ width: '100%' }}>
                        {t('pool.detail')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
