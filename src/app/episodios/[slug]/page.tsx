import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Headphones, Play, ArrowLeft } from "lucide-react";
import { getAllEpisodes, getEpisodeBySlug, formatDateEsCO } from "@/lib/episodes";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllEpisodes().map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) return {};

  const description = ep.description
    ? ep.description.split("\n")[0]
    : ep.blurb;

  return {
    title: ep.title,
    description,
    keywords: ep.tags,
    openGraph: {
      title: ep.title,
      description,
      images: ep.cover ? [{ url: ep.cover }] : [],
      type: "article",
      publishedTime: ep.date,
    },
    twitter: {
      card: "summary_large_image",
      title: ep.title,
      description,
      images: ep.cover ? [ep.cover] : [],
    },
  };
}

export default async function EpisodioPage({ params }: Props) {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) notFound();

  const allEpisodes = getAllEpisodes();
  const currentIndex = allEpisodes.findIndex((e) => e.slug === slug);
  const prev = allEpisodes[currentIndex + 1] ?? null;
  const next = allEpisodes[currentIndex - 1] ?? null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      {/* Back */}
      <Link
        href="/episodios"
        className="inline-flex items-center gap-2 text-sm text-[#D3D3D3] hover:text-[#32FF70]"
      >
        <ArrowLeft className="h-4 w-4" />
        Todos los episodios
      </Link>

      {/* Cover */}
      {ep.cover && (
        <Image
          src={ep.cover}
          alt={`Portada ${ep.title}`}
          width={900}
          height={506}
          className="mt-6 w-full rounded-3xl object-cover"
          priority
        />
      )}

      {/* Meta */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-[#1D422D] bg-[#1A1A1A] px-3 py-1 text-xs text-[#D3D3D3]">
          {ep.category}
        </span>
        <span className="text-xs text-[#D3D3D3]">{formatDateEsCO(ep.date)}</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
        {ep.title}
      </h1>
      <p className="mt-2 text-lg text-[#D3D3D3]">Con {ep.guest}</p>

      {/* CTAs */}
      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href={ep.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#32FF70] px-6 py-3 text-sm font-medium text-[#1A1A1A] shadow-sm hover:opacity-90"
        >
          <Play className="h-4 w-4" />
          Ver en YouTube
        </a>
        <a
          href={ep.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#1D422D] bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-[#F5F5F5] shadow-sm hover:opacity-90"
        >
          <Headphones className="h-4 w-4" />
          Escuchar en Spotify
        </a>
      </div>

      {/* Descripción larga */}
      {ep.description && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Sobre este episodio</h2>
          <div className="mt-3 space-y-4 text-sm leading-relaxed text-[#D3D3D3]">
            {ep.description.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Highlights */}
      {ep.highlights && ep.highlights.length > 0 && (
        <div className="mt-10 rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-6">
          <h2 className="text-lg font-semibold tracking-tight">Lo que vas a aprender</h2>
          <ul className="mt-4 space-y-3">
            {ep.highlights.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#D3D3D3]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#32FF70]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bio del invitado */}
      {ep.guestBio && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">
            Sobre {ep.guest}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#D3D3D3]">{ep.guestBio}</p>
        </div>
      )}

      {/* Timestamps */}
      {ep.timestamps && ep.timestamps.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Contenido del episodio</h2>
          <ul className="mt-4 space-y-2">
            {ep.timestamps.map((ts, i) => (
              <li key={i} className="flex items-baseline gap-3 text-sm text-[#D3D3D3]">
                <span className="shrink-0 font-mono text-xs text-[#32FF70]">{ts.time}</span>
                {ts.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {ep.tags && ep.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {ep.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#1D422D] bg-[#1A1A1A] px-3 py-1 text-xs text-[#D3D3D3]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Navegación entre episodios */}
      {(prev || next) && (
        <div className="mt-16 border-t border-[#1D422D] pt-10 grid gap-4 sm:grid-cols-2">
          {prev && (
            <Link
              href={`/episodios/${prev.slug}`}
              className="rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-5 transition hover:border-[#32FF70]"
            >
              <p className="text-xs text-[#D3D3D3]">← Episodio anterior</p>
              <p className="mt-2 text-sm font-semibold line-clamp-2">{prev.title}</p>
              <p className="mt-1 text-xs text-[#D3D3D3]">Con {prev.guest}</p>
            </Link>
          )}
          {next && (
            <Link
              href={`/episodios/${next.slug}`}
              className="rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-5 transition hover:border-[#32FF70] sm:text-right"
            >
              <p className="text-xs text-[#D3D3D3]">Episodio siguiente →</p>
              <p className="mt-2 text-sm font-semibold line-clamp-2">{next.title}</p>
              <p className="mt-1 text-xs text-[#D3D3D3]">Con {next.guest}</p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
