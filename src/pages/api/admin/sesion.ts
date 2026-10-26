// POST   → iniciar sesión   { usuario, contrasena }  (en el Codespace: { modoPrueba: true })
// GET    → ¿hay sesión?     { usuario | null, modoPrueba }
// DELETE → cerrar sesión
import type { APIRoute } from "astro";
import {
  MODO_PRUEBA, cerrarSesion, comprobarCredenciales, estadoConfiguracion, iniciarSesion, respuesta, usuarioActual,
} from "../../../lib/admin/sesion";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, url }) => {
  // /api/admin/sesion?revisar → muestra si las claves secretas están puestas (nunca sus valores)
  if (url.searchParams.has("revisar")) return respuesta(estadoConfiguracion());
  return respuesta({ usuario: await usuarioActual(cookies), modoPrueba: MODO_PRUEBA });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (request.headers.get("X-Marin-Admin") !== "1") return respuesta({ error: "Solicitud no permitida" }, 403);
  const cuerpo = await request.json().catch(() => ({}));

  if (MODO_PRUEBA && cuerpo.modoPrueba) {
    await iniciarSesion(cookies, "prueba");
    return respuesta({ usuario: "prueba" });
  }

  const usuario = String(cuerpo.usuario ?? "").trim().toLowerCase();
  const contrasena = String(cuerpo.contrasena ?? "");
  if (usuario && contrasena && (await comprobarCredenciales(usuario, contrasena))) {
    await iniciarSesion(cookies, usuario);
    return respuesta({ usuario });
  }
  await new Promise((r) => setTimeout(r, 600)); // frena a quien intente adivinar contraseñas
  return respuesta({ error: "Usuario o contraseña incorrectos." }, 401);
};

export const DELETE: APIRoute = async ({ cookies }) => {
  cerrarSesion(cookies);
  return respuesta({ ok: true });
};
