'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import {
  Phone, MessageCircle, Menu, X, Sun, Moon, MapPin, Mail, Clock,
  Sparkles, Flame, Wind, Fan, Lamp, Gem, Star, Truck, Shield, Award,
  Check, ArrowRight, Send, ChevronRight, Heart, Music, Languages,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLanguage } from './providers'
import { translations, BUSINESS } from '@/lib/i18n'
import { orderedSlugs } from '@/lib/servicesData'
import morpankhLogo from '@/assets/morpankh-logo.png'
import { SiteFooter } from '@/components/site-nav'

const heroImg = 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0'
const galleryImgs = [
  'https://images.unsplash.com/photo-1773745060497-4cc1df774c72?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1708606811579-23b18fc48007?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1587271636175-90d58cdad458?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1509437142917-63dfe86dcbec?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1531762948975-73032b7b61f4?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1627306411131-358d6d0fd2cb?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1526568929-7cdd510e77fd?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1745573674206-1d4805fcc427?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1772127822552-ce9ef537bdcf?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1744891471118-f74c0453cd21?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1601482441062-b9f13131f33a?fm=jpg&q=60&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
]

const serviceIcons = [Gem, Lamp, Wind, Flame, Fan, Sparkles, Star, Music]
const serviceImgs = [
  'https://images.unsplash.com/photo-1509437142917-63dfe86dcbec?fm=jpg&q=60&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1587271636175-90d58cdad458?fm=jpg&q=60&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1531762948975-73032b7b61f4?fm=jpg&q=60&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1627306411131-358d6d0fd2cb?fm=jpg&q=60&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1526568929-7cdd510e77fd?fm=jpg&q=60&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1745573674206-1d4805fcc427?fm=jpg&q=60&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1772127822552-ce9ef537bdcf?fm=jpg&q=60&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1708606811579-23b18fc48007?fm=jpg&q=60&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
]

const whyIcons = [Shield, Award, Truck, Heart]

