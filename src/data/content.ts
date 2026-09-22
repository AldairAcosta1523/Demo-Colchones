/**
 * Única fuente de contenido de Almara.
 *
 * Almara es una marca conceptual creada para una demo de diseño y desarrollo web.
 * El copy es comercial pero deliberadamente verificable: no incluye certificaciones,
 * porcentajes clínicos, garantías, años de experiencia ni reseñas inventadas.
 */

export const site = {
  name: "Almara",
  legalName: "Almara",
  tagline: "Colchones, descanso y bienestar",
  title: "Almara | Colchones para descansar mejor",
  description:
    "Almara diseña colchones que equilibran confort, soporte y suavidad. Descubre la colección Esencial, Natura y Signature, y encuentra el descanso que tu cuerpo necesita.",
  /** Aviso discreto: este sitio es una pieza de portafolio, no una tienda real. */
  demoNotice: "Proyecto demostrativo de diseño y desarrollo web. Marca conceptual.",
};

export const contact = {
  /** Dominio .example (RFC 2606): reservado para documentación, nunca es un buzón real. */
  email: "hola@almara.example",
  address: "Lima · Perú",
  hours: "Lunes a sábado · 10:00 a. m. – 8:00 p. m.",
  note: "Datos de contacto de demostración.",
};

export const nav = [
  { label: "Nuestro confort", href: "#confort" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Preguntas frecuentes", href: "#faq" },
];

export const hero = {
  eyebrow: "Diseñados para descansar mejor",
  lines: ["El descanso que", "tu cuerpo", "merece."],
  caption: "Lino lavado, madera y luz de mañana",
  description:
    "Descubre colchones pensados para acompañar tus noches con el equilibrio perfecto entre confort, soporte y suavidad.",
  primaryCta: { label: "Explorar colchones", href: "/tienda/?categoria=colchones" },
  secondaryCta: { label: "Descubrir la tecnología", href: "#lab" },
  signals: ["Tres firmezas", "30 noches de prueba", "Envío gratis en Lima"],
  image: {
    src: "/images/hero-dormitorio.jpg",
    alt: "Dormitorio luminoso con una cama de base de madera, edredón de lino claro y cojines en tonos arena",
  },
};

export const benefits = {
  eyebrow: "Por qué Almara",
  title: ["Descansar bien", "no debería", "ser complicado."],
  intro:
    "Cada colchón nace de una idea simple: sostener el cuerpo con firmeza y recibirlo con suavidad. Lo demás —los tejidos, las capas, las medidas— está al servicio de esa noche.",
  items: [
    {
      k: "01",
      title: "Confort para cada noche",
      text: "Capas de acolchado que reciben el cuerpo sin hundirlo, para que la postura cambie sin despertarte.",
    },
    {
      k: "02",
      title: "Materiales seleccionados",
      text: "Tejidos transpirables y espumas de distinta densidad, elegidos por cómo se sienten después de varias horas.",
    },
    {
      k: "03",
      title: "Soporte y bienestar",
      text: "Un núcleo firme que mantiene la columna alineada y reparte el peso en los puntos de apoyo.",
    },
    {
      k: "04",
      title: "Diseños que se adaptan a ti",
      text: "Tres niveles de firmeza y medidas estándar para que el colchón se ajuste a tu cama y a tu forma de dormir.",
    },
  ],
};

export type Model = {
  index: string;
  id: "esencial" | "natura" | "signature";
  name: string;
  short: string;
  /** Etiqueta de firmeza visible en tarjeta y ficha */
  firmness: "Media" | "Media-suave" | "Suave-envolvente";
  height: string;
  description: string;
  features: string[];
  image: { src: string; alt: string };
  cta: string;
};

export const models: Model[] = [
  {
    index: "01",
    id: "esencial",
    name: "Esencial",
    short: "Comodidad equilibrada para todos los días",
    firmness: "Media",
    height: "24 cm",
    description:
      "El punto medio: ni demasiado firme ni demasiado mullido. Pensado para quien cambia de postura durante la noche y quiere una sensación estable de principio a fin.",
    features: [
      "Núcleo de espuma de alta densidad",
      "Acolchado superior de tacto suave",
      "Tejido transpirable con tratamiento antiácaros",
      "Laterales reforzados para sentarse en el borde",
    ],
    image: {
      src: "/images/colchon-esencial.jpg",
      alt: "Cama con colchón de líneas limpias y ropa de cama blanca en un dormitorio claro",
    },
    cta: "Ver Esencial",
  },
  {
    index: "02",
    id: "natura",
    name: "Natura",
    short: "Suavidad envolvente y sensación de descanso natural",
    firmness: "Media-suave",
    height: "27 cm",
    description:
      "Una capa de acogida más generosa y tejidos de origen natural. Para quien duerme de lado y busca que los hombros y las caderas se acomoden sin esfuerzo.",
    features: [
      "Capa de acogida con mayor recorrido",
      "Funda de tejido de algodón",
      "Zonas diferenciadas de apoyo",
      "Acabado lateral en tono salvia",
    ],
    image: {
      src: "/images/colchon-natura.jpg",
      alt: "Dormitorio con ropa de cama en tono verde salvia, plantas y luz natural",
    },
    cta: "Ver Natura",
  },
  {
    index: "03",
    id: "signature",
    name: "Signature",
    short: "Confort superior con una experiencia más sofisticada",
    firmness: "Suave-envolvente",
    height: "31 cm",
    description:
      "Nuestra construcción más completa: más capas, más recorrido y un acabado textil cuidado al detalle. La sensación de hotel, en tu propia habitación.",
    features: [
      "Construcción multicapa con núcleo firme",
      "Pillow top integrado",
      "Tejido de alta gramaje con tacto seda",
      "Asas laterales y banda perimetral cosida",
    ],
    image: {
      src: "/images/colchon-signature.jpg",
      alt: "Dormitorio elegante con paneles de madera oscura, cama vestida en tonos neutros y luz cálida",
    },
    cta: "Ver Signature",
  },
];

export const collection = {
  eyebrow: "La colección",
  title: ["Tres colchones,", "tres formas", "de descansar."],
  intro:
    "Misma filosofía de construcción, distinta sensación al acostarse. Elige por firmeza, no por nombre.",
};

export const immersive = {
  eyebrow: "The Art of Rest",
  title: ["El lujo de", "sentirte en casa."],
  note: "Lino lavado, madera clara y un colchón que sostiene. El descanso no necesita mucho más.",
  paragraphs: [
    "En un dormitorio no hay nada que demostrar. Una sábana que ya se ha lavado muchas veces, la madera clara del cabecero, la ventana entreabierta. Lo que hace buena una habitación casi nunca es lo que se compró último.",
    "El colchón es la pieza que no se ve. Su trabajo es sostenerte ocho horas sin que pienses en él ni una sola vez; si lo consigue, todo lo demás —la luz, el lino, el silencio— hace el resto.",
  ],
  notes: [
    { k: "La mañana", text: "Abrir la ventana antes de hacer la cama. El colchón también necesita aire." },
    { k: "El tacto", text: "Lino que ya no está nuevo. Se nota en la piel, no en la etiqueta." },
    { k: "La noche", text: "Un colchón que sostiene sin hacerse notar. Si piensas en él, algo falla." },
  ],
  image: {
    src: "/images/immersive-dormitorio.jpg",
    alt: "Detalle de una cama con cabecero de roble, funda de lino terracota y ropa de cama a rayas color arena",
  },
  imageAlt: {
    src: "/images/nosotros.jpg",
    alt: "Rincón de dormitorio con cabecero de fibras naturales, textiles en tonos tierra y cestas de mimbre",
    caption: "Fibras naturales, tonos tierra",
  },
};

export const comfort = {
  eyebrow: "Nuestro confort",
  title: ["Cada detalle cuenta", "cuando se trata", "de descansar."],
  paragraphs: [
    "Un colchón se juzga en la séptima hora, no en los primeros treinta segundos. Por eso trabajamos capa por capa: el núcleo sostiene, la acogida recibe y el tejido regula la temperatura mientras duermes.",
    "Elegimos materiales por cómo envejecen, no solo por cómo se sienten el primer día. Un tejido que respira, una espuma que recupera su forma y una costura que aguanta el uso diario valen más que cualquier adjetivo.",
  ],
  layers: [
    { k: "Tejido", text: "Superficie transpirable que regula la humedad y el calor." },
    { k: "Acogida", text: "Capas de acolchado que amortiguan hombros y caderas." },
    { k: "Núcleo", text: "Base firme que mantiene la columna alineada." },
    { k: "Perímetro", text: "Borde reforzado para que el colchón conserve su forma." },
  ],
  image: {
    src: "/images/detalle-tejido.jpg",
    alt: "Detalle de la ropa de cama: edredón de lino, cojines de terciopelo en tonos arena y base de madera",
  },
};

export const lab = {
  eyebrow: "Almara Comfort Lab",
  title: ["Gíralo, ábrelo,", "míralo por dentro."],
  intro:
    "Un colchón se entiende mejor cuando se puede recorrer. Arrastra para girarlo, cambia de vista o abre sus capas para ver qué sostiene y qué recibe.",
  hint: "Arrastra para girar",
  views: [
    { id: "perspective", label: "Perspectiva" },
    { id: "front", label: "Frontal" },
    { id: "top", label: "Superior" },
  ],
  explode: { open: "Abrir capas", close: "Cerrar capas" },
  hotspots: [
    {
      id: "confort",
      n: "01",
      title: "Confort",
      text: "La tapa acolchada reparte el primer contacto. El relieve en rombo evita que el relleno se desplace y mantiene la superficie uniforme.",
    },
    {
      id: "materiales",
      n: "02",
      title: "Materiales",
      text: "Tejido transpirable de trama cerrada en el lateral, con vivo perimetral cosido y asas para ajustar la posición sin forzar las costuras.",
    },
    {
      id: "soporte",
      n: "03",
      title: "Soporte",
      text: "Bajo la acogida, un núcleo firme con zonas diferenciadas mantiene la columna alineada. Ábrelo para ver cómo se apilan las capas.",
    },
  ],
  fallback: {
    note: "Tu navegador no tiene WebGL disponible, así que mostramos una fotografía en lugar del modelo interactivo.",
    image: {
      src: "/images/detalle-tejido.jpg",
      alt: "Detalle del colchón: edredón de lino, cojines en tonos arena y base de madera",
    },
  },
} as const;

export const guide = {
  eyebrow: "Cómo elegir",
  title: ["Tres preguntas", "antes de decidir."],
  intro:
    "No hay un colchón mejor que otro: hay uno que encaja contigo. Estas tres preguntas suelen ser suficientes para acertar.",
  steps: [
    {
      n: "01",
      title: "¿Qué firmeza te acomoda?",
      text: "Si duermes boca arriba o boca abajo, una firmeza media suele sentirse más estable. Si duermes de lado, una acogida más suave permite que el hombro y la cadera se hundan lo justo.",
      hint: "Esencial · media · Natura · media-suave · Signature · suave-envolvente",
    },
    {
      n: "02",
      title: "¿Qué tamaño necesitas?",
      text: "Mide el somier o la base antes de elegir. Si compartes la cama, el ancho importa más que el largo: cada persona debería poder girar sin invadir al otro.",
      hint: "Medidas estándar de plaza y media, dos plazas, queen y king",
    },
    {
      n: "03",
      title: "¿Cómo duermes en realidad?",
      text: "Calor por la noche, dolor de espalda al levantarte, cambios constantes de postura. Lo que hoy te molesta es la mejor pista sobre la construcción que te conviene.",
      hint: "Tejido, acogida y soporte responden a necesidades distintas",
    },
  ],
  image: {
    src: "/images/guia-confort.jpg",
    alt: "Dormitorio cálido con paredes de madera, cama amplia y vista a un jardín",
  },
};

export const about = {
  eyebrow: "Sobre Almara",
  title: ["Una marca que", "empieza por", "la noche."],
  paragraphs: [
    "Almara nace de una observación simple: elegir un colchón suele ser una decisión a ciegas, tomada en diez minutos, sobre algo que usarás cada noche durante años.",
    "Por eso trabajamos con pocas referencias y las explicamos bien: tres colchones, y solo los complementos que de verdad cambian cómo se duerme. Un lenguaje claro sobre firmeza, materiales y medidas, sin catálogo infinito.",
  ],
  values: [
    { k: "Pocas referencias", text: "Tres colchones bien resueltos y lo justo para completarlos." },
    { k: "Lenguaje claro", text: "Explicamos firmeza y materiales sin tecnicismos ni promesas médicas." },
    { k: "Descanso primero", text: "Cada decisión de diseño se mide por cómo se duerme, no por cómo se ve." },
  ],
  image: {
    src: "/images/nosotros.jpg",
    alt: "Rincón de dormitorio con cabecero de fibras naturales, textiles en tonos tierra y cestas de mimbre",
  },
};

export const faq = {
  title: ["Antes de", "elegir tu", "colchón."],
  items: [
    {
      q: "¿Cómo elijo la firmeza adecuada?",
      a: "La postura al dormir es la mejor guía. Boca arriba o boca abajo suele pedir una firmeza media, como Esencial. De lado, una acogida más suave —Natura o Signature— deja que el hombro y la cadera se acomoden sin forzar la columna. Si duermes acompañado y tienen pesos muy distintos, conviene probar una firmeza intermedia.",
    },
    {
      q: "¿Qué tamaño de colchón necesito?",
      a: "Mide primero la base o el somier, no el colchón anterior. Como referencia, el largo debería superar tu estatura en unos 15 o 20 cm, y si compartes la cama, prioriza el ancho: cada persona necesita espacio para girar sin despertar al otro.",
    },
    {
      q: "¿En qué se diferencian Esencial, Natura y Signature?",
      a: "Comparten la misma lógica de construcción —núcleo firme, capas de acogida y tejido transpirable— pero cambian la sensación y la altura. Esencial es el punto medio, Natura suma una acogida más envolvente con tejidos de origen natural, y Signature añade más capas y un pillow top integrado.",
    },
    {
      q: "¿Cómo debo cuidar mi colchón?",
      a: "Airea la habitación al levantarte antes de vestir la cama, gira el colchón cabeza-pies cada pocos meses para repartir el uso, y utiliza un protector lavable. Evita doblarlo y apóyalo siempre sobre una base firme y nivelada.",
    },
    {
      q: "¿Puedo pedir información sobre un modelo concreto?",
      a: "Sí. Cada modelo tiene su propia página con la ficha de firmeza, altura y materiales. Desde el formulario de consulta puedes indicar el modelo que te interesa y qué dudas tienes antes de decidir.",
    },
    {
      q: "¿Este sitio es una tienda real?",
      a: "No. Almara es una marca conceptual creada para una demostración de diseño y desarrollo web: no hay venta, envíos ni procesamiento de pedidos. Los modelos, precios ausentes y datos de contacto son de demostración.",
    },
  ],
  more: { title: "¿Tienes otra pregunta?", cta: "Escríbenos una consulta" },
};

export const finalCta = {
  eyebrow: "Empieza por aquí",
  headline: ["Tu próximo", "gran descanso", "comienza aquí."],
  sub: "Conoce las tres construcciones de la colección y descubre cuál encaja con tu forma de dormir.",
  cta: "Conoce nuestros colchones",
  secondary: "Cómo elegir tu colchón",
  image: {
    src: "/images/cta-dormitorio.jpg",
    alt: "Dormitorio cálido con lámparas encendidas, plantas y cama vestida con textiles en capas",
  },
  form: {
    title: "Consulta sobre un modelo",
    intro: "Cuéntanos qué buscas y te indicamos qué construcción se acerca más.",
    fields: {
      name: "Nombre",
      email: "Correo electrónico",
      model: "Modelo que te interesa",
      message: "¿Qué te gustaría saber?",
    },
    modelOptions: ["Esencial", "Natura", "Signature", "Aún no lo tengo claro"],
    submit: "Preparar consulta",
    /** El formulario es una demostración: no hay backend ni envío real. */
    demoNote:
      "Formulario de demostración: la consulta se arma en tu navegador y no se envía a ningún servidor.",
  },
};

export const footer = {
  nav: [
    { label: "Tienda", href: "/tienda/" },
    { label: "Cómo elegir", href: "/#guia" },
    { label: "Nosotros", href: "/nosotros/" },
    { label: "Preguntas frecuentes", href: "/faq/" },
    { label: "Contacto", href: "/contacto/" },
  ],
  copyright: `© ${new Date().getFullYear()} Almara. Marca conceptual.`,
};
