import { benefits } from "@/data/content";
import Reveal from "@/components/core/Reveal";
import SplitLines from "@/components/core/SplitLines";
import Eyebrow from "@/components/core/Eyebrow";
import Rule from "@/components/core/Rule";

/**
 * Beneficios: momento editorial, no una rejilla de tarjetas.
 * Columna de título que permanece + lista donde cada entrada se dibuja con su propia línea.
 */
export default function Benefits() {
  return (
    <section className="benefits" id="beneficios" data-nav-theme="light">
      <div className="container benefits__grid">
        <div className="benefits__side">
          <Reveal>
            <Eyebrow>{benefits.eyebrow}</Eyebrow>
          </Reveal>
          <SplitLines
            as="h2"
            className="h2 benefits__title"
            lines={[benefits.title[0], benefits.title[1], <span className="accent" key="a">{benefits.title[2]}</span>]}
          />
          <Reveal delay={0.18} className="benefits__intro">
            <p className="lead">{benefits.intro}</p>
          </Reveal>
        </div>

        <ul className="benefits__list">
          {benefits.items.map((item, i) => (
            <li className="benefit" key={item.k}>
              <Rule className="benefit__rule" delay={(i % 2) * 0.08} />
              <Reveal delay={(i % 2) * 0.1 + 0.05} y={22} className="benefit__body">
                <span className="label benefit__k">{item.k}</span>
                <h3 className="h3 benefit__title">{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
