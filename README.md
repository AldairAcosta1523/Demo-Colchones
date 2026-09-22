# Almara — Colchones, descanso y bienestar

Tienda de **Almara**, una marca conceptual de colchones: catálogo, fichas de producto, carrito y
checkout sobre la misma base técnica —Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui +
GSAP/ScrollTrigger + Lenis + Three.js—. Es una pieza de portafolio: demuestra el rediseño completo
de un sitio existente (identidad, dirección de arte, contenido, arquitectura y movimiento) y su
evolución a comercio electrónico.

Concepto: **The Art of Rest**. La experiencia se apoya en tres momentos coreografiados —la apertura
del hero, una fotografía que se abre a pantalla completa entre secciones y el cambio de tono al
bloque espresso— sobre un sistema de movimiento con valores únicos (`src/lib/motion.ts`).

Documento de diseño (paleta, tipografía, estructura, motion, accesibilidad):
[`docs/DESIGN.md`](docs/DESIGN.md).

> **Proyecto demostrativo.** No hay empresa, almacén ni pasarela de pago detrás de Almara. Precios,
> stock, plazos y garantías son datos de ejemplo centralizados en `src/data/catalog.ts` y
> `src/data/tienda.ts`, escritos para ser sustituidos por los de un negocio real. El checkout valida
> y arma el pedido en el navegador, pero **no cobra ni envía nada**: termina en un resumen llamado
> "pedido preparado", nunca en una confirmación de compra.

### Qué falta para que sea una tienda real

| Pieza | Estado |
|---|---|
| Catálogo, variantes, stock, precios | Implementado como datos locales tipados |
| Carrito, totales y envío | Implementado (estado en React + `localStorage`) |
| Formulario de checkout y validación | Implementado en cliente |
| Pasarela de pago (Culqi, Niubiz, Mercado Pago…) | **Falta conectar** |
| Backend que reciba y persista el pedido | **Falta conectar** |
| Correo de confirmación | **Falta conectar** |
| Stock real y transportista | **Falta conectar** |

El checkout enumera esta misma lista en pantalla al generar un pedido, para que nadie lo confunda
con una compra.

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Home: hero, categorías, colección editorial, inmersivo, confort, laboratorio 3D, complementos, cómo elegir, comparativa, condiciones, FAQ, cierre |
| `/tienda/` | Catálogo con filtros (categoría, firmeza, medida, precio), búsqueda y orden. Acepta `?categoria=`, `?q=` |
| `/producto/[slug]/` | Ficha: galería, variantes, stock, compra, ficha técnica, capas, comparativa y relacionados (9 productos) |
| `/carrito/` | Carrito completo con totales y envío |
| `/checkout/` | Datos de entrega y generación del pedido (`noindex`) |
| `/nosotros/`, `/contacto/`, `/faq/` | Páginas informativas |
| `/politicas/[slug]/` | Envíos, devoluciones, garantía y privacidad |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image/`, `/icon.svg` | SEO |

Las rutas usan barra final (`trailingSlash: true`). Las antiguas `/colchones/<slug>/` redirigen
permanentemente a `/producto/<slug>/`.

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run start
```

`NEXT_PUBLIC_SITE_URL` define el dominio de canonical, sitemap y Open Graph (por defecto
`http://localhost:3000`).

## QA headless (Playwright)

```bash
npx next start -p 3011
OUT=./shots node scripts/qa.mjs        # 4 rutas × 4 viewports: consola, overflow, capturas
OUT=./shots node scripts/interact.mjs  # anclas, FAQ, formulario, menú móvil, modelo, reduced-motion
node scripts/tienda.mjs                # catálogo, filtros, variantes, carrito, persistencia, checkout
OUT=./shots node scripts/scrub.mjs     # animaciones de scroll: valores y capturas bajando y subiendo
OUT=./shots node scripts/lab.mjs       # 3D: render real, arrastre, vistas, hotspots, despiece, móvil, sin WebGL
node scripts/perf.mjs                  # fluidez al desplazarse, por sección (WEBGL=off aísla el 3D)
node scripts/carga.mjs                 # carga inicial y peso (MOVIL=1 simula CPU 4× lenta y 4 Mbps)
OUT=./shots node scripts/shot-full.mjs # capturas de página completa
```

## Estructura

