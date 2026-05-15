import Link from "next/link";
import Image from "next/image";

const SPOTIFY_URL =
  "https://open.spotify.com/show/0MkffeLIqljQ36aYBGJdzG?si=947f0a7e35f44709";
const YOUTUBE_URL =
  "https://www.youtube.com/channel/UC9jvQobbQgDEZD784CKtj0w";

const links = [
  { label: "Episodios", href: "/episodios" },
  { label: "Sobre Ágora", href: "/#sobre" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Spotify", href: SPOTIFY_URL },
  { label: "YouTube", href: YOUTUBE_URL },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1D422D]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/favicon-32.png"
              alt="Ágora Deportiva"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <div>
              <div className="text-sm font-semibold tracking-wide text-[#F5F5F5]">
                ÁGORA DEPORTIVA
              </div>
              <div className="text-xs text-[#D3D3D3]">
                Donde el deporte se encuentra con las ideas.
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap gap-3 text-sm">
            {links.map((l) => {
              const isExternal = l.href.startsWith("http");
              return isExternal ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D3D3D3] hover:opacity-90"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[#D3D3D3] hover:opacity-90"
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-xs text-[#D3D3D3]">
          © {new Date().getFullYear()} Ágora Deportiva. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
