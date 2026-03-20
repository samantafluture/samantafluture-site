/**
 * Margin position indicator.
 * Highlights the active section dot based on scroll position.
 * Desktop only (hidden via CSS on mobile).
 */

const sections = document.querySelectorAll<HTMLElement>('[data-section]');
const dots = document.querySelectorAll<HTMLElement>('.position-indicator__dot');

if (sections.length > 0 && dots.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section');
          dots.forEach((dot) => {
            dot.classList.toggle('is-active', dot.getAttribute('data-target') === id);
          });
        }
      }
    },
    { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  // Click to scroll
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = dot.getAttribute('data-target');
      const section = document.querySelector(`[data-section="${target}"]`);
      section?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
