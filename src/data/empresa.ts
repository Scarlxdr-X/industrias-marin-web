// Los datos que cambian (teléfonos, horario, dirección…) se editan en el modo administrador
// → "Datos de la empresa", y se guardan en src/content/empresa.json.
import datos from "../content/empresa.json";

const soloDigitos = (texto: string) => texto.replace(/\D/g, "");
const whatsappNumero = "57" + soloDigitos(datos.celular);
const direccionMapa = `${datos.direccionLinea1}, ${datos.direccionLinea2}, Colombia`;

export function enlaceWhatsapp(mensaje: string = datos.mensajeWhatsapp): string {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

export const empresa = {
  nombre: "Industrias Marín",
  razonSocial: "Industrias Marín & Asociados Ltda.",
  desde: 1988,

  telefono: {
    texto: datos.telefono,
    href: `tel:+57${soloDigitos(datos.telefono)}`,
  },
  celular: {
    texto: datos.celular,
  },
  whatsapp: enlaceWhatsapp(),

  direccion: {
    linea1: datos.direccionLinea1,
    linea2: datos.direccionLinea2,
  },

  horario: datos.horario,
  entregaEstimada: datos.entregaEstimada,

  mapa: {
    embed: `https://www.google.com/maps?q=${encodeURIComponent(direccionMapa)}&output=embed`,
    comoLlegar: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(direccionMapa)}`,
  },

  redes: {
    instagram: datos.instagram,
    facebook: datos.facebook,
  },
};

export const menu = [
  { texto: "Productos", href: "/#productos" },
  { texto: "Hecho a medida", href: "/#medida" },
  { texto: "Nuestra madera", href: "/#calidad" },
  { texto: "Nosotros", href: "/nosotros" },
  { texto: "Visítanos", href: "/#visitanos" },
];
