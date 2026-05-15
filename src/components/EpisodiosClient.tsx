"use client";

import { useState } from "react";
import { Episode } from "@/lib/types";
import EpisodeCard from "./EpisodeCard";

export default function EpisodiosClient({
  episodes,
  categories,
}: {
  episodes: Episode[];
  categories: string[];
}) {
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos"
      ? episodes
      : episodes.filter((ep) => ep.category === active);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className="rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition hover:opacity-90"
            style={{
              borderColor: "#1D422D",
              backgroundColor: active === cat ? "#32FF70" : "#1A1A1A",
              color: active === cat ? "#1A1A1A" : "#F5F5F5",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ep) => (
          <EpisodeCard key={ep.id} ep={ep} />
        ))}
      </div>
    </>
  );
}
