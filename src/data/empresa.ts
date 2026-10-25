const whatsappNumero = "573147925624";
const mensajeWhatsapp = "Hola, vi su página web y quiero información sobre sus muebles.";

export const empresa = {
  nombre: "Industrias Marín",
  razonSocial: "Industrias Marín & Asociados Ltda.",
  desde: 1988,

  telefono: {
    texto: "(602) 258 4472",
    href: "tel:+576022584472",
  },
  celular: {
    texto: "314 792 5624",
  },
    whatsapp: enlaceWhatsapp(),

  direccion: {
    linea1: "Carrera 1 # 1-131, Barrio Villa Cariño",
    linea2: "El Cerrito, Valle del Cauca",
  },

  horario: "Lunes a sábado, 8:00 a. m. – 6:00 p. m.",  
  entregaEstimada: "3 a 5 semanas",                     // ⚠️ confirmar con la familia

  mapa: {
    embed: "https://www.google.com/maps?q=" +
      encodeURIComponent("Carrera 1 # 1-131, El Cerrito, Valle del Cauca, Colombia") +
      "&output=embed",
    comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("Carrera 1 # 1-131, El Cerrito, Valle del Cauca, Colombia"),
  },

  redes: {
    instagram: "https://www.instagram.com/industriasmarin_/",
    facebook: "https://www.facebook.com/industriasmarin",
  },
};

export const menu = [
  { texto: "Productos", href: "/#productos" },
  { texto: "Hecho a medida", href: "/#medida" },
  { texto: "Nuestra madera", href: "/#calidad" },
  { texto: "Nosotros", href: "/#nosotros" },
  { texto: "Visítanos", href: "/#visitanos" },
];

export function enlaceWhatsapp(mensaje: string = mensajeWhatsapp): string {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}