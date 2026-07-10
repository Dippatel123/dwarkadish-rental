import './globals.css'
import { Poppins, Noto_Sans_Gujarati, Playfair_Display } from 'next/font/google'
import { Providers } from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const gujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-gujarati',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Dwarkadish Rental | Premium Wedding Decoration Rental Gujarat',
  description: 'Premium wedding & event decoration rentals in Gujarat. Chandeliers, decorative diyas, coolers, heaters, fans, mandap decor & more at affordable prices. On-time delivery.',
  keywords: 'wedding decoration rental, chandelier rental Gujarat, cooler rental, heater rental, fan rental, wedding rental services, Dwarkadish Rental, mandap decor, diya rental',
  openGraph: {
    title: 'Dwarkadish Rental',
    description: 'Make your wedding beautiful without buying expensive decor. Premium rental across Gujarat.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${gujarati.variable} ${playfair.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
