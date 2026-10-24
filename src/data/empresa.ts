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
  whatsapp: `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensajeWhatsapp)}`,

  direccion: {
    linea1: "Carrera 1 # 1-131, Barrio Villa Cariño",
    linea2: "El Cerrito, Valle del Cauca",
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