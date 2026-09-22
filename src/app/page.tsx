import Hero from "@/components/sections/Hero";
import Categorias from "@/components/sections/Categorias";
import Collection from "@/components/sections/Collection";
import Immersive from "@/components/sections/Immersive";
import Comfort from "@/components/sections/Comfort";
import ComfortLab from "@/components/lab/ComfortLab";
import CompletaTuCama from "@/components/sections/CompletaTuCama";
import Guide from "@/components/sections/Guide";
import Comparativa from "@/components/sections/Comparativa";
import Promesas from "@/components/sections/Promesas";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

/**
 * Home.
 *
 * Alterna bloques editoriales (colección, materiales, 3D) con bloques comerciales (categorías,
 * complementos con precio, comparativa, condiciones). La cabecera, el pie y el carrito viven en
 * el layout, así que aquí solo está el contenido de la página.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Categorias />
      <Collection />
      <Immersive />
      <Comfort />
      <ComfortLab />
      <CompletaTuCama />
      <Guide />
      <Comparativa />
      <Promesas />
      <Faq />
      <FinalCta />
    </>
  );
}
