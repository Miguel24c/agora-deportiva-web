import { Download, Clock } from "lucide-react";

/**
 * Botón de descarga del PDF de una ficha.
 *
 * Hoy la descarga es directa y pública. Para añadir captura de correo más
 * adelante, este es el único archivo a cambiar: convertirlo en un Client
 * Component que muestre el formulario (p. ej. MailerLite) y, al enviarlo,
 * revele este mismo enlace. La página de detalle no necesita cambios.
 */
export default function DescargaRecurso({
  pdfUrl,
  disponible,
  slug,
}: {
  pdfUrl: string;
  disponible: boolean;
  slug: string;
}) {
  if (!disponible) {
    return (
      <p
        className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-dashed border-agora-pine px-6 py-3 text-sm font-medium text-agora-gray"
        role="status"
      >
        <Clock className="h-4 w-4" aria-hidden="true" />
        PDF disponible muy pronto
      </p>
    );
  }

  return (
    <a
      href={pdfUrl}
      download={`agora-deportiva-${slug}.pdf`}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-agora-neon px-6 py-3 text-sm font-semibold text-agora-deep shadow-sm transition hover:opacity-90"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Descargar ficha en PDF
    </a>
  );
}
