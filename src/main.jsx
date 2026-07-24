import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import './styles/global.css'

// ————————————————————————————————————————————————————————————————
// Tarayıcı çevirisine karşı koruma:
// Google Translate gibi araçlar sayfadaki metin düğümlerini <font> etiketleriyle
// değiştirir. React sayfa geçişinde beklediği düğümü bulamayınca removeChild/insertBefore
// hatası fırlatıp tüm uygulamayı çökertir (siyah ekran, yenileyince gelir).
// Aşağıdaki güvenli sarmalayıcılar, düğüm başka bir ebeveyne taşınmışsa hata fırlatmak
// yerine işlemi sessizce atlar; böylece çeviri açıkken de site çökmeden çalışır.
// (Yaygın kullanılan, kanıtlanmış bir yöntemdir.)
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      return child
    }
    return originalRemoveChild.apply(this, arguments)
  }
  const originalInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode
    }
    return originalInsertBefore.apply(this, arguments)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    </HashRouter>
  </React.StrictMode>
)
