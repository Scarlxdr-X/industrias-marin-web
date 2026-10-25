// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://www.industriasmarin.co",
  // React solo se usa en el panel /keystatic; la página pública sigue sin JavaScript de React.
  integrations: [react(), keystatic()],
  // Toda la página se genera estática; solo /keystatic corre en un servidor (función de Netlify).
  // imageCDN: false → las fotos se optimizan al construir (con sharp), igual en tu Codespace y en Netlify.
  adapter: netlify({ imageCDN: false }),
});
