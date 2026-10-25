// Conversación con el servidor (/api/admin/*) y utilidades compartidas del modo administrador.

export class ErrorApi extends Error {
  constructor(mensaje: string, public estado: number) {
    super(mensaje);
  }
}

export async function api<T = any>(ruta: string, metodo = "GET", cuerpo?: unknown): Promise<T> {
  let r: Response;
  try {
    r = await fetch(`/api/admin/${ruta}`, {
      method: metodo,
      credentials: "same-origin",
      headers: { "X-Marin-Admin": "1", ...(cuerpo ? { "Content-Type": "application/json" } : {}) },
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new ErrorApi("No hay conexión a internet. Revisa tu conexión e intenta de nuevo.", 0);
  }
  const datos = await r.json().catch(() => ({}));
  if (!r.ok) throw new ErrorApi(datos.error ?? "Algo salió mal. Intenta de nuevo.", r.status);
  return datos as T;
}

// ---------------------------------------------------------------- Avisos (toasts)

const CLAVE_AVISO = "marin-aviso";

export function avisar(texto: string, tipo: "ok" | "error" = "ok") {
  let zona = document.querySelector<HTMLElement>(".adm-avisos");
  if (!zona) {
    zona = document.createElement("div");
    zona.className = "adm-avisos";
    zona.setAttribute("role", "status");
    zona.setAttribute("aria-live", "polite");
    document.body.append(zona);
  }
  const aviso = document.createElement("div");
  aviso.className = `adm-aviso adm-aviso--${tipo}`;
  aviso.textContent = texto;
  zona.append(aviso);
  setTimeout(() => aviso.classList.add("adm-aviso--saliendo"), tipo === "error" ? 7000 : 5000);
  setTimeout(() => aviso.remove(), tipo === "error" ? 7400 : 5400);
}

// Para mostrar un aviso después de cambiar de página (ej: al eliminar desde la ficha).
// Caduca a los pocos segundos para no aparecer en una visita posterior.
export function avisarAlLlegar(texto: string, segundos = 20, repetir = false) {
  try { sessionStorage.setItem(CLAVE_AVISO, JSON.stringify({ texto, vence: Date.now() + segundos * 1000, repetir })); } catch {}
}

export function olvidarAviso() {
  try { sessionStorage.removeItem(CLAVE_AVISO); } catch {}
}

export function mostrarAvisoPendiente() {
  try {
    const guardado = sessionStorage.getItem(CLAVE_AVISO);
    if (!guardado) return;
    const { texto, vence, repetir } = JSON.parse(guardado);
    // "repetir": en el Codespace la página puede recargarse varias veces seguidas al guardar
    if (!repetir || Date.now() >= vence) sessionStorage.removeItem(CLAVE_AVISO);
    if (Date.now() < vence) avisar(texto);
  } catch {}
}

// ---------------------------------------------------------------- Cambios "publicándose"
// Los cambios tardan 1–2 minutos en verse para todos (la página se vuelve a construir).
// Mientras tanto, el administrador los ve marcados como "Publicando…".

export interface Pendiente {
  tipo: "crear" | "editar" | "eliminar";
  slug: string;
  nombre: string;
  categoria: string;
  miniatura?: string;
  hora: number;
}

const CLAVE_PENDIENTES = "marin-pendientes";
const DURACION_MAXIMA = 10 * 60 * 1000;

export function leerPendientes(): Pendiente[] {
  try {
    const lista: Pendiente[] = JSON.parse(localStorage.getItem(CLAVE_PENDIENTES) ?? "[]");
    return lista.filter((p) => Date.now() - p.hora < DURACION_MAXIMA);
  } catch {
    return [];
  }
}

export function guardarPendientes(lista: Pendiente[]) {
  try { localStorage.setItem(CLAVE_PENDIENTES, JSON.stringify(lista)); } catch {}
}

export function agregarPendiente(p: Omit<Pendiente, "hora">) {
  const lista = leerPendientes().filter((x) => x.slug !== p.slug || (p.tipo === "editar" && x.tipo === "crear"));
  lista.push({ ...p, hora: Date.now() });
  guardarPendientes(lista);
}

// ---------------------------------------------------------------- Fotos
// La foto se reduce en el celular ANTES de subirla: de 4–5 MB a unos 200 KB.

export interface FotoPreparada {
  base64: string;
  tipo: string;
  miniatura: string;
}

function lienzoAJpegOWebp(lienzo: HTMLCanvasElement, calidad: number): Promise<Blob> {
  return new Promise((resolver, rechazar) => {
    lienzo.toBlob((webp) => {
      // Safari no sabe crear WebP: en ese caso usa JPG
      if (webp && webp.type === "image/webp") return resolver(webp);
      lienzo.toBlob((jpg) => (jpg ? resolver(jpg) : rechazar()), "image/jpeg", 0.85);
    }, "image/webp", calidad);
  });
}

function blobABase64(blob: Blob): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const lector = new FileReader();
    lector.onload = () => resolver(String(lector.result).split(",")[1]);
    lector.onerror = rechazar;
    lector.readAsDataURL(blob);
  });
}

async function cargarImagen(archivo: File): Promise<{ fuente: CanvasImageSource; ancho: number; alto: number }> {
  try {
    const bitmap = await createImageBitmap(archivo, { imageOrientation: "from-image" });
    return { fuente: bitmap, ancho: bitmap.width, alto: bitmap.height };
  } catch {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.src = url;
    await img.decode();
    return { fuente: img, ancho: img.naturalWidth, alto: img.naturalHeight };
  }
}

export async function prepararFoto(archivo: File): Promise<FotoPreparada> {
  const { fuente, ancho, alto } = await cargarImagen(archivo);
  const dibujar = (maximo: number) => {
    const escala = Math.min(1, maximo / Math.max(ancho, alto));
    const lienzo = document.createElement("canvas");
    lienzo.width = Math.round(ancho * escala);
    lienzo.height = Math.round(alto * escala);
    lienzo.getContext("2d")!.drawImage(fuente, 0, 0, lienzo.width, lienzo.height);
    return lienzo;
  };
  const blob = await lienzoAJpegOWebp(dibujar(1600), 0.82);
  return {
    base64: await blobABase64(blob),
    tipo: blob.type,
    miniatura: dibujar(480).toDataURL("image/jpeg", 0.7),
  };
}
