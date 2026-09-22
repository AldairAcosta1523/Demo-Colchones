/**
 * Contenido editorial de cada colchón: lo que la ficha cuenta más allá del precio.
 * Los datos comerciales (precio, variantes, stock) viven en `catalog.ts`.
 */
import type { Model } from "./content";

export const modelSlugs: Record<Model["id"], string> = {
  esencial: "esencial",
  natura: "natura",
  signature: "signature",
};

export const modelUrl = (id: Model["id"]) => `/producto/${modelSlugs[id]}/`;

export type ModelPage = {
  id: Model["id"];
  slug: string;
  seo: { title: string; description: string };
  /** Frase de apertura de la página, dividida en líneas editoriales */
  intro: string;
  /** Ficha técnica: pares clave/valor */
  spec: { k: string; v: string }[];
  /** Construcción por capas, de la superficie al soporte */
  layers: { n: string; title: string; text: string }[];
  /** Para quién está pensado / cuándo conviene otro modelo */
  fit: { forWho: string; sleepers: string; alternative: string };
  /** Cuidados del modelo */
  care: string[];
  faqIndexes: number[];
};

export const modelPages: ModelPage[] = [
  {
    id: "esencial",
    slug: modelSlugs.esencial,
    seo: {
      title: "Colchón Esencial · firmeza media | Almara",
      description:
        "Esencial es el colchón de firmeza media de Almara: núcleo de alta densidad, acolchado de tacto suave y laterales reforzados. Comodidad equilibrada para todos los días.",
    },
    intro: "Comodidad equilibrada, noche tras noche.",
    spec: [
      { k: "Firmeza", v: "Media" },
      { k: "Altura", v: "24 cm" },
      { k: "Acogida", v: "Moderada" },
      { k: "Tejido", v: "Transpirable, tratamiento antiácaros" },
      { k: "Postura", v: "Boca arriba · boca abajo · mixta" },
      { k: "Medidas", v: "Plaza y media · dos plazas · queen · king" },
    ],
    layers: [
      { n: "01", title: "Tejido superior", text: "Superficie transpirable de tacto seco que ayuda a regular la humedad durante la noche." },
      { n: "02", title: "Acolchado de acogida", text: "Una capa contenida que suaviza el primer contacto sin restar estabilidad al conjunto." },
      { n: "03", title: "Núcleo de alta densidad", text: "El soporte principal: reparte el peso y mantiene la columna alineada al cambiar de postura." },
      { n: "04", title: "Perímetro reforzado", text: "Laterales firmes para sentarse en el borde y para que el colchón conserve su forma." },
    ],
    fit: {
      forWho: "Quien busca una sensación estable y predecible, sin hundirse ni notar el colchón demasiado duro.",
      sleepers: "Especialmente cómodo boca arriba, boca abajo o cambiando de postura durante la noche.",
      alternative: "Si duermes de lado y notas presión en el hombro, Natura ofrece una acogida más envolvente.",
    },
    care: [
      "Airea la habitación antes de vestir la cama",
      "Gira el colchón cabeza-pies cada tres o cuatro meses",
      "Utiliza un protector lavable",
      "Apóyalo sobre una base firme y nivelada",
    ],
    faqIndexes: [0, 1, 2, 3],
  },
  {
    id: "natura",
    slug: modelSlugs.natura,
    seo: {
      title: "Colchón Natura · firmeza media-suave | Almara",
      description:
        "Natura es el colchón media-suave de Almara: acogida envolvente, funda de algodón y zonas diferenciadas de apoyo. Pensado para quien duerme de lado.",
    },
    intro: "Suavidad envolvente, sensación natural.",
    spec: [
      { k: "Firmeza", v: "Media-suave" },
      { k: "Altura", v: "27 cm" },
      { k: "Acogida", v: "Envolvente" },
      { k: "Tejido", v: "Funda de algodón" },
      { k: "Postura", v: "De lado · mixta" },
      { k: "Medidas", v: "Plaza y media · dos plazas · queen · king" },
    ],
    layers: [
      { n: "01", title: "Funda de algodón", text: "Tejido de origen natural, agradable al tacto y fácil de mantener limpio con un protector." },
      { n: "02", title: "Acogida de mayor recorrido", text: "Una capa más generosa que permite que hombros y caderas encuentren su sitio sin esfuerzo." },
      { n: "03", title: "Zonas diferenciadas", text: "El soporte varía a lo largo del colchón para acompañar mejor la zona lumbar." },
      { n: "04", title: "Núcleo firme", text: "Debajo de la suavidad, una base que sostiene y evita que el cuerpo se hunda de más." },
    ],
    fit: {
      forWho: "Quien duerme de lado o quiere una sensación más mullida sin renunciar al soporte.",
      sleepers: "De lado, con presión habitual en hombro o cadera.",
      alternative: "Si prefieres una superficie más estable al cambiar de postura, Esencial es el punto medio.",
    },
    care: [
      "Airea la habitación antes de vestir la cama",
      "Gira el colchón cabeza-pies cada tres o cuatro meses",
      "Usa protector para preservar la funda de algodón",
      "Evita doblarlo o apoyarlo sobre superficies irregulares",
    ],
    faqIndexes: [0, 2, 1, 3],
  },
  {
    id: "signature",
    slug: modelSlugs.signature,
    seo: {
      title: "Colchón Signature · pillow top | Almara",
      description:
        "Signature es la construcción más completa de Almara: multicapa con núcleo firme, pillow top integrado y tejido de tacto seda. Confort superior en casa.",
    },
    intro: "La sensación de hotel, en tu habitación.",
    spec: [
      { k: "Firmeza", v: "Suave-envolvente" },
      { k: "Altura", v: "31 cm" },
      { k: "Acogida", v: "Pillow top integrado" },
      { k: "Tejido", v: "Alta gramaje, tacto seda" },
      { k: "Postura", v: "De lado · mixta" },
      { k: "Medidas", v: "Dos plazas · queen · king" },
    ],
    layers: [
      { n: "01", title: "Pillow top integrado", text: "Una capa cosida al conjunto que amortigua el primer contacto y da la sensación de superficie mullida." },
      { n: "02", title: "Tejido de tacto seda", text: "Mayor gramaje y acabado suave, con banda perimetral cosida y asas laterales." },
      { n: "03", title: "Capas intermedias", text: "Varias densidades trabajando juntas para repartir la presión de forma progresiva." },
      { n: "04", title: "Núcleo firme", text: "El soporte de fondo, dimensionado para sostener la construcción completa sin perder altura." },
    ],
    fit: {
      forWho: "Quien busca la construcción más completa y una superficie claramente mullida.",
      sleepers: "De lado o mixta, con preferencia por camas altas y acabados cuidados.",
      alternative: "Si prefieres notar más el soporte y menos el acolchado, Esencial es la opción más firme.",
    },
    care: [
      "Airea la habitación antes de vestir la cama",
      "Gira el colchón cabeza-pies cada tres o cuatro meses",
      "No lo voltees: el pillow top va en la cara superior",
      "Usa las asas laterales solo para ajustar su posición, no para cargarlo",
    ],
    faqIndexes: [2, 0, 3, 1],
  },
];

export const getModelPage = (slug: string) => modelPages.find((p) => p.slug === slug);
