// GET → datos actuales de la empresa · PUT → guardarlos
import type { APIRoute } from "astro";
import { almacenPara, exigirAdministrador, respuesta } from "../../../lib/admin/sesion";
import { ErrorDeDatos, editarEmpresa, leerEmpresa } from "../../../lib/admin/operaciones";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies }) => {
  const { error } = await exigirAdministrador(request, cookies);
  if (error) return error;
  return respuesta(await leerEmpresa(almacenPara(request)));
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  const { usuario, error } = await exigirAdministrador(request, cookies);
  if (error) return error;
  try {
    await editarEmpresa(almacenPara(request), await request.json(), usuario);
    return respuesta({ ok: true });
  } catch (e) {
    if (e instanceof ErrorDeDatos) return respuesta({ error: e.message }, 400);
    console.error(e);
    return respuesta({ error: "No se pudo guardar. Intenta de nuevo en un momento." }, 500);
  }
};
