// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import almacenLocal from "./integraciones/almacen-local.mjs";
import os from "node:os";
import path from "node:path";

// En Cloudflare, "npm clean-install" borra node_modules (y con él la caché de Astro) antes de
// cada construcción, así que las 200+ fotos se volvían a optimizar siempre (~45 s).
// Guardamos esa caché dentro de la carpeta de npm, que Cloudflare sí conserva entre construcciones.
const enCloudflare = Boolean(process.env.WORKERS_CI || process.env.CI);

// https://astro.build/config
export default defineConfig({
  site: "https://www.industriasmarin.co",
  cacheDir: enCloudflare ? path.join(os.homedir(), ".npm", "_astro-cache") : undefined,
  integrations: [almacenLocal()],
  // No usamos las sesiones de Astro (el modo administrador tiene su propia cookie firmada).
  // Desactivarlas evita que Cloudflare pida un almacenamiento KV, que rompía las vistas previas.
  session: false,
  // Toda la página se genera estática. Solo /api/admin/* corre en el servidor (un Worker de Cloudflare).
  // imageService "compile": las fotos se optimizan al construir, con sharp.
  adapter: cloudflare({ imageService: "compile", prerenderEnvironment: "node" }),
});
