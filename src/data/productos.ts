import type { SlugEspacio } from "./espacios";

export interface Producto {
  slug: string;            // va en la URL: /producto/alcoba-artica (sin tildes ni espacios)
  nombre: string;
  espacio: SlugEspacio;
  categoria: string;       // debe coincidir EXACTO con una de las categorías del espacio
  descripcion: string;
  detalles?: string[];     // opcional: medidas, materiales, piezas incluidas…
  foto?: string;           // opcional: ruta en /public, ej. "/img/productos/alcoba-artica.jpg"
}

export const productos: Producto[] = [
  {
    slug: "alcoba-artica",
    nombre: "Alcoba Ártica",
    espacio: "alcoba",
    categoria: "Alcobas",
    descripcion: "[Descripción corta de la Alcoba Ártica: estilo, madera y lo que la hace especial.]",
    detalles: ["[Medidas]", "[Piezas que incluye]", "[Tipo de madera]"],
  },
  {
    slug: "alcoba-dinastia",
    nombre: "Alcoba Dinastía",
    espacio: "alcoba",
    categoria: "Alcobas",
    descripcion: "[Descripción corta de la Alcoba Dinastía.]",
  },
  {
    slug: "sala-denver",
    nombre: "Sala Denver",
    espacio: "sala",
    categoria: "Salas",
    descripcion: "[Descripción corta de la Sala Denver.]",
  },
  {
    slug: "sala-dante",
    nombre: "Sala Dante",
    espacio: "sala",
    categoria: "Salas",
    descripcion: "[Descripción corta de la Sala Dante.]",
  },
  {
    slug: "consola-dubling",
    nombre: "Consola Dubling",
    espacio: "sala",
    categoria: "Consolas",
    descripcion: "[Descripción corta de la Consola Dubling con tapa en madera.]",
  },
  {
    slug: "bifet-domenico",
    nombre: "Bifet Doménico",
    espacio: "comedor",
    categoria: "Bifet",
    descripcion: "[Descripción corta del Bifet Doménico.]",
  },
  {
    slug: "cocina-integral",
    nombre: "Cocina integral",
    espacio: "cocina",
    categoria: "Cocinas integrales",
    descripcion: "[Descripción corta de las cocinas integrales a la medida.]",
  },
];