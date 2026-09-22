import { immersive } from "@/data/content";
import SplitLines from "@/components/core/SplitLines";
import Reveal from "@/components/core/Reveal";
import Eyebrow from "@/components/core/Eyebrow";
import Rule from "@/components/core/Rule";
import MediaReveal from "@/components/core/MediaReveal";

/**
 * The Art of Rest: la pieza editorial de la página.
 *
 * Deja de ser una foto a sangre con un titular encima y pasa a ser una doble página: retrato
 * vertical a la izquierda (la foto es vertical; antes se recortaba en apaisado y perdía el
 * cabecero), texto largo a la derecha y una segunda fotografía, más pequeña y descolgada, que
 * se mueve a otro ritmo. Cierra con tres apuntes breves, separados por reglas.
 */
export default function Immersive() {
  return (
    <section className="art" id="art-of-rest" data-nav-theme="dark">
      <div className="container art__grid">
        <div className="art__retrato">
          <MediaReveal
            src={immersive.image.src}
            alt={immersive.image.alt}
            sizes="(max-width: 899px) 100vw, 44vw"
            ratio="4 / 5"
            quality={80}
            parallax={4}
            position="center 70%"
          />
        </div>

        <div className="art__texto">
          <Reveal y={10}>
            <Eyebrow className="eyebrow--light" index="03">
              {immersive.eyebrow}
            </Eyebrow>
          </Reveal>
          <SplitLines
            as="h2"
            className="display art__title"
            stagger={0.1}
            lines={[
              immersive.title[0],
              <em className="accent" key="a">
                {immersive.title[1]}
              </em>,
            ]}
          />
          <Reveal delay={0.14} y={16} stagger={0.1} className="art__parrafos">
            {immersive.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>

        <figure className="art__segunda">
          <MediaReveal
            src={immersive.imageAlt.src}
            alt={immersive.imageAlt.alt}
            sizes="(max-width: 899px) 60vw, 22vw"
            ratio="3 / 4"
            quality={76}
            parallax={9}
          />
          <figcaption className="label">{immersive.imageAlt.caption}</figcaption>
        </figure>
      </div>

      <div className="container">
        <ul className="art__apuntes">
          {immersive.notes.map((n, i) => (
            <li key={n.k}>
              <Rule light delay={i * 0.08} />
              <Reveal delay={0.1 + i * 0.08} y={14} className="art__apunte">
                <span className="label">{n.k}</span>
                <p>{n.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
