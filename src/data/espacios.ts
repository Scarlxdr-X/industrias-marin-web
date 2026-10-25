export type SlugEspacio = "alcoba" | "sala" | "comedor" | "cocina" | "oficina" | "detalles";

export interface Espacio {
  slug: SlugEspacio;     // va en la URL: /catalogo/alcoba
  nombre: string;
  foto: string;          // texto alternativo de la portada
  categorias: string[];  // las opciones de "Categoría" que aparecen en el panel
}

export const espacios: Espacio[] = [
  {
    slug: "alcoba",
    nombre: "Alcoba",
    foto: "Alcoba en madera",
    categorias: ["Alcobas", "Armarios"],
  },
  {
    slug: "sala",
    nombre: "Sala",
    foto: "Sala en madera",
    categorias: ["Salas", "Mesas de centro", "Mesas de TV", "Consolas"],
  },
  {
    slug: "comedor",
    nombre: "Comedor",
    foto: "Comedor en madera",
    categorias: ["Comedores", "Bifet", "Bares", "Vitrinas"],
  },
  {
    slug: "cocina",
    nombre: "Cocina",
    foto: "Cocina integral",
    categorias: ["Cocinas integrales"],
  },
  {
    slug: "oficina",
    nombre: "Oficina",
    foto: "Escritorio de oficina",
    categorias: ["Muebles de oficina"],
  },
  {
    slug: "detalles",
    nombre: "Detalles",
    foto: "Mecedoras, percheros y decoración",
    categorias: ["Mecedoras", "Percheros", "Mesas decorativas", "Decoración"],
  },
];
// Todas las categorías en una lista: ["Alcobas", "Armarios", "Salas", …]
export const todasLasCategorias = espacios.flatMap((e) => e.categorias);

// "Mesas de centro" → "sala". La categoría ya dice a qué espacio pertenece el mueble.
export function espacioDeCategoria(categoria: string): SlugEspacio {
  const espacio = espacios.find((e) => e.categorias.includes(categoria));
  if (!espacio) throw new Error(`Categoría desconocida: "${categoria}"`);
  return espacio.slug;
}
