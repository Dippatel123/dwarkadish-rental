'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import {
  Phone, MessageCircle, Menu, X, Sun, Moon, Sparkles,
  ChevronRight, Languages,
} from 'lucide-react'
import { useLanguage } from '@/app/providers'
import { translations, BUSINESS } from '@/lib/i18n'

export function SharedNavbar() {
  const { lang, setLang } = useLanguage()
  const t = translations[lang] || translations.en
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { label: t.nav.home, href: '/#home' },
    { label: t.nav.services, href: '/#services' },
    { label: t.nav.gallery, href: '/#gallery' },
    { label: t.nav.about, href: '/#about' },
    { label: t.nav.contact, href: '/#contact' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-background/40 backdrop-blur-md'}`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
              <Sparkles className="w-5 h-5 text-maroon-900" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-base md:text-lg leading-tight text-gradient-maroon dark:text-gradient-gold">Dwarkadish</div>
              <div className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">Rental &amp; Decor</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className={`px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-accent ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'en' ? 'gu' : 'en')} className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium transition-colors" aria-label="Language">
              <Languages className="w-4 h-4" />
              <span className={lang === 'gu' ? 'font-gujarati' : ''}>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
            </button>
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg hover:bg-accent transition-colors" aria-label="Theme">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors">
              <MessageCircle className="w-4 h-4" /><span className="hidden xl:inline">WhatsApp</span>
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-maroon-800 hover:bg-gold-500 hover:text-maroon-900 text-white text-sm font-medium transition-all">
              <Phone className="w-4 h-4" /><span className="hidden xl:inline">{t.nav.call}</span>
            </a>
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-accent" aria-label="Menu"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden" />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 220 }} className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-background border-l border-border shadow-2xl lg:hidden">
              <div className="p-6 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center"><Sparkles className="w-4 h-4 text-maroon-900" /></div>
                  <span className="font-display font-bold text-gradient-maroon dark:text-gradient-gold">Dwarkadish</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-accent" aria-label="Close"><X className="w-5 h-5" /></button>
              </div>
              <nav className="p-4 flex flex-col gap-1">
                {nav.map((n) => (
                  <a key={n.href} href={n.href} onClick={() => setOpen(false)} className={`px-4 py-3 rounded-lg hover:bg-accent flex items-center justify-between text-base font-medium ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                    {n.label} <ChevronRight className="w-4 h-4 opacity-50" />
                  </a>
                ))}
              </nav>
              <div className="p-4 border-t border-border space-y-2">
                <button onClick={() => setLang(lang === 'en' ? 'gu' : 'en')} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border hover:bg-accent font-medium">
                  <Languages className="w-4 h-4" /><span className={lang === 'gu' ? 'font-gujarati' : ''}>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
                </button>
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-500 text-white font-medium">
                  <MessageCircle className="w-4 h-4" /> {t.nav.whatsapp}
                </a>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-maroon-800 text-white font-medium">
                  <Phone className="w-4 h-4" /> {t.nav.call}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <motion.a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl relative" aria-label="WhatsApp">
        <MessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
      </motion.a>
      <motion.a href={`tel:${BUSINESS.phoneRaw}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: 'spring' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-14 h-14 rounded-full bg-maroon-800 text-white flex items-center justify-center shadow-2xl" aria-label="Call">
        <Phone className="w-6 h-6" />
      </motion.a>
    </div>
  )
}
