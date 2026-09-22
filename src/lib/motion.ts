/**
 * Sistema de movimiento de Almara.
 *
 * Una sola fuente para duraciones, easings y distancias: las secciones no improvisan valores.
 * La regla es que el movimiento acompañe la dirección de arte —calma, peso, nada de rebotes—.
 */

/** Easings. Cada familia tiene un propósito distinto; no se usa el mismo para todo. */
export const EASE = {
  /** Entradas de contenido: salida rápida y frenado largo. */
  reveal: "expo.out",
  /** Aperturas de máscara (clip-path): arranca y termina suave. */
  mask: "power3.inOut",
  /** Asentado de fotografía tras el zoom-out. */
  settle: "power2.out",
  /** Microinteracciones de interfaz. */
  ui: "power2.out",
  /** Movimiento ligado al scroll. */
  scrub: "none",
} as const;

/** Duraciones en segundos. */
export const DUR = {
  ui: 0.3,
  button: 0.42,
  /** Revelado de texto y bloques de contenido. */
  content: 0.8,
  /** Apertura de máscara fotográfica. */
  mask: 1.05,
  /** Asentado de la fotografía (más largo que la máscara: la imagen sigue moviéndose). */
  settle: 1.5,
  /** Línea divisoria que se expande. */
  rule: 0.9,
} as const;

/** Desplazamientos y escalas base. */
export const MOVE = {
  /** translateY de una entrada de contenido. */
  y: 20,
  /** Escala inicial de una fotografía que se asienta. */
  zoom: 1.1,
  /** Recorrido del parallax dentro del marco, en % de la altura del contenedor. */
  parallax: 7,
} as const;

/** Punto de disparo estándar: el bloque empieza cuando ya entró en pantalla de verdad. */
export const START = "top 84%";

/** Máscaras clip-path reutilizables (revelado vertical de abajo hacia arriba). */
export const CLIP = {
  closed: "inset(0% 0% 100% 0%)",
  open: "inset(0% 0% 0% 0%)",
} as const;

/** Stagger estándar entre hermanos de una misma lista. */
export const STAGGER = 0.08;
