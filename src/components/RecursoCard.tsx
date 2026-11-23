import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatFechaLarga, type Recurso } from "@/lib/recursos-types";

type Props = {
  recurso: Pick<Recurso, "slug" | "titulo" | "categoria" | "fecha" | "resumen" | "destacado">;
};

export default function RecursoCard({ recurso }: Props) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-agora-pine bg-agora-deep p-6 transition hover:border-agora-neon">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-agora-pine px-3 py-1 text-xs text-agora-gray">
          {recurso.categoria}
        </span>
        {recurso.destacado && (
          <span className="rounded-full bg-agora-neon px-3 py-1 text-xs font-semibold text-agora-deep">
            Destacado
          </span>
        )}
      </div>

      <h2 className="mt-4 font-display text-xl font-semibold leading-tight tracking-tight text-agora-white">
        {/* El enlace cubre toda la tarjeta con ::after; sigue siendo un <a> real */}
        <Link
          href={`/recursos/${recurso.slug}`}
          className="after:absolute after:inset-0 after:rounded-3xl after:content-['']"
        >
          {recurso.titulo}
        </Link>
      </h2>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-agora-gray">{recurso.resumen}</p>

      <div className="mt-5 flex items-center justify-between text-xs text-agora-gray">
        <time dateTime={recurso.fecha}>{formatFechaLarga(recurso.fecha)}</time>
        <span className="inline-flex items-center gap-1 font-medium text-agora-neon" aria-hidden="true">
          Leer ficha
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
