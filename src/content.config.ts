import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { todasLasCategorias } from "./data/espacios";

// Cada mueble es un archivo JSON en src/content/productos/ (el modo administrador los crea y edita).
// Si un archivo tiene un error (categoría inexistente, nombre vacío…), `npm run build` falla
// diciendo cuál es, así un error nunca llega a publicarse.
const productos = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/productos" }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string().min(1),
      categoria: z.string().refine((c) => todasLasCategorias.includes(c), {
        error: "La categoría no existe en src/data/espacios.ts",
      }),
      descripcion: z.string().default(""),
      detalles: z.array(z.string()).default([]),
      foto: image().nullable().optional(),
    }),
});

export const collections = { productos };
