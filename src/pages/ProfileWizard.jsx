import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import kvkkText from '../data/kvkkText.js'

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Eskişehir', 'Diğer / Other']

const emptyProfile = {
  kvkkAccepted: false,
  firstName: '', lastName: '', phone: '', social: '', city: '',
  age: '', height: '', weight: '', sizeTop: '', sizeBottom: '', sizeShoe: '',
  gender: '', eyeColor: '', hairColor: '', experience: '', skills: '',
  photo: null, videoName: '',
}

// Fotoğrafı localStorage'a sığacak boyuta küçültür (max 600px, jpeg)
function shrinkImage(file, cb) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, 600 / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      cb(canvas.toDataURL('image/jpeg', 0.82))
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

export default function ProfileWizard() {
  const { t, lang } = useLang()
  const { user, saveProfile } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyProfile)

  // Mevcut profil varsa düzenleme için doldur
  useEffect(() => {
    if (user?.profile) setForm({ ...emptyProfile, ...user.profile })
  }, [user])

  if (!user) {
    return (
      <main className="page">
        <div className="container auth-wrap">
          <div className="card auth-card" style={{ textAlign: 'center' }}>
            <h1>{t('wizard.title')}</h1>
            <p className="sub" style={{ margin: '14px 0 22px' }}>{t('castings.loginFirst')}</p>
            <Link to="/giris" className="btn btn-gold">{t('nav.login')}</Link>
          </div>
        </div>
      </main>
    )
  }

  const steps = t('wizard.steps')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const validate = () => {
    setError('')
    if (step === 0 && !form.kvkkAccepted) { setError(t('wizard.kvkkRequired')); return false }
    if (step === 1 && (!form.firstName || !form.lastName || !form.phone || !form.city)) {
      setError(t('wizard.required')); return false
    }
    if (step === 2 && (!form.age || !form.height || !form.weight)) {
      setError(t('wizard.required')); return false
    }
    return true
  }

  const next = () => { if (validate()) setStep(step + 1) }
  const back = () => { setError(''); setStep(Math.max(0, step - 1)) }

  const finish = () => {
    if (!validate()) return
    saveProfile({ ...form, completedAt: new Date().toISOString() })
    navigate('/profilim')
  }

  return (
    <main className="page">
      <div className="container wizard-wrap">
        <div className="wizard-progress">
          {steps.map((s, i) => (
            <span key={s} className={i <= step ? 'done' : ''} title={s} />
          ))}
        </div>
        <p className="wizard-step-label">
          {t('wizard.step')} {step + 1} {t('wizard.of')} {steps.length} — {steps[step]}
        </p>

        <div className="card wizard-card rise">
          {step === 0 && (
            <>
              <h2>{t('wizard.kvkkTitle')}</h2>
              <div className="kvkk-box">
                {kvkkText[lang].map((s) => (
                  <div key={s.h}>
                    <h4>{s.h}</h4>
                    <p>{s.p}</p>
                  </div>
                ))}
              </div>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.kvkkAccepted}
                  onChange={(e) => setForm({ ...form, kvkkAccepted: e.target.checked })}
                />
                <span>{t('wizard.kvkkAccept')}</span>
              </label>
            </>
          )}

          {step === 1 && (
            <>
              <h2>{steps[1]}</h2>
              <div className="form-grid">
                <div className="field">
                  <label>{t('wizard.firstName')} *</label>
                  <input value={form.firstName} onChange={set('firstName')} />
                </div>
                <div className="field">
                  <label>{t('wizard.lastName')} *</label>
                  <input value={form.lastName} onChange={set('lastName')} />
                </div>
              </div>
              <div className="field">
                <label>{t('wizard.phone')} *</label>
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="05xx xxx xx xx" />
              </div>
              <div className="field">
                <label>{t('wizard.social')}</label>
                <input value={form.social} onChange={set('social')} placeholder={t('wizard.socialPh')} />
              </div>
              <div className="field">
                <label>{t('wizard.city')} *</label>
                <select value={form.city} onChange={set('city')}>
                  <option value="">{t('common.select')}</option>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>{steps[2]}</h2>
              <div className="form-grid-3">
                <div className="field">
                  <label>{t('wizard.age')} *</label>
                  <input type="number" min="1" max="99" value={form.age} onChange={set('age')} />
                </div>
                <div className="field">
                  <label>{t('wizard.height')} *</label>
                  <input type="number" min="50" max="250" value={form.height} onChange={set('height')} />
                </div>
                <div className="field">
                  <label>{t('wizard.weight')} *</label>
                  <input type="number" min="20" max="250" value={form.weight} onChange={set('weight')} />
                </div>
              </div>
              <div className="form-grid-3">
                <div className="field">
                  <label>{t('wizard.sizeTop')}</label>
                  <select value={form.sizeTop} onChange={set('sizeTop')}>
                    <option value="">{t('common.select')}</option>
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>{t('wizard.sizeBottom')}</label>
                  <input value={form.sizeBottom} onChange={set('sizeBottom')} placeholder="36 / 32…" />
                </div>
                <div className="field">
                  <label>{t('wizard.sizeShoe')}</label>
                  <input value={form.sizeShoe} onChange={set('sizeShoe')} placeholder="38…" />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>{steps[3]}</h2>
              <div className="form-grid">
                <div className="field">
                  <label>{t('wizard.gender')}</label>
                  <select value={form.gender} onChange={set('gender')}>
                    <option value="">{t('common.select')}</option>
                    {Object.entries(t('wizard.genders')).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>{t('wizard.experience')}</label>
                  <select value={form.experience} onChange={set('experience')}>
                    <option value="">{t('common.select')}</option>
                    {Object.entries(t('wizard.expLevels')).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>{t('wizard.eyeColor')}</label>
                  <select value={form.eyeColor} onChange={set('eyeColor')}>
                    <option value="">{t('common.select')}</option>
                    {Object.entries(t('colors.eye')).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>{t('wizard.hairColor')}</label>
                  <select value={form.hairColor} onChange={set('hairColor')}>
                    <option value="">{t('common.select')}</option>
                    {Object.entries(t('colors.hair')).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>{t('wizard.skills')}</label>
                <textarea value={form.skills} onChange={set('skills')} placeholder={t('wizard.skillsPh')} />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2>{steps[4]}</h2>
              <label className="upload-box" style={{ display: 'block', cursor: 'pointer' }}>
                <span className="up-icon">📷</span>
                <b>{t('wizard.photo')}</b>
                <div style={{ marginTop: 10 }}>
                  <span className="btn btn-ghost btn-sm">{t('wizard.uploadPhoto')}</span>
                </div>
                {form.photo && <p className="file-ok">✓</p>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files[0]
                    if (f) shrinkImage(f, (dataUrl) => setForm((prev) => ({ ...prev, photo: dataUrl })))
                  }}
                />
              </label>
              <label className="upload-box" style={{ display: 'block', cursor: 'pointer' }}>
                <span className="up-icon">🎬</span>
                <b>{t('wizard.video')}</b>
                <div style={{ marginTop: 10 }}>
                  <span className="btn btn-ghost btn-sm">{t('wizard.uploadVideo')}</span>
                </div>
                {form.videoName && <p className="file-ok">✓ {form.videoName}</p>}
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const f = e.target.files[0]
                    if (f) setForm((prev) => ({ ...prev, videoName: f.name }))
                  }}
                />
              </label>
              <p className="tiny-note">{t('wizard.uploadNote')}</p>
            </>
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="wizard-nav">
            <button className="btn btn-ghost" onClick={back} disabled={step === 0}>
              ← {t('wizard.back')}
            </button>
            {step < steps.length - 1 ? (
              <button className="btn btn-gold" onClick={next}>
                {t('wizard.next')} →
              </button>
            ) : (
              <button className="btn btn-gold" onClick={finish}>
                {t('wizard.finish')} ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
