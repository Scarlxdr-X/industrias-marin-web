export interface Espacio {
  slug: string;          // va en la URL: /catalogo/alcoba
  nombre: string;
  foto: string;          // etiqueta de la foto (o ruta cuando la tengamos)
  categorias: string[];
}

export const espacios: Espacio[] = [
  { slug: "alcoba",   nombre: "Alcoba",   foto: "Alcoba Dinastía",       categorias: ["Alcobas", "Armarios"] },
  { slug: "sala",     nombre: "Sala",     foto: "Sala Denver",           categorias: ["Salas", "Mesas de centro", "Mesas de TV", "Consolas"] },
  { slug: "comedor",  nombre: "Comedor",  foto: "Comedor de 6 puestos",  categorias: ["Comedores", "Bifet", "Bares", "Vitrinas"] },
  { slug: "cocina",   nombre: "Cocina",   foto: "Cocina integral",       categorias: ["Cocinas integrales"] },
  { slug: "oficina",  nombre: "Oficina",  foto: "Escritorio de oficina", categorias: ["Escritorios", "Muebles de oficina"] },
  { slug: "detalles", nombre: "Detalles", foto: "Mecedora y cojines",    categorias: ["Mecedoras", "Percheros", "Mesas decorativas", "Decoración"] },
];