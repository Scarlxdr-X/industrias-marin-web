// Modo administrador: se activa solo cuando hay una sesión iniciada (ver Base.astro).
// Agrega sobre la página normal: la barra de arriba, la tarjeta "+ Agregar mueble",
// los botones de editar/eliminar y las ventanas de formulario.
import "./admin.css";
import { espacios, espacioDeCategoria, urlCategoria } from "../../data/espacios";
import {
  ErrorApi, agregarPendiente, api, avisar, avisarAlLlegar, guardarPendientes, leerPendientes,
  mostrarAvisoPendiente, olvidarAviso, prepararFoto, type FotoPreparada, type Pendiente,
} from "./api";

// ---------------------------------------------------------------- Utilidades

const escapar = (t: string) =>
  t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function crear<T extends HTMLElement = HTMLElement>(html: string): T {
  const plantilla = document.createElement("template");
  plantilla.innerHTML = html.trim();
  return plantilla.content.firstElementChild as T;
}

const ICONO = {
  editar: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  eliminar: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>`,
  mas: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
  foto: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3l2-3h6l2 3h3v13H4Z"/><circle cx="12" cy="13" r="4"/></svg>`,
};

const nombreEspacio = (categoria: string) =>
  espacios.find((e) => e.slug === espacioDeCategoria(categoria))?.nombre ?? "";

function manejarErrorDeSesion(error: unknown) {
  if (error instanceof ErrorApi && error.estado === 401) {
    avisarAlLlegar("Tu sesión terminó. Vuelve a iniciar sesión.");
    location.href = "/admin";
    return true;
  }
  return false;
}

// ---------------------------------------------------------------- Inicio

// En el Codespace la página se recarga sola apenas cambia un archivo (a veces antes de que llegue
// la respuesta), así que el aviso de éxito se deja guardado ANTES de guardar, por si hay recarga.
let modoPrueba = false;
async function guardarYAvisar<T>(texto: string, accion: () => Promise<T>): Promise<T> {
  if (modoPrueba) avisarAlLlegar(texto, 6, true);
  try {
    const resultado = await accion();
    avisar(texto);
    return resultado;
  } catch (error) {
    if (modoPrueba) olvidarAviso();
    throw error;
  }
}

async function iniciar() {
  let usuario: string | null = null;
  try {
    ({ usuario, modoPrueba } = await api<{ usuario: string | null; modoPrueba: boolean }>("sesion"));
  } catch {
    return;
  }
  if (!usuario) {
    // La cookie de aviso quedó pero la sesión ya no es válida: la borramos
    document.cookie = "marin_admin=; path=/; max-age=0";
    return;
  }

  document.documentElement.classList.add("adm-activo");
  ponerBarra(usuario);
  mejorarCatalogo();
  mejorarFicha();
  mostrarAvisoPendiente();
}

// ---------------------------------------------------------------- Barra superior

function ponerBarra(usuario: string) {
  const barra = crear(`
    <div class="adm-barra" role="region" aria-label="Modo administrador">
      <span class="adm-barra__estado"><span class="adm-punto" aria-hidden="true"></span>
        Modo administrador · <strong>${escapar(usuario)}</strong></span>
      <span class="adm-barra__acciones">
        <a href="/#productos">Catálogo</a>
        <button type="button" data-accion="empresa">Datos de la empresa</button>
        <button type="button" data-accion="salir">Salir</button>
      </span>
    </div>`);
  barra.querySelector('[data-accion="empresa"]')!.addEventListener("click", abrirEmpresa);
  barra.querySelector('[data-accion="salir"]')!.addEventListener("click", async () => {
    await api("sesion", "DELETE").catch(() => {});
    location.href = "/";
  });
  document.body.prepend(barra);
}

// ---------------------------------------------------------------- Catálogo (/catalogo/…)