function Navbar({ t, lang, setLang }) {
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
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-transparent'}`}
      >
        <div className="container flex items-center justify-between h-20 md:h-24">
          <a href="#home" className="flex items-center gap-1 group">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
              <Image src={morpankhLogo} alt="Dwarkadish Rental" fill className="object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className={`font-display font-bold text-base md:text-lg leading-tight ${scrolled ? 'text-gradient-maroon dark:text-gradient-gold' : 'text-white'}`}>Dwarkadish</div>
              <div className={`text-[10px] md:text-xs tracking-widest uppercase ${scrolled ? 'text-muted-foreground' : 'text-white/70'}`}>Rental</div>
            </div>
          </a>

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
                  <div className="relative w-11 h-11 flex-shrink-0"><Image src={morpankhLogo} alt="Dwarkadish Rental" fill className="object-contain" /></div>
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

function Hero({ t, lang }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3])

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 md:pt-24">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image src={heroImg} alt="Wedding decoration" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-950/80 via-maroon-900/70 to-black/80" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative z-10 py-20">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Badge className={`mb-6 bg-gold-500/20 text-gold-300 border border-gold-500/40 hover:bg-gold-500/30 backdrop-blur-md px-4 py-1.5 text-xs md:text-sm ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              <Sparkles className="w-3 h-3 mr-1.5" /> {t.hero.badge}
            </Badge>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className={`font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.25] tracking-tight ${lang === 'gu' ? 'font-gujarati' : ''}`}>
            {t.hero.title1}{' '}<span className="text-gradient-gold italic inline-block leading-[1.15] pb-1">{t.hero.title2}</span>
            <br />
            <span className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-light text-white/90">{t.hero.title3}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-white/80 max-w-2xl leading-relaxed ${lang === 'gu' ? 'font-gujarati' : ''}`}>
            {t.hero.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4">
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I would like to book decoration items for my event.`} target="_blank" rel="noreferrer">
              <Button size="lg" className={`bg-gold-gradient text-maroon-900 hover:brightness-110 shadow-gold h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-semibold rounded-xl group ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />{t.hero.cta1}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`}>
              <Button size="lg" variant="outline" className={`border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:text-white h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-semibold rounded-xl ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />{t.hero.cta2}
              </Button>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className={`mt-10 md:mt-14 flex flex-wrap gap-4 md:gap-6 ${lang === 'gu' ? 'font-gujarati' : ''}`}>
            {[t.hero.f1, t.hero.f2, t.hero.f3, t.hero.f4].map((f) => (
              <div key={f} className="flex items-center gap-2 text-white/90 text-sm md:text-base">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gold-500/30 border border-gold-400/60 flex items-center justify-center">
                  <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-gold-300" />
                </div>{f}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}

function SectionHeader({ badge, title, subtitle, lang, align = 'center' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : ''}`}>
      <Badge className={`mb-4 bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400 border-none px-3 py-1 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{badge}</Badge>
      <h2 className={`font-display text-2xl sm:text-3xl md:text-5xl font-bold leading-tight tracking-tight ${lang === 'gu' ? 'font-gujarati' : ''}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-muted-foreground text-sm sm:text-base md:text-lg ${lang === 'gu' ? 'font-gujarati' : ''}`}>{subtitle}</p>}
    </motion.div>
  )
}

function Services({ t, lang }) {
  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="container">
        <SectionHeader badge={t.services.badge} title={t.services.title} subtitle={t.services.subtitle} lang={lang} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i % serviceIcons.length]
            const slug = orderedSlugs[i]
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.05, duration: 0.5 }} whileHover={{ y: -6 }}>
                <Link href={`/services/${slug}`} className="block h-full">
                  <Card className="group overflow-hidden h-full border-border/60 hover:border-gold-400/60 hover:shadow-luxe transition-all duration-300 bg-card cursor-pointer">
                    <div className="relative h-40 overflow-hidden">
                      <Image src={serviceImgs[i % serviceImgs.length]} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-maroon-900/20 to-transparent" />
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 text-maroon-900" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className={`font-display font-bold text-lg mb-2 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{s.title}</h3>
                      <p className={`text-sm text-muted-foreground leading-relaxed mb-4 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{s.desc}</p>
                      <div className={`inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                        {lang === 'gu' ? 'વિગતો જુઓ' : 'View Details'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function WhyUs({ t, lang }) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent relative">
      <div className="container">
        <SectionHeader badge={t.why.badge} title={t.why.title} subtitle={t.why.subtitle} lang={lang} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {t.why.items.map((w, i) => {
            const Icon = whyIcons[i]
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8 }}>
                <Card className="p-6 md:p-8 h-full text-center border-border/60 hover:border-gold-400/60 hover:shadow-luxe transition-all duration-300 group bg-card relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-all" />
                  <div className="relative">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-maroon-900" />
                    </div>
                    <h3 className={`font-display font-bold text-lg md:text-xl mb-2 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{w.title}</h3>
                    <p className={`text-sm text-muted-foreground leading-relaxed ${lang === 'gu' ? 'font-gujarati' : ''}`}>{w.desc}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Gallery({ t, lang }) {
  const [active, setActive] = useState(null)
  return (
    <section id="gallery" className="py-20 md:py-32">
      <div className="container">
        <SectionHeader badge={t.gallery.badge} title={t.gallery.title} subtitle={t.gallery.subtitle} lang={lang} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 grid-flow-dense auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[170px] lg:auto-rows-[190px]">
          {galleryImgs.map((src, i) => (
            <motion.button key={i} onClick={() => setActive(src)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.05 }} className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i % 5 === 0 ? 'row-span-2' : 'row-span-1'}`}>
              <Image src={src} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-maroon-900" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-0 shadow-none">
          {active && (
            <div className="relative aspect-video w-full">
              <Image src={active} alt="Preview" fill className="object-contain rounded-2xl" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function About({ t, lang }) {
  const stats = [
    { value: '10+', label: t.about.exp },
    { value: '500+', label: t.about.events },
    { value: '25+', label: t.about.cities },
    { value: '1000+', label: t.about.happy },
  ]
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container min-w-0">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center min-w-0">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative min-w-0">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxe">
              <Image src={galleryImgs[7]} alt="About" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 right-2 sm:-right-6 md:bottom-8 md:-right-8 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-3xl bg-gold-gradient shadow-gold flex flex-col items-center justify-center text-maroon-900 rotate-3">
              <div className="font-display text-3xl md:text-4xl font-bold">10+</div>
              <div className={`text-xs md:text-sm font-medium text-center px-2 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.exp}</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="min-w-0">
            <Badge className={`mb-4 bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400 border-none ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.badge}</Badge>
            <h2 className={`font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-6 leading-tight ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.title}</h2>
            <p className={`text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-4 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.p1}</p>
            <p className={`text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-8 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.p2}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className="p-5 border-gold-400/30 bg-gold-500/5">
                <div className={`text-xs uppercase tracking-wider text-gold-700 dark:text-gold-400 font-semibold mb-1 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.mission}</div>
                <p className={`text-sm ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.missionText}</p>
              </Card>
              <Card className="p-5 border-maroon-400/30 bg-maroon-500/5">
                <div className={`text-xs uppercase tracking-wider text-maroon-800 dark:text-gold-400 font-semibold mb-1 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.vision}</div>
                <p className={`text-sm ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.about.visionText}</p>
              </Card>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-gradient-maroon dark:text-gradient-gold">{s.value}</div>
                  <div className={`text-[10px] md:text-xs text-muted-foreground mt-1 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children, lang }) {
  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{label}</label>
      {children}
    </div>
  )
}

function InfoCard({ icon: Icon, label, value, href, color = 'gold', lang }) {
  const content = (
    <Card className="p-4 flex items-center gap-4 border-border/60 hover:border-gold-400/60 hover:shadow-luxe transition-all group cursor-pointer bg-card">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color === 'emerald' ? 'bg-emerald-500' : 'bg-gold-gradient'}`}>
        <Icon className={`w-5 h-5 ${color === 'emerald' ? 'text-white' : 'text-maroon-900'}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className={`text-xs text-muted-foreground uppercase tracking-wider ${lang === 'gu' ? 'font-gujarati' : ''}`}>{label}</div>
        <div className={`font-medium truncate ${lang === 'gu' ? 'font-gujarati' : ''}`}>{value}</div>
      </div>
      {href && <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />}
    </Card>
  )
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block">{content}</a> : content
}

function ContactForm({ t, lang }) {
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({ name: '', phone: '', city: '', items: '', date: today, message: '' })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error(lang === 'gu' ? 'નામ અને ફોન જરૂરી છે' : 'Name and phone are required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) {
        toast.success(t.contact.success)
        setForm({ name: '', phone: '', city: '', items: '', date: today, message: '' })
      } else {
        throw new Error(data.error || 'Failed')
      }
    } catch (err) {
      toast.error(t.contact.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container min-w-0">
        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 min-w-0">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3 min-w-0">
            <SectionHeader badge={t.contact.badge} title={t.contact.title} subtitle={t.contact.subtitle} lang={lang} align="left" />
            <Card className="p-4 sm:p-6 md:p-8 border-border/60 shadow-luxe bg-card min-w-0">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={t.contact.name} lang={lang}>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.contact.name} required />
                  </Field>
                  <Field label={t.contact.phone} lang={lang}>
                    <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91" required />
                  </Field>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={t.contact.city} lang={lang}>
                    <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder={t.contact.city} />
                  </Field>
                  <Field label={t.contact.date} lang={lang}>
                    <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  </Field>
                </div>
                <Field label={t.contact.items} lang={lang}>
                  <Select value={form.items} onValueChange={(v) => setForm({ ...form, items: v })}>
                    <SelectTrigger className={lang === 'gu' ? 'font-gujarati' : ''}>
                      <SelectValue placeholder={t.contact.itemsPh} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.services.items.map((svc, idx) => (
                        <SelectItem key={idx} value={svc.title} className={lang === 'gu' ? 'font-gujarati' : ''}>
                          {svc.title}
                        </SelectItem>
                      ))}
                      <SelectItem value={lang === 'gu' ? 'બહુવિધ / અન્ય' : 'Multiple / Other'} className={lang === 'gu' ? 'font-gujarati' : ''}>
                        {lang === 'gu' ? 'બહુવિધ / અન્ય' : 'Multiple / Other'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label={t.contact.message} lang={lang}>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.contact.messagePh} rows={4} />
                </Field>
                <Button type="submit" disabled={loading} size="lg" className={`w-full bg-maroon-800 hover:bg-gold-500 hover:text-maroon-900 text-white h-12 md:h-14 rounded-xl font-semibold text-base transition-all group ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                  {loading ? t.contact.sending : (
                    <><Send className="mr-2 h-4 w-4" />{t.contact.submit}<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 flex flex-col gap-4 min-w-0">
            <div className="mb-2">
              <Badge className={`mb-3 bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400 border-none ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.contactInfo.badge}</Badge>
              <h3 className={`font-display text-xl sm:text-2xl md:text-3xl font-bold ${lang === 'gu' ? 'font-gujarati' : ''}`}>{t.contactInfo.title}</h3>
            </div>
            <InfoCard icon={Phone} label={t.contactInfo.phone} value={BUSINESS.phone} href={`tel:${BUSINESS.phoneRaw}`} lang={lang} />
            <InfoCard icon={MessageCircle} label={t.contactInfo.whatsapp} value={BUSINESS.phone} href={`https://wa.me/${BUSINESS.whatsapp}`} color="emerald" lang={lang} />
            <InfoCard icon={Mail} label={t.contactInfo.email} value={BUSINESS.email} href={`mailto:${BUSINESS.email}`} lang={lang} />
            <InfoCard icon={MapPin} label={t.contactInfo.location} value={BUSINESS.location} href={BUSINESS.mapsUrl} lang={lang} />
            <InfoCard icon={Clock} label={t.contactInfo.hours} value={t.contactInfo.hoursValue} lang={lang} />

            <div className="grid grid-cols-2 gap-3 pt-3">
              <a href={`tel:${BUSINESS.phoneRaw}`} className="w-full">
                <Button className={`w-full bg-maroon-800 hover:bg-maroon-900 text-white rounded-xl h-11 ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                  <Phone className="w-4 h-4 mr-2" /> {t.contactInfo.callBtn}
                </Button>
              </a>
              <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" className="w-full">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-11">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <motion.a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl relative" aria-label="WhatsApp">
        <MessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
      </motion.a>
      <motion.a href={`tel:${BUSINESS.phoneRaw}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-14 h-14 rounded-full bg-maroon-800 text-white flex items-center justify-center shadow-2xl" aria-label="Call">
        <Phone className="w-6 h-6" />
      </motion.a>
    </div>
  )
}

const App = () => {
  const { lang, setLang } = useLanguage()
  const t = translations[lang] || translations.en

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar t={t} lang={lang} setLang={setLang} />
      <Hero t={t} lang={lang} />
      <Services t={t} lang={lang} />
      <WhyUs t={t} lang={lang} />
      <Gallery t={t} lang={lang} />
      <About t={t} lang={lang} />
      <ContactForm t={t} lang={lang} />
      <SiteFooter t={t} lang={lang} />
      <FloatingButtons />
    </main>
  )
}

export default App
