import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import BgFx from "@/components/BgFx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Duelowatch — Torneio Oficial do Akira",
  description: "Plataforma oficial do torneio Duelowatch — acompanhe o chaveamento, partidas e pódio ao vivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-fg">
        <BgFx />
        
        {/* Camada do conteúdo: Fica na frente do fundo! */}
        <div className="relative z-10 flex-1 w-full">
          {children}
        </div>

      </body>
    </html>
  );
}