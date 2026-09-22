import type { Metadata, Viewport } from "next";
import { Onest, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/lib/SmoothScroll";
import { CarritoProvider } from "@/lib/cart";
import { site } from "@/data/content";
import { SITE_URL } from "@/lib/site";
import Preloader from "@/components/layout/Preloader";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/core/Cursor";
import CartDrawer from "@/components/shop/CartDrawer";

/* Dos familias, ambas variables (un archivo por estilo): Onest para lo funcional y Newsreader,
   con su eje óptico, para que los titulares grandes afinen el contraste por sí solos. */
const sans = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: "%s | Almara" },
  applicationName: site.name,
  category: "shopping",
  description: site.description,
  keywords: ["colchones", "descanso", "dormitorio", "firmeza", "almohadas", "ropa de cama", "Almara", "Perú"],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: `${SITE_URL}/`,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/` },
};

export const viewport: Viewport = {
  themeColor: "#F5F2EC",
  width: "device-width",
  initialScale: 1,
};

/* JSON-LD mínimo: solo identidad del sitio. Al tratarse de una marca conceptual,
   no se declaran ofertas, precios ni valoraciones como si fueran reales. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: `${SITE_URL}/`,
  inLanguage: "es",
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca <html class="motion"> antes del primer paint para que los reveals no parpadeen. */}
        <Script id="motion-flag" strategy="beforeInteractive">
          {`try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <CarritoProvider>
          <SmoothScroll>
            <a href="#main" className="skip-link">
              Ir al contenido
            </a>
            <Preloader />
            <Cursor />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
          </SmoothScroll>
        </CarritoProvider>
      </body>
    </html>
  );
}
