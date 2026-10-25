// Crea la línea de un usuario para el modo administrador.
//
// Uso:   node scripts/crear-usuario.mjs maria "una-contraseña-larga"
//
// Copia la línea que imprime y pégala en la variable secreta ADMIN_USUARIOS de Cloudflare
// (Workers → industrias-marin → Settings → Variables and Secrets). Si hay varios usuarios,
// sepáralos con punto y coma:  maria:pbkdf2$…;adrian:pbkdf2$…
//
// La contraseña nunca se guarda: solo un "hash" del que no se puede recuperar.
import { webcrypto as crypto } from "node:crypto";

const [usuario, contrasena] = process.argv.slice(2);

if (!usuario || !contrasena) {
  console.log('Uso: node scripts/crear-usuario.mjs <usuario> "<contraseña>"');
  process.exit(1);
}
if (!/^[a-z0-9._-]{3,30}$/i.test(usuario)) {
  console.log("⛔ El usuario solo puede tener letras sin tildes, números, punto, guion o guion bajo (3 a 30).");
  process.exit(1);
}
if (contrasena.length < 10) {
  console.log("⛔ Usa una contraseña de al menos 10 caracteres.");
  process.exit(1);
}

const ITERACIONES = 10000; // el servidor gratuito de Cloudflare tiene poco tiempo de CPU por solicitud
const sal = crypto.getRandomValues(new Uint8Array(16));
const clave = await crypto.subtle.importKey("raw", new TextEncoder().encode(contrasena), "PBKDF2", false, ["deriveBits"]);
const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: sal, iterations: ITERACIONES }, clave, 256);

const b64 = (bytes) => Buffer.from(bytes).toString("base64");
console.log(`\n${usuario.toLowerCase()}:pbkdf2$${ITERACIONES}$${b64(sal)}$${b64(new Uint8Array(bits))}\n`);
