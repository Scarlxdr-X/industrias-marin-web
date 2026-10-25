// Lo que puede hacer el modo administrador: crear, editar y eliminar muebles,
// y cambiar los datos de la empresa. Todo pasa por el "almacén" (GitHub o archivos locales).
import { espacioDeCategoria, todasLasCategorias } from "../../data/espacios";
import { base64ABytes, type Almacen, type Cambio } from "./almacen";

export class ErrorDeDatos extends Error {}

const RUTA_PRODUCTOS = "src/content/productos";
const RUTA_FOTOS = "src/assets/productos";
const RUTA_PORTADAS = "src/content/portadas.json";
const RUTA_EMPRESA = "src/content/empresa.json";

const rutaJson = (slug: string) => `${RUTA_PRODUCTOS}/${slug}.json`;
const decodificar = (bytes: Uint8Array | null) => (bytes ? JSON.parse(new TextDecoder().decode(bytes)) : null);
const aJson = (datos: unknown) => JSON.stringify(datos, null, 2) + "\n";

// "Alcoba Ártica #2" → "alcoba-artica-2"
export function crearSlug(texto: string) {
  return texto
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// ---------------------------------------------------------------- Validación

interface Entrada {
  nombre?: unknown;
  categoria?: unknown;
  descripcion?: unknown;
  detalles?: unknown;
  portada?: unknown;
  foto?: { base64?: unknown; tipo?: unknown } | null;
}

const TIPOS_FOTO: Record<string, string> = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" };
const MAX_FOTO_BYTES = 4 * 1024 * 1024;

function texto(valor: unknown, campo: string, { min = 0, max = 500 } = {}) {
  const t = typeof valor === "string" ? valor.trim() : "";
  if (t.length < min) throw new ErrorDeDatos(min === 1 ? `Falta ${campo}.` : `${campo} es muy corto.`);
  if (t.length > max) throw new ErrorDeDatos(`${campo} es muy largo (máximo ${max} caracteres).`);
  return t;
}

function validarMueble(entrada: Entrada, { fotoObligatoria = false } = {}) {
  const nombre = texto(entrada.nombre, "el nombre", { min: 1, max: 80 });
  const categoria = texto(entrada.categoria, "la categoría", { min: 1, max: 60 });
  if (!todasLasCategorias.includes(categoria)) throw new ErrorDeDatos("Esa categoría no existe.");
  const descripcion = texto(entrada.descripcion, "La descripción", { max: 600 });
  const detalles = (Array.isArray(entrada.detalles) ? entrada.detalles : [])
    .map((d) => texto(d, "Un detalle", { max: 120 }))
    .filter(Boolean)
    .slice(0, 15);

  let foto: { bytes: Uint8Array; extension: string } | null = null;
  if (entrada.foto && typeof entrada.foto.base64 === "string") {
    const extension = TIPOS_FOTO[String(entrada.foto.tipo)];
    if (!extension) throw new ErrorDeDatos("La foto debe ser JPG, PNG o WebP.");
    const bytes = base64ABytes(entrada.foto.base64);
    if (bytes.length > MAX_FOTO_BYTES) throw new ErrorDeDatos("La foto es demasiado pesada.");
    foto = { bytes, extension };
  } else if (fotoObligatoria) {
    throw new ErrorDeDatos("Agrega una foto del mueble.");
  }

  return { datos: { nombre, categoria, descripcion, detalles }, foto, portada: entrada.portada === true };
}

// La portada de cada espacio vive en un solo archivo: { "alcoba": "alcoba-dinastia", … }
async function cambioDePortada(almacen: Almacen, slug: string, categoria: string, portada: boolean): Promise<Cambio[]> {
  const portadas: Record<string, string> = decodificar(await almacen.leer(RUTA_PORTADAS)) ?? {};
  const antes = JSON.stringify(portadas);
  const espacio = espacioDeCategoria(categoria);

  // Si el mueble cambió de espacio o se desmarcó, deja de ser portada donde estaba
  for (const [e, s] of Object.entries(portadas)) {
    if (s === slug && (e !== espacio || !portada)) delete portadas[e];
  }
  if (portada) portadas[espacio] = slug;

  return JSON.stringify(portadas) === antes ? [] : [{ ruta: RUTA_PORTADAS, contenido: aJson(portadas) }];
}

// ---------------------------------------------------------------- Muebles

export async function leerMueble(almacen: Almacen, slug: string) {
  const datos = decodificar(await almacen.leer(rutaJson(slug)));
  if (!datos) return null;
  const portadas: Record<string, string> = decodificar(await almacen.leer(RUTA_PORTADAS)) ?? {};
  return {
    slug,
    nombre: datos.nombre,
    categoria: datos.categoria,
    descripcion: datos.descripcion ?? "",
    detalles: datos.detalles ?? [],
    portada: portadas[espacioDeCategoria(datos.categoria)] === slug,
    tieneFoto: Boolean(datos.foto),
  };
}

export async function crearMueble(almacen: Almacen, entrada: Entrada, autor: string) {
  const { datos, foto, portada } = validarMueble(entrada, { fotoObligatoria: true });

  // Dirección web única: si "alcoba-roma" ya existe, usa "alcoba-roma-2", "alcoba-roma-3"…
  const base = crearSlug(datos.nombre) || "mueble";
  let slug = base;
  for (let n = 2; await almacen.leer(rutaJson(slug)); n++) slug = `${base}-${n}`;

  const cambios: Cambio[] = [];
  const archivoFoto = `foto.${foto!.extension}`;
  cambios.push({ ruta: `${RUTA_FOTOS}/${slug}/${archivoFoto}`, contenido: foto!.bytes });
  cambios.push({
    ruta: rutaJson(slug),
    contenido: aJson({ ...datos, foto: `../../assets/productos/${slug}/${archivoFoto}` }),
  });
  cambios.push(...(await cambioDePortada(almacen, slug, datos.categoria, portada)));

  await almacen.guardar(cambios, `Agregar mueble: ${datos.nombre} (por ${autor})`);
  return slug;
}

export async function editarMueble(almacen: Almacen, slug: string, entrada: Entrada, autor: string) {
  const actual = decodificar(await almacen.leer(rutaJson(slug)));
  if (!actual) throw new ErrorDeDatos("Ese mueble ya no existe.");
  const { datos, foto, portada } = validarMueble(entrada);

  const cambios: Cambio[] = [];
  let rutaFoto: string | null = actual.foto ?? null;
  if (foto) {
    const nueva = `../../assets/productos/${slug}/foto.${foto.extension}`;
    if (rutaFoto && rutaFoto !== nueva) {
      cambios.push({ ruta: rutaFoto.replace("../../assets/productos/", `${RUTA_FOTOS}/`), borrar: true });
    }
    cambios.push({ ruta: `${RUTA_FOTOS}/${slug}/foto.${foto.extension}`, contenido: foto.bytes });
    rutaFoto = nueva;
  }
  cambios.push({ ruta: rutaJson(slug), contenido: aJson({ ...datos, foto: rutaFoto }) });
  cambios.push(...(await cambioDePortada(almacen, slug, datos.categoria, portada)));

  await almacen.guardar(cambios, `Editar mueble: ${datos.nombre} (por ${autor})`);
}

export async function eliminarMueble(almacen: Almacen, slug: string, autor: string) {
  const actual = decodificar(await almacen.leer(rutaJson(slug)));
  if (!actual) throw new ErrorDeDatos("Ese mueble ya no existe.");

  const cambios: Cambio[] = [{ ruta: rutaJson(slug), borrar: true }];
  if (actual.foto) {
    cambios.push({ ruta: actual.foto.replace("../../assets/productos/", `${RUTA_FOTOS}/`), borrar: true });
  }
  cambios.push(...(await cambioDePortada(almacen, slug, actual.categoria, false)));

  await almacen.guardar(cambios, `Eliminar mueble: ${actual.nombre} (por ${autor})`);
  return { nombre: actual.nombre as string, espacio: espacioDeCategoria(actual.categoria) };
}

// ---------------------------------------------------------------- Empresa

export const CAMPOS_EMPRESA = {
  telefono: { etiqueta: "Teléfono fijo", min: 7, max: 30 },
  celular: { etiqueta: "Celular / WhatsApp", min: 10, max: 30 },
  mensajeWhatsapp: { etiqueta: "Mensaje inicial de WhatsApp", min: 1, max: 300 },
  horario: { etiqueta: "Horario de atención", min: 1, max: 120 },
  entregaEstimada: { etiqueta: "Tiempo de entrega estimado", min: 1, max: 60 },
  direccionLinea1: { etiqueta: "Dirección", min: 1, max: 120 },
  direccionLinea2: { etiqueta: "Ciudad y departamento", min: 1, max: 120 },
  instagram: { etiqueta: "Instagram (enlace)", min: 1, max: 200 },
  facebook: { etiqueta: "Facebook (enlace)", min: 1, max: 200 },
} as const;

export async function leerEmpresa(almacen: Almacen) {
  return decodificar(await almacen.leer(RUTA_EMPRESA)) ?? {};
}

export async function editarEmpresa(almacen: Almacen, entrada: Record<string, unknown>, autor: string) {
  const datos: Record<string, string> = {};
  for (const [campo, { etiqueta, min, max }] of Object.entries(CAMPOS_EMPRESA)) {
    datos[campo] = texto(entrada[campo], etiqueta, { min, max });
  }
  if ((datos.celular.match(/\d/g) ?? []).length !== 10) {
    throw new ErrorDeDatos("El celular debe tener 10 dígitos, ej: 314 792 5624.");
  }
  for (const red of ["instagram", "facebook"]) {
    if (!/^https:\/\//.test(datos[red])) throw new ErrorDeDatos(`El enlace de ${red} debe empezar por https://`);
  }
  await almacen.guardar([{ ruta: RUTA_EMPRESA, contenido: aJson(datos) }], `Actualizar datos de la empresa (por ${autor})`);
}
