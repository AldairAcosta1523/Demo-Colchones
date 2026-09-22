/**
 * Catálogo comercial de Almara.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * DATOS DE DEMOSTRACIÓN. Almara es una marca conceptual: no existe el negocio,
 * de modo que **precios, stock, medidas y plazos son de ejemplo**. Están todos
 * aquí, en un único archivo, para que sustituirlos por los de una tienda real
 * sea cambiar este módulo y nada más. Ningún componente inventa datos por su
 * cuenta ni los calcula a partir de promesas que no podemos cumplir.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type CategoriaId = "colchones" | "almohadas" | "textil" | "bases";

export type Categoria = {
  id: CategoriaId;
  nombre: string;
  /** Texto corto para el megamenú y las cabeceras de la tienda. */
  resumen: string;
  imagen: { src: string; alt: string };
};

export type Variante = {
  id: string;
  nombre: string;
  /** Medida real de la variante; en accesorios puede ser el formato. */
  medida: string;
  precio: number;
  /** Unidades disponibles (demo). 0 = agotada. */
  stock: number;
};

export type Producto = {
  slug: string;
  nombre: string;
  categoria: CategoriaId;
  /** Una línea con lo que diferencia al producto, para la tarjeta. */
  resumen: string;
  descripcion: string;
  /** Solo colchones y almohadas. */
  firmeza?: string;
  altura?: string;
  imagen: { src: string; alt: string };
  /** Segunda imagen para el hover de la tarjeta. */
  imagenHover?: { src: string; alt: string };
  variantes: Variante[];
  beneficios: string[];
  /** Ficha técnica: pares clave/valor. */
  especificaciones: { k: string; v: string }[];
  /** Orden editorial de la casa; se usa como criterio "Recomendado". */
  orden: number;
};

export const MONEDA = "S/";

export const categorias: Categoria[] = [
  {
    id: "colchones",
    nombre: "Colchones",
    resumen: "Tres construcciones, tres firmezas.",
    imagen: { src: "/images/colchon-natura.jpg", alt: "Dormitorio con ropa de cama en tono salvia" },
  },
  {
    id: "almohadas",
    nombre: "Almohadas",
    resumen: "La altura correcta para tu postura.",
    imagen: { src: "/images/almohada-lino.jpg", alt: "Cojines de lino y terciopelo en tonos arena" },
  },
  {
    id: "textil",
    nombre: "Ropa de cama",
    resumen: "Lino lavado y protección diaria.",
    imagen: { src: "/images/sabanas-lino.jpg", alt: "Juego de sábanas de lino a rayas terracota" },
  },
  {
    id: "bases",
    nombre: "Bases",
    resumen: "El soporte que el colchón necesita.",
    imagen: { src: "/images/base-madera.jpg", alt: "Cama con base de madera clara y mesilla" },
  },
];

/** Medidas estándar compartidas por colchones, sábanas y bases. */
const MEDIDAS = {
  plazaYMedia: "120 × 190 cm",
  dosPlazas: "140 × 190 cm",
  queen: "160 × 200 cm",
  king: "180 × 200 cm",
} as const;

