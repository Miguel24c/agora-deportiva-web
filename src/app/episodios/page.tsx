import type { Metadata } from "next";
import { getAllEpisodes, getAllCategories } from "@/lib/episodes";
import EpisodiosClient from "@/components/EpisodiosClient";

export const metadata: Metadata = {
  title: "Episodios",
  description:
    "Todos los episodios de Ágora Deportiva. Conversaciones sobre mentalidad, formación y cultura deportiva en Colombia.",
};

export default function EpisodiosPage() {
  const episodes = getAllEpisodes();
  const categories = getAllCategories(episodes);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">
        Todos los episodios
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[#D3D3D3]">
        Explora conversaciones con foco en mentalidad, formación, proceso
        competitivo y cultura deportiva.
      </p>

      <EpisodiosClient episodes={episodes} categories={categories} />
    </div>
  );
}
