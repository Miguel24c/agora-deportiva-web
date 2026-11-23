import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Film, Headphones } from "lucide-react";
import { getAllRecursos, getRecursoBySlug, type Recurso } from "@/lib/recursos";
import { formatFechaLarga } from "@/lib/recursos-types";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import DescargaRecurso from "@/components/DescargaRecurso";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllRecursos().map((r) => ({ slug: r.slug }));
}

function ogImageDe(r: Recurso): string {
  return r.ogImage ?? `/og/recursos/${r.slug}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getRecursoBySlug(slug);
  if (!r) return {};

  const url = `/recursos/${r.slug}`;
  const image = { url: ogImageDe(r), width: 1200, height: 630, alt: r.titulo };

  return {
    title: r.titulo,
    description: r.resumen,
    alternates: { canonical: url },
    openGraph: {
      title: r.titulo,
      description: r.resumen,
      url,
      type: "article",
      publishedTime: r.fecha,
      section: r.categoria,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: r.titulo,
      description: r.resumen,
      images: [image.url],
    },
  };
}

function esExterno(href: string) {
  return /^https?:\/\//i.test(href);
}

function EnlaceRelacionado({
  href,
  icon,
  etiqueta,
  titulo,
}: {
  href: string;
  icon: React.ReactNode;
  etiqueta: string;
  titulo: string;
}) {
  const clase =
    "flex min-h-16 items-center gap-4 rounded-3xl border border-agora-pine bg-agora-deep p-5 transition hover:border-agora-neon";
  const contenido = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-agora-pine text-agora-neon">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-xs text-agora-gray">{etiqueta}</span>
        <span className="block font-display text-base font-semibold text-agora-white">{titulo}</span>
      </span>
      <ArrowUpRight className="h-5 w-5 text-agora-gray" aria-hidden="true" />
    </>
  );
  return esExterno(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={clase}>
      {contenido}
      <span className="sr-only">(se abre en una pestaña nueva)</span>
    </a>
  ) : (
    <Link href={href} className={clase}>
      {contenido}
    </Link>
  );
}

export default async function RecursoPage({ params }: Props) {
  const { slug } = await params;
  const r = getRecursoBySlug(slug);
  if (!r) notFound();

  const { cifras = [], hallazgos = [], loQueNoDice = [] } = r.cuerpo;
  const pageUrl = `${SITE_URL}/recursos/${r.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: r.titulo,
    description: r.resumen,
    inLanguage: "es",
    datePublished: r.fecha,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    image: new URL(ogImageDe(r), SITE_URL).toString(),
    articleSection: r.categoria,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    ...(r.pdfDisponible && {
      encoding: {
        "@type": "MediaObject",
        contentUrl: new URL(r.pdfUrl, SITE_URL).toString(),
        encodingFormat: "application/pdf",
      },
    }),
    citation: {
      "@type": "ScholarlyArticle",
      name: r.citaCompleta,
      url: r.enlaceFuente,
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: r.doi },
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Link
        href="/recursos"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-agora-gray hover:text-agora-neon"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Todos los recursos
      </Link>

      {/* Encabezado */}
      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-agora-gray">
          <span className="rounded-full border border-agora-pine px-3 py-1">{r.categoria}</span>
          <time dateTime={r.fecha}>{formatFechaLarga(r.fecha)}</time>
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          {r.titulo}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-agora-gray">{r.resumen}</p>

        <div className="mt-6">
          <DescargaRecurso pdfUrl={r.pdfUrl} disponible={r.pdfDisponible} slug={r.slug} />
        </div>
      </header>

      {/* Introducción */}
      <div className="mt-10 space-y-4 text-base leading-relaxed text-agora-white/90">
        {r.descripcionLarga.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Cifras */}
      {cifras.length > 0 && (
        <section aria-labelledby="cifras" className="mt-12">
          <h2 id="cifras" className="font-display text-2xl font-semibold tracking-tight">
            Cifras
          </h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            {cifras.map((c) => (
              <div key={c.valor} className="rounded-3xl border border-agora-pine bg-agora-deep p-5">
                <dt className="font-numeric text-5xl font-semibold leading-none text-agora-neon">{c.valor}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-agora-gray">{c.texto}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Hallazgos */}
      {hallazgos.length > 0 && (
        <section aria-labelledby="hallazgos" className="mt-12">
          <h2 id="hallazgos" className="font-display text-2xl font-semibold tracking-tight">
            Hallazgos
          </h2>
          <ol className="mt-5 space-y-4">
            {hallazgos.map((h, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="font-numeric text-3xl font-semibold leading-none text-agora-neon"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p className="pt-0.5 text-base leading-relaxed text-agora-white/90">{h}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Lo que el estudio no dice: bloque diferenciado a propósito */}
      {loQueNoDice.length > 0 && (
        <section
          aria-labelledby="no-dice"
          className="mt-12 rounded-3xl border-2 border-dashed border-agora-gray/50 bg-agora-white/[0.04] p-6 md:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-agora-gray">Ojo con esto</p>
          <h2 id="no-dice" className="mt-2 font-display text-2xl font-semibold tracking-tight">
            Lo que el estudio no dice
          </h2>
          <ul className="mt-5 space-y-3">
            {loQueNoDice.map((item, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-agora-white/90">
                <span className="mt-1 font-semibold text-agora-gray" aria-hidden="true">
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Cita académica */}
      <section aria-labelledby="fuente" className="mt-12 border-l-4 border-agora-neon pl-5">
        <h2 id="fuente" className="text-xs font-semibold uppercase tracking-widest text-agora-gray">
          Fuente original
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-agora-white">{r.citaCompleta}</p>
        <p className="mt-3 text-sm">
          <span className="text-agora-gray">DOI: </span>
          <a
            href={r.enlaceFuente}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all font-medium text-agora-neon underline underline-offset-4 hover:opacity-90"
          >
            {r.doi}
            <span className="sr-only"> (abre el artículo original en una pestaña nueva)</span>
          </a>
        </p>
        <p className="mt-3 text-xs leading-relaxed text-agora-gray">
          Esta ficha es un resumen propio de Ágora Deportiva. El artículo original pertenece a sus
          autores y editorial; consúltalo en la fuente.
        </p>
      </section>

      {/* Descarga repetida al final para quien llega hasta aquí */}
      <div className="mt-10">
        <DescargaRecurso pdfUrl={r.pdfUrl} disponible={r.pdfDisponible} slug={r.slug} />
      </div>

      {/* Relacionados */}
      {(r.reelUrl || r.episodioUrl) && (
        <section aria-labelledby="relacionados" className="mt-12 border-t border-agora-pine pt-10">
          <h2 id="relacionados" className="font-display text-xl font-semibold tracking-tight">
            Sigue con esto
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {r.reelUrl && (
              <EnlaceRelacionado
                href={r.reelUrl}
                icon={<Film className="h-5 w-5" aria-hidden="true" />}
                etiqueta="Reel"
                titulo="Mira el reel de esta ficha"
              />
            )}
            {r.episodioUrl && (
              <EnlaceRelacionado
                href={r.episodioUrl}
                icon={<Headphones className="h-5 w-5" aria-hidden="true" />}
                etiqueta="Episodio"
                titulo="Escucha el episodio relacionado"
              />
            )}
          </div>
        </section>
      )}
    </article>
  );
}
