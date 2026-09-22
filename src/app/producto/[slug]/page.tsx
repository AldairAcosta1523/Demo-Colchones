import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/shop/ProductDetail";
import ComfortLab from "@/components/lab/ComfortLab";
import Fit from "@/components/shop/Fit";
import { precio, precioDesde, productoPorSlug, productos } from "@/data/catalog";
import { getModelPage } from "@/data/models";
import { SITE_URL } from "@/lib/site";
import { site } from "@/data/content";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productoPorSlug(slug);
  if (!p) return {};
  const url = `${SITE_URL}/producto/${p.slug}/`;
  return {
    title: p.nombre,
    description: `${p.resumen}. ${p.descripcion}`,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: site.name,
      title: `${p.nombre} · Almara`,
      description: p.resumen,
      url,
    },
  };
}

export default async function ProductoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const producto = productoPorSlug(slug);
  if (!producto) notFound();

  // Contenido editorial extendido: solo existe para los tres colchones.
  const editorial = getModelPage(slug);
  const esColchon = producto.categoria === "colchones";

  // Se recomienda lo que completa la cama, no más de lo mismo.
  const relacionados = productos.filter((p) => p.categoria !== producto.categoria).slice(0, 3);

  /* JSON-LD: se declara el producto con su rango de precios porque aquí sí hay un catálogo
     con precios y disponibilidad definidos. Se marca como datos de demostración en la web. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion,
    category: producto.categoria,
    image: `${SITE_URL}${producto.imagen.src}`,
    brand: { "@type": "Brand", name: "Almara" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PEN",
      lowPrice: precioDesde(producto),
      highPrice: Math.max(...producto.variantes.map((v) => v.precio)),
      offerCount: producto.variantes.length,
      availability: producto.variantes.some((v) => v.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail producto={producto} editorial={editorial} relacionados={relacionados} />
      {esColchon && editorial && <Fit editorial={editorial} />}
      {esColchon && <ComfortLab />}
      <p className="sr-only">Precio desde {precio(precioDesde(producto))}.</p>
    </>
  );
}
