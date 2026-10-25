// Importa los muebles y sus fotos desde la página actual en Wix.
// Uso: node scripts/importar-wix.mjs
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

console.log("⛔ Script retirado: los muebles ahora viven en src/content/productos/*.json y se editan en /keystatic"); process.exit(0);

const SITIO = "https://www.industriasmarin.co";
const CARPETA_FOTOS = "public/img/productos";
const ARCHIVO_SALIDA = "src/data/productos.ts";
const CARPETA_CACHE = "scripts/.cache";

// Cada página de categoría en Wix → a qué espacio y categoría pertenece en la nueva página
const categorias = [
  { ruta: "alcobas",           espacio: "alcoba",   categoria: "Alcobas",            prefijo: "Alcoba" },
  { ruta: "armarios",          espacio: "alcoba",   categoria: "Armarios",           prefijo: "Armario" },
  { ruta: "salas",             espacio: "sala",     categoria: "Salas",              prefijo: "Sala" },
  { ruta: "mesas-de-centro-1", espacio: "sala",     categoria: "Mesas de centro",    prefijo: "Mesa de centro" },
  { ruta: "mesas-tv",          espacio: "sala",     categoria: "Mesas de TV",        prefijo: "Mesa de TV" },
  { ruta: "funcionales",       espacio: "sala",     categoria: "Consolas",           prefijo: "Consola" },
  { ruta: "Comedores",         espacio: "comedor",  categoria: "Comedores",          prefijo: "Comedor" },
  { ruta: "modulares",         espacio: "comedor",  categoria: "Bifet",              prefijo: "Bifet" },
  { ruta: "items",             espacio: "comedor",  categoria: "Bares",              prefijo: "Bar" },
  { ruta: "items-2",           espacio: "comedor",  categoria: "Vitrinas",           prefijo: "Vitrina" },
  { ruta: "cocinas",           espacio: "cocina",   categoria: "Cocinas integrales", prefijo: "Cocina" },
  { ruta: "oficina",           espacio: "oficina",  categoria: "Muebles de oficina", prefijo: "Escritorio" },
  { ruta: "items-1",           espacio: "detalles", categoria: "Mecedoras",          prefijo: "Mecedora" },
  { ruta: "items-1-1",         espacio: "detalles", categoria: "Percheros",          prefijo: "Perchero" },
  { ruta: "items-3",           espacio: "detalles", categoria: "Mesas decorativas",  prefijo: "Mesa" },
  { ruta: "decoracion",        espacio: "detalles", categoria: "Decoración",         prefijo: "" },
];

// ---------- Ayudantes ----------

const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

async function descargarTexto(url) {
  // 1) Si ya la descargamos antes, la leemos del disco (no molesta a Wix)
  const nombre = crypto.createHash("sha1").update(url).digest("hex") + ".html";
  const archivo = path.join(CARPETA_CACHE, nombre);
  try {
    return await fs.readFile(archivo, "utf8");
  } catch {
    // no está en caché: hay que pedirla
  }

  // 2) Si no, la pedimos con calma y reintentamos si Wix nos frena
  for (let intento = 1; intento <= 6; intento++) {
    await esperar(1200);
    const respuesta = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (importador Industrias Marin)" } });

    if (respuesta.ok) {
      const texto = await respuesta.text();
      await fs.mkdir(CARPETA_CACHE, { recursive: true });
      await fs.writeFile(archivo, texto);
      return texto;
    }

    // Un 404 no se arregla esperando; un 429 (muchas peticiones) o 5xx (falla de Wix) sí
    if (respuesta.status !== 429 && respuesta.status < 500) {
      throw new Error(`error ${respuesta.status} al abrir ${url}`);
    }

    const segundos = Number(respuesta.headers.get("retry-after")) || Math.min(15 * 2 ** (intento - 1), 120);
    console.log(`   ⏳ Wix pidió una pausa (${respuesta.status}). Espero ${segundos} s…`);
    await esperar(segundos * 1000);
  }

  throw new Error(`Wix sigue bloqueando ${url}. Vuelve a correr el script en unos minutos.`);
}

function decodificar(texto) {
  return texto
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Busca <meta property="og:..." content="..."> sin importar el orden de los atributos
function leerMeta(html, propiedad) {
  for (const etiqueta of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const nombre = etiqueta.match(/(?:property|name)="([^"]+)"/i)?.[1];
    if (nombre === propiedad) {
      return decodificar(etiqueta.match(/content="([^"]*)"/i)?.[1] ?? "");
    }
  }
  return null;
}

