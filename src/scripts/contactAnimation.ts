// src/scripts/contactAnimation.ts
import { gsap } from 'gsap';

export function initContactAnimations() {
  const title = document.querySelector('.contact-title') as HTMLElement;
  const list = document.querySelector('.contact-list') as HTMLElement;
  const items = document.querySelectorAll('.contact-item');

  if (!title || !list || items.length === 0) return; // Salir si no existe

  const titleDefaultScale = 1.0;
  const titleShrunkScale = 0.7; // Cuánto se encoge el título
  const itemDefaultScale = 1.0;
  const itemHoverScale = 1.1; // Cuánto crece el item

  // --- LÓGICA DEL TÍTULO ---
  // Se dispara cuando el ratón entra o sale del *contenedor* de la lista

  list.addEventListener('mouseenter', () => {
    // Encoger el título
    gsap.to(title, {
      scale: titleShrunkScale,
      duration: 0.4,
      ease: 'power3.out',
    });
  });

  list.addEventListener('mouseleave', () => {
    // Devolver el título a su tamaño original
    gsap.to(title, {
      scale: titleDefaultScale,
      duration: 0.4,
      ease: 'power3.out',
    });
  });

  // --- LÓGICA DE LOS ITEMS ---
  // Se dispara cuando el ratón entra o sale de *cada item individual*

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      // Hacer crecer este item
      gsap.to(item, {
        scale: itemHoverScale,
        duration: 0.4,
        ease: 'power3.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      // Devolver este item a su tamaño original
      gsap.to(item, {
        scale: itemDefaultScale,
        duration: 0.4,
        ease: 'power3.out',
      });
    });
  });
}