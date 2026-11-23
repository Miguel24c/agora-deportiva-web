"use client";

import { useState } from "react";
import RecursoCard from "./RecursoCard";
import { TODAS, type Recurso } from "@/lib/recursos-types";

type RecursoLista = Pick<Recurso, "slug" | "titulo" | "categoria" | "fecha" | "resumen" | "destacado">;

export default function RecursosClient({
  recursos,
  categorias,
}: {
  recursos: RecursoLista[];
  categorias: string[];
}) {
  const [activa, setActiva] = useState(TODAS);

  const filtrados = activa === TODAS ? recursos : recursos.filter((r) => r.categoria === activa);

  return (
    <>
      {categorias.length > 2 && (
        <div role="group" aria-label="Filtrar por categoría" className="mt-8 flex flex-wrap gap-2">
          {categorias.map((cat) => {
            const on = activa === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={on}
                onClick={() => setActiva(cat)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  on
                    ? "border-agora-neon bg-agora-neon text-agora-deep"
                    : "border-agora-pine bg-agora-bg text-agora-white hover:border-agora-neon"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {filtrados.length === 1 ? "1 recurso" : `${filtrados.length} recursos`}
      </p>

      {filtrados.length > 0 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((r) => (
            <li key={r.slug}>
              <RecursoCard recurso={r} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-agora-pine p-10 text-center">
          <p className="font-display text-lg font-semibold text-agora-white">
            {recursos.length === 0 ? "Pronto habrá fichas aquí" : "Aún no hay fichas en esta categoría"}
          </p>
          <p className="mt-2 text-sm text-agora-gray">
            Publicamos nuevas fichas a medida que salen los reels.
          </p>
          {activa !== TODAS && (
            <button
              type="button"
              onClick={() => setActiva(TODAS)}
              className="mt-5 inline-flex min-h-11 items-center rounded-2xl border border-agora-pine px-5 py-2 text-sm font-medium text-agora-white hover:border-agora-neon"
            >
              Ver todas las fichas
            </button>
          )}
        </div>
      )}
    </>
  );
}
