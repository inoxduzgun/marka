import { createContext, useContext, useState, useCallback } from 'react'
import tr from './tr.js'
import en from './en.js'

const dicts = { tr, en }
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('setcast_lang') || 'tr')

  const changeLang = useCallback((l) => {
    setLang(l)
    localStorage.setItem('setcast_lang', l)
    document.documentElement.lang = l
  }, [])

  // t('a.b.c') — noktalı yolla sözlükten çeviri döndürür
  const t = useCallback(
    (path) => {
      const val = path.split('.').reduce((o, k) => (o ? o[k] : undefined), dicts[lang])
      return val === undefined ? path : val
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
