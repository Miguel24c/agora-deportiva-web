import Link from "next/link";
import Image from "next/image";
import { Headphones, Menu } from "lucide-react";

const SPOTIFY_URL =
  "https://open.spotify.com/show/0MkffeLIqljQ36aYBGJdzG?si=947f0a7e35f44709";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1D422D] bg-[#1A1A1A]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/favicon-32.png"
            alt="Ágora Deportiva"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-[#F5F5F5]">
              ÁGORA DEPORTIVA
            </div>
            <div className="text-xs text-[#D3D3D3]">Podcast</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/#inicio" className="text-[#D3D3D3] hover:opacity-90">
            Inicio
          </Link>
          <Link href="/episodios" className="text-[#D3D3D3] hover:opacity-90">
            Episodios
          </Link>
          <Link href="/#sobre" className="text-[#D3D3D3] hover:opacity-90">
            Sobre Ágora
          </Link>
          <Link href="/#contacto" className="text-[#D3D3D3] hover:opacity-90">
            Contacto
          </Link>
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#32FF70] px-4 py-2 text-sm font-medium text-[#1A1A1A] shadow-sm hover:opacity-90"
          >
            <Headphones className="h-4 w-4" />
            Escuchar ahora
          </a>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-2xl border border-[#1D422D] bg-[#1A1A1A] p-2 text-[#F5F5F5] shadow-sm md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