function botonesDeTarjeta(contenedor: HTMLElement) {
  const { slug, nombre, categoria } = contenedor.dataset;
  const botones = crear(`
    <div class="adm-acciones">
      <button type="button" class="adm-icono" data-accion="editar" aria-label="Editar ${escapar(nombre!)}">${ICONO.editar}</button>
      <button type="button" class="adm-icono adm-icono--peligro" data-accion="eliminar" aria-label="Eliminar ${escapar(nombre!)}">${ICONO.eliminar}</button>
    </div>`);
  botones.querySelector('[data-accion="editar"]')!.addEventListener("click", () =>
    abrirFormulario({ slug, categoria: categoria!, fotoActual: contenedor.querySelector("img")?.currentSrc }),
  );
  botones.querySelector('[data-accion="eliminar"]')!.addEventListener("click", () =>
    confirmarEliminar(slug!, nombre!, contenedor),
  );
  contenedor.append(botones);
}

function mejorarCatalogo() {
  const grupos = document.querySelectorAll<HTMLElement>(".grupo[data-categoria]");
  if (grupos.length === 0) return;

  for (const grupo of grupos) {
    const categoria = grupo.dataset.categoria!;
    const grid = grupo.querySelector<HTMLElement>(".grid")!;
    const agregar = crear(`
      <button type="button" class="adm-agregar">
        <span class="adm-agregar__circulo">${ICONO.mas}</span>
        <span class="adm-agregar__texto">Agregar mueble</span>
        <span class="adm-agregar__categoria">en ${escapar(categoria)}</span>
      </button>`);
    agregar.addEventListener("click", () => abrirFormulario({ categoria }));
    grid.prepend(agregar);
  }

  document.querySelectorAll<HTMLElement>(".tarjeta-producto").forEach(botonesDeTarjeta);
  pintarPendientes();
}

function pintarPendientes() {
  const pendientes = leerPendientes();
  const vigentes: Pendiente[] = [];

  for (const p of pendientes) {
    const tarjeta = document.querySelector<HTMLElement>(`.tarjeta-producto[data-slug="${CSS.escape(p.slug)}"]`);
    const grupo = document.querySelector<HTMLElement>(`.grupo[data-categoria="${CSS.escape(p.categoria)}"]`);

    if (p.tipo === "crear") {
      if (tarjeta && !tarjeta.classList.contains("adm-provisional")) continue; // ya se publicó
      vigentes.push(p);
      if (grupo && !tarjeta) {
        const provisional = crear(`
          <div class="tarjeta-producto adm-provisional" data-slug="${escapar(p.slug)}">
            <div class="adm-provisional__foto" style="background-image:url('${p.miniatura ?? ""}')"></div>
            <div class="adm-provisional__cuerpo">
              <span class="adm-etiqueta-publicando">Publicando…</span>
              <strong>${escapar(p.nombre)}</strong>
              <small>Aparecerá para todos en 1–2 minutos.</small>
            </div>
          </div>`);
        grupo.querySelector(".grid")!.querySelector(".adm-agregar")!.after(provisional);
        grupo.querySelector(".vacio")?.remove();
      }
    } else if (p.tipo === "eliminar") {
      if (!tarjeta) continue; // ya se publicó
      vigentes.push(p);
      tarjeta.classList.add("adm-eliminando");
    } else {
      vigentes.push(p);
      if (tarjeta && Date.now() - p.hora < 4 * 60 * 1000) tarjeta.classList.add("adm-actualizando");
    }
  }
  guardarPendientes(vigentes);
}

// ---------------------------------------------------------------- Ficha (/producto/…)

function mejorarFicha() {
  const ficha = document.querySelector<HTMLElement>("[data-ficha]");
  if (!ficha) return;
  const { slug, nombre, espacio, categoria = "" } = ficha.dataset;

  const panel = crear(`
    <div class="adm-panel-ficha">
      <span>Este mueble:</span>
      <button type="button" class="adm-boton adm-boton--suave" data-accion="editar">${ICONO.editar} Editar</button>
      <button type="button" class="adm-boton adm-boton--peligro-suave" data-accion="eliminar">${ICONO.eliminar} Eliminar</button>
    </div>`);
  panel.querySelector('[data-accion="editar"]')!.addEventListener("click", () =>
    abrirFormulario({ slug, categoria, fotoActual: ficha.querySelector<HTMLImageElement>(".ficha__foto img")?.currentSrc }),
  );
  panel.querySelector('[data-accion="eliminar"]')!.addEventListener("click", () =>
    confirmarEliminar(slug!, nombre!, null, urlCategoria(categoria) || `/catalogo/${espacio}`),
  );
  ficha.prepend(panel);
}

