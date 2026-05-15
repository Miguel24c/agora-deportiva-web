import Link from "next/link";
import Image from "next/image";
import { Headphones, Play } from "lucide-react";
import { Episode, formatDateEsCO } from "@/lib/types";

export default function EpisodeCard({ ep }: { ep: Episode }) {
  return (
    <article className="group rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-5 shadow-sm transition hover:-translate-y-0.5 hover:opacity-95">
      {ep.cover && (
        <Link href={`/episodios/${ep.slug}`}>
          <Image
            src={ep.cover}
            alt={`Portada ${ep.title}`}
            width={600}
            height={340}
            className="mb-4 h-40 w-full rounded-2xl object-cover"
          />
        </Link>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
            {formatDateEsCO(ep.date)}
          </p>
          <Link href={`/episodios/${ep.slug}`}>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-[#F5F5F5] hover:text-[#32FF70]">
              {ep.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-[#D3D3D3]">Con {ep.guest}</p>
        </div>
        <Link
          href={`/episodios/${ep.slug}`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#32FF70] text-[#1A1A1A] shadow-sm hover:opacity-90"
        >
          <Play className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#D3D3D3]">
        {ep.blurb}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={ep.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#32FF70] px-3 py-2 text-xs font-medium text-[#1A1A1A] shadow-sm hover:opacity-90"
        >
          <Play className="h-4 w-4" />
          Ver
        </a>
        <a
          href={ep.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#1D422D] bg-[#1A1A1A] px-3 py-2 text-xs font-medium text-[#F5F5F5] shadow-sm hover:opacity-90"
        >
          <Headphones className="h-4 w-4" />
          Escuchar
        </a>
      </div>
    </article>
  );
}
