// Solo en desarrollo (npm run dev): deja que el panel de administración guarde
// directamente en los archivos de tu Codespace, en vez de hacer commits en GitHub.
import fs from "node:fs/promises";
import path from "node:path";

const RUTAS_PERMITIDAS = ["src/content/", "src/assets/productos/"];

// Los cambios se escriben 1,2 s DESPUÉS de responder: al cambiar un archivo, el servidor de
// desarrollo recarga la página, y así primero alcanza a verse el aviso de "guardado"
// (o a abrirse la página siguiente) en vez de cortarse a la mitad.
let cola = Promise.resolve();
function diferir(tarea) {
  cola = cola
    .then(() => new Promise((listo) => setTimeout(listo, 1200)))
    .then(tarea)
    .catch((error) => console.error("[almacen-local]", error));
}

export default function almacenLocal() {
  return {
    name: "almacen-local",
    hooks: {
      // En algunas máquinas (como Codespaces) "localhost" es IPv6 (::1) y el servidor de
      // desarrollo no escucharía en 127.0.0.1, que es donde el panel le habla. Lo fijamos en IPv4.
      "astro:config:setup": ({ config, updateConfig, command }) => {
        if (command === "dev" && !config.server.host) {
          updateConfig({ server: { host: "127.0.0.1" } });
        }
      },

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
              const contenido = Buffer.concat(partes);
              res.end("ok");
              return diferir(async () => {
                await fs.mkdir(path.dirname(absoluta), { recursive: true });
                await fs.writeFile(absoluta, contenido);
              });
            }

            if (req.method === "DELETE") {
              res.end("ok");
              return diferir(async () => {
                await fs.rm(absoluta, { force: true });
                // Si la carpeta de la foto quedó vacía, también se borra
                await fs.rmdir(path.dirname(absoluta)).catch(() => {});
              });
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
