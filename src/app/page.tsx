import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Headphones, Play } from "lucide-react";
import { getAllEpisodes, getLatestEpisode, formatDateEsCO } from "@/lib/episodes";
import EpisodeCard from "@/components/EpisodeCard";

const SPOTIFY_URL =
  "https://open.spotify.com/show/0MkffeLIqljQ36aYBGJdzG?si=947f0a7e35f44709";
const YOUTUBE_URL =
  "https://www.youtube.com/channel/UC9jvQobbQgDEZD784CKtj0w";
const WHATSAPP_URL =
  "https://whatsapp.com/channel/0029VbCGgyeG3R3as4HdzL19";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeelnoog";

const socialLinks = [
  { label: "Spotify", href: SPOTIFY_URL },
  { label: "YouTube", href: YOUTUBE_URL },
  { label: "Instagram", href: "https://www.instagram.com/agoradeportiva/" },
  { label: "TikTok", href: "#" },
];

export default function HomePage() {
  const latest = getLatestEpisode();
  const recentEpisodes = getAllEpisodes().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#1D422D] blur-3xl" />
          <div className="absolute -bottom-32 left-12 h-72 w-72 rounded-full bg-[#1D422D] blur-3xl" />
          <div className="absolute right-10 top-28 h-56 w-56 rounded-full bg-[#1D422D] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-14 md:pb-14 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1D422D] bg-[#1A1A1A] px-3 py-1 text-xs text-[#D3D3D3] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#32FF70]" />
                Historias reales • Ideas prácticas • Cultura deportiva
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Ágora Deportiva
              </h1>
              <p className="mt-2 text-lg text-[#D3D3D3] md:text-xl">
                Donde el deporte se encuentra con las ideas.
              </p>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#D3D3D3] md:text-base">
                Conversaciones profundas con atletas, entrenadores y
                profesionales que están construyendo el deporte en Colombia.
                Menos ruido, más contexto: mentalidad, proceso, formación y lo
                que no se ve detrás del rendimiento.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={latest ? latest.youtube : "#ultimo-episodio"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#32FF70] px-5 py-3 text-sm font-medium text-[#1A1A1A] shadow-sm hover:opacity-90"
                >
                  <Play className="h-4 w-4" />
                  Ver último episodio
                </a>
                <a
                  href={SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#1D422D] bg-[#1A1A1A] px-5 py-3 text-sm font-medium text-[#F5F5F5] shadow-sm hover:opacity-90"
                >
                  <Headphones className="h-4 w-4" />
                  Escuchar el podcast
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {["YouTube", "Spotify", "Clips en redes"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#1D422D] bg-[#1A1A1A] px-3 py-1 text-xs text-[#D3D3D3] shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="md:pl-6">
              {latest && (
                <div
                  id="ultimo-episodio"
                  className="rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
                        ÚLTIMO EPISODIO
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight">
                        {latest.title}
                      </h2>
                      <p className="mt-1 text-sm text-[#D3D3D3]">
                        Con {latest.guest}
                      </p>
                    </div>
                    <Link
                      href={`/episodios/${latest.slug}`}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#32FF70] text-[#1A1A1A] shadow-sm hover:opacity-90"
                    >
                      <Play className="h-5 w-5" />
                    </Link>
                  </div>

                  {latest.cover && (
                    <Link href={`/episodios/${latest.slug}`}>
                      <Image
                        src={latest.cover}
                        alt={`Portada ${latest.title}`}
                        width={600}
                        height={340}
                        className="mt-4 h-44 w-full rounded-2xl object-cover"
                      />
                    </Link>
                  )}

                  <p className="mt-4 text-sm leading-relaxed text-[#D3D3D3]">
                    {latest.blurb}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={latest.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#32FF70] px-4 py-2 text-sm font-medium text-[#1A1A1A] shadow-sm hover:opacity-90"
                    >
                      <Play className="h-4 w-4" />
                      Ver en YouTube
                    </a>
                    <a
                      href={latest.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#1D422D] bg-[#1A1A1A] px-4 py-2 text-sm font-medium text-[#F5F5F5] shadow-sm hover:opacity-90"
                    >
                      <Headphones className="h-4 w-4" />
                      Escuchar en Spotify
                    </a>
                  </div>

                  <div className="mt-6 grid gap-3 rounded-2xl border border-[#1D422D] p-4">
                    <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
                      ¿Qué encontrarás aquí?
                    </p>
                    <ul className="grid gap-2 text-sm text-[#D3D3D3]">
                      {[
                        "Ideas prácticas para deportistas y entrenadores.",
                        "Historias reales: proceso, obstáculos y decisiones.",
                        "Conversaciones con contexto, sin exageración.",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#32FF70]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Social links */}
              <div className="mt-4 rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-6 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
                  ENLACES
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {socialLinks.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-[#1D422D] bg-[#1A1A1A] px-4 py-3 text-sm text-[#F5F5F5] shadow-sm hover:opacity-90"
                    >
                      {l.label}
                      <ArrowRight className="h-4 w-4 text-[#D3D3D3]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comunidad + Newsletter */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-6 shadow-sm md:p-8">
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
                COMUNIDAD
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Únete a Ágora Deportiva
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#D3D3D3]">
                Recibe nuevos episodios, ideas prácticas y contenido exclusivo
                sobre deporte, mentalidad y alto rendimiento. Construyamos
                juntos una comunidad que piense el deporte con profundidad.
              </p>
              <div className="mt-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#32FF70] px-5 py-3 text-sm font-medium text-[#1A1A1A] shadow-sm hover:opacity-90"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                    💬
                  </span>
                  Unirme al canal de WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
                NEWSLETTER
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                Recibe ideas para pensar mejor el deporte
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#D3D3D3]">
                Te enviaremos episodios, reflexiones y contenido de valor sobre
                deporte, formación y cultura deportiva.
              </p>
              <div className="mt-5">
                <div className="ml-embedded" data-form="IXQqgk" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodios recientes */}
      <section id="episodios" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Episodios recientes
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#D3D3D3]">
              Explora conversaciones con foco en mentalidad, formación, proceso
              competitivo y cultura deportiva.
            </p>
          </div>
          <Link
            href="/episodios"
            className="shrink-0 text-sm text-[#32FF70] hover:opacity-80"
          >
            Ver todos →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentEpisodes.map((ep) => (
            <EpisodeCard key={ep.id} ep={ep} />
          ))}
        </div>
      </section>

      {/* Sobre Ágora */}
      <section id="sobre" className="border-t border-[#1D422D]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
          <div className="rounded-3xl border border-[#1D422D] p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
              SOBRE EL PODCAST
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              ¿Qué es Ágora Deportiva?
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <Image
                src="/favicon-32.png"
                alt="Ágora Deportiva"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">Ágora Deportiva</p>
                <a
                  href="https://www.instagram.com/agoradeportiva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#32FF70] hover:opacity-80"
                >
                  @agoradeportiva
                </a>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#D3D3D3]">
              Ágora Deportiva es un podcast y espacio de conversación donde el
              deporte se piensa más allá del resultado. Aquí no solo se celebran
              victorias: se exploran procesos, decisiones, estructuras y
              contextos que explican lo que ocurre dentro y fuera de la
              competencia.
              <br />
              <br />
              El proyecto nace con una intención clara: aportar profundidad al
              debate deportivo en Colombia. Cada episodio busca ir más allá del
              titular y del momento viral, para entender la mentalidad, la
              formación, la cultura competitiva y la construcción de ecosistemas
              deportivos sostenibles.
              <br />
              <br />
              Más que un podcast, es una conversación constante sobre cómo
              pensar mejor el deporte.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1D422D] p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
              QUIÉN ESTÁ DETRÁS
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">
              Conducción
            </h3>
            <div className="mt-4 flex items-center gap-4">
              <Image
                src="/miguel.jpg"
                alt="Miguel Campiño"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border border-[#1D422D] object-cover"
              />
              <div>
                <p className="text-lg font-semibold">Miguel Campiño</p>
                <a
                  href="https://www.instagram.com/miguelcampinov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#32FF70] hover:opacity-80"
                >
                  @miguelcampinov
                </a>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#D3D3D3]">
              Ágora Deportiva es creado y conducido por{" "}
              <span className="font-medium text-[#F5F5F5]">Miguel Campiño</span>
              , profesional en mercadeo y publicidad, con más de 9 años de
              experiencia vinculado al ecosistema deportivo.
              <br />
              <br />
              Su enfoque no es solo contar historias, sino entender el deporte
              desde la estructura, la mentalidad y la construcción de cultura.
              Ágora Deportiva nace de esa convicción: que el deporte se puede
              pensar con profundidad, contexto y responsabilidad.
            </p>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 rounded-3xl border border-[#1D422D] bg-[#1A1A1A] p-6 shadow-sm md:grid-cols-2 md:p-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#D3D3D3]">
              CONTACTO
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Hablemos de deporte
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#D3D3D3]">
              ¿Quieres proponer un invitado, colaborar, patrocinar un episodio o
              sumar tu iniciativa al ecosistema? Escríbenos.
            </p>
          </div>

          <ContactForm endpoint={FORMSPREE_ENDPOINT} />
        </div>
      </section>
    </>
  );
}

function ContactForm({ endpoint }: { endpoint: string }) {
  return (
    <form action={endpoint} method="POST" className="grid gap-3">
      <input type="hidden" name="_format" value="plain" />
      <div className="grid gap-2">
        <label className="text-sm font-medium">Nombre</label>
        <input
          name="nombre"
          className="h-11 rounded-2xl border border-[#1D422D] bg-[#1A1A1A] px-4 text-sm text-[#F5F5F5] shadow-sm outline-none"
          placeholder="Tu nombre"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Correo</label>
        <input
          name="email"
          type="email"
          className="h-11 rounded-2xl border border-[#1D422D] bg-[#1A1A1A] px-4 text-sm text-[#F5F5F5] shadow-sm outline-none"
          placeholder="tu@correo.com"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Mensaje</label>
        <textarea
          name="mensaje"
          rows={5}
          className="rounded-2xl border border-[#1D422D] bg-[#1A1A1A] p-4 text-sm text-[#F5F5F5] shadow-sm outline-none"
          placeholder="Cuéntanos en qué podemos colaborar…"
        />
      </div>
      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#32FF70] px-5 py-3 text-sm font-medium text-[#1A1A1A] shadow-sm hover:opacity-90"
      >
        Enviar
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-xs text-[#D3D3D3]">
        Te responderemos en el menor tiempo posible.
      </p>
    </form>
  );
}