// ---------------------------------------------------------------- Ventanas (dialog)

function abrirVentana(html: string) {
  const ventana = crear<HTMLDialogElement>(`<dialog class="adm-ventana">${html}</dialog>`);
  document.body.append(ventana);
  ventana.addEventListener("close", () => ventana.remove());
  // Tocar fuera de la ventana la cierra (solo si no está guardando)
  ventana.addEventListener("click", (e) => {
    if (e.target === ventana && !ventana.classList.contains("adm-ocupada")) ventana.close();
  });
  ventana.addEventListener("cancel", (e) => {
    if (ventana.classList.contains("adm-ocupada")) e.preventDefault();
  });
  ventana.showModal();
  return ventana;
}

function mostrarError(ventana: HTMLElement, texto: string) {
  const caja = ventana.querySelector<HTMLElement>(".adm-error")!;
  caja.textContent = texto;
  caja.hidden = false;
  caja.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function ocupar(ventana: HTMLElement, boton: HTMLButtonElement, ocupado: boolean, texto?: string) {
  ventana.classList.toggle("adm-ocupada", ocupado);
  ventana.querySelectorAll<HTMLButtonElement | HTMLInputElement>("button, input, select, textarea")
    .forEach((el) => (el.disabled = ocupado));
  if (texto) boton.innerHTML = ocupado ? `<span class="adm-girando" aria-hidden="true"></span> ${texto}` : texto;
}

// ---------------------------------------------------------------- Formulario de mueble

interface OpcionesFormulario {
  slug?: string;          // si viene, es edición
  categoria: string;
  fotoActual?: string;
}

function opcionesDeCategoria(seleccionada: string) {
  return espacios
    .map((e) => `<optgroup label="${escapar(e.nombre)}">${e.categorias
      .map((c) => `<option value="${escapar(c)}"${c === seleccionada ? " selected" : ""}>${escapar(c)}</option>`)
      .join("")}</optgroup>`)
    .join("");
}

async function abrirFormulario({ slug, categoria, fotoActual }: OpcionesFormulario) {
  const editando = Boolean(slug);
  const ventana = abrirVentana(`
    <form class="adm-formulario" novalidate>
      <header class="adm-ventana__cabecera">
        <h2>${editando ? "Editar mueble" : "Agregar mueble"}</h2>
        <button type="button" class="adm-cerrar" aria-label="Cerrar">×</button>
      </header>

      <div class="adm-ventana__cuerpo">
        <div class="adm-error" role="alert" hidden></div>

        <label class="adm-foto${fotoActual ? " adm-foto--con-imagen" : ""}">
          <input type="file" accept="image/*" name="foto" />
          <img alt="" ${fotoActual ? `src="${escapar(fotoActual)}"` : "hidden"} />
          <span class="adm-foto__vacia">
            ${ICONO.foto}
            <strong>Toca para tomar o elegir una foto</strong>
            <small>Puede ser directo del celular, la página la ajusta sola.</small>
          </span>
          <span class="adm-foto__cambiar">Cambiar foto</span>
        </label>

        <label class="adm-campo">
          <span>Nombre del mueble</span>
          <input name="nombre" required maxlength="80" placeholder="Ej: Alcoba Roma" autocomplete="off" />
        </label>

        <label class="adm-campo">
          <span>Categoría</span>
          <select name="categoria">${opcionesDeCategoria(categoria)}</select>
        </label>

        <label class="adm-campo">
          <span>Descripción <em>(opcional)</em></span>
          <textarea name="descripcion" rows="3" maxlength="600"
            placeholder="Ej: Cama doble, dos mesas de noche y tocador con espejo."></textarea>
        </label>

        <label class="adm-campo">
          <span>Detalles <em>(opcional, uno por línea)</em></span>
          <textarea name="detalles" rows="3" placeholder="Madera de cedro&#10;Color miel&#10;Cama de 1,40 m"></textarea>
        </label>

        <label class="adm-casilla">
          <input type="checkbox" name="portada" />
          <span>Usar esta foto como portada de <strong data-espacio>${escapar(nombreEspacio(categoria))}</strong> en el inicio</span>
        </label>
      </div>

      <footer class="adm-ventana__pie">
        <button type="button" class="adm-boton adm-boton--suave" data-accion="cancelar">Cancelar</button>
        <button type="submit" class="adm-boton adm-boton--principal">${editando ? "Guardar cambios" : "Agregar mueble"}</button>
      </footer>
    </form>`);

  const form = ventana.querySelector("form")!;
  const enviar = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const textoEnviar = enviar.textContent!;
  const campo = <T extends HTMLElement>(n: string) => form.querySelector<T>(`[name="${n}"]`)!;
  ventana.querySelector(".adm-cerrar")!.addEventListener("click", () => ventana.close());
  ventana.querySelector('[data-accion="cancelar"]')!.addEventListener("click", () => ventana.close());

  campo<HTMLSelectElement>("categoria").addEventListener("change", (e) => {
    ventana.querySelector("[data-espacio]")!.textContent = nombreEspacio((e.target as HTMLSelectElement).value);
  });

  // Foto: se prepara (reduce) apenas se elige, y se muestra la vista previa
  let foto: FotoPreparada | null = null;
  const zonaFoto = ventana.querySelector<HTMLElement>(".adm-foto")!;
  const vistaPrevia = zonaFoto.querySelector("img")!;
  campo<HTMLInputElement>("foto").addEventListener("change", async (e) => {
    const archivo = (e.target as HTMLInputElement).files?.[0];
    if (!archivo) return;
    zonaFoto.classList.add("adm-foto--cargando");
    try {
      foto = await prepararFoto(archivo);
      vistaPrevia.src = foto.miniatura;
      vistaPrevia.hidden = false;
      zonaFoto.classList.add("adm-foto--con-imagen");
      ventana.querySelector<HTMLElement>(".adm-error")!.hidden = true;
    } catch {
      mostrarError(ventana, "No se pudo leer esa foto. Prueba con otra (JPG o PNG).");
    } finally {
      zonaFoto.classList.remove("adm-foto--cargando");
    }
  });

  // Si es edición, se cargan los datos actuales
  if (editando) {
    ocupar(ventana, enviar, true, "Cargando…");
    try {
      const actual = await api(`muebles/${encodeURIComponent(slug!)}`);
      campo<HTMLInputElement>("nombre").value = actual.nombre;
      campo<HTMLSelectElement>("categoria").value = actual.categoria;
      campo<HTMLTextAreaElement>("descripcion").value = actual.descripcion;
      campo<HTMLTextAreaElement>("detalles").value = actual.detalles.join("\n");
      campo<HTMLInputElement>("portada").checked = actual.portada;
      ventana.querySelector("[data-espacio]")!.textContent = nombreEspacio(actual.categoria);
    } catch (error) {
      if (manejarErrorDeSesion(error)) return;
      mostrarError(ventana, (error as Error).message);
    } finally {
      ocupar(ventana, enviar, false, textoEnviar);
    }
  }
  campo<HTMLInputElement>("nombre").focus();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = campo<HTMLInputElement>("nombre").value.trim();
    if (!nombre) return mostrarError(ventana, "Escribe el nombre del mueble.");
    if (!editando && !foto) return mostrarError(ventana, "Agrega una foto del mueble.");

    const datos = {
      nombre,
      categoria: campo<HTMLSelectElement>("categoria").value,
      descripcion: campo<HTMLTextAreaElement>("descripcion").value,
      detalles: campo<HTMLTextAreaElement>("detalles").value.split("\n").map((d) => d.trim()).filter(Boolean),
      portada: campo<HTMLInputElement>("portada").checked,
      foto: foto ? { base64: foto.base64, tipo: foto.tipo } : null,
    };

    ocupar(ventana, enviar, true, "Guardando…");
    try {
      if (editando) {
        await guardarYAvisar(`✓ Cambios guardados en «${nombre}». Se verán para todos en 1–2 minutos.`, () =>
          api(`muebles/${encodeURIComponent(slug!)}`, "PUT", datos));
        agregarPendiente({ tipo: "editar", slug: slug!, nombre, categoria: datos.categoria });
        ventana.classList.remove("adm-ocupada");
        ventana.close();
        actualizarTarjeta(slug!, nombre, foto?.miniatura);
      } else {
        const { slug: nuevo } = await guardarYAvisar(`✓ «${nombre}» agregado. Aparecerá para todos en 1–2 minutos.`, () =>
          api<{ slug: string }>("muebles", "POST", datos));
        agregarPendiente({ tipo: "crear", slug: nuevo, nombre, categoria: datos.categoria, miniatura: foto!.miniatura });
        ventana.classList.remove("adm-ocupada");
        ventana.close();
        const grupo = document.querySelector(`.grupo[data-categoria="${CSS.escape(datos.categoria)}"]`);
        if (grupo) {
          pintarPendientes();
          grupo.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Se agregó a una categoría de otro espacio: llevamos al usuario allá
          avisarAlLlegar(`✓ «${nombre}» agregado. Aparecerá para todos en 1–2 minutos.`);
          location.href = urlCategoria(datos.categoria);
        }
      }
    } catch (error) {
      if (manejarErrorDeSesion(error)) return;
      ocupar(ventana, enviar, false, textoEnviar);
      mostrarError(ventana, (error as Error).message);
    }
  });
}

