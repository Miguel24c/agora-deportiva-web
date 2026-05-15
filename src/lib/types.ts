export type Timestamp = {
  time: string;
  label: string;
};

export type Episode = {
  id: string;
  slug: string;
  guest: string;
  title: string;
  blurb: string;
  youtube: string;
  spotify: string;
  date: string;
  cover?: string;
  category: string;
  // Campos SEO opcionales
  description?: string;
  guestBio?: string;
  highlights?: string[];
  timestamps?: Timestamp[];
  tags?: string[];
};

export function formatDateEsCO(dateISO: string): string {
  const d = new Date(`${dateISO}T00:00:00Z`);
  return d.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function getAllCategories(episodes: Episode[]): string[] {
  return ["Todos", ...Array.from(new Set(episodes.map((ep) => ep.category)))];
}
