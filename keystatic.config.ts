import { config, collection, singleton, fields } from "@keystatic/core";
import { espacios, todasLasCategorias } from "./src/data/espacios";

// Opciones del selector "Categoría", agrupadas visualmente por espacio: "Alcoba · Armarios"
const opcionesCategoria = espacios.flatMap((e) =>
  e.categorias.map((c) => ({ label: `${e.nombre} · ${c}`, value: c }))
);

export default config({
  // En tu Codespace (npm run dev) guarda directo en los archivos.
  // En la página publicada guarda haciendo commits en GitHub (requiere iniciar sesión).
  storage: import.meta.env.PROD
    ? { kind: "github", repo: "Scarlxdr-X/industrias-marin-web" }
    : { kind: "local" },

  locale: "es-ES",

  ui: {
    brand: { name: "Industrias Marín" },
    navigation: {
      Catálogo: ["productos"],
      Empresa: ["empresa"],
    },
  },

  collections: {
    productos: collection({
      label: "Muebles",
      path: "src/content/productos/*",
      format: { data: "json" },
      slugField: "nombre",
      columns: ["nombre", "categoria"],
      schema: {
        nombre: fields.slug({
          name: {
            label: "Nombre",
            description: "Ej: Alcoba Dinastía, Comedor Galicia. La dirección web se genera sola a partir del nombre.",
            validation: { length: { min: 2 } },
          },
          slug: {
            label: "Dirección web",
            description: "Aparece como industriasmarin.co/producto/… — sin tildes ni espacios.",
          },
        }),
        categoria: fields.select({
          label: "Categoría",
          description: "El espacio (Alcoba, Sala, Comedor…) se deduce de la categoría.",
          options: opcionesCategoria,
          defaultValue: todasLasCategorias[0],
        }),
        foto: fields.image({
          label: "Foto",
          description: "Sube la foto tal como sale del celular: la página la optimiza sola.",
          directory: "src/assets/productos",
          publicPath: "../../assets/productos/",
        }),
        descripcion: fields.text({
          label: "Descripción",
          description: "Una o dos frases: qué incluye, estilo, lo que lo hace especial. También aparece en Google.",
          multiline: true,
        }),
        detalles: fields.array(fields.text({ label: "Detalle" }), {
          label: "Detalles",
          description: "Medidas, tipo de madera, color, piezas que incluye… (uno por línea)",
          itemLabel: (props) => props.value || "Nuevo detalle",
        }),
        portada: fields.checkbox({
          label: "Usar como portada de su espacio",
          description: "La foto de este mueble aparece en la tarjeta del espacio en el inicio.",
          defaultValue: false,
        }),
      },
    }),
  },

  singletons: {
    empresa: singleton({
      label: "Datos de la empresa",
      path: "src/content/empresa",
      format: { data: "json" },
      schema: {
        telefono: fields.text({
          label: "Teléfono fijo",
          description: "Ej: (602) 258 4472",
          validation: { length: { min: 7 } },
        }),
        celular: fields.text({
          label: "Celular / WhatsApp",
          description: "Ej: 314 792 5624. Todos los botones de WhatsApp de la página usan este número.",
          validation: { length: { min: 10 } },
        }),
        mensajeWhatsapp: fields.text({
          label: "Mensaje inicial de WhatsApp",
          description: "Texto que aparece ya escrito cuando un cliente toca un botón de WhatsApp.",
          multiline: true,
        }),
        horario: fields.text({ label: "Horario de atención" }),
        entregaEstimada: fields.text({
          label: "Tiempo de entrega estimado",
          description: "Ej: 3 a 5 semanas. Aparece en la sección «Hecho a medida».",
        }),
        direccionLinea1: fields.text({ label: "Dirección" }),
        direccionLinea2: fields.text({ label: "Ciudad y departamento" }),
        instagram: fields.url({ label: "Instagram (enlace)" }),
        facebook: fields.url({ label: "Facebook (enlace)" }),
      },
    }),
  },
});