export const productos: Producto[] = [
  /* ---------------------------------------------------------------- COLCHONES */
  {
    slug: "esencial",
    nombre: "Esencial",
    categoria: "colchones",
    resumen: "Firmeza media, sensación estable toda la noche",
    descripcion:
      "El punto medio: ni demasiado firme ni demasiado mullido. Pensado para quien cambia de postura durante la noche y quiere notar el mismo apoyo a las tres horas que a las siete.",
    firmeza: "Media",
    altura: "24 cm",
    imagen: {
      src: "/images/colchon-esencial.jpg",
      alt: "Cama con colchón de líneas limpias y ropa de cama blanca en un dormitorio claro",
    },
    imagenHover: { src: "/images/detalle-tejido.jpg", alt: "Detalle del tejido y el acolchado" },
    variantes: [
      { id: "120", nombre: "Plaza y media", medida: MEDIDAS.plazaYMedia, precio: 1290, stock: 8 },
      { id: "140", nombre: "Dos plazas", medida: MEDIDAS.dosPlazas, precio: 1590, stock: 12 },
      { id: "160", nombre: "Queen", medida: MEDIDAS.queen, precio: 1890, stock: 6 },
      { id: "180", nombre: "King", medida: MEDIDAS.king, precio: 2290, stock: 4 },
    ],
    beneficios: [
      "Núcleo de espuma de alta densidad",
      "Acolchado superior de tacto suave",
      "Tejido transpirable con tratamiento antiácaros",
      "Laterales reforzados para sentarse en el borde",
    ],
    especificaciones: [
      { k: "Firmeza", v: "Media" },
      { k: "Altura", v: "24 cm" },
      { k: "Acogida", v: "Moderada" },
      { k: "Núcleo", v: "Espuma de alta densidad" },
      { k: "Tejido", v: "Transpirable, tratamiento antiácaros" },
      { k: "Postura", v: "Boca arriba · boca abajo · mixta" },
    ],
    orden: 1,
  },
  {
    slug: "natura",
    nombre: "Natura",
    categoria: "colchones",
    resumen: "Acogida envolvente y funda de algodón",
    descripcion:
      "Una capa de acogida más generosa y tejidos de origen natural. Para quien duerme de lado y busca que los hombros y las caderas se acomoden sin esfuerzo.",
    firmeza: "Media-suave",
    altura: "27 cm",
    imagen: {
      src: "/images/colchon-natura.jpg",
      alt: "Dormitorio con ropa de cama en tono verde salvia, plantas y luz natural",
    },
    imagenHover: { src: "/images/sabanas-lino.jpg", alt: "Detalle de la ropa de cama de lino" },
    variantes: [
      { id: "120", nombre: "Plaza y media", medida: MEDIDAS.plazaYMedia, precio: 1690, stock: 5 },
      { id: "140", nombre: "Dos plazas", medida: MEDIDAS.dosPlazas, precio: 1990, stock: 9 },
      { id: "160", nombre: "Queen", medida: MEDIDAS.queen, precio: 2390, stock: 7 },
      { id: "180", nombre: "King", medida: MEDIDAS.king, precio: 2790, stock: 3 },
    ],
    beneficios: [
      "Capa de acogida con mayor recorrido",
      "Funda de tejido de algodón",
      "Zonas diferenciadas de apoyo",
      "Acabado lateral en tono salvia",
    ],
    especificaciones: [
      { k: "Firmeza", v: "Media-suave" },
      { k: "Altura", v: "27 cm" },
      { k: "Acogida", v: "Envolvente" },
      { k: "Núcleo", v: "Zonas diferenciadas" },
      { k: "Tejido", v: "Funda de algodón" },
      { k: "Postura", v: "De lado · mixta" },
    ],
    orden: 2,
  },
  {
    slug: "signature",
    nombre: "Signature",
    categoria: "colchones",
    resumen: "Pillow top integrado y tejido de tacto seda",
    descripcion:
      "Nuestra construcción más completa: más capas, más recorrido y un acabado textil cuidado al detalle. La sensación de hotel, en tu propia habitación.",
    firmeza: "Suave-envolvente",
    altura: "31 cm",
    imagen: {
      src: "/images/colchon-signature.jpg",
      alt: "Dormitorio elegante con paneles de madera oscura y cama vestida en tonos neutros",
    },
    imagenHover: { src: "/images/guia-confort.jpg", alt: "Dormitorio cálido con madera y luz suave" },
    variantes: [
      { id: "140", nombre: "Dos plazas", medida: MEDIDAS.dosPlazas, precio: 2390, stock: 6 },
      { id: "160", nombre: "Queen", medida: MEDIDAS.queen, precio: 2790, stock: 4 },
      { id: "180", nombre: "King", medida: MEDIDAS.king, precio: 3290, stock: 2 },
    ],
    beneficios: [
      "Construcción multicapa con núcleo firme",
      "Pillow top integrado",
      "Tejido de alto gramaje con tacto seda",
      "Asas laterales y banda perimetral cosida",
    ],
    especificaciones: [
      { k: "Firmeza", v: "Suave-envolvente" },
      { k: "Altura", v: "31 cm" },
      { k: "Acogida", v: "Pillow top integrado" },
      { k: "Núcleo", v: "Multicapa con base firme" },
      { k: "Tejido", v: "Alto gramaje, tacto seda" },
      { k: "Postura", v: "De lado · mixta" },
    ],
    orden: 3,
  },

  /* --------------------------------------------------------------- ALMOHADAS */
  {
    slug: "almohada-nube",
    nombre: "Almohada Nube",
    categoria: "almohadas",
    resumen: "Viscoelástica, se adapta y vuelve a su forma",
    descripcion:
      "Núcleo viscoelástico que cede con el calor del cuerpo y recupera su forma al levantarte. Para quien nota que la almohada se queda hundida a media noche.",
    firmeza: "Media",
    altura: "14 cm",
    imagen: { src: "/images/almohada-nube.jpg", alt: "Almohada blanca sobre una manta de punto" },
    variantes: [
      { id: "70", nombre: "70 cm", medida: "70 × 40 cm", precio: 159, stock: 24 },
      { id: "90", nombre: "90 cm", medida: "90 × 40 cm", precio: 189, stock: 18 },
    ],
    beneficios: ["Núcleo viscoelástico", "Funda lavable con cremallera", "Altura media, 14 cm", "Tejido transpirable"],
    especificaciones: [
      { k: "Relleno", v: "Viscoelástica en bloque" },
      { k: "Altura", v: "14 cm" },
      { k: "Firmeza", v: "Media" },
      { k: "Funda", v: "Lavable a 30°" },
    ],
    orden: 4,
  },
  {
    slug: "almohada-lino",
    nombre: "Almohada Lino",
    categoria: "almohadas",
    resumen: "Fibra suelta y funda de lino lavado",
    descripcion:
      "Relleno de fibra que se puede ahuecar y funda de lino lavado. La opción mullida, para quien prefiere moldear la almohada cada noche.",
    firmeza: "Suave",
    altura: "12 cm",
    imagen: { src: "/images/almohada-lino.jpg", alt: "Cojines de lino y terciopelo en tonos arena sobre madera" },
    variantes: [
      { id: "70", nombre: "70 cm", medida: "70 × 40 cm", precio: 119, stock: 30 },
      { id: "90", nombre: "90 cm", medida: "90 × 40 cm", precio: 139, stock: 0 },
    ],
    beneficios: ["Relleno de fibra ahuecable", "Funda de lino lavado", "Altura baja, 12 cm", "Tacto fresco"],
    especificaciones: [
      { k: "Relleno", v: "Fibra siliconada" },
      { k: "Altura", v: "12 cm" },
      { k: "Firmeza", v: "Suave" },
      { k: "Funda", v: "Lino lavado" },
    ],
    orden: 5,
  },

  /* ------------------------------------------------------------------ TEXTIL */
  {
    slug: "sabanas-lino",
    nombre: "Juego de sábanas de lino",
    categoria: "textil",
    resumen: "Lino lavado a rayas, más suave con cada lavado",
    descripcion:
      "Bajera, encimera y dos fundas en lino lavado. Llega ya suavizado, así que no hay que esperar meses de uso para que deje de estar rígido.",
    imagen: { src: "/images/sabanas-lino.jpg", alt: "Cama vestida con sábanas de lino a rayas terracota y arena" },
    imagenHover: { src: "/images/immersive-dormitorio.jpg", alt: "Detalle del lino sobre cabecero de roble" },
    variantes: [
      { id: "140", nombre: "Dos plazas", medida: MEDIDAS.dosPlazas, precio: 349, stock: 14 },
      { id: "160", nombre: "Queen", medida: MEDIDAS.queen, precio: 399, stock: 10 },
      { id: "180", nombre: "King", medida: MEDIDAS.king, precio: 449, stock: 6 },
    ],
    beneficios: ["Lino lavado, listo para usar", "Bajera, encimera y dos fundas", "Rayas terracota sobre arena", "Apto para secadora"],
    especificaciones: [
      { k: "Composición", v: "100 % lino lavado" },
      { k: "Incluye", v: "Bajera, encimera, 2 fundas" },
      { k: "Lavado", v: "30°, admite secadora" },
      { k: "Color", v: "Rayas terracota / arena" },
    ],
    orden: 6,
  },
  {
    slug: "protector-impermeable",
    nombre: "Protector impermeable",
    categoria: "textil",
    resumen: "Capa transpirable que no cruje al moverte",
    descripcion:
      "Rizo de algodón con membrana impermeable por debajo. Protege el colchón sin la sensación plastificada ni el ruido de los protectores baratos.",
    imagen: { src: "/images/protector-impermeable.jpg", alt: "Textiles de cama doblados y apilados" },
    variantes: [
      { id: "120", nombre: "Plaza y media", medida: MEDIDAS.plazaYMedia, precio: 129, stock: 20 },
      { id: "140", nombre: "Dos plazas", medida: MEDIDAS.dosPlazas, precio: 149, stock: 16 },
      { id: "160", nombre: "Queen", medida: MEDIDAS.queen, precio: 169, stock: 11 },
      { id: "180", nombre: "King", medida: MEDIDAS.king, precio: 189, stock: 8 },
    ],
    beneficios: ["Rizo de algodón transpirable", "Membrana impermeable silenciosa", "Falda ajustable hasta 30 cm", "Lavable a 60°"],
    especificaciones: [
      { k: "Cara superior", v: "Rizo de algodón" },
      { k: "Membrana", v: "Impermeable y transpirable" },
      { k: "Altura de falda", v: "Hasta 30 cm" },
      { k: "Lavado", v: "60°" },
    ],
    orden: 7,
  },

  /* ------------------------------------------------------------------- BASES */
  {
    slug: "base-madera",
    nombre: "Base de madera",
    categoria: "bases",
    resumen: "Somier de láminas, ventilación por debajo",
    descripcion:
      "Estructura de madera con láminas flexibles. Deja respirar al colchón por abajo, que es donde se acumula la humedad de la noche.",
    imagen: { src: "/images/base-madera.jpg", alt: "Dormitorio con cama de madera clara, manta gris y lámpara" },
    variantes: [
      { id: "120", nombre: "Plaza y media", medida: MEDIDAS.plazaYMedia, precio: 490, stock: 7 },
      { id: "140", nombre: "Dos plazas", medida: MEDIDAS.dosPlazas, precio: 590, stock: 9 },
      { id: "160", nombre: "Queen", medida: MEDIDAS.queen, precio: 690, stock: 5 },
      { id: "180", nombre: "King", medida: MEDIDAS.king, precio: 790, stock: 3 },
    ],
    beneficios: ["Láminas de madera flexibles", "Ventilación inferior", "Montaje sin herramientas especiales", "Patas de 25 cm incluidas"],
    especificaciones: [
      { k: "Estructura", v: "Madera maciza" },
      { k: "Láminas", v: "Flexibles, ancho 6 cm" },
      { k: "Altura con patas", v: "25 cm" },
      { k: "Montaje", v: "Requiere ensamblaje" },
    ],
    orden: 8,
  },
  {
    slug: "base-tapizada",
    nombre: "Base tapizada",
    categoria: "bases",
    resumen: "Cabecero acolchado y base firme y continua",
    descripcion:
      "Superficie continua tapizada, sin láminas. Da un apoyo más firme al colchón y suma cabecero, así que la cama queda resuelta de una vez.",
    imagen: { src: "/images/base-tapizada.jpg", alt: "Dormitorio con base tapizada y cabecero acolchado oscuro" },
    variantes: [
      { id: "140", nombre: "Dos plazas", medida: MEDIDAS.dosPlazas, precio: 890, stock: 4 },
      { id: "160", nombre: "Queen", medida: MEDIDAS.queen, precio: 990, stock: 3 },
      { id: "180", nombre: "King", medida: MEDIDAS.king, precio: 1190, stock: 0 },
    ],
    beneficios: ["Superficie continua, apoyo firme", "Cabecero acolchado incluido", "Tejido de tacto suave", "Patas de 25 cm incluidas"],
    especificaciones: [
      { k: "Superficie", v: "Continua tapizada" },
      { k: "Cabecero", v: "Incluido, 110 cm" },
      { k: "Altura con patas", v: "25 cm" },
      { k: "Tapizado", v: "Tejido de poliéster" },
    ],
    orden: 9,
  },
];

