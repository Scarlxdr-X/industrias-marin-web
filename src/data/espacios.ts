export type SlugEspacio = "alcoba" | "sala" | "comedor" | "cocina" | "oficina" | "detalles";

export interface Espacio {
  slug: SlugEspacio;     // va en la URL: /catalogo/alcoba
  nombre: string;
  foto: string;          // texto alternativo de la portada
  categorias: string[];  // deben coincidir EXACTO con "categoria" en productos.ts
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