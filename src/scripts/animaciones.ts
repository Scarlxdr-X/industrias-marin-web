// Animaciones que necesitan JavaScript: aparición al hacer scroll y encabezado compacto.
// Pesa menos de 1 KB. Si algo falla, la página se ve completa igual (ver Base.astro).

const moverMenos = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Aparición al hacer scroll ----------
if (!moverMenos && "IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      // Los elementos que entran juntos (ej: una fila de tarjetas) aparecen uno tras otro
      entradas
        .filter((e) => e.isIntersecting)
        .forEach((entrada, i) => {
          const el = entrada.target as HTMLElement;
          el.style.setProperty("--retraso", `${Math.min(i, 5) * 80}ms`);
          el.classList.add("revelado");
          observador.unobserve(el);
        });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
  );

  document.querySelectorAll("[data-revelar]").forEach((el) => observador.observe(el));
}
document.documentElement.classList.add("animaciones-listas");

// ---------- Encabezado compacto al bajar ----------
const encabezado = document.querySelector(".encabezado");
if (encabezado) {
  let pendiente = false;
  const actualizar = () => {
    encabezado.classList.toggle("encabezado--compacto", scrollY > 24);
    pendiente = false;
  };
  addEventListener(
    "scroll",
    () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(actualizar);
      }
    },
    { passive: true },
  );
  actualizar();
}