function actualizarTarjeta(slug: string, nombre: string, miniatura?: string) {
  const tarjeta = document.querySelector<HTMLElement>(`.tarjeta-producto[data-slug="${CSS.escape(slug)}"]`);
  if (tarjeta) {
    tarjeta.querySelector("h3")!.textContent = nombre;
    if (miniatura) {
      const img = tarjeta.querySelector("img");
      if (img) { img.srcset = ""; img.src = miniatura; }
    }
    tarjeta.classList.add("adm-actualizando");
  }
  const ficha = document.querySelector<HTMLElement>(`[data-ficha][data-slug="${CSS.escape(slug)}"]`);
  if (ficha) {
    ficha.querySelector("h1")!.textContent = nombre;
    if (miniatura) {
      const img = ficha.querySelector<HTMLImageElement>(".ficha__foto img");
      if (img) { img.srcset = ""; img.src = miniatura; }
    }
  }
}

// ---------------------------------------------------------------- Eliminar

function confirmarEliminar(slug: string, nombre: string, tarjeta: HTMLElement | null, irA?: string) {
  const ventana = abrirVentana(`
    <div class="adm-confirmar">
      <div class="adm-confirmar__icono">${ICONO.eliminar}</div>
      <h2>¿Eliminar «${escapar(nombre)}»?</h2>
      <p>El mueble y su foto se quitarán de la página. Esta acción no se puede deshacer.</p>
      <div class="adm-error" role="alert" hidden></div>
      <div class="adm-ventana__pie">
        <button type="button" class="adm-boton adm-boton--suave" data-accion="cancelar">No, conservarlo</button>
        <button type="button" class="adm-boton adm-boton--peligro" data-accion="eliminar">Sí, eliminar</button>
      </div>
    </div>`);
  const boton = ventana.querySelector<HTMLButtonElement>('[data-accion="eliminar"]')!;
  ventana.querySelector('[data-accion="cancelar"]')!.addEventListener("click", () => ventana.close());
  boton.addEventListener("click", async () => {
    ocupar(ventana, boton, true, "Eliminando…");
    try {
      const texto = irA ? `✓ «${nombre}» eliminado.` : `✓ «${nombre}» eliminado. Desaparecerá para todos en 1–2 minutos.`;
      await guardarYAvisar(texto, () => api(`muebles/${encodeURIComponent(slug)}`, "DELETE"));
      const categoria = tarjeta?.dataset.categoria ?? "";
      agregarPendiente({ tipo: "eliminar", slug, nombre, categoria });
      ventana.classList.remove("adm-ocupada");
      ventana.close();
      if (irA) {
        avisarAlLlegar(texto);
        location.href = irA;
        return;
      }
      if (tarjeta?.classList.contains("adm-provisional")) tarjeta.remove();
      else tarjeta?.classList.add("adm-eliminando");
    } catch (error) {
      if (manejarErrorDeSesion(error)) return;
      ocupar(ventana, boton, false, "Sí, eliminar");
      mostrarError(ventana, (error as Error).message);
    }
  });
}

