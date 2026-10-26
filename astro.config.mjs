// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import almacenLocal from "./integraciones/almacen-local.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://www.industriasmarin.co",
  integrations: [almacenLocal()],
  // No usamos las sesiones de Astro (el modo administrador tiene su propia cookie firmada).
  // Desactivarlas evita que Cloudflare pida un almacenamiento KV, que rompía las vistas previas.
  session: false,
  // Toda la página se genera estática. Solo /api/admin/* corre en el servidor (un Worker de Cloudflare).
  // imageService "compile": las fotos se optimizan al construir, con sharp.
  adapter: cloudflare({ imageService: "compile", prerenderEnvironment: "node" }),
});
