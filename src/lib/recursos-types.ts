// Tipos y utilidades de Recursos seguros para Client Components (sin `fs`).

export type Cifra = {
  /** Número o porcentaje destacado, p. ej. "82%" */
  valor: string;
  /** Qué significa la cifra, en una frase */
  texto: string;
};

export type CuerpoRecurso = {
  cifras?: Cifra[];
  hallazgos?: string[];
  /** Límites del estudio: se muestra en el bloque "Lo que el estudio no dice" */
  loQueNoDice?: string[];
};

/** Lo que se escribe a mano en content/recursos/<slug>.json */
export type RecursoArchivo = {
  slug: string;
  titulo: string;
  categoria: string;
  /** YYYY-MM-DD */
  fecha: string;
  /** Una línea: se usa en tarjetas, meta description y OG */
  resumen: string;
  /** Párrafos separados por línea en blanco (\n\n) */
  descripcionLarga: string;
  /** Ruta al PDF propio dentro de /public, p. ej. "/recursos/mi-ficha.pdf" */
  pdfUrl: string;
  /** Imagen OG propia (1200×630). Si se omite, se genera una automáticamente */
  ogImage?: string;
  citaCompleta: string;
  doi: string;
  enlaceFuente: string;
  reelUrl?: string;
  episodioUrl?: string;
  destacado: boolean;
  cuerpo: CuerpoRecurso;
};

/** Recurso listo para renderizar (con datos calculados al compilar) */
export type Recurso = RecursoArchivo & {
  /** true si el PDF existe en /public */
  pdfDisponible: boolean;
};

export const TODAS = "Todas";

export function getCategoriasRecursos(recursos: Pick<Recurso, "categoria">[]): string[] {
  return [TODAS, ...Array.from(new Set(recursos.map((r) => r.categoria)))];
}

export function formatFechaLarga(fechaISO: string): string {
  const d = new Date(`${fechaISO}T00:00:00Z`);
  return d.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
