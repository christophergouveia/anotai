import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático para empacotar o app no Tauri (e também servir como site estático).
  output: "export",
  images: {
    // Sem servidor Next, o otimizador de imagem precisa ser desligado.
    unoptimized: true,
  },
  // Tauri abre a partir de file://, então trailingSlash evita 404 em rotas.
  trailingSlash: true,
};

export default nextConfig;
