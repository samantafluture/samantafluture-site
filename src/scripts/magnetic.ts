/**
 * Magnetic hover — project cards tilt toward the cursor.
 * Max 2.5 degrees. CSS perspective on the card enables 3D.
 * Respects prefers-reduced-motion.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalize to -1..1, then scale to max degrees
      const rotateY = ((x - centerX) / centerX) * 2.5;
      const rotateX = ((centerY - y) / centerY) * 2.5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
