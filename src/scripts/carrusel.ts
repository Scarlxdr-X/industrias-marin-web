// Carrusel de la portada: cambia de foto cada pocos segundos con un fundido.
// Se pausa al pasar el mouse, al enfocarlo con el teclado o si la pestaña no está visible.
// Con "reducir movimiento" no avanza solo (se usan los indicadores).

for (const carrusel of document.querySelectorAll<HTMLElement>("[data-carrusel]")) {
  const diapositivas = [...carrusel.querySelectorAll<HTMLElement>("[data-diapositiva]")];
  const indicadores = [...carrusel.querySelectorAll<HTMLButtonElement>("[data-ir]")];
  if (diapositivas.length < 2) continue;

  const pausa = parseFloat(getComputedStyle(carrusel).getPropertyValue("--pausa")) * 1000 || 6000;
  const moverMenos = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let actual = 0;
  let reloj: number | undefined;
  let pausado = false;

  function mostrar(indice: number) {
    actual = (indice + diapositivas.length) % diapositivas.length;
    diapositivas.forEach((d, i) => {
      d.classList.toggle("activa", i === actual);
      if (i === actual) d.removeAttribute("aria-hidden");
      else d.setAttribute("aria-hidden", "true");
    });
    indicadores.forEach((b, i) => {
      b.classList.toggle("activa", i === actual);
      b.setAttribute("aria-selected", String(i === actual));
    });
    reiniciar();
  }

  function reiniciar() {
    clearTimeout(reloj);
    carrusel.classList.remove("corriendo");
    if (moverMenos || pausado || document.hidden) return;
    void carrusel.offsetWidth; // reinicia la animación de la barra de progreso
    carrusel.classList.add("corriendo");
    reloj = window.setTimeout(() => mostrar(actual + 1), pausa);
  }

  function pausar(valor: boolean) {
    pausado = valor;
    carrusel.classList.toggle("pausado", valor);
    reiniciar();
  }

  indicadores.forEach((b) => b.addEventListener("click", () => mostrar(Number(b.dataset.ir))));
  carrusel.querySelector("[data-anterior]")?.addEventListener("click", () => mostrar(actual - 1));
  carrusel.querySelector("[data-siguiente]")?.addEventListener("click", () => mostrar(actual + 1));

  carrusel.addEventListener("mouseenter", () => pausar(true));
  carrusel.addEventListener("mouseleave", () => pausar(false));
  carrusel.addEventListener("focusin", () => pausar(true));
  carrusel.addEventListener("focusout", () => pausar(false));
  document.addEventListener("visibilitychange", reiniciar);

  // Deslizar con el dedo en el celular
  let inicioX: number | null = null;
  carrusel.addEventListener("touchstart", (e) => (inicioX = e.touches[0].clientX), { passive: true });
  carrusel.addEventListener("touchend", (e) => {
    if (inicioX === null) return;
    const distancia = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(distancia) > 50) mostrar(actual + (distancia < 0 ? 1 : -1));
    inicioX = null;
  });

  // Si hay intro, arranca cuando termina para no gastar la primera foto detrás de la cortina
  const retraso = document.documentElement.classList.contains("intro-bloqueo") ? 1700 : 0;
  setTimeout(reiniciar, retraso);
}
