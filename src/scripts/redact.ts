/**
 * Redaction reveal interaction.
 * Hover (desktop) or tap (mobile) reveals text behind redaction bars.
 * Respects prefers-reduced-motion (bars hidden, text visible).
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  document.querySelectorAll<HTMLElement>('.redact').forEach((el) => {
    // Desktop: hover
    el.addEventListener('mouseenter', () => el.classList.add('is-revealed'));
    el.addEventListener('mouseleave', () => el.classList.remove('is-revealed'));

    // Mobile: tap toggle
    el.addEventListener('click', (e) => {
      e.preventDefault();
      el.classList.toggle('is-revealed');
    });
  });
}
