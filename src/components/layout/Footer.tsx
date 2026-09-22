import Link from "next/link";
import { contact, footer, models, site } from "@/data/content";
import { modelUrl } from "@/data/models";
import { categorias } from "@/data/catalog";
import { listaPoliticas } from "@/data/tienda";
import SplitLines from "@/components/core/SplitLines";

/** Pie diseñado, no añadido: el wordmark funciona como remate tipográfico de la página. */
export default function Footer() {
  return (
    <footer className="footer" data-nav-theme="dark">
      <div className="container footer__grid">
        <div className="footer__intro">
          <p className="footer__claim">{site.tagline}</p>
          <a className="footer__mail link-underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>

        <div className="footer__col">
          <h2 className="label footer__title">Colchones</h2>
          <ul>
            {models.map((m) => (
              <li key={m.id}>
                <Link href={modelUrl(m.id)} className="link-underline">
                  {m.name}
                </Link>
              </li>
            ))}
            {categorias
              .filter((c) => c.id !== "colchones")
              .map((c) => (
                <li key={c.id}>
                  <Link href={`/tienda/?categoria=${c.id}`} className="link-underline">
                    {c.nombre}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="label footer__title">Explorar</h2>
          <ul>
            {footer.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="label footer__title">Condiciones</h2>
          <ul>
            {listaPoliticas.map((p) => (
              <li key={p.slug}>
                <Link href={`/politicas/${p.slug}/`} className="link-underline">
                  {p.titulo}
                </Link>
              </li>
            ))}
            <li className="footer__muted">{contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__markline">
        <SplitLines as="p" className="footer__mark" lineClassName="footer__mark-line" start="top 96%" lines={["Almara"]} />
      </div>

      <div className="container footer__bottom">
        <span>{footer.copyright}</span>
        <span className="footer__demo">{site.demoNotice}</span>
      </div>
    </footer>
  );
}
