'use client'
import { useState, use } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Phone, MessageCircle, ArrowLeft, ArrowRight, Check, Sparkles,
  Star, Send, ChevronRight, Download,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useLanguage } from '@/app/providers'
import { translations, BUSINESS } from '@/lib/i18n'
import { servicesData, orderedSlugs } from '@/lib/servicesData'
import { SharedNavbar, FloatingButtons, SiteFooter } from '@/components/site-nav'

export default function ServiceDetailPage({ params }) {
  const resolved = use(params)
  const slug = resolved?.slug
  const service = servicesData[slug]
  if (!service) return notFound()

  const { lang } = useLanguage()
  const t = translations[lang] || translations.en
  const s = service[lang] || service.en
  const [active, setActive] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', city: '', items: s.title, date: '', message: '' })
  const [loading, setLoading] = useState(false)

  const otherServices = orderedSlugs.filter((x) => x !== slug).slice(0, 4)

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
        body: JSON.stringify({ ...form, items: form.items || s.title }),
      })
      const data = await res.json()
      if (data.ok) {
        toast.success(t.contact.success)
        setForm({ name: '', phone: '', city: '', items: s.title, date: '', message: '' })
      } else throw new Error(data.error || 'Failed')
    } catch (err) {
      toast.error(t.contact.error)
    } finally {
      setLoading(false)
    }
  }

  const waLink = `https://wa.me/${BUSINESS.whatsapp}?text=Hi, I'm interested in ${service.en.title}. Please share details and pricing.`

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <SharedNavbar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={service.gallery[0]} alt={s.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-950/90 via-maroon-900/85 to-black/90" />
          <div className="absolute inset-0 bg-grid opacity-10" />
        </div>

        <div className="container relative z-10 py-12 md:py-20">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/80 hover:text-gold-300 mb-6 md:mb-8 text-sm font-medium group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {lang === 'gu' ? 'બધી સેવાઓ' : 'All Services'}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className={`mb-4 bg-gold-500/20 text-gold-300 border border-gold-500/40 hover:bg-gold-500/30 backdrop-blur-md px-4 py-1.5 ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              <Sparkles className="w-3 h-3 mr-1.5" /> {t.services.badge}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className={`font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.25] tracking-tight max-w-4xl ${lang === 'gu' ? 'font-gujarati' : ''}`}
          >
            <span className="text-gradient-gold inline-block pb-1">{s.title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className={`mt-4 md:mt-6 text-lg md:text-2xl text-white/85 max-w-3xl leading-relaxed ${lang === 'gu' ? 'font-gujarati' : ''}`}
          >
            {s.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href={waLink} target="_blank" rel="noreferrer">
              <Button size="lg" className={`bg-gold-gradient text-maroon-900 hover:brightness-110 shadow-gold h-12 md:h-13 px-6 rounded-xl font-semibold group ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                <MessageCircle className="mr-2 h-4 w-4" />{s.cta}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`}>
              <Button size="lg" variant="outline" className={`border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:text-white h-12 md:h-13 px-6 rounded-xl font-semibold ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                <Phone className="mr-2 h-4 w-4" />{t.hero.cta2}
              </Button>
            </a>
            {service.brochure && (
              <a href={service.brochure} download target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className={`border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:text-white h-12 md:h-13 px-6 rounded-xl font-semibold ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                  <Download className="mr-2 h-4 w-4" />{t.hero.cta3}
                </Button>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description + Features */}
      <section className="py-16 md:py-24">
        <div className="container">
          {/* Description + Features (full width, no side form) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Badge className={`mb-4 bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400 border-none ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              {lang === 'gu' ? 'વિગતો' : 'About This Service'}
            </Badge>
            <h2 className={`font-display text-3xl md:text-4xl font-bold leading-tight mb-6 ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              {s.title}
            </h2>
            <p className={`text-base md:text-lg text-muted-foreground leading-relaxed mb-8 ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              {s.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {s.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 mt-0.5 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold">
                    <Check className="w-3.5 h-3.5 text-maroon-900" />
                  </div>
                  <span className={`text-base ${lang === 'gu' ? 'font-gujarati' : ''}`}>{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-12">
            <Badge className={`mb-3 bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400 border-none ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              {t.gallery.badge}
            </Badge>
            <h2 className={`font-display text-3xl md:text-5xl font-bold ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              {lang === 'gu' ? 'વધુ ફોટા' : 'More Photos'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {service.gallery.map((src, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(src)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.05 }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
              >
                <Image src={src} alt={`${s.title} ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 33vw" />
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
                <Image src={active} alt="Preview" fill className="object-contain rounded-2xl" sizes="100vw" />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Testimonial / Trust Bar */}
      <section className="py-14">
        <div className="container">
          <Card className="p-6 md:p-10 bg-maroon-gradient text-white overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="relative grid md:grid-cols-3 gap-6 items-center">
              <div className="flex items-center gap-1 md:col-span-1">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-6 h-6 fill-gold-400 text-gold-400" />))}
              </div>
              <p className={`md:col-span-2 text-base md:text-lg italic ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                {lang === 'gu'
                  ? '"સેવા ઉત્કૃષ્ટ હતી, સેટઅપ સમયસર થયો અને દરેક વસ્તુ ચમકતી હતી. ખરેખર ભલામણ કરીશું!"'
                  : '"Service was excellent, setup was on time and everything was spotless. Highly recommend!"'}
                <span className="block text-sm text-gold-300 mt-2 not-italic font-medium">— Happy Customer, Ahmedabad</span>
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-12">
            <Badge className={`mb-3 bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400 border-none ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              {lang === 'gu' ? 'બીજી સેવાઓ' : 'Other Services'}
            </Badge>
            <h2 className={`font-display text-3xl md:text-5xl font-bold ${lang === 'gu' ? 'font-gujarati' : ''}`}>
              {lang === 'gu' ? 'આ પણ જુઓ' : 'You Might Also Like'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {otherServices.map((otherSlug, i) => {
              const other = servicesData[otherSlug]
              const os = other[lang] || other.en
              return (
                <motion.div
                  key={otherSlug}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={`/services/${otherSlug}`}>
                    <Card className="group overflow-hidden h-full border-border/60 hover:border-gold-400/60 hover:shadow-luxe transition-all bg-card">
                      <div className="relative h-32 md:h-40 overflow-hidden">
                        <Image src={other.gallery[0]} alt={os.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/70 to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className={`font-display font-bold text-sm md:text-base mb-1 ${lang === 'gu' ? 'font-gujarati' : ''}`}>{os.title}</h3>
                        <span className="text-xs text-primary flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          {lang === 'gu' ? 'જુઓ' : 'View'} <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="pb-24">
        <div className="container">
          <Card className="p-8 md:p-14 bg-gold-gradient text-maroon-900 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative">
              <h2 className={`font-display text-3xl md:text-5xl font-bold mb-4 ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                {lang === 'gu' ? 'આજે જ બુક કરો' : 'Ready to Book?'}
              </h2>
              <p className={`text-base md:text-lg opacity-90 mb-8 max-w-2xl mx-auto ${lang === 'gu' ? 'font-gujarati' : ''}`}>
                {lang === 'gu' ? 'સ્પર્ધાત્મક ભાવ મેળવવા અમને હમણાં જ કૉલ કરો અથવા વોટ્સએપ કરો.' : 'Call or WhatsApp us now to get the best price and secure your booking.'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href={waLink} target="_blank" rel="noreferrer">
                  <Button size="lg" className="bg-maroon-800 hover:bg-maroon-900 text-white h-12 md:h-14 px-6 md:px-8 rounded-xl font-semibold">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Now
                  </Button>
                </a>
                <a href={`tel:${BUSINESS.phoneRaw}`}>
                  <Button size="lg" variant="outline" className="border-maroon-900 text-maroon-900 hover:bg-maroon-900 hover:text-white h-12 md:h-14 px-6 md:px-8 rounded-xl font-semibold">
                    <Phone className="mr-2 h-5 w-5" /> {t.contactInfo.callBtn}
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter t={t} lang={lang} />
      <FloatingButtons />
    </main>
  )
}
