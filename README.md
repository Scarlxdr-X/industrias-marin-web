# Industrias Marín — página web

Página de Industrias Marín & Asociados Ltda. (muebles en madera, El Cerrito, Valle).
Hecha con [Astro](https://astro.build) y un panel de administración con [Keystatic](https://keystatic.com).

## Trabajar en el proyecto

```bash
npm install        # solo la primera vez
npm run dev        # página en http://localhost:4321  ·  panel en http://localhost:4321/keystatic
npm run build      # construye todo; córrelo antes de cada commit para detectar errores
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Muebles (un archivo por mueble) | `src/content/productos/*.json` |
| Fotos de los muebles | `src/assets/productos/<mueble>/foto.*` |
| Teléfonos, horario, dirección, redes | `src/content/empresa.json` |
| Espacios y categorías del catálogo | `src/data/espacios.ts` |
| Colores y fuentes | `src/styles/global.css` |
| Configuración del panel | `keystatic.config.ts` |

## Editar el catálogo desde el panel

1. Entra a `/keystatic` (en tu Codespace con `npm run dev`, o en la página publicada iniciando sesión con GitHub).
2. **Muebles → Añadir**: nombre, categoría, foto (tal como sale del celular; la página la optimiza sola), descripción y detalles.
3. **Guardar**. En la página publicada, el cambio aparece en 1–2 minutos (Netlify vuelve a construir el sitio).

Marca **"Usar como portada de su espacio"** en un mueble para que su foto sea la de la tarjeta de ese espacio en el inicio.

Si un archivo queda con un error (por ejemplo, una categoría que no existe), `npm run build` falla diciendo cuál es, y Netlify no publica esa versión: la página anterior sigue funcionando.

## Agregar una categoría nueva

Edita `src/data/espacios.ts` y agrega la categoría a la lista `categorias` del espacio que corresponda. Aparece sola en el selector del panel y en la página del espacio.
