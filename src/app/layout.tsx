import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ágora Deportiva — Podcast",
    template: "%s | Ágora Deportiva",
  },
  description:
    "Conversaciones profundas con atletas, entrenadores y profesionales que están construyendo el deporte en Colombia. Menos ruido, más contexto.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Ágora Deportiva",
    images: [{ url: "/favicon-32.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${inter.className} flex min-h-full flex-col bg-[#1A1A1A] text-[#F5F5F5] antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
