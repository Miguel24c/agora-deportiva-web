import fs from "fs";
import path from "path";
import type { Recurso, RecursoArchivo } from "./recursos-types";

export type { Recurso } from "./recursos-types";

const RECURSOS_DIR = path.join(process.cwd(), "content/recursos");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const OBLIGATORIOS: (keyof RecursoArchivo)[] = [
  "slug",
  "titulo",
  "categoria",
  "fecha",
  "resumen",
  "descripcionLarga",
  "pdfUrl",
  "citaCompleta",
  "doi",
  "enlaceFuente",
];

function leerRecurso(file: string): Recurso {
  const raw = fs.readFileSync(path.join(RECURSOS_DIR, file), "utf-8");
  const data = JSON.parse(raw) as RecursoArchivo;

  // Falla el build con un mensaje claro si falta un campo o el slug no coincide.
  const faltan = OBLIGATORIOS.filter((k) => !data[k]);
  if (faltan.length) {
    throw new Error(`content/recursos/${file}: faltan campos ${faltan.join(", ")}`);
  }
  if (`${data.slug}.json` !== file) {
    throw new Error(`content/recursos/${file}: el slug "${data.slug}" debe coincidir con el nombre del archivo`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.fecha)) {
    throw new Error(`content/recursos/${file}: la fecha debe ser YYYY-MM-DD`);
  }

  const pdfPath = path.join(PUBLIC_DIR, data.pdfUrl.replace(/^\//, ""));

  return {
    ...data,
    destacado: Boolean(data.destacado),
    cuerpo: data.cuerpo ?? {},
    pdfDisponible: data.pdfUrl.startsWith("/") && fs.existsSync(pdfPath),
  };
}

/** Destacados primero; después, del más reciente al más antiguo. */
export function getAllRecursos(): Recurso[] {
  if (!fs.existsSync(RECURSOS_DIR)) return [];
  return fs
    .readdirSync(RECURSOS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map(leerRecurso)
    .sort((a, b) => {
      if (a.destacado !== b.destacado) return a.destacado ? -1 : 1;
      return b.fecha.localeCompare(a.fecha);
    });
}

export function getRecursoBySlug(slug: string): Recurso | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const file = `${slug}.json`;
  if (!fs.existsSync(path.join(RECURSOS_DIR, file))) return undefined;
  return leerRecurso(file);
}
