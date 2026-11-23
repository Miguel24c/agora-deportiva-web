import type { Metadata } from "next";
import { getAllRecursos } from "@/lib/recursos";
import { getCategoriasRecursos } from "@/lib/recursos-types";
import RecursosClient from "@/components/RecursosClient";

const DESCRIPCION =
  "Fichas en español que resumen investigación deportiva: cifras, hallazgos y lo que cada estudio no dice. Descarga gratis en PDF.";

export const metadata: Metadata = {
  title: "Recursos",
  description: DESCRIPCION,
  alternates: { canonical: "/recursos" },
  openGraph: {
    title: "Recursos | Ágora Deportiva",
    description: DESCRIPCION,
    url: "/recursos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recursos | Ágora Deportiva",
    description: DESCRIPCION,
  },
};

export default function RecursosPage() {
  const recursos = getAllRecursos();
  const categorias = getCategoriasRecursos(recursos);
  // Solo se envía al cliente lo que necesita la tarjeta.
  const lista = recursos.map(({ slug, titulo, categoria, fecha, resumen, destacado }) => ({
    slug,
    titulo,
    categoria,
    fecha,
    resumen,
    destacado,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-agora-neon">Recursos</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight md:text-5xl">
        Investigación deportiva, en claro
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-agora-gray">
        Fichas propias que resumen estudios sobre deporte: las cifras, los hallazgos y lo que el
        estudio no dice. Léelas aquí o descárgalas en PDF.
      </p>

      <RecursosClient recursos={lista} categorias={categorias} />
    </div>
  );
}
