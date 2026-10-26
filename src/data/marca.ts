// Fotos e íconos de la empresa (no de productos), en src/assets/marca/.
// Se traen de Wix con: node scripts/traer-fotos-marca.mjs
// Si alguna no existe todavía, los componentes muestran un respaldo en su lugar.
import type { ImageMetadata } from "astro";

type Modulo = { default: ImageMetadata };

const fotos = import.meta.glob<Modulo>("../assets/marca/*.{webp,jpg,jpeg,png}", { eager: true });
const iconos = import.meta.glob<Modulo>("../assets/marca/iconos/*.png", { eager: true });
const logos = import.meta.glob<Modulo>("../assets/marca/reconocimientos/*.{png,jpg,webp}", { eager: true });

export const fotoMarca = (archivo: string): ImageMetadata | null =>
  fotos[`../assets/marca/${archivo}`]?.default ?? null;

export const iconoMarca = (archivo: string): ImageMetadata | null =>
  iconos[`../assets/marca/iconos/${archivo}`]?.default ?? null;

// Descripción de cada reconocimiento (para el texto alternativo y la leyenda).
// Si agregas uno nuevo en src/assets/marca/reconocimientos/, agrega aquí su descripción.
const descripciones: Record<string, string> = {
  "01": "Mérito Empresarial de la Cámara de Comercio de Buga y reconocimiento del Municipio de El Cerrito",
  "02": "Medalla al Mérito Empresarial, Cámara de Comercio de Buga",
  "03": "Reconocimiento de Bodega del Mueble",
  "04": "Reconocimiento de Espumas del Valle S.A. por 20 años de labores",
  "05": "Felicitaciones por la Medalla al Mérito Empresarial",
  "06": "Reconocimiento del grupo de colaboradores por 30 años",
  "07": "Mérito al Emprendimiento, Fundación Centro Cultural Universitas",
  "08": "Congratulaciones y reconocimiento a la familia Marín",
  "09": "Reconocimiento de Bodega del Mueble por la alianza estratégica",
};

export const reconocimientos = Object.keys(logos)
  .sort()
  .map((ruta) => {
    const numero = ruta.match(/(\d+)\.\w+$/)?.[1] ?? "";
    return { foto: logos[ruta].default, descripcion: descripciones[numero] ?? "Reconocimiento a Industrias Marín" };
  });
