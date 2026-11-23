import type { MetadataRoute } from "next";
import { getAllEpisodes } from "@/lib/episodes";
import { getAllRecursos } from "@/lib/recursos";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const episodios = getAllEpisodes();
  const recursos = getAllRecursos();

  const ultimoEpisodio = episodios[0]?.date;
  const ultimoRecurso = recursos.map((r) => r.fecha).sort().at(-1);

  return [
    { url: SITE_URL, lastModified: ultimoEpisodio, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/episodios`, lastModified: ultimoEpisodio, changeFrequency: "weekly", priority: 0.8 },
    ...episodios.map((ep) => ({
      url: `${SITE_URL}/episodios/${ep.slug}`,
      lastModified: ep.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/recursos`, lastModified: ultimoRecurso, changeFrequency: "weekly", priority: 0.8 },
    ...recursos.map((r) => ({
      url: `${SITE_URL}/recursos/${r.slug}`,
      lastModified: r.fecha,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