// En una página de categoría, los muebles son los enlaces internos con 2 niveles: /salas/denver
function enlacesDeMuebles(html) {
  const enlaces = new Set();
  for (const [, href] of html.matchAll(/href="([^"]+)"/gi)) {
    let url;
    try { url = new URL(decodificar(href), SITIO); } catch { continue; }
    if (url.hostname !== "www.industriasmarin.co") continue;
    const partes = url.pathname.split("/").filter(Boolean);
    if (partes.length === 2) enlaces.add(SITIO + url.pathname);
  }
  return [...enlaces];
}

// "Chester #2" → "chester-2", "Bélgica" → "belgica"
function crearSlug(texto) {
  return texto
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// .../media/ID~mv2.jpg/v1/fill/w_1069,h_715.../foto.jpg → .../media/ID~mv2.jpg (original)
const urlOriginal = (urlWix) => urlWix.split("/v1/")[0];

// "https://…/salas/denver" → "salas"
const primerSegmento = (url) => new URL(url).pathname.split("/")[1].toLowerCase();

// No antepone el tipo si el nombre ya lo dice ("Cama Cuna Paris", "Modular Bélgica", "Silla Pitufa")
const YA_DICEN_QUE_SON = ["cama", "modular", "repisa", "pie", "silla", "coqueta", "mesa"];
function nombreCompleto(nombre, prefijo) {
  const n = nombre.toLowerCase();
  if (!prefijo || n.startsWith(prefijo.toLowerCase()) || YA_DICEN_QUE_SON.some((p) => n.startsWith(p))) {
    return nombre;
  }
  return `${prefijo} ${nombre}`;
}

// Si la página no declara og:image, toma la imagen más ancha del contenido (los íconos son pequeños)
function mejorImagen(html) {
  let mejor = null;
  let anchoMejor = 300;
  for (const [url] of html.matchAll(/https:\/\/static\.wixstatic\.com\/media\/[^"'\s)]+/g)) {
    const ancho = Number(url.match(/w_(\d+)/)?.[1] ?? 0);
    if (ancho > anchoMejor) { mejor = url; anchoMejor = ancho; }
  }
  return mejor;
}

// Lee sitemap.xml y sus sub-sitemaps; devuelve las páginas con 2 niveles (/salas/denver)
async function urlsDelSitemap() {
  const paginas = new Set();
  const pendientes = [`${SITIO}/sitemap.xml`];
  const leidos = new Set();
  while (pendientes.length > 0) {
    const actual = pendientes.shift();
    if (leidos.has(actual)) continue;
    leidos.add(actual);
    let xml;
    try { xml = await descargarTexto(actual); }
    catch (error) { console.log(`⚠️  sitemap: ${error.message}`); continue; }
    for (const [, loc] of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
      const url = decodificar(loc);
      if (url.endsWith(".xml")) { pendientes.push(url); continue; }
      const ruta = new URL(url).pathname;
      if (ruta.split("/").filter(Boolean).length === 2) paginas.add(SITIO + ruta);
    }
  }
  return paginas;
}

// ---------- Protección para no borrar tus cambios ----------

const actual = await fs.readFile(ARCHIVO_SALIDA, "utf8").catch(() => "");
if (actual.includes("Importado desde Wix") && !process.argv.includes("--forzar")) {
  console.log(`⛔ ${ARCHIVO_SALIDA} ya fue importado antes y puede tener descripciones tuyas.`);
  console.log("   Si de verdad quieres reemplazarlo, corre: node scripts/importar-wix.mjs --forzar");
  process.exit(1);
}

// ---------- Importación ----------

await fs.mkdir(CARPETA_FOTOS, { recursive: true });

// 1) Recorre las categorías y aprende qué prefijo de URL usa cada una (/salas/…, /items/…)
const enlaces = new Set();
const votos = new Map(); // "salas" → Map(categoría → cuántas veces apareció)

for (const cat of categorias) {
  try {
    const html = await descargarTexto(`${SITIO}/${cat.ruta}`);
    for (const url of enlacesDeMuebles(html)) {
      enlaces.add(url);
      const prefijo = primerSegmento(url);
      const conteo = votos.get(prefijo) ?? new Map();
      conteo.set(cat, (conteo.get(cat) ?? 0) + 1);
      votos.set(prefijo, conteo);
    }
  } catch (error) {
    console.log(`⚠️  ${cat.categoria}: ${error.message}`);
  }
}

// Cada prefijo queda en la categoría donde más veces apareció
const categoriaDe = new Map(
  [...votos].map(([prefijo, conteo]) => [prefijo, [...conteo].sort((a, b) => b[1] - a[1])[0][0]])
);

// 2) El sitemap trae TODOS los muebles, incluso los escondidos tras "cargar más"
let soloEnSitemap = 0;
for (const url of await urlsDelSitemap()) {
  if (categoriaDe.has(primerSegmento(url)) && !enlaces.has(url)) {
    enlaces.add(url);
    soloEnSitemap++;
  }
}
console.log(`🔎 ${enlaces.size} páginas de muebles (${soloEnSitemap} solo estaban en el sitemap)`);

// 3) Ordena por categoría y visita cada mueble
const lista = [...enlaces]
  .filter((url) => categoriaDe.has(primerSegmento(url)))
  .map((url) => ({ url, cat: categoriaDe.get(primerSegmento(url)) }))
  .sort((a, b) => categorias.indexOf(a.cat) - categorias.indexOf(b.cat));

const productos = [];
const slugsUsados = new Set();
let categoriaActual = null;

for (const { url, cat } of lista) {
  if (cat !== categoriaActual) {
    console.log(`\n📂 ${cat.categoria}`);
    categoriaActual = cat;
  }
  if (url.endsWith("/title")) continue; // páginas vacías de plantilla de Wix

  try {
    const pagina = await descargarTexto(url);
    const original = leerMeta(pagina, "og:title")?.split(" | ")[0].trim();
    const imagen = leerMeta(pagina, "og:image") || mejorImagen(pagina);

    if (!original || !imagen) {
      console.log(`   –  sin foto, se omite: ${url}`);
      continue;
    }

    const nombre = nombreCompleto(original, cat.prefijo);
    let slug = crearSlug(nombre) || "mueble";
    const base = slug;
    for (let n = 2; slugsUsados.has(slug); n++) slug = `${base}-${n}`;
    slugsUsados.add(slug);

    const destino = path.join(CARPETA_FOTOS, `${slug}.webp`);
    const yaExiste = await fs.access(destino).then(() => true, () => false);

    if (!yaExiste) {
      const respuesta = await fetch(urlOriginal(imagen));
      if (!respuesta.ok) throw new Error(`no se pudo bajar la foto (${respuesta.status})`);
      const datos = Buffer.from(await respuesta.arrayBuffer());

      await sharp(datos)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(destino);
    }

    productos.push({ ...cat, slug, nombre, foto: `/img/productos/${slug}.webp`, fuente: url });
    console.log(`   ✓  ${nombre}`);
  } catch (error) {
    console.log(`   ⚠️  ${url}: ${error.message}`);
  }
}

// ---------- Escribir productos.ts ----------

const bloques = productos.map((p) => `  {
    // Original: ${p.fuente}
    slug: ${JSON.stringify(p.slug)},
    nombre: ${JSON.stringify(p.nombre)},
    espacio: ${JSON.stringify(p.espacio)},
    categoria: ${JSON.stringify(p.categoria)},
    foto: ${JSON.stringify(p.foto)},
  },`);

const contenido = `import type { SlugEspacio } from "./espacios";

export interface Producto {
  slug: string;            // va en la URL: /producto/denver (sin tildes ni espacios)
  nombre: string;
  espacio: SlugEspacio;
  categoria: string;       // debe coincidir EXACTO con una de las categorías del espacio
  descripcion?: string;    // opcional: se muestra en la ficha y en Google
  detalles?: string[];     // opcional: medidas, madera, color, piezas…
  foto?: string;           // ruta en /public
}

// Importado desde Wix el ${new Date().toISOString().slice(0, 10)}.
// Completa "descripcion" y "detalles" copiándolos de la página original (enlace en cada comentario).
export const productos: Producto[] = [
${bloques.join("\n")}
];
`;

await fs.writeFile(ARCHIVO_SALIDA, contenido);
console.log(`\n✅ ${productos.length} muebles importados → ${ARCHIVO_SALIDA}`);
console.log(`   Fotos en ${CARPETA_FOTOS}/`);