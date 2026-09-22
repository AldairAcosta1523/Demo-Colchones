"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { categorias, productos, precio, precioDesde } from "@/data/catalog";
import { contact } from "@/data/content";
import { useCarrito } from "@/lib/cart";
import Wordmark from "@/components/core/Wordmark";
import { scrollToHash } from "@/lib/SmoothScroll";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ENLACES = [
  { label: "Tienda", href: "/tienda/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Preguntas", href: "/faq/" },
  { label: "Contacto", href: "/contacto/" },
];

/** Los tres colchones abren el megamenú; el resto de categorías van como accesos. */
const DESTACADOS = productos.filter((p) => p.categoria === "colchones");

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const entered = useRef(false);
  const closeTimer = useRef<number | null>(null);
  const openedByPointer = useRef(false);
  const pathname = usePathname();
  const esHome = pathname === "/";
  const { unidades, abrir, listo } = useCarrito();

  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [consulta, setConsulta] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // La barra solo puede ser transparente sobre un hero; en el resto de rutas va sólida.
  const sobreHero = esHome;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      let last = 0;
      let wasScrolled = false;
      let wasHidden = false;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          const isScrolled = y > 24;
          if (isScrolled !== wasScrolled) {
            wasScrolled = isScrolled;
            setScrolled(isScrolled);
          }
          const isHidden = y > last && y > 160;
          if (isHidden !== wasHidden) {
            wasHidden = isHidden;
            setHidden(isHidden);
            if (isHidden) setMega(false);
          }
          last = y;
        },
      });

      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
      sections.forEach((s) => {
        ScrollTrigger.create({
          trigger: s,
          start: "top 70px",
          end: "bottom 70px",
          onToggle: (self) => {
            if (self.isActive) setTheme(s.dataset.navTheme === "dark" ? "dark" : "light");
          },
        });
      });

      if (entered.current) return;
      const items = el.querySelectorAll(".nav__enter");
      gsap.set(items, { y: -16, opacity: 0 });
      const play = () => {
        entered.current = true;
        gsap.to(items, { y: 0, opacity: 1, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.15 });
      };
      if (document.documentElement.classList.contains("is-ready")) play();
      else window.addEventListener("almara:ready", play, { once: true });
      return () => window.removeEventListener("almara:ready", play);
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true }
  );

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  // Al cambiar de ruta se cierra todo lo que estuviera desplegado.
  useEffect(() => {
    setOpen(false);
    setMega(false);
    setBuscando(false);
  }, [pathname]);

  const megaEnter = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openedByPointer.current = true;
    setMega(true);
  };
  const megaLeave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 140);
  };

  /** Anclas de la home: scroll suave si existe, si no navegación normal. */
  const irAncla = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    if (!document.querySelector(href)) {
      window.location.assign(`/${href}`);
      return;
    }
    setTimeout(() => scrollToHash(href), open ? 120 : 0);
    history.replaceState(null, "", href);
  };

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    const q = consulta.trim();
    setBuscando(false);
    setOpen(false);
    window.location.assign(q ? `/tienda/?q=${encodeURIComponent(q)}` : "/tienda/");
  };

  const cls = [
    "nav",
    `nav--${theme}`,
    !sobreHero && "nav--solida",
    open && "is-open",
    scrolled && "is-scrolled",
    hidden && !open && "is-hidden",
    mega && "is-mega-open",
    buscando && "is-buscando",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header ref={ref} className={cls} onMouseLeave={megaLeave}>
      <div className="nav__bar">
        <nav className="nav__links" aria-label="Principal">
          <div className="nav__dd nav__enter" onMouseEnter={megaEnter}>
            <Link
              href="/tienda/?categoria=colchones"
              className="nav__link nav__dd-btn"
              aria-expanded={mega}
              onFocus={megaEnter}
              onKeyDown={() => (openedByPointer.current = false)}
            >
              <span className="link-underline">Colchones</span>
              <ChevronDown className="nav__dd-caret" size={12} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>

          {ENLACES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav__link nav__enter"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span className="link-underline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <Link href="/" className="nav__logo nav__enter" aria-label="Almara, ir al inicio">
          <Wordmark />
        </Link>

        <div className="nav__acciones nav__enter">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="nav__icono"
            onClick={() => setBuscando((v) => !v)}
            aria-expanded={buscando}
            aria-label="Buscar productos"
          >
            <Search className="nav__icono-svg" size={18} strokeWidth={1.6} aria-hidden="true" />
            <span className="nav__icono-texto link-underline" aria-hidden="true">
              Buscar
            </span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="nav__icono nav__carrito"
            onClick={abrir}
            aria-label={`Abrir el carrito${listo && unidades ? `, ${unidades} artículos` : ""}`}
          >
            <ShoppingBag className="nav__icono-svg" size={18} strokeWidth={1.6} aria-hidden="true" />
            <span className="nav__icono-texto link-underline" aria-hidden="true">
              Carrito
            </span>
            <Badge className={`nav__cuenta${listo && unidades > 0 ? " is-lleno" : ""}`} aria-hidden="true">
              {listo ? unidades : 0}
            </Badge>
          </Button>
          <button
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Buscador desplegable */}
      {buscando && (
        <form className="nav__buscador" onSubmit={buscar} role="search">
          <div className="container nav__buscador-inner">
            <Search size={18} strokeWidth={1.6} aria-hidden="true" />
            <Input
              autoFocus
              type="search"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Buscar colchones, almohadas, lino…"
              aria-label="Buscar productos"
            />
            <Button type="submit" className="nav__buscador-enviar">
              Buscar
            </Button>
          </div>
        </form>
      )}

      {/* Megamenú de categorías */}
      <div className={`mega${mega ? " is-open" : ""}`} onMouseEnter={megaEnter} aria-hidden={!mega}>
        <div className="container mega__grid">
          <div className="mega__col">
            <h2 className="label mega__titulo">Colchones</h2>
            <ul className="mega__lista">
              {DESTACADOS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/producto/${p.slug}/`} className="mega__producto" tabIndex={mega ? 0 : -1}>
                    <span className="mega__producto-nombre">{p.nombre}</span>
                    <span className="mega__producto-nota">{p.firmeza}</span>
                    <span className="mega__producto-precio">desde {precio(precioDesde(p))}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mega__col">
            <h2 className="label mega__titulo">Completa tu cama</h2>
            <ul className="mega__lista">
              {categorias
                .filter((c) => c.id !== "colchones")
                .map((c) => (
                  <li key={c.id}>
                    <Link href={`/tienda/?categoria=${c.id}`} className="mega__categoria" tabIndex={mega ? 0 : -1}>
                      <span className="mega__categoria-nombre">{c.nombre}</span>
                      <span className="mega__categoria-nota">{c.resumen}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <Link href="/tienda/" className="mega__todo" tabIndex={mega ? 0 : -1}>
            <span className="mega__todo-texto">Ver toda la tienda</span>
            <span className="mega__todo-nota">{productos.length} productos</span>
          </Link>
        </div>
      </div>

      {/* Menú móvil */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent id="mobile-menu" side="top" className="nav__menu">
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <SheetDescription className="sr-only">Navegación principal de Almara</SheetDescription>
          <div className="nav__menu-inner">
            <form className="nav__menu-buscar" onSubmit={buscar} role="search">
              <Search size={16} strokeWidth={1.7} aria-hidden="true" />
              <Input
                type="search"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Buscar productos"
                aria-label="Buscar productos"
              />
            </form>

            <p className="label nav__menu-label" style={{ ["--d" as string]: "60ms" }}>
              Colchones
            </p>
            {DESTACADOS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/producto/${p.slug}/`}
                className="nav__menu-link nav__menu-link--model"
                style={{ ["--d" as string]: `${100 + i * 45}ms` }}
              >
                <span className="nav__menu-index">0{i + 1}</span>
                {p.nombre}
              </Link>
            ))}

            <p className="label nav__menu-label" style={{ ["--d" as string]: "250ms" }}>
              Tienda
            </p>
            {categorias
              .filter((c) => c.id !== "colchones")
              .map((c, i) => (
                <Link
                  key={c.id}
                  href={`/tienda/?categoria=${c.id}`}
                  className="nav__menu-link nav__menu-link--model"
                  style={{ ["--d" as string]: `${280 + i * 45}ms` }}
                >
                  <span className="nav__menu-index">0{i + 4}</span>
                  {c.nombre}
                </Link>
              ))}

            <p className="label nav__menu-label" style={{ ["--d" as string]: "420ms" }}>
              Almara
            </p>
            {ENLACES.filter((e) => e.href !== "/tienda/").map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav__menu-link"
                style={{ ["--d" as string]: `${450 + i * 45}ms` }}
                onClick={(e) => irAncla(e, item.href)}
              >
                {item.label}
              </Link>
            ))}

            <div className="nav__menu-pie" style={{ ["--d" as string]: "620ms" }}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{contact.hours}</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
