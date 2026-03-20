/**
 * Subtle parallax for graphic elements.
 * Background marks move at 10-15% slower scroll rate.
 * Uses requestAnimationFrame for smooth performance.
 * Respects prefers-reduced-motion.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const layers = document.querySelectorAll<HTMLElement>('.parallax-layer');

  if (layers.length > 0) {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed || '0.12');
        const offset = scrollY * speed;
        layer.style.transform = `translateY(${-offset}px)`;
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }
}
