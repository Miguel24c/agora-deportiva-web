import React, { useEffect, useState } from "react";
import { ArrowRight, Headphones, Menu, Play } from "lucide-react";

/**
 * Ágora Deportiva — Homepage (v1)
 * Brand-first layout • simple, clear, sporty + intellectual
 *
 * Notes
 * - Avoids Tailwind arbitrary color syntax to prevent TSX tooling issues.
 * - External links open in a new tab (target=_blank) via externalLinkProps.
 */

const COLORS = {
  primary: "#32FF70", // Verde neón deportivo
  bg: "#1A1A1A", // Negro grafito / gris carbón
  surface: "#1A1A1A", // Cards
  text: "#F5F5F5", // Blanco humo
  muted: "#D3D3D3", // Gris cemento
  border: "#1D422D", // Verde pino oscuro
} as const;

const YOUTUBE_URL = "https://www.youtube.com/channel/UC9jvQobbQgDEZD784CKtj0w";
const SPOTIFY_URL =
  "https://open.spotify.com/show/0MkffeLIqljQ36aYBGJdzG?si=947f0a7e35f44709";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function externalLinkProps(href: string) {
  return isExternalHref(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : ({} as const);
}

type Episode = {
  id: string;
  guest: string;
  title: string;
  blurb: string;
  youtube: string;
  spotify: string;
  date: string; // YYYY-MM-DD
  cover?: string;
};

function formatDateEsCO(dateISO: string): string {
  const d = new Date(`${dateISO}T00:00:00Z`);
  return d.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-xs shadow-sm"
      style={{
        borderColor: COLORS.border,
        backgroundColor: COLORS.bg,
        color: COLORS.muted,
      }}
    >
      {children}
    </span>
  );
}

function SmartA({
  href,
  className,
  style,
  id,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} id={id} className={className} style={style} {...externalLinkProps(href)}>
      {children}
    </a>
  );
}

function PrimaryLink({
  href,
  children,
  icon,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <SmartA
      href={href}
      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium shadow-sm hover:opacity-90 ${className}`}
      style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}
    >
      {icon}
      {children}
    </SmartA>
  );
}

function SecondaryLink({
  href,
  children,
  icon,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <SmartA
      href={href}
      className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium shadow-sm hover:opacity-90 ${className}`}
      style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.text }}
    >
      {icon}
      {children}
    </SmartA>
  );
}

