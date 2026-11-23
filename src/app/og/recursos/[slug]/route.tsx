import { ImageResponse } from "next/og";
import { getAllRecursos, getRecursoBySlug } from "@/lib/recursos";

// Imagen OG automática (1200×630) para recursos sin `ogImage` propia.
// Se genera en el build: /og/recursos/<slug>

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllRecursos().map((r) => ({ slug: r.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRecursoBySlug(slug);
  if (!r) return new Response("No encontrado", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0F0F0F",
          color: "#F5F5F5",
          borderLeft: "24px solid #32FF70",
        }}
      >
        <div style={{ display: "flex", gap: 16, fontSize: 28, color: "#32FF70", letterSpacing: 4 }}>
          <span>RECURSOS</span>
          <span style={{ color: "#D3D3D3" }}>· {r.categoria.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", fontSize: r.titulo.length > 60 ? 64 : 76, fontWeight: 700, lineHeight: 1.05 }}>
          {r.titulo}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#D3D3D3" }}>
          <span>Ágora Deportiva</span>
          <span>agoradeportiva.com/recursos</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