/* --------------------------------------------------------------- Utilidades */

export const productoPorSlug = (slug: string) => productos.find((p) => p.slug === slug);
export const productosDeCategoria = (id: CategoriaId) => productos.filter((p) => p.categoria === id);
export const categoriaPorId = (id: CategoriaId) => categorias.find((c) => c.id === id)!;

/** Precio más bajo del producto: es el que se enseña como "desde" en las tarjetas. */
export const precioDesde = (p: Producto) => Math.min(...p.variantes.map((v) => v.precio));

/** Un producto está agotado solo si lo están todas sus variantes. */
export const agotado = (p: Producto) => p.variantes.every((v) => v.stock === 0);

/** Formato de precio en soles, sin decimales (los precios del catálogo son enteros). */
export const precio = (valor: number) =>
  `${MONEDA} ${valor.toLocaleString("es-PE", { maximumFractionDigits: 0 })}`;

/**
 * Condiciones de envío. También son de demostración: no hay transportista
 * contratado ni cobertura real que consultar.
 */
export const envio = {
  gratisDesde: 500,
  costo: 25,
  zona: "Lima Metropolitana",
  plazo: "2 a 5 días hábiles",
  nota: "Condiciones de ejemplo: no hay transportista contratado.",
};

/** Coste de envío de un subtotal dado. */
export const costoEnvio = (subtotal: number) => (subtotal >= envio.gratisDesde || subtotal === 0 ? 0 : envio.costo);
