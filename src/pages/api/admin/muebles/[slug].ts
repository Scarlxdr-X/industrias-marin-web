// GET    → datos actuales de un mueble (para llenar el formulario de edición)
// PUT    → guardar cambios
// DELETE → eliminar el mueble y su foto
import type { APIRoute } from "astro";
import { almacenPara, exigirAdministrador, respuesta } from "../../../../lib/admin/sesion";
import { ErrorDeDatos, editarMueble, eliminarMueble, leerMueble } from "../../../../lib/admin/operaciones";

export const prerender = false;

const manejarError = (e: unknown) => {
  if (e instanceof ErrorDeDatos) return respuesta({ error: e.message }, 400);
  console.error(e);
  return respuesta({ error: "No se pudo completar. Intenta de nuevo en un momento." }, 500);
};

export const GET: APIRoute = async ({ request, cookies, params }) => {
  const { error } = await exigirAdministrador(request, cookies);
  if (error) return error;
  try {
    const mueble = await leerMueble(almacenPara(request), params.slug!);
    return mueble ? respuesta(mueble) : respuesta({ error: "Ese mueble ya no existe." }, 404);
  } catch (e) {
    return manejarError(e);
  }
};

export const PUT: APIRoute = async ({ request, cookies, params }) => {
  const { usuario, error } = await exigirAdministrador(request, cookies);
  if (error) return error;
  try {
    await editarMueble(almacenPara(request), params.slug!, await request.json(), usuario);
    return respuesta({ ok: true });
  } catch (e) {
    return manejarError(e);
  }
};

export const DELETE: APIRoute = async ({ request, cookies, params }) => {
  const { usuario, error } = await exigirAdministrador(request, cookies);
  if (error) return error;
  try {
    return respuesta(await eliminarMueble(almacenPara(request), params.slug!, usuario));
  } catch (e) {
    return manejarError(e);
  }
};
