import type { SlugEspacio } from "./espacios";

export interface Producto {
  slug: string;            // va en la URL: /producto/denver (sin tildes ni espacios)
  nombre: string;
  espacio: SlugEspacio;
  categoria: string;       // debe coincidir EXACTO con una de las categorías del espacio
  descripcion?: string;    // opcional: se muestra en la ficha y en Google
  detalles?: string[];     // opcional: medidas, madera, color, piezas…
  foto?: string;           // ruta en /public
}

// Importado desde Wix el 2026-10-25.
// Completa "descripcion" y "detalles" copiándolos de la página original (enlace en cada comentario).
export const productos: Producto[] = [
  {
    // Original: https://www.industriasmarin.co/alcobas/alpes-
    slug: "alcoba-alpes",
    nombre: "Alcoba Alpes",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-alpes.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/barcelona
    slug: "alcoba-barcelona",
    nombre: "Alcoba Barcelona",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-barcelona.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/cama-cuna-ivonne
    slug: "cama-cuna-ivonne",
    nombre: "Cama Cuna Ivonne",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/cama-cuna-ivonne.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/cama-cuna-segovia
    slug: "cama-cuna-segovia",
    nombre: "Cama Cuna Segovia",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/cama-cuna-segovia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/andora-
    slug: "alcoba-andora",
    nombre: "Alcoba Andora",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-andora.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/barza
    slug: "alcoba-barza",
    nombre: "Alcoba Barza",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-barza.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/montesori
    slug: "cama-cuna-montesori-tapizada",
    nombre: "Cama Cuna Montesori Tapizada",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/cama-cuna-montesori-tapizada.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/cama-cuna-violeta
    slug: "cama-cuna-violeta",
    nombre: "Cama Cuna Violeta",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/cama-cuna-violeta.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/armani
    slug: "alcoba-armani",
    nombre: "Alcoba Armani",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-armani.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/b%C3%A9lgica
    slug: "alcoba-belgica",
    nombre: "Alcoba Bélgica",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-belgica.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/cama-cuna-paris
    slug: "cama-cuna-paris",
    nombre: "Cama Cuna Paris",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/cama-cuna-paris.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/capri
    slug: "alcoba-capri",
    nombre: "Alcoba Capri",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-capri.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/mosaico
    slug: "alcoba-mosaico",
    nombre: "Alcoba Mosaico",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-mosaico.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/cama-cuna-montesori
    slug: "cama-cuna-montesori",
    nombre: "Cama Cuna Montesori",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/cama-cuna-montesori.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/artica
    slug: "alcoba-artica",
    nombre: "Alcoba Artica",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-artica.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/marsella
    slug: "alcoba-marsella",
    nombre: "Alcoba Marsella",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-marsella.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/luxury-%232
    slug: "alcoba-luxury-2",
    nombre: "Alcoba Luxury #2",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-luxury-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/es
    slug: "alcoba-essencia",
    nombre: "Alcoba Essencia",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-essencia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/esmeralda
    slug: "alcoba-esmeralda",
    nombre: "Alcoba Esmeralda",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-esmeralda.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/galia-%232
    slug: "alcoba-galia-2",
    nombre: "Alcoba Galia #2",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-galia-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/viera
    slug: "alcoba-viera",
    nombre: "Alcoba Viera",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-viera.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/gabriela-%232
    slug: "alcoba-gabriela-2",
    nombre: "Alcoba Gabriela #2",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-gabriela-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/siberia
    slug: "alcoba-siberia",
    nombre: "Alcoba Siberia",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-siberia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/nova
    slug: "alcoba-nova",
    nombre: "Alcoba Nova",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-nova.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/cattelana
    slug: "alcoba-cattelana",
    nombre: "Alcoba Cattelana",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-cattelana.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/luxury
    slug: "alcoba-luxury",
    nombre: "Alcoba Luxury",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-luxury.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/naomi
    slug: "alcoba-naomi",
    nombre: "Alcoba Naomi",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-naomi.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/salamanca
    slug: "alcoba-salamanca",
    nombre: "Alcoba Salamanca",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-salamanca.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/donato
    slug: "alcoba-donato",
    nombre: "Alcoba Donato",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-donato.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/paris
    slug: "alcoba-paris",
    nombre: "Alcoba Paris",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-paris.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/donato-flotante-%232-
    slug: "alcoba-donato-flotante-2",
    nombre: "Alcoba Donato Flotante #2",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-donato-flotante-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/roma-
    slug: "alcoba-roma",
    nombre: "Alcoba Roma",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-roma.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/ivone-
    slug: "alcoba-ivone",
    nombre: "Alcoba Ivone",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-ivone.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/azalea
    slug: "alcoba-azalea",
    nombre: "Alcoba Azalea",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-azalea.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/galia
    slug: "alcoba-galia",
    nombre: "Alcoba Galia",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-galia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/nala-
    slug: "alcoba-nala",
    nombre: "Alcoba Nala",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-nala.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/%C3%A1rtica
    slug: "alcoba-artica-2",
    nombre: "Alcoba Ártica",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-artica-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/catania
    slug: "alcoba-catania",
    nombre: "Alcoba Catania",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-catania.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/dinast%C3%ADa
    slug: "alcoba-dinastia",
    nombre: "Alcoba Dinastía",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-dinastia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/gabriela
    slug: "alcoba-gabriela",
    nombre: "Alcoba Gabriela",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-gabriela.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/imperio
    slug: "alcoba-imperio",
    nombre: "Alcoba Imperio",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-imperio.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/lisboa
    slug: "alcoba-lisboa",
    nombre: "Alcoba Lisboa",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-lisboa.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/madeleine
    slug: "alcoba-madeleine",
    nombre: "Alcoba Madeleine",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-madeleine.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/montecarlo
    slug: "alcoba-montecarlo",
    nombre: "Alcoba Montecarlo",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-montecarlo.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/mil%C3%A1n
    slug: "alcoba-milan",
    nombre: "Alcoba Milán",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-milan.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/polonia
    slug: "alcoba-polonia",
    nombre: "Alcoba Polonia",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-polonia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/san-francisco
    slug: "alcoba-san-francisco",
    nombre: "Alcoba San Francisco",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-san-francisco.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/vaduz
    slug: "alcoba-vaduz",
    nombre: "Alcoba Vaduz",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-vaduz.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/violeta
    slug: "alcoba-violeta",
    nombre: "Alcoba Violeta",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-violeta.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/segovia
    slug: "alcoba-segovia",
    nombre: "Alcoba Segovia",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-segovia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/sof%C3%ADa
    slug: "alcoba-sofia",
    nombre: "Alcoba Sofía",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-sofia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/con-repisa
    slug: "alcoba-con-repisa",
    nombre: "Alcoba Con Repisa",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-con-repisa.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/stefan%C3%ADa
    slug: "alcoba-stefania",
    nombre: "Alcoba Stefanía",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-stefania.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/sofi
    slug: "alcoba-sofi",
    nombre: "Alcoba Sofi",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-sofi.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/oslo
    slug: "alcoba-oslo",
    nombre: "Alcoba Oslo",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-oslo.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/venecia
    slug: "alcoba-venecia",
    nombre: "Alcoba Venecia",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-venecia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/finlandia
    slug: "alcoba-finlandia",
    nombre: "Alcoba Finlandia",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-finlandia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/horizonte
    slug: "alcoba-horizonte",
    nombre: "Alcoba Horizonte",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-horizonte.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/capriani
    slug: "alcoba-capriani",
    nombre: "Alcoba Capriani",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-capriani.webp",
  },
  {
    // Original: https://www.industriasmarin.co/alcobas/donato-flotante
    slug: "alcoba-donato-flotante",
    nombre: "Alcoba Donato Flotante",
    espacio: "alcoba",
    categoria: "Alcobas",
    foto: "/img/productos/alcoba-donato-flotante.webp",
  },
  {
    // Original: https://www.industriasmarin.co/armarios/oviedo-3-cuerpos-con-maletero
    slug: "armario-oviedo-3-cuerpos-con-maletero",
    nombre: "Armario Oviedo 3 Cuerpos con Maletero",
    espacio: "alcoba",
    categoria: "Armarios",
    foto: "/img/productos/armario-oviedo-3-cuerpos-con-maletero.webp",
  },
  {
    // Original: https://www.industriasmarin.co/armarios/oviedo
    slug: "armario-oviedo-2-cuerpos",
    nombre: "Armario Oviedo 2 Cuerpos",
    espacio: "alcoba",
    categoria: "Armarios",
    foto: "/img/productos/armario-oviedo-2-cuerpos.webp",
  },
  {
    // Original: https://www.industriasmarin.co/armarios/oviedo-2-cuerpos-con-maletero
    slug: "armario-oviedo-2-cuerpos-con-maletero",
    nombre: "Armario Oviedo 2 Cuerpos con Maletero",
    espacio: "alcoba",
    categoria: "Armarios",
    foto: "/img/productos/armario-oviedo-2-cuerpos-con-maletero.webp",
  },
  {
    // Original: https://www.industriasmarin.co/armarios/oviedo-v3-
    slug: "armario-oviedo-3-cuerpos",
    nombre: "Armario Oviedo 3 Cuerpos",
    espacio: "alcoba",
    categoria: "Armarios",
    foto: "/img/productos/armario-oviedo-3-cuerpos.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/dante-
    slug: "sala-dante",
    nombre: "Sala Dante",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-dante.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-b%C3%A9lgica-
    slug: "modular-belgica",
    nombre: "Modular Bélgica",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-belgica.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/chester-%232
    slug: "sala-chester-2",
    nombre: "Sala Chester #2",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-chester-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/dante-en-dkape
    slug: "sala-dante-en-dkape",
    nombre: "Sala Dante en Dkape",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-dante-en-dkape.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/melek-
    slug: "sala-melek",
    nombre: "Sala Melek",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-melek.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/amazon
    slug: "sala-amazon",
    nombre: "Sala Amazon",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-amazon.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/confort-
    slug: "sala-confort",
    nombre: "Sala Confort",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-confort.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/denver
    slug: "sala-denver",
    nombre: "Sala Denver",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-denver.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-avantti-
    slug: "modular-avantti",
    nombre: "Modular Avantti",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-avantti.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/berlin
    slug: "sala-berlin",
    nombre: "Sala Berlin",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-berlin.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/confort-%232
    slug: "sala-confort-2",
    nombre: "Sala Confort #2",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-confort-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-confort
    slug: "modular-confort",
    nombre: "Modular Confort",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-confort.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/zafiro-%232
    slug: "sala-zafiro-2",
    nombre: "Sala Zafiro #2",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-zafiro-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/zafiro
    slug: "sala-zafiro",
    nombre: "Sala Zafiro",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/sala-zafiro.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-eco-
    slug: "modular-eco",
    nombre: "Modular Eco",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-eco.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-zafiro
    slug: "modular-zafiro",
    nombre: "Modular Zafiro",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-zafiro.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-tansy
    slug: "modular-tansy",
    nombre: "Modular Tansy",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-tansy.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-viena
    slug: "modular-viena",
    nombre: "Modular Viena",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-viena.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-melek
    slug: "modular-melek",
    nombre: "Modular Melek",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-melek.webp",
  },
  {
    // Original: https://www.industriasmarin.co/salas/modular-fenix
    slug: "modular-fenix",
    nombre: "Modular Fenix",
    espacio: "sala",
    categoria: "Salas",
    foto: "/img/productos/modular-fenix.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/chester
    slug: "mesa-de-centro-chester",
    nombre: "Mesa de centro Chester",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-chester.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/shaira
    slug: "mesa-de-centro-shaira",
    nombre: "Mesa de centro Shaira",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-shaira.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/novara
    slug: "mesa-de-centro-novara",
    nombre: "Mesa de centro Novara",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-novara.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/korall
    slug: "mesa-de-centro-korall",
    nombre: "Mesa de centro Korall",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-korall.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/angola
    slug: "mesa-de-centro-angola",
    nombre: "Mesa de centro Angola",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-angola.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/tansy
    slug: "mesa-de-centro-tansy",
    nombre: "Mesa de centro Tansy",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-tansy.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/dubai
    slug: "mesa-de-centro-dubai",
    nombre: "Mesa de centro Dubai",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-dubai.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/diamante
    slug: "mesa-de-centro-diamante",
    nombre: "Mesa de centro Diamante",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-diamante.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/georgia
    slug: "mesa-de-centro-georgia",
    nombre: "Mesa de centro Georgia",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-georgia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/pascal
    slug: "mesa-de-centro-pascal",
    nombre: "Mesa de centro Pascal",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-pascal.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/triada
    slug: "mesa-de-centro-triada",
    nombre: "Mesa de centro Triada",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-triada.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/daly
    slug: "mesa-de-centro-daly",
    nombre: "Mesa de centro Daly",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-daly.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/hanni
    slug: "mesa-de-centro-hanni",
    nombre: "Mesa de centro Hanni",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-hanni.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/prada
    slug: "mesa-de-centro-prada",
    nombre: "Mesa de centro Prada",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-prada.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/bali
    slug: "mesa-de-centro-bali",
    nombre: "Mesa de centro Bali",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-bali.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/aralia
    slug: "mesa-de-centro-aralia",
    nombre: "Mesa de centro Aralia",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-aralia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/paris
    slug: "mesa-de-centro-paris",
    nombre: "Mesa de centro Paris",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-paris.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/verti
    slug: "mesa-de-centro-verti",
    nombre: "Mesa de centro Verti",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-verti.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/damasco
    slug: "mesa-de-centro-damasco",
    nombre: "Mesa de centro Damasco",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-damasco.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/lido
    slug: "mesa-de-centro-lido",
    nombre: "Mesa de centro Lido",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-lido.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/oporto
    slug: "mesa-de-centro-oporto",
    nombre: "Mesa de centro Oporto",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-oporto.webp",
  },
  {
    // Original: https://www.industriasmarin.co/mesas-de-centro-1/safari
    slug: "mesa-de-centro-safari",
    nombre: "Mesa de centro Safari",
    espacio: "sala",
    categoria: "Mesas de centro",
    foto: "/img/productos/mesa-de-centro-safari.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/andromeda
    slug: "consola-andromeda",
    nombre: "Consola Andromeda",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-andromeda.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/dubling-con-marco-espejo-catar
    slug: "consola-dubling-con-marco-espejo-catar",
    nombre: "Consola Dubling con Marco Espejo Catar",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-dubling-con-marco-espejo-catar.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/luxury-con-marco-espejo
    slug: "consola-luxury-con-marco-espejo",
    nombre: "Consola Luxury con Marco Espejo",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-luxury-con-marco-espejo.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/sidney
    slug: "consola-sidney",
    nombre: "Consola Sidney",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-sidney.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/dubling
    slug: "consola-dubling",
    nombre: "Consola Dubling",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-dubling.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/dubling-con-marco-espejo-proyecta
    slug: "consola-dubling-con-marco-espejo-proyecta",
    nombre: "Consola Dubling con Marco Espejo Proyecta",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-dubling-con-marco-espejo-proyecta.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/pie-de-amigo
    slug: "pie-de-amigo",
    nombre: "Pie de amigo",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/pie-de-amigo.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/turin
    slug: "consola-turin",
    nombre: "Consola Turin",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-turin.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/dubling-con-marco-espejo-biselado
    slug: "consola-dubling-con-marco-espejo-biselado",
    nombre: "Consola Dubling con Marco Espejo Biselado",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-dubling-con-marco-espejo-biselado.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/luxury
    slug: "consola-luxury",
    nombre: "Consola Luxury",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-luxury.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/flotante
    slug: "repisa-flotante",
    nombre: "Repisa Flotante",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/repisa-flotante.webp",
  },
  {
    // Original: https://www.industriasmarin.co/funcionales/valencia
    slug: "consola-valencia",
    nombre: "Consola Valencia",
    espacio: "sala",
    categoria: "Consolas",
    foto: "/img/productos/consola-valencia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/ahorrador-madison
    slug: "comedor-ahorrador-madison",
    nombre: "Comedor Ahorrador Madison",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-ahorrador-madison.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/alicante-%232
    slug: "comedor-alicante-2",
    nombre: "Comedor Alicante #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-alicante-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/avellana
    slug: "comedor-avellana",
    nombre: "Comedor Avellana",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-avellana.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/bahia-%232
    slug: "comedor-bahia-2",
    nombre: "Comedor Bahia #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-bahia-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/ahorrador-madison-%232
    slug: "comedor-ahorrador-madison-2",
    nombre: "Comedor Ahorrador Madison #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-ahorrador-madison-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/alicante-con-butaco-quadratto
    slug: "comedor-alicante-con-butaco-quadratto",
    nombre: "Comedor Alicante con butaco Quadratto",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-alicante-con-butaco-quadratto.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/avellana-%232
    slug: "comedor-avellana-2",
    nombre: "Comedor Avellana #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-avellana-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/basari
    slug: "comedor-basari",
    nombre: "Comedor Basari",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-basari.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/alicante
    slug: "comedor-alicante",
    nombre: "Comedor Alicante",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-alicante.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/altamira
    slug: "comedor-altamira",
    nombre: "Comedor Altamira",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-altamira.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/bahia
    slug: "comedor-bahia",
    nombre: "Comedor Bahia",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-bahia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/basari-%232
    slug: "comedor-basari-2",
    nombre: "Comedor Basari #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-basari-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/raysa-%232
    slug: "comedor-raysa-2",
    nombre: "Comedor Raysa #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-raysa-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/luna
    slug: "comedor-luna-2",
    nombre: "Comedor Luna #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-luna-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/vianca-%232
    slug: "comedor-vianca-2",
    nombre: "Comedor Vianca #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-vianca-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/romance-
    slug: "comedor-romance",
    nombre: "Comedor Romance",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-romance.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/galaxy
    slug: "comedor-galaxy",
    nombre: "Comedor Galaxy",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-galaxy.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/dousty-%232
    slug: "comedor-dousty-2",
    nombre: "Comedor Dousty #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-dousty-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/dousty-
    slug: "comedor-dousty",
    nombre: "Comedor Dousty",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-dousty.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/centuria
    slug: "comedor-centuria",
    nombre: "Comedor Centuria",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-centuria.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/galicia-%233
    slug: "comedor-galicia-3",
    nombre: "Comedor Galicia #3",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-galicia-3.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/firenze
    slug: "comedor-firenze",
    nombre: "Comedor Firenze",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-firenze.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/ely
    slug: "comedor-ely",
    nombre: "Comedor Ely",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-ely.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/brianna-%232
    slug: "comedor-brianna-2",
    nombre: "Comedor Brianna #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-brianna-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/sahori-%232
    slug: "comedor-sahori-2",
    nombre: "Comedor Sahori #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-sahori-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/kalira-%232
    slug: "comedor-kalira-2",
    nombre: "Comedor Kalira #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-kalira-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/raysa
    slug: "comedor-raysa",
    nombre: "Comedor Raysa",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-raysa.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/britalia-%232
    slug: "comedor-britalia-2",
    nombre: "Comedor Britalia #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-britalia-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/galicia-%232
    slug: "comedor-galicia-2",
    nombre: "Comedor Galicia #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-galicia-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/ciara-%233
    slug: "comedor-ciara-3",
    nombre: "Comedor Ciara #3",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-ciara-3.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/ciara-%232
    slug: "comedor-ciara-2",
    nombre: "Comedor Ciara #2",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-ciara-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/brianna
    slug: "comedor-brianna",
    nombre: "Comedor Brianna",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-brianna.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/britalia
    slug: "comedor-britalia",
    nombre: "Comedor Britalia",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-britalia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/kalira-
    slug: "comedor-kalira",
    nombre: "Comedor Kalira",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-kalira.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/vianca
    slug: "comedor-vianca",
    nombre: "Comedor Vianca",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-vianca.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/tamara
    slug: "comedor-tamara",
    nombre: "Comedor Tamara",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-tamara.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/mayorca
    slug: "comedor-mayorca",
    nombre: "Comedor Mayorca",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-mayorca.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/sahori
    slug: "comedor-sahori",
    nombre: "Comedor Sahori",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-sahori.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/lauren
    slug: "comedor-lauren",
    nombre: "Comedor Lauren",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-lauren.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/galicia
    slug: "comedor-galicia",
    nombre: "Comedor Galicia",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-galicia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/ferrara
    slug: "comedor-ferrara",
    nombre: "Comedor Ferrara",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-ferrara.webp",
  },
  {
    // Original: https://www.industriasmarin.co/Detalle/ciara
    slug: "comedor-ciara",
    nombre: "Comedor Ciara",
    espacio: "comedor",
    categoria: "Comedores",
    foto: "/img/productos/comedor-ciara.webp",
  },
  {
    // Original: https://www.industriasmarin.co/modulares/atenas
    slug: "bifet-atenas",
    nombre: "Bifet Atenas",
    espacio: "comedor",
    categoria: "Bifet",
    foto: "/img/productos/bifet-atenas.webp",
  },
  {
    // Original: https://www.industriasmarin.co/modulares/moderno-de-100
    slug: "bifet-moderno-de-100",
    nombre: "Bifet Moderno de 100",
    espacio: "comedor",
    categoria: "Bifet",
    foto: "/img/productos/bifet-moderno-de-100.webp",
  },
  {
    // Original: https://www.industriasmarin.co/modulares/moderno-de-170
    slug: "bifet-moderno-de-170",
    nombre: "Bifet Moderno de 170",
    espacio: "comedor",
    categoria: "Bifet",
    foto: "/img/productos/bifet-moderno-de-170.webp",
  },
  {
    // Original: https://www.industriasmarin.co/modulares/dom%C3%A9nico
    slug: "bifet-domenico",
    nombre: "Bifet Doménico",
    espacio: "comedor",
    categoria: "Bifet",
    foto: "/img/productos/bifet-domenico.webp",
  },
  {
    // Original: https://www.industriasmarin.co/modulares/moderno-de-130
    slug: "bifet-moderno-de-130",
    nombre: "Bifet Moderno de 130",
    espacio: "comedor",
    categoria: "Bifet",
    foto: "/img/productos/bifet-moderno-de-130.webp",
  },
  {
    // Original: https://www.industriasmarin.co/modulares/marruecos-
    slug: "bifet-marruecos",
    nombre: "Bifet Marruecos",
    espacio: "comedor",
    categoria: "Bifet",
    foto: "/img/productos/bifet-marruecos.webp",
  },
  {
    // Original: https://www.industriasmarin.co/modulares/moderno-de-130-%232
    slug: "bifet-moderno-de-130-2",
    nombre: "Bifet Moderno de 130 #2",
    espacio: "comedor",
    categoria: "Bifet",
    foto: "/img/productos/bifet-moderno-de-130-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items/con-cristal-
    slug: "bar-con-cristal",
    nombre: "Bar Con Cristal",
    espacio: "comedor",
    categoria: "Bares",
    foto: "/img/productos/bar-con-cristal.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items/giratorio
    slug: "bar-giratorio",
    nombre: "Bar Giratorio",
    espacio: "comedor",
    categoria: "Bares",
    foto: "/img/productos/bar-giratorio.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items/lineal
    slug: "bar-lineal",
    nombre: "Bar Lineal",
    espacio: "comedor",
    categoria: "Bares",
    foto: "/img/productos/bar-lineal.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-2/bilbao
    slug: "vitrina-bilbao",
    nombre: "Vitrina Bilbao",
    espacio: "comedor",
    categoria: "Vitrinas",
    foto: "/img/productos/vitrina-bilbao.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-2/fenix
    slug: "vitrina-fenix",
    nombre: "Vitrina Fenix",
    espacio: "comedor",
    categoria: "Vitrinas",
    foto: "/img/productos/vitrina-fenix.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-2/valencia
    slug: "vitrina-valencia",
    nombre: "Vitrina Valencia",
    espacio: "comedor",
    categoria: "Vitrinas",
    foto: "/img/productos/vitrina-valencia.webp",
  },
  {
    // Original: https://www.industriasmarin.co/cocinas/integral
    slug: "cocina-integral",
    nombre: "Cocina Integral",
    espacio: "cocina",
    categoria: "Cocinas integrales",
    foto: "/img/productos/cocina-integral.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/archivador-l-800
    slug: "escritorio-l-800",
    nombre: "Escritorio L-800",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-l-800.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/gerente-l-900
    slug: "escritorio-gerente-l-900",
    nombre: "Escritorio Gerente L-900",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-gerente-l-900.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/secretaria-l-800
    slug: "escritorio-secretaria-l-800",
    nombre: "Escritorio Secretaria L-800",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-secretaria-l-800.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/dos-servicios-l-800
    slug: "escritorio-dos-servicios-l-800",
    nombre: "Escritorio Dos Servicios L-800",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-dos-servicios-l-800.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/con-pedestal-met%C3%A1lico-
    slug: "escritorio-con-pedestal-metalico",
    nombre: "Escritorio Con Pedestal Metálico",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-con-pedestal-metalico.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/gerente-moderno
    slug: "escritorio-gerente-moderno",
    nombre: "Escritorio Gerente Moderno",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-gerente-moderno.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/secretaria-l-900
    slug: "escritorio-secretaria-l-900",
    nombre: "Escritorio Secretaria L-900",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-secretaria-l-900.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/integrada-l-800
    slug: "escritorio-integrada-l-800",
    nombre: "Escritorio Integrada L-800",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-integrada-l-800.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/en-l-moderno
    slug: "escritorio-en-l-moderno",
    nombre: "Escritorio En L Moderno",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-en-l-moderno.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/milenio
    slug: "escritorio-milenio",
    nombre: "Escritorio Milenio",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-milenio.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/secretaria-moderno
    slug: "escritorio-secretaria-moderno",
    nombre: "Escritorio Secretaria Moderno",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-secretaria-moderno.webp",
  },
  {
    // Original: https://www.industriasmarin.co/oficina/mf-5014-l-800
    slug: "escritorio-mf-5014-l-800",
    nombre: "Escritorio MF-5014 L-800",
    espacio: "oficina",
    categoria: "Muebles de oficina",
    foto: "/img/productos/escritorio-mf-5014-l-800.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-1/abuela
    slug: "mecedora-abuela",
    nombre: "Mecedora Abuela",
    espacio: "detalles",
    categoria: "Mecedoras",
    foto: "/img/productos/mecedora-abuela.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-1-1/lineal-
    slug: "perchero-lineal",
    nombre: "Perchero Lineal",
    espacio: "detalles",
    categoria: "Percheros",
    foto: "/img/productos/perchero-lineal.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-1-1/torneado
    slug: "perchero-torneado",
    nombre: "Perchero Torneado",
    espacio: "detalles",
    categoria: "Percheros",
    foto: "/img/productos/perchero-torneado.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-3/coqueta
    slug: "coqueta",
    nombre: "Coqueta",
    espacio: "detalles",
    categoria: "Mesas decorativas",
    foto: "/img/productos/coqueta.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-3/silla-pitufa
    slug: "silla-pitufa",
    nombre: "Silla Pitufa",
    espacio: "detalles",
    categoria: "Mesas decorativas",
    foto: "/img/productos/silla-pitufa.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-3/dunas-
    slug: "mesa-dunas",
    nombre: "Mesa Dunas",
    espacio: "detalles",
    categoria: "Mesas decorativas",
    foto: "/img/productos/mesa-dunas.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-3/venus
    slug: "mesa-venus",
    nombre: "Mesa Venus",
    espacio: "detalles",
    categoria: "Mesas decorativas",
    foto: "/img/productos/mesa-venus.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-3/luxury
    slug: "mesa-metalica",
    nombre: "Mesa Metalica",
    espacio: "detalles",
    categoria: "Mesas decorativas",
    foto: "/img/productos/mesa-metalica.webp",
  },
  {
    // Original: https://www.industriasmarin.co/items-3/zafiro
    slug: "mesa-zafiro",
    nombre: "Mesa Zafiro",
    espacio: "detalles",
    categoria: "Mesas decorativas",
    foto: "/img/productos/mesa-zafiro.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/elite-crudo-
    slug: "elite-crudo",
    nombre: "Elite Crudo",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/elite-crudo.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/plain-luxor-
    slug: "plain-luxor",
    nombre: "Plain Luxor",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/plain-luxor.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/poetic
    slug: "poetic",
    nombre: "Poetic",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/poetic.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/mancini-plata-
    slug: "mancini-plata",
    nombre: "Mancini Plata",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/mancini-plata.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/elite-ivar---tana
    slug: "elite-ivar-tana",
    nombre: "Elite Ivar - Tana",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/elite-ivar-tana.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/plain-trecia-lurex-1
    slug: "plain-trecia-lurex-1",
    nombre: "Plain Trecia Lurex 1",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/plain-trecia-lurex-1.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/carusso-rosa
    slug: "carusso-rosa",
    nombre: "Carusso Rosa",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/carusso-rosa.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/emotion-10
    slug: "emotion-10",
    nombre: "Emotion 10",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/emotion-10.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/espa%C3%B1a
    slug: "espana",
    nombre: "España",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/espana.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/plain-trecia-lurex-2
    slug: "plain-trecia-lurex-2",
    nombre: "Plain Trecia Lurex 2",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/plain-trecia-lurex-2.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/mancini-mostaza-
    slug: "mancini-mostaza",
    nombre: "Mancini Mostaza",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/mancini-mostaza.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/plain-81
    slug: "plain-81",
    nombre: "Plain 81",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/plain-81.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/quevedo-05
    slug: "quevedo-05",
    nombre: "Quevedo 05",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/quevedo-05.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/quevedo-06-
    slug: "quevedo-06",
    nombre: "Quevedo 06",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/quevedo-06.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/quevedo-07
    slug: "quevedo-07",
    nombre: "Quevedo 07",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/quevedo-07.webp",
  },
  {
    // Original: https://www.industriasmarin.co/decoracion/velu-
    slug: "velu",
    nombre: "Velu",
    espacio: "detalles",
    categoria: "Decoración",
    foto: "/img/productos/velu.webp",
  },
];
