import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polaris Visual Compiler",
  description: "Entorno visual interactivo para construcción de AST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="h-screen w-screen flex flex-col overflow-hidden">
        {children}
      </body>
    </html>
  );
}