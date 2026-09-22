import Link from "next/link";
import { collection, models, type Model } from "@/data/content";
import { precio, precioDesde, productoPorSlug } from "@/data/catalog";
import Reveal from "@/components/core/Reveal";
import SplitLines from "@/components/core/SplitLines";
import Eyebrow from "@/components/core/Eyebrow";
import MediaReveal from "@/components/core/MediaReveal";
import Firmeza from "@/components/core/Firmeza";
import { Arrow, ButtonLabel } from "@/components/core/CtaButton";
import CollectionRail from "@/components/sections/CollectionRail";

/**
 * La colección: un capítulo por colchón.
 *
 * Cada modelo ocupa una banda propia, con su tinte (arena, salvia, arcilla clara) y la fotografía
 * alternando de lado. El nombre va a gran tamaño; debajo, una ficha corta con lo que decide la
 * compra: firmeza sobre un eje, altura, medidas disponibles y precio de entrada.
 */
const LAYOUT = {
  esencial: { ratio: "5 / 6", position: "center 38%" },
  natura: { ratio: "5 / 6", position: "center 60%" },
  signature: { ratio: "5 / 6", position: "62% 50%" },
} as const;

function ProductRow({ model }: { model: Model }) {
  const layout = LAYOUT[model.id];
  // Precio y medidas viven en el catálogo comercial, no en el contenido editorial.
  const ficha = productoPorSlug(model.id);
  const medidas = ficha?.variantes ?? [];

  return (
    <li className={`product product--${model.id}`}>
      <Link href={`/producto/${model.id}/`} className="container product__link">
        <div className="product__media-col" data-cursor-label="Explorar">
          <MediaReveal
            className="product__media"
            src={model.image.src}
            alt={model.image.alt}
            sizes="(max-width: 899px) 100vw, 52vw"
            ratio={layout.ratio}
            quality={80}
            parallax={5}
            position={layout.position}
          />
        </div>

        <div className="product__copy">
          <Reveal y={0} className="product__top">
            <span className="label">Nº {model.index}</span>
            <span className="label">{model.short}</span>
          </Reveal>

          <SplitLines as="h3" className="product__name" lines={[model.name]} />

          <Reveal y={14} delay={0.08} className="product__desc">
            <p>{model.description}</p>
          </Reveal>

          <Reveal y={14} delay={0.14} className="product__ficha">
            <dl>
              <div className="product__dato product__dato--firmeza">
                <dt>Firmeza</dt>
                <dd>
                  <span>{model.firmness}</span>
                  <Firmeza valor={model.firmness} />
                </dd>
              </div>
              <div className="product__dato">
                <dt>Altura</dt>
                <dd className="num">{model.height}</dd>
              </div>
              {medidas.length > 0 && (
                <div className="product__dato">
                  <dt>Medidas</dt>
                  <dd>{medidas.map((v) => v.nombre).join(" · ")}</dd>
                </div>
              )}
            </dl>
            <ul className="product__features">
              {model.features.slice(0, 3).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={12} delay={0.2} className="product__foot">
            {ficha && (
              <p className="product__precio num">
                <span>desde</span> <strong>{precio(precioDesde(ficha))}</strong>
              </p>
            )}
            <span className="btn btn--primary product__cta">
              <ButtonLabel>{model.cta}</ButtonLabel>
              <Arrow />
            </span>
          </Reveal>
        </div>
      </Link>
    </li>
  );
}

export default function Collection() {
  return (
    <section className="collection" id="coleccion" data-nav-theme="light">
      <CollectionRail />
      <div className="container collection__head">
        <div className="collection__titulo">
          <Reveal y={10}>
            <Eyebrow index="02">{collection.eyebrow}</Eyebrow>
          </Reveal>
          <SplitLines
            as="h2"
            className="display collection__title"
            lines={[collection.title[0], `${collection.title[1]} ${collection.title[2]}`]}
          />
        </div>
        <Reveal delay={0.12} y={0} className="collection__intro">
          <p className="lead">{collection.intro}</p>
        </Reveal>
      </div>

      <ul className="collection__list">
        {models.map((m) => (
          <ProductRow key={m.id} model={m} />
        ))}
      </ul>
    </section>
  );
}
