// Tipos mínimos para el módulo que Cloudflare entrega con las variables y secretos del Worker.
declare module "cloudflare:workers" {
  export const env: Record<string, string | undefined>;
}
