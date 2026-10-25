// Inicio de sesión del modo administrador.
//
// Los usuarios viven en la variable secreta ADMIN_USUARIOS de Cloudflare, con este formato
// (una línea o un ";" por usuario; el hash se genera con: node scripts/crear-usuario.mjs):
//
//   maria:pbkdf2$10000$<sal>$<hash>;adrian:pbkdf2$10000$<sal>$<hash>
//
// Al entrar, el navegador recibe una cookie firmada (HttpOnly: JavaScript no puede leerla)
// que dura 30 días. Se firma con la variable secreta SESION_SECRETO.
import type { AstroCookies } from "astro";
import { env } from "cloudflare:workers";
import { AlmacenGitHub, AlmacenLocal, base64ABytes, bytesABase64, type Almacen } from "./almacen";

export const MODO_PRUEBA = import.meta.env.DEV;

const COOKIE = "marin_sesion";
const COOKIE_PISTA = "marin_admin"; // no es secreta: solo le avisa a la página que muestre los controles
const DURACION_SEGUNDOS = 60 * 60 * 24 * 30;
const codificador = new TextEncoder();

const variable = (nombre: string) => (env as Record<string, string | undefined>)[nombre];

function secreto() {
  const valor = variable("SESION_SECRETO");
  if (valor) return valor;
  if (MODO_PRUEBA) return "secreto-solo-para-desarrollo";
  throw new Error("Falta la variable secreta SESION_SECRETO en Cloudflare");
}

const aBase64Url = (bytes: Uint8Array) =>
  bytesABase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const deBase64Url = (texto: string) =>
  base64ABytes(texto.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((texto.length + 3) % 4));

async function firmar(texto: string) {
  const clave = await crypto.subtle.importKey(
    "raw", codificador.encode(secreto()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  return aBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", clave, codificador.encode(texto))));
}

function igualesSeguro(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diferencia = 0;
  for (let i = 0; i < a.length; i++) diferencia |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diferencia === 0;
}

// ---------------------------------------------------------------- Contraseñas

async function verificarContrasena(contrasena: string, guardado: string) {
  const [algoritmo, iteraciones, sal, hash] = guardado.split("$");
  if (algoritmo !== "pbkdf2" || !iteraciones || !sal || !hash) return false;
  const clave = await crypto.subtle.importKey("raw", codificador.encode(contrasena), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: base64ABytes(sal), iterations: Number(iteraciones) },
    clave,
    256,
  );
  return igualesSeguro(bytesABase64(new Uint8Array(bits)), hash);
}

function usuariosRegistrados(): Map<string, string> {
  const usuarios = new Map<string, string>();
  for (const linea of (variable("ADMIN_USUARIOS") ?? "").split(/[;\n]/)) {
    const separador = linea.indexOf(":");
    if (separador > 0) {
      usuarios.set(linea.slice(0, separador).trim().toLowerCase(), linea.slice(separador + 1).trim());
    }
  }
  return usuarios;
}

export async function comprobarCredenciales(usuario: string, contrasena: string) {
  const guardado = usuariosRegistrados().get(usuario.trim().toLowerCase());
  if (!guardado) return false;
  return verificarContrasena(contrasena, guardado);
}

// ---------------------------------------------------------------- Cookies de sesión

export async function iniciarSesion(cookies: AstroCookies, usuario: string) {
  const vence = Math.floor(Date.now() / 1000) + DURACION_SEGUNDOS;
  const datos = aBase64Url(codificador.encode(JSON.stringify({ u: usuario, v: vence })));
  const opciones = { path: "/", maxAge: DURACION_SEGUNDOS, sameSite: "strict" as const, secure: !MODO_PRUEBA };
  cookies.set(COOKIE, `${datos}.${await firmar(datos)}`, { ...opciones, httpOnly: true });
  cookies.set(COOKIE_PISTA, "1", opciones);
}

export function cerrarSesion(cookies: AstroCookies) {
  cookies.delete(COOKIE, { path: "/" });
  cookies.delete(COOKIE_PISTA, { path: "/" });
}

export async function usuarioActual(cookies: AstroCookies): Promise<string | null> {
  const valor = cookies.get(COOKIE)?.value;
  if (!valor) return null;
  const [datos, firma] = valor.split(".");
  if (!datos || !firma || !igualesSeguro(await firmar(datos), firma)) return null;
  try {
    const { u, v } = JSON.parse(new TextDecoder().decode(deBase64Url(datos)));
    return typeof u === "string" && v > Date.now() / 1000 ? u : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- Ayudantes para la API

export function respuesta(cuerpo: unknown, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

// Protege cada acción: exige sesión válida y la cabecera propia del modo administrador
// (otra página web no puede enviarla, así que esto también evita ataques CSRF).
export async function exigirAdministrador(request: Request, cookies: AstroCookies) {
  if (request.method !== "GET" && request.headers.get("X-Marin-Admin") !== "1") {
    return { error: respuesta({ error: "Solicitud no permitida" }, 403) };
  }
  const usuario = await usuarioActual(cookies);
  if (!usuario) return { error: respuesta({ error: "Tu sesión terminó. Vuelve a iniciar sesión." }, 401) };
  return { usuario };
}

export function almacenPara(request: Request): Almacen {
  if (MODO_PRUEBA) {
    // Siempre por http y 127.0.0.1: en Codespaces la URL llega como "https://localhost:4321"
    // (por el reenvío de puertos), pero el servidor local de desarrollo solo habla http.
    const puerto = new URL(request.url).port || "4321";
    return new AlmacenLocal(`http://127.0.0.1:${puerto}`);
  }
  const token = variable("GITHUB_TOKEN");
  if (!token) throw new Error("Falta la variable secreta GITHUB_TOKEN en Cloudflare");
  return new AlmacenGitHub(token, variable("GITHUB_REPO") ?? "", variable("GITHUB_RAMA") ?? "main");
}