// ---------------------------------------------------------------- Datos de la empresa

const CAMPOS_EMPRESA: [string, string, string?][] = [
  ["telefono", "Teléfono fijo", "Ej: (602) 258 4472"],
  ["celular", "Celular / WhatsApp", "Todos los botones de WhatsApp usan este número"],
  ["mensajeWhatsapp", "Mensaje inicial de WhatsApp", "Lo que aparece ya escrito cuando un cliente toca WhatsApp"],
  ["horario", "Horario de atención"],
  ["entregaEstimada", "Tiempo de entrega estimado", "Ej: 3 a 5 semanas"],
  ["direccionLinea1", "Dirección"],
  ["direccionLinea2", "Ciudad y departamento"],
  ["instagram", "Instagram (enlace)"],
  ["facebook", "Facebook (enlace)"],
];

async function abrirEmpresa() {
  const ventana = abrirVentana(`
    <form class="adm-formulario" novalidate>
      <header class="adm-ventana__cabecera">
        <h2>Datos de la empresa</h2>
        <button type="button" class="adm-cerrar" aria-label="Cerrar">×</button>
      </header>
      <div class="adm-ventana__cuerpo">
        <div class="adm-error" role="alert" hidden></div>
        ${CAMPOS_EMPRESA.map(([nombre, etiqueta, ayuda]) => `
          <label class="adm-campo">
            <span>${etiqueta}</span>
            ${nombre === "mensajeWhatsapp"
              ? `<textarea name="${nombre}" rows="2"></textarea>`
              : `<input name="${nombre}" autocomplete="off" />`}
            ${ayuda ? `<small>${ayuda}</small>` : ""}
          </label>`).join("")}
      </div>
      <footer class="adm-ventana__pie">
        <button type="button" class="adm-boton adm-boton--suave" data-accion="cancelar">Cancelar</button>
        <button type="submit" class="adm-boton adm-boton--principal">Guardar</button>
      </footer>
    </form>`);
  const form = ventana.querySelector("form")!;
  const enviar = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  ventana.querySelector(".adm-cerrar")!.addEventListener("click", () => ventana.close());
  ventana.querySelector('[data-accion="cancelar"]')!.addEventListener("click", () => ventana.close());

  ocupar(ventana, enviar, true, "Cargando…");
  try {
    const datos = await api<Record<string, string>>("empresa");
    for (const [nombre] of CAMPOS_EMPRESA) {
      form.querySelector<HTMLInputElement>(`[name="${nombre}"]`)!.value = datos[nombre] ?? "";
    }
  } catch (error) {
    if (manejarErrorDeSesion(error)) return;
    mostrarError(ventana, (error as Error).message);
  } finally {
    ocupar(ventana, enviar, false, "Guardar");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(
      CAMPOS_EMPRESA.map(([n]) => [n, form.querySelector<HTMLInputElement>(`[name="${n}"]`)!.value.trim()]),
    );
    ocupar(ventana, enviar, true, "Guardando…");
    try {
      await guardarYAvisar("✓ Datos de la empresa guardados. Se verán en la página en 1–2 minutos.", () =>
        api("empresa", "PUT", datos));
      ventana.classList.remove("adm-ocupada");
      ventana.close();
    } catch (error) {
      if (manejarErrorDeSesion(error)) return;
      ocupar(ventana, enviar, false, "Guardar");
      mostrarError(ventana, (error as Error).message);
    }
  });
}

iniciar();
