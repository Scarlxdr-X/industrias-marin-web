// POST → crear un mueble nuevo
import type { APIRoute } from "astro";
import { almacenPara, exigirAdministrador, respuesta } from "../../../../lib/admin/sesion";
import { ErrorDeDatos, crearMueble } from "../../../../lib/admin/operaciones";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const { usuario, error } = await exigirAdministrador(request, cookies);
  if (error) return error;
  try {
    const slug = await crearMueble(almacenPara(request), await request.json(), usuario);
    return respuesta({ slug }, 201);
  } catch (e) {
    if (e instanceof ErrorDeDatos) return respuesta({ error: e.message }, 400);
    console.error(e);
    return respuesta({ error: "No se pudo guardar. Intenta de nuevo en un momento." }, 500);
  }
};
