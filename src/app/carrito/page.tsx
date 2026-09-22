import type { Metadata } from "next";
import CartPage from "@/components/shop/CartPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisa los productos que has añadido antes de finalizar la compra.",
  alternates: { canonical: `${SITE_URL}/carrito/` },
  robots: { index: false, follow: true },
};

export default function CarritoPage() {
  return (
    <section className="carrito" data-nav-theme="light">
      <div className="container">
        <h1 className="h2 carrito__titulo">Tu carrito</h1>
        <CartPage />
      </div>
    </section>
  );
}
