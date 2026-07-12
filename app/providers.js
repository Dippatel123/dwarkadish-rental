'use client'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext({ lang: 'en', setLang: () => {} })

export function useLanguage() {
  return useContext(LanguageContext)
}

function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
    if (stored === 'en' || stored === 'gu') setLangState(stored)
    setMounted(true)
  }, [])

  const setLang = (l) => {
    setLangState(l)
    if (typeof window !== 'undefined') localStorage.setItem('lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, mounted }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        {children}
        <Toaster richColors position="top-right" closeButton />
      </LanguageProvider>
    </ThemeProvider>
  )
}
