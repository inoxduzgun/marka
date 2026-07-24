import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="logo">SET<em>CAST</em><span className="logo-dot" /></span>
            <p className="tagline">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4>{t('footer.links')}</h4>
            <ul>
              <li><Link to="/havuz">{t('nav.pool')}</Link></li>
              <li><Link to="/castingler">{t('nav.castings')}</Link></li>
              <li><Link to="/markalar">{t('nav.brands')}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t('footer.legal')}</h4>
            <ul>
              <li><Link to="/kvkk">{t('footer.kvkk')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SETCAST — {t('footer.rights')}</span>
          <span>{t('footer.demo')}</span>
        </div>
      </div>
    </footer>
  )
}