export default function App() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
  fetch("/episodes.json")
    .then((res) => res.json())
    .then((data: Episode[]) => setEpisodes(data))
    .catch((err) => console.error("Error cargando episodios", err));
  }, []);


  const latest = episodes.length > 0 ? episodes[0] : null;


  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur"
        style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <SmartA href="#inicio" className="flex items-center gap-3">
            <img src="/logo-agora-deportiva.png" alt="Ágora Deportiva" className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">ÁGORA DEPORTIVA</div>
              <div className="text-xs" style={{ color: COLORS.muted }}>
                Podcast
              </div>
            </div>
          </SmartA>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <SmartA href="#inicio" className="hover:opacity-90" style={{ color: COLORS.muted }}>
              Inicio
            </SmartA>
            <SmartA href="#episodios" className="hover:opacity-90" style={{ color: COLORS.muted }}>
              Episodios
            </SmartA>
            <SmartA href="#sobre" className="hover:opacity-90" style={{ color: COLORS.muted }}>
              Sobre Ágora
            </SmartA>
            <SmartA href="#contacto" className="hover:opacity-90" style={{ color: COLORS.muted }}>
              Contacto
            </SmartA>

            <SmartA
              href={SPOTIFY_URL}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm shadow-sm hover:opacity-90"
              style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}
            >
              <Headphones className="h-4 w-4" />
              Escuchar ahora
            </SmartA>
          </nav>

          <button
            className="inline-flex items-center justify-center rounded-2xl border p-2 shadow-sm md:hidden"
            style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.text }}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <main id="inicio">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div
              className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: COLORS.border }}
            />
            <div
              className="absolute -bottom-32 left-12 h-72 w-72 rounded-full blur-3xl"
              style={{ backgroundColor: COLORS.border }}
            />
            <div
              className="absolute right-10 top-28 h-56 w-56 rounded-full blur-3xl"
              style={{ backgroundColor: COLORS.border }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-14 md:pb-14 md:pt-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs shadow-sm"
                  style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.muted }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.primary }} />
                  Historias reales • Ideas prácticas • Cultura deportiva
                </div>

                <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Ágora Deportiva</h1>
                <p className="mt-2 text-lg md:text-xl" style={{ color: COLORS.muted }}>
                  Donde el deporte se encuentra con las ideas.
                </p>

                <p className="mt-5 max-w-xl text-sm leading-relaxed md:text-base" style={{ color: COLORS.muted }}>
                  Conversaciones profundas con atletas, entrenadores y profesionales que están construyendo el deporte
                  en Colombia. Menos ruido, más contexto: mentalidad, proceso, formación y lo que no se ve detrás del
                  rendimiento.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <PrimaryLink href="#ultimo-episodio" icon={<Play className="h-4 w-4" />}>
                    Ver último episodio
                  </PrimaryLink>
                  <SecondaryLink href={SPOTIFY_URL} icon={<Headphones className="h-4 w-4" />}>
                    Escuchar el podcast
                  </SecondaryLink>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Pill>YouTube</Pill>
                  <Pill>Spotify</Pill>
                  <Pill>Clips en redes</Pill>
                </div>
              </div>

              <div className="md:pl-6">
              {latest && (
                <div
                  id="ultimo-episodio"
                  className="rounded-3xl border p-6 shadow-sm"
                  style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-wide" style={{ color: COLORS.muted }}>
                        ÚLTIMO EPISODIO
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight">{latest.title}</h2>
                      <p className="mt-1 text-sm" style={{ color: COLORS.muted }}>
                        Con {latest.guest}
                      </p>
                    </div>
                    <div
                      className="grid h-12 w-12 place-items-center rounded-2xl shadow-sm"
                      style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}
                    >
                      <Play className="h-5 w-5" />
                    </div>
                  </div>
                  
                   {latest.cover && (
                     <img
                       src={latest.cover}
                       alt={`Portada ${latest.title}`}
                       className="mt-4 h-44 w-full rounded-2xl object-cover"
                    />
                   )}  
 
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
                    {latest.blurb}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <PrimaryLink href={latest.youtube} icon={<Play className="h-4 w-4" />} className="px-4 py-2">
                      Ver en YouTube
                    </PrimaryLink>
                    <SecondaryLink href={latest.spotify} icon={<Headphones className="h-4 w-4" />} className="px-4 py-2">
                      Escuchar en Spotify
                    </SecondaryLink>
                  </div>

                  <div className="mt-6 grid gap-3 rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                    <p className="text-xs font-semibold tracking-wide" style={{ color: COLORS.muted }}>
                      ¿Qué encontrarás aquí?
                    </p>
                    <ul className="grid gap-2 text-sm" style={{ color: COLORS.muted }}>
                      {[
                        "Ideas prácticas para deportistas y entrenadores.",
                        "Historias reales: proceso, obstáculos y decisiones.",
                        "Conversaciones con contexto, sin exageración.",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.primary }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
                <div
                  className="mt-4 rounded-3xl border p-6 shadow-sm"
                  style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}
                >
                  <p className="text-xs font-semibold tracking-wide" style={{ color: COLORS.muted }}>
                    ENLACES
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Spotify", href: SPOTIFY_URL, id: "escuchar" },
                      { label: "YouTube", href: YOUTUBE_URL },
                      { label: "Instagram", href: "#" },
                      { label: "TikTok", href: "#" },
                    ].map((l) => (
                      <SmartA
                        key={l.label}
                        id={l.id}
                        href={l.href}
                        className="group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm shadow-sm hover:opacity-90"
                        style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.text }}
                      >
                        {l.label}
                        <ArrowRight className="h-4 w-4" style={{ color: COLORS.muted }} />
                      </SmartA>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="episodios" className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Episodios recientes</h2>
              <p className="mt-2 max-w-2xl text-sm" style={{ color: COLORS.muted }}>
                Explora conversaciones con foco en mentalidad, formación, proceso competitivo y cultura deportiva.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((ep) => (
              <article
                key={ep.id}
                className="group rounded-3xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:opacity-95"
                style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}
              >
                {ep.cover && (
                  <img
                   src={ep.cover}
                   alt={`Portada ${ep.title}`}
                   className="mb-4 h-40 w-full rounded-2xl object-cover"
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-wide" style={{ color: COLORS.muted }}>
                      {formatDateEsCO(ep.date)}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">{ep.title}</h3>
                    <p className="mt-1 text-sm" style={{ color: COLORS.muted }}>
                      Con {ep.guest}
                    </p>
                  </div>
                  <div
                    className="grid h-10 w-10 place-items-center rounded-2xl shadow-sm"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}
                  >
                    <Play className="h-4 w-4" />
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
                  {ep.blurb}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <SmartA
                    href={ep.youtube}
                    className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium shadow-sm hover:opacity-90"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}
                  >
                    <Play className="h-4 w-4" />
                    Ver
                  </SmartA>
                  <SmartA
                    href={ep.spotify}
                    className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-medium shadow-sm hover:opacity-90"
                    style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.text }}
                  >
                    <Headphones className="h-4 w-4" />
                    Escuchar
                  </SmartA>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sobre" className="border-t" style={{ borderColor: COLORS.border }}>
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
            <div className="rounded-3xl border p-6 shadow-sm" style={{ borderColor: COLORS.border }}>
              <p className="text-xs font-semibold tracking-wide" style={{ color: COLORS.muted }}>
                SOBRE
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">¿Qué es Ágora Deportiva?</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
                Ágora Deportiva es un podcast y espacio de conversación donde el deporte se piensa más allá del resultado.
                Aquí se cuentan historias reales y se discuten ideas sobre proceso, mentalidad, formación, cultura
                competitiva y el impacto del deporte en Colombia.
              </p>
            </div>

            <div className="rounded-3xl border p-6 shadow-sm" style={{ borderColor: COLORS.border }}>
              <p className="text-xs font-semibold tracking-wide" style={{ color: COLORS.muted }}>
                QUIÉN ESTÁ DETRÁS
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">Conducción</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
                Ágora Deportiva es creado y conducido por <span className="font-medium">Miguel</span>. El foco del proyecto
                es la marca y la conversación: historias reales, ideas prácticas y construcción de comunidad deportiva.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Mentalidad", "Formación", "Alto rendimiento", "Cultura deportiva"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs shadow-sm"
                    style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.muted }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto max-w-6xl px-4 py-14">
          <div
            className="grid gap-8 rounded-3xl border p-6 shadow-sm md:grid-cols-2 md:p-8"
            style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}
          >
            <div>
              <p className="text-xs font-semibold tracking-wide" style={{ color: COLORS.muted }}>
                CONTACTO
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Hablemos de deporte</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
                ¿Quieres proponer un invitado, colaborar, patrocinar un episodio o sumar tu iniciativa al ecosistema?
                Escríbenos.
              </p>
            </div>

            <form className="grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nombre</label>
                <input
                  className="h-11 rounded-2xl border px-4 text-sm shadow-sm outline-none"
                  style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.text }}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Correo</label>
                <input
                  type="email"
                  className="h-11 rounded-2xl border px-4 text-sm shadow-sm outline-none"
                  style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.text }}
                  placeholder="tu@correo.com"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Mensaje</label>
                <textarea
                  rows={5}
                  className="rounded-2xl border p-4 text-sm shadow-sm outline-none"
                  style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg, color: COLORS.text }}
                  placeholder="Cuéntanos en qué podemos colaborar…"
                />
              </div>
              <button
                type="button"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium shadow-sm hover:opacity-90"
                style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}
              >
                Enviar
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs" style={{ color: COLORS.muted }}>
                *Este formulario es un placeholder (luego lo conectamos a Email/Notion/Formspree).
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t" style={{ borderColor: COLORS.border }}>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo-agora-deportiva.png" alt="Ágora Deportiva" className="h-10 w-auto" />
              <div>
                <div className="text-sm font-semibold tracking-wide">ÁGORA DEPORTIVA</div>
                <div className="text-xs" style={{ color: COLORS.muted }}>
                  Donde el deporte se encuentra con las ideas.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              {[
                { label: "Episodios", href: "#episodios" },
                { label: "Sobre Ágora", href: "#sobre" },
                { label: "Contacto", href: "#contacto" },
                { label: "Spotify", href: SPOTIFY_URL },
                { label: "YouTube", href: YOUTUBE_URL },
              ].map((l) => (
                <SmartA key={l.label} href={l.href} className="hover:opacity-90" style={{ color: COLORS.muted }}>
                  {l.label}
                </SmartA>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xs" style={{ color: COLORS.muted }}>
            © {new Date().getFullYear()} Ágora Deportiva. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
