import fs from "fs";
import path from "path";
import type { Episode } from "./types";

export type { Episode } from "./types";
export { formatDateEsCO, getAllCategories } from "./types";

const EPISODES_DIR = path.join(process.cwd(), "content/episodes");

export function getAllEpisodes(): Episode[] {
  const files = fs.readdirSync(EPISODES_DIR).filter((f) => f.endsWith(".json"));

  const episodes = files.map((file) => {
    const raw = fs.readFileSync(path.join(EPISODES_DIR, file), "utf-8");
    return JSON.parse(raw) as Episode;
  });

  return episodes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  const filePath = path.join(EPISODES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Episode;
}

export function getLatestEpisode(): Episode | undefined {
  return getAllEpisodes()[0];
}
