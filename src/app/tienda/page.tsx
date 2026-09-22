import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";
import Reveal from "@/components/core/Reveal";
import SplitLines from "@/components/core/SplitLines";
import Eyebrow from "@/components/core/Eyebrow";
import { SITE_URL } from "@/lib/site";
import { productos } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Colchones, almohadas, ropa de cama y bases de Almara. Filtra por categoría, firmeza, medida y precio para encontrar lo que necesita tu descanso.",
  alternates: { canonical: `${SITE_URL}/tienda/` },
};

export default function TiendaPage() {
  return (
    <section className="tienda" data-nav-theme="light">
      <div className="container">
        <header className="tienda__head">
          <Reveal>
            <Eyebrow>Tienda</Eyebrow>
          </Reveal>
          <SplitLines
            as="h1"
            className="h2 tienda__titulo"
            lines={["Todo lo que sostiene", <span className="accent" key="a">una buena noche.</span>]}
          />
          <Reveal delay={0.16} className="tienda__intro">
            <p className="lead">
              {productos.length} productos entre colchones, almohadas, ropa de cama y bases. Pocas referencias, cada una
              con su motivo para existir.
            </p>
          </Reveal>
        </header>

        <Suspense fallback={<p className="tienda__cuenta">Cargando el catálogo…</p>}>
          <ShopClient />
        </Suspense>
      </div>
    </section>
  );
}
