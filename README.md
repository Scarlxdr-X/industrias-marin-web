# Industrias Marín — página web

Página de Industrias Marín & Asociados Ltda. (muebles en madera, El Cerrito, Valle).
Hecha con [Astro](https://astro.build) y publicada en [Cloudflare Workers](https://workers.cloudflare.com).
Incluye un **modo administrador** para agregar, editar y eliminar muebles desde la misma página.

## Trabajar en el proyecto

```bash
npm install        # solo la primera vez
npm run dev        # página en http://localhost:4321
npm run build      # construye todo; córrelo antes de cada commit para detectar errores
```

Para probar el modo administrador en tu Codespace, entra a `/admin` y toca
**"Entrar en modo prueba"**. Ahí los cambios se guardan directo en los archivos del proyecto
(después haces commit como siempre).

## Cómo funciona el modo administrador

1. La persona encargada entra a `industriasmarin.co/admin` con su usuario y contraseña.
2. Navega la página normal, pero con controles extra:
   - en cada categoría, una tarjeta **"+ Agregar mueble"**;
   - en cada mueble, botones para **editar** y **eliminar**;
   - arriba, una barra con **Datos de la empresa** (teléfonos, horario, dirección, redes) y **Salir**.
3. Al guardar, el servidor hace un commit en GitHub. Cloudflare detecta el commit, vuelve a
   construir la página y en 1–2 minutos el cambio es visible para todos. Mientras tanto, quien
   lo hizo ve el mueble marcado como "Publicando…".

Las fotos se reducen en el celular antes de subirse (≈200 KB) y Astro genera varios tamaños al construir.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Muebles (un archivo por mueble) | `src/content/productos/*.json` |
| Fotos de los muebles | `src/assets/productos/<mueble>/foto.*` |
| Portada de cada espacio en el inicio | `src/content/portadas.json` |
| Teléfonos, horario, dirección, redes | `src/content/empresa.json` |
| Espacios y categorías del catálogo | `src/data/espacios.ts` |
| Colores y fuentes | `src/styles/global.css` |
| Página de inicio de sesión | `src/pages/admin.astro` |
| API del modo administrador (servidor) | `src/pages/api/admin/` y `src/lib/admin/` |
| Controles del modo administrador (navegador) | `src/scripts/admin/` |

## Variables secretas (Cloudflare → Workers → industrias-marin → Settings → Variables and Secrets)

| Variable | Qué es |
|---|---|
| `ADMIN_USUARIOS` | Usuarios que pueden entrar. Cada uno se genera con `node scripts/crear-usuario.mjs <usuario> "<contraseña>"`; varios se separan con `;`. |
| `SESION_SECRETO` | Una frase larga y aleatoria para firmar las sesiones. Si se cambia, todos deben volver a entrar. |
| `GITHUB_TOKEN` | Token de GitHub (*fine-grained*, solo este repositorio, permiso **Contents: Read and write**). Con él, el servidor guarda los cambios. |

`GITHUB_REPO` y `GITHUB_RAMA` ya están en `wrangler.jsonc`.

**Agregar o quitar a alguien:** edita `ADMIN_USUARIOS` en Cloudflare (agrega o borra su línea).
**Cambiar una contraseña:** genera una línea nueva con el script y reemplaza la anterior.

## Agregar una categoría nueva

Edita `src/data/espacios.ts` y agrega la categoría a la lista `categorias` del espacio que corresponda.
Aparece sola en el formulario del modo administrador y en la página del espacio.

Si un archivo de mueble queda con un error (por ejemplo, una categoría que no existe),
`npm run build` falla diciendo cuál es, y Cloudflare no publica esa versión: la página anterior sigue funcionando.
