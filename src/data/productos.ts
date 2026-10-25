import { getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import { espacioDeCategoria, type SlugEspacio } from "./espacios";

export interface Producto {
  slug: string;              // nombre del archivo JSON → URL /producto/<slug>
  nombre: string;
  espacio: SlugEspacio;      // se deduce de la categoría
  categoria: string;
  descripcion: string;
  detalles: string[];
  foto?: ImageMetadata | null;
}

// Lee los JSON de src/content/productos, agrega el espacio y ordena alfabéticamente
export async function obtenerProductos(): Promise<Producto[]> {
  const entradas = await getCollection("productos");
  return entradas
    .map((e) => ({ slug: e.id, ...e.data, espacio: espacioDeCategoria(e.data.categoria) }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}
