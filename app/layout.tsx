import type { Metadata } from "next"
import "./globals.css";
import { UpdateChecker } from "./components/UpdateChecker";
import { NotesProvider } from "./context/NotesContext";

export const metadata: Metadata = {
  title: "Anotaí!",
  description: "Anotaí! é uma aplicação web para anotações rápidas e organizadas.",
  keywords: ["anotaí", "notas", "organização", "produtividade"],
  authors: [{ name: "Christopher", url: "https://github.com/christophergouveia/anotai" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="min-h-full flex flex-col">
        <NotesProvider>
          {children}
          <UpdateChecker />
        </NotesProvider>
      </body>
    </html>
  );
}
