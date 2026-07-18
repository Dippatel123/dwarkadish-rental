'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import {
  Phone, MessageCircle, Menu, X, Sun, Moon, Sparkles,
  ChevronRight, Languages, Mail, MapPin, Heart,
} from 'lucide-react'
import { useLanguage } from '@/app/providers'
import { translations, BUSINESS } from '@/lib/i18n'
import morpankhLogo from '@/assets/morpankh-logo.png'

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
        <div className="container flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="flex items-center gap-1 group">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
              <Image src={morpankhLogo} alt="Dwarkadhish Rental" fill className="object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className={`font-display font-bold text-base md:text-lg leading-tight ${scrolled ? 'text-gradient-maroon dark:text-gradient-gold' : 'text-white'}`}>Dwarkadhish</div>
              <div className={`text-[10px] md:text-xs tracking-widest uppercase ${scrolled ? 'text-muted-foreground' : 'text-white/70'}`}>Rental</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className={`px-4 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg hover:bg-accent ${scrolled ? 'text-foreground/80' : 'text-white/90'} ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'en' ? 'gu' : 'en')} className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium transition-colors ${scrolled ? 'text-foreground' : 'text-white/90'}`} aria-label="Language">
              <Languages className="w-4 h-4" />
              <span className={lang === 'gu' ? 'font-gujarati' : ''}>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
            </button>
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-2 rounded-lg hover:bg-accent transition-colors ${scrolled ? 'text-foreground' : 'text-white/90'}`} aria-label="Theme">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors">
              <MessageCircle className="w-4 h-4" /><span className="hidden xl:inline">WhatsApp</span>
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-maroon-800 hover:bg-gold-500 hover:text-maroon-900 text-white text-sm font-medium transition-all">
              <Phone className="w-4 h-4" /><span className="hidden xl:inline">{t.nav.call}</span>
            </a>
            <button onClick={() => setOpen(true)} className={`lg:hidden p-2 rounded-lg hover:bg-accent ${scrolled ? 'text-foreground' : 'text-white/90'}`} aria-label="Menu"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden" />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 220 }} className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-background border-l border-border shadow-2xl lg:hidden">
              <div className="p-6 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-1">
                  <div className="relative w-11 h-11 flex-shrink-0"><Image src={morpankhLogo} alt="Dwarkadhish Rental" fill className="object-contain" /></div>
                  <span className="font-display font-bold text-gradient-maroon dark:text-gradient-gold">Dwarkadhish</span>
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

export function SiteFooter({ t, lang }) {
  return (
    <footer className="border-t border-border bg-accent/30 pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image src={morpankhLogo} alt="Dwarkadhish Rental" fill className="object-contain" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-gradient-maroon dark:text-gradient-gold">Dwarkadhish</div>
                <div className="text-sm text-muted-foreground tracking-widest uppercase">Rental</div>
              </div>
            </div>
            <p className={`text-muted-foreground max-w-md leading-relaxed ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.footer.quickLinks}</h4>
            <ul className={`space-y-2 text-sm text-muted-foreground ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              <li><Link href="/#home" className="hover:text-primary transition-colors">{t.nav.home}</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">{t.footer.services}</Link></li>
              <li><Link href="/#gallery" className="hover:text-primary transition-colors">{t.nav.gallery}</Link></li>
              <li><Link href="/#about" className="hover:text-primary transition-colors">{t.nav.about}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />{BUSINESS.phone}</li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />{BUSINESS.email}</li>
              <li className={`flex items-start gap-2 ${lang === 'gu' ? 'font-gujarati' : ''}`}><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />{BUSINESS.location}</li>
            </ul>
          </div>
        </div>
        <div className={`pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground ${lang === 'gu' ? 'font-gujarati' : ''}`}>
          <div>© {new Date().getFullYear()} {BUSINESS.name}. {t.footer.rights}</div>
          <div className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-maroon-600 fill-maroon-600" /> in Gujarat</div>
        </div>
      </div>
    </footer>
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
