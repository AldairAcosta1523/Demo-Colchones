import type { Metadata } from "next";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import { faq } from "@/data/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Firmeza, medidas, cuidados y condiciones de compra: lo que conviene saber antes de elegir colchón.",
  alternates: { canonical: `${SITE_URL}/faq/` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Faq comoTitulo1 />
      <FinalCta
        headline={["¿Sigues con", "dudas sobre", "la firmeza?"]}
        sub="Cuéntanos cómo duermes y te decimos qué construcción se acerca más."
        primary={{ label: "Escríbenos", href: "/contacto/" }}
        secondary={{ label: "Ver la tienda", href: "/tienda/" }}
      />
    </>
  );
}