```
public/images           fotografías (Unsplash) usadas con next/image
src/app                 layout · page · tienda · producto/[slug] · carrito · checkout · nosotros
                        · contacto · faq · politicas/[slug] · sitemap · robots · opengraph-image · icon
src/data                catalog.ts (productos, variantes, stock, precios, envío) · tienda.ts
                        (políticas y textos de compra) · content.ts (copy editorial) · models.ts
                        (contenido largo de cada colchón)
src/lib                 cart.tsx (estado del carrito) · gsap.ts · SmoothScroll.tsx (Lenis)
                        · useMedia.ts · site.ts
src/components/ui       shadcn/ui (button · badge · card · accordion · alert · input · textarea
                        · label · select · checkbox · slider · radio-group · table · skeleton
                        · toggle-group · dropdown-menu · sheet · separator · breadcrumb)
src/components/core     Reveal · SplitLines · MediaReveal · Rule · Magnetic · Cursor · CtaButton
                        · Eyebrow · Wordmark
src/lib/motion.ts       duraciones, easings y distancias del sistema de movimiento
src/components/layout   Preloader · Nav · Footer
src/components/sections Hero · Categorias · Collection · Immersive · Comfort · CompletaTuCama
                        · Guide · Comparativa · Promesas · Benefits · About · Faq · FinalCta · Consulta
src/components/shop     ProductCard · CartDrawer · QuantityStepper · ShopClient (filtros)
                        · ProductDetail · Fit · CartPage · CheckoutClient
src/components/lab      ComfortLab (sección) · mattressScene (Three.js: modelo procedural, cámara, hotspots)
src/styles              tokens · base · components · sections · model · shop · shadcn-almara
                        (shadcn-almara.css es la única capa que adapta las primitivas de shadcn)
```

## Sistema visual

- **Componentes de shadcn/ui en toda la interfaz.** Botones, tarjetas, casillas, deslizador,
  selects, radios, tablas, alertas, separadores, skeletons y paneles laterales son primitivas de
  shadcn (Radix debajo): de ahí vienen el foco, el teclado y las etiquetas ARIA. La piel de marca
  se aplica en una sola capa, `src/styles/shadcn-almara.css`, apuntando a sus `data-slot`. Ningún
  componente de la tienda reimplementa un control que shadcn ya resuelve.
- **Tokens** en `src/styles/tokens.css`: marfil y arena de fondo, espresso para títulos, terracota
  como color de marca y salvia para detalles de bienestar. Los tokens de shadcn (`--primary`,
  `--border`, `--ring`…) se mapean en `src/app/globals.css`; las secciones oscuras usan
  `[data-nav-theme="dark"]` / `.theme-dark`.
- **Tipografía**: DM Serif Display para títulos, Manrope para interfaz y texto.
- **Contraste**: los colores de texto cumplen WCAG AA sobre sus fondos (ver `docs/DESIGN.md`).
- **Movimiento**: duraciones y curvas se definen una sola vez en `src/lib/motion.ts` y se reflejan en
  CSS (`--t-hover`, `--t-button`, `--e-ui`, `--e-mask`) para las microinteracciones.

## Decisiones

- **Las primitivas se extienden, no se bifurcan.** Cuando shadcn no cubría un caso se añadió a su
  propio archivo en vez de crear un componente paralelo: `asChild` en `Card` (las tarjetas de
  producto son `<article>`), `RadioGroupCard` en `radio-group` (el selector de medida es una ficha,
  no un punto) y `closeLabel` en `Sheet` (el aspa decía "Close" en un sitio en español).
- **3D con Three.js directo** (no React Three Fiber): R3F 9.7 exige `react <19.3` y el proyecto usa
  19.3. El colchón es un modelo procedural —sin GLB ni texturas descargadas— y el módulo se carga
  de forma diferida al acercarse la sección.

- `prefers-reduced-motion`: sin preloader, sin Lenis, sin parallax ni máscaras; todo visible de
  inmediato y con las microinteracciones degradadas a cambios de color.
- Solo se animan `transform`, `opacity` y `clip-path`; la apertura a pantalla completa usa
  `clip-path` en lugar de `width` para no provocar recálculos de layout.
- **Los datos comerciales viven en un solo sitio.** `catalog.ts` y `tienda.ts` son la única fuente
  de precios, stock, plazos y coberturas; ningún componente inventa un número. Cambiar el catálogo
  cambia la tienda entera, incluidos el megamenú, el sitemap y el JSON-LD.
- **El checkout no pide datos de tarjeta a propósito.** Sin pasarela conectada, un formulario de
  tarjeta solo enseñaría a escribir datos bancarios en una demo. En su lugar el bloque de pago
  explica qué integración falta.
- Ningún botón es decorativo: si algo no se puede hacer (una medida agotada, un envío fuera de
  Lima), el control aparece deshabilitado y dice por qué.
- El formulario de consulta no tiene backend a propósito; muestra el mensaje armado y permite
  copiarlo. No se simula ningún envío ni confirmación.
- El JSON-LD declara `Product` con `AggregateOffer` a partir de los precios reales del catálogo,
  además de `WebSite`, `BreadcrumbList` y `FAQPage`. No se declaran valoraciones ni reseñas porque
  no existen.
- Fotografías de Unsplash, optimizadas por `next/image` con `sizes` por breakpoint.
