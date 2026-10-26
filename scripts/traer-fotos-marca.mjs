// Descarga de la página de Wix las fotos de la empresa (taller, sala de exhibición),
// los íconos de valores y los logos de reconocimientos, y los guarda optimizados en
// src/assets/marca/. Se corre UNA vez:  node scripts/traer-fotos-marca.mjs
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIX = "https://static.wixstatic.com/media/";
const DESTINO = "src/assets/marca";

const fotos = {
  "taller.webp": "1cfe5d_e9e880c14ae548ebb16a89fe1c8f9f8a~mv2.jpg",
  "nosotros.webp": "1cfe5d_5e02e3054f704210bf7345774c407da6~mv2.jpg",
  "textura-madera.webp": "1cfe5d_2c8bc5516d7a4f2bbdab91fa5b957f4e~mv2.jpg",
};

const iconos = {
  "iconos/a-tu-medida.png": "1cfe5d_953e9d4dd9b94fae8cd0ec5405e16877~mv2.png",
  "iconos/inmunizado.png": "1cfe5d_bc630a05075a4ebcba66afdf47df76c0~mv2.png",
  "iconos/acabados.png": "1cfe5d_b1e7e5072ec24222a5531b62b2888c00~mv2.png",
  "iconos/experiencia.png": "1cfe5d_555f069031084d7dbf69507bb60cfbbe~mv2.png",
  "iconos/ambiente.png": "1cfe5d_e0a39a5f6fe24313b493fc38a3e2fdda~mv2.png",
};

const reconocimientos = [
  "1cfe5d_7d18b19bea1f4ca788be82f7ea461089~mv2.png",
  "1cfe5d_b9a8803938354b519d6ddfbd42662c11~mv2.png",
  "1cfe5d_3d2068f96b274b6c82777cb4e07ff414~mv2.png",
  "1cfe5d_7c583c4ae09d4f3797aede5ab427c71d~mv2.png",
  "1cfe5d_d42b95eb78234bebb5bd21d6527c56de~mv2.png",
  "1cfe5d_3257ff1d327b4fd18732abdb68f31366~mv2.png",
  "1cfe5d_e9169b47af9b40d7b09ca4db76aac49b~mv2.png",
  "1cfe5d_e43a138e5a594e9cba7e3dfaf1c4a671~mv2.png",
  "1cfe5d_dc27311b13a64138917e4cb5fda4ef38~mv2.png",
];

async function bajar(archivo) {
  const r = await fetch(WIX + archivo);
  if (!r.ok) throw new Error(`error ${r.status} con ${archivo}`);
  return Buffer.from(await r.arrayBuffer());
}

async function guardar(nombre, datos, convertir) {
  const ruta = path.join(DESTINO, nombre);
  await fs.mkdir(path.dirname(ruta), { recursive: true });
  await convertir(sharp(datos)).toFile(ruta);
  console.log("  ✓", ruta);
}

console.log("📷 Fotos");
for (const [nombre, archivo] of Object.entries(fotos)) {
  await guardar(nombre, await bajar(archivo), (s) =>
    s.rotate().resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }));
}

console.log("✏️  Íconos");
for (const [nombre, archivo] of Object.entries(iconos)) {
  await guardar(nombre, await bajar(archivo), (s) => s.resize({ width: 240, withoutEnlargement: true }).png());
}

console.log("🏅 Reconocimientos");
for (const [i, archivo] of reconocimientos.entries()) {
  const nombre = `reconocimientos/${String(i + 1).padStart(2, "0")}.png`;
  await guardar(nombre, await bajar(archivo), (s) => s.resize({ width: 500, withoutEnlargement: true }).png());
}

console.log(`\n✅ Listo. Revisa ${DESTINO}/ y borra los reconocimientos que no correspondan.`);
