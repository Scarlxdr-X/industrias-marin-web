// "Almacén": dónde se guardan los cambios que hace el modo administrador.
//
// - En producción: hace un commit en GitHub. Cloudflare detecta el commit, vuelve a construir
//   la página y en 1–2 minutos el cambio es visible para todos.
// - En desarrollo (npm run dev): escribe directo en los archivos de tu Codespace, a través
//   de la integración integraciones/almacen-local.mjs.

export type Cambio =
  | { ruta: string; contenido: Uint8Array | string }
  | { ruta: string; borrar: true };

export interface Almacen {
  leer(ruta: string): Promise<Uint8Array | null>;
  guardar(cambios: Cambio[], mensaje: string): Promise<void>;
}

const codificador = new TextEncoder();
const aBytes = (c: Uint8Array | string) => (typeof c === "string" ? codificador.encode(c) : c);

export function bytesABase64(bytes: Uint8Array): string {
  let binario = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binario += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binario);
}

export function base64ABytes(base64: string): Uint8Array {
  const binario = atob(base64.replace(/\s/g, ""));
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return bytes;
}

// ---------------------------------------------------------------- Desarrollo

export class AlmacenLocal implements Almacen {
  // El servidor de desarrollo puede estar escuchando en IPv4 (127.0.0.1) o en IPv6 (::1),
  // según la máquina (en Codespaces suele ser IPv6). Se prueban ambas y se recuerda la que sirve.
  private static origenQueFunciona: string | null = null;

  constructor(private puerto: string) {}

  private async pedir(ruta: string, opciones: RequestInit = {}) {
    const candidatos = AlmacenLocal.origenQueFunciona
      ? [AlmacenLocal.origenQueFunciona]
      : [`http://127.0.0.1:${this.puerto}`, `http://[::1]:${this.puerto}`];
    let ultimoError: unknown;
    for (const origen of candidatos) {
      try {
        const r = await fetch(`${origen}/__almacen-local?ruta=${encodeURIComponent(ruta)}`, opciones);
        AlmacenLocal.origenQueFunciona = origen;
        return r;
      } catch (error) {
        ultimoError = error;
      }
    }
    AlmacenLocal.origenQueFunciona = null;
    throw ultimoError;
  }

  async leer(ruta: string) {
    const r = await this.pedir(ruta);
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(`No se pudo leer ${ruta} (${r.status})`);
    return new Uint8Array(await r.arrayBuffer());
  }

  async guardar(cambios: Cambio[]) {
    for (const cambio of cambios) {
      const r =
        "borrar" in cambio
          ? await this.pedir(cambio.ruta, { method: "DELETE" })
          : await this.pedir(cambio.ruta, { method: "PUT", body: aBytes(cambio.contenido) });
      if (!r.ok) throw new Error(`No se pudo guardar ${cambio.ruta} (${r.status})`);
    }
  }
}

// ---------------------------------------------------------------- Producción (GitHub)

export class AlmacenGitHub implements Almacen {
  constructor(
    private token: string,
    private repo: string,   // "usuario/repositorio"
    private rama: string,
  ) {}

  private async api(ruta: string, opciones: RequestInit = {}) {
    const r = await fetch(`https://api.github.com/repos/${this.repo}${ruta}`, {
      ...opciones,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "industrias-marin-admin",
        ...(opciones.body ? { "Content-Type": "application/json" } : {}),
        ...(opciones.headers as Record<string, string> | undefined),
      },
    });
    return r;
  }

  private async json(ruta: string, opciones: RequestInit = {}) {
    const r = await this.api(ruta, opciones);
    if (!r.ok) throw new Error(`GitHub respondió ${r.status} en ${ruta}: ${await r.text()}`);
    return r.json() as Promise<any>;
  }

  async leer(ruta: string) {
    const r = await this.api(`/contents/${encodeURI(ruta)}?ref=${this.rama}`, {
      headers: { Accept: "application/vnd.github.raw+json" },
    });
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(`GitHub respondió ${r.status} al leer ${ruta}`);
    return new Uint8Array(await r.arrayBuffer());
  }

  // Todos los cambios van en UN solo commit (si se sube un mueble con foto, llegan juntos).
  async guardar(cambios: Cambio[], mensaje: string) {
    for (let intento = 1; intento <= 3; intento++) {
      const ref = await this.json(`/git/ref/heads/${this.rama}`);
      const commitPadre = ref.object.sha;
      const padre = await this.json(`/git/commits/${commitPadre}`);

      const arbol = [];
      for (const cambio of cambios) {
        if ("borrar" in cambio) {
          arbol.push({ path: cambio.ruta, mode: "100644", type: "blob", sha: null });
        } else {
          const blob = await this.json("/git/blobs", {
            method: "POST",
            body: JSON.stringify({ content: bytesABase64(aBytes(cambio.contenido)), encoding: "base64" }),
          });
          arbol.push({ path: cambio.ruta, mode: "100644", type: "blob", sha: blob.sha });
        }
      }

      const nuevoArbol = await this.json("/git/trees", {
        method: "POST",
        body: JSON.stringify({ base_tree: padre.tree.sha, tree: arbol }),
      });
      const commit = await this.json("/git/commits", {
        method: "POST",
        body: JSON.stringify({ message: mensaje, tree: nuevoArbol.sha, parents: [commitPadre] }),
      });

      // Si alguien más guardó justo al mismo tiempo, GitHub rechaza el cambio: reintentamos.
      const r = await this.api(`/git/refs/heads/${this.rama}`, {
        method: "PATCH",
        body: JSON.stringify({ sha: commit.sha }),
      });
      if (r.ok) return;
      if (r.status !== 422 || intento === 3) {
        throw new Error(`GitHub no aceptó el cambio (${r.status}): ${await r.text()}`);
      }
    }
  }
}
