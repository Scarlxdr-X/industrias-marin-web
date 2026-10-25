// Solo en desarrollo (npm run dev): deja que el panel de administración guarde
// directamente en los archivos de tu Codespace, en vez de hacer commits en GitHub.
import fs from "node:fs/promises";
import path from "node:path";

const RUTAS_PERMITIDAS = ["src/content/", "src/assets/productos/"];

export default function almacenLocal() {
  return {
    name: "almacen-local",
    hooks: {
      "astro:server:setup": ({ server }) => {
        const raiz = server.config.root;

        server.middlewares.use("/__almacen-local", async (req, res) => {
          try {
            const url = new URL(req.url ?? "/", "http://local");
            const relativa = url.searchParams.get("ruta") ?? "";
            const absoluta = path.resolve(raiz, relativa);
            const permitida =
              !relativa.includes("..") &&
              RUTAS_PERMITIDAS.some((r) => relativa.startsWith(r)) &&
              absoluta.startsWith(raiz);
            if (!permitida) {
              res.statusCode = 403;
              return res.end("Ruta no permitida");
            }

            if (req.method === "GET") {
              const datos = await fs.readFile(absoluta).catch(() => null);
              if (!datos) {
                res.statusCode = 404;
                return res.end();
              }
              return res.end(datos);
            }

            if (req.method === "PUT") {
              const partes = [];
              for await (const parte of req) partes.push(parte);
              await fs.mkdir(path.dirname(absoluta), { recursive: true });
              await fs.writeFile(absoluta, Buffer.concat(partes));
              return res.end("ok");
            }

            if (req.method === "DELETE") {
              await fs.rm(absoluta, { force: true });
              // Si la carpeta de la foto quedó vacía, también se borra
              await fs.rmdir(path.dirname(absoluta)).catch(() => {});
              return res.end("ok");
            }

            res.statusCode = 405;
            res.end();
          } catch (error) {
            res.statusCode = 500;
            res.end(String(error));
          }
        });
      },
    },
  };
}
