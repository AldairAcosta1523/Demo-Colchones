import type { Metadata } from "next";
import About from "@/components/sections/About";
import Comfort from "@/components/sections/Comfort";
import FinalCta from "@/components/sections/FinalCta";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Almara trabaja con pocas referencias y las explica bien: tres construcciones, tres sensaciones y un lenguaje claro sobre firmeza, materiales y medidas.",
  alternates: { canonical: `${SITE_URL}/nosotros/` },
};

export default function NosotrosPage() {
  return (
    <>
      <About />
      <Comfort />
      <FinalCta
        headline={["Empieza por", "el colchón,", "sigue por la cama."]}
        sub="Tres construcciones y lo necesario para completarlas. Nada de catálogo infinito."
        primary={{ label: "Ver la tienda", href: "/tienda/" }}
        secondary={{ label: "Escríbenos", href: "/contacto/" }}
      />
    </>
  );
}
