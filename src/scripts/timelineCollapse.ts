// src/scripts/timelineCollapse.ts
import { gsap } from 'gsap';

export function initTimelineCollapse() {
  const cards = document.querySelectorAll('.timeline-card');

  cards.forEach((card) => {
    // Busca los elementos DENTRO de la tarjeta
    const header = card.querySelector('.card-header') as HTMLElement;
    const description = card.querySelector('.card-description') as HTMLElement;
    const subItems = card.querySelectorAll('.sub-item');

    if (!header || !description) return;

    header.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      // --- CERRAR TODAS LAS DEMÁS TARJETAS ---
      cards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains('is-open')) {
          otherCard.classList.remove('is-open');

          const otherDesc = otherCard.querySelector(
            '.card-description'
          ) as HTMLElement;
          const otherSubItems = otherCard.querySelectorAll('.sub-item');

          // Animamos la salida de sus sub-items
          gsap.to(otherSubItems, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            stagger: 0.05,
          });

          // Cerramos el contenedor
          gsap.to(otherDesc, {
            height: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 0.4,
            ease: 'power3.inOut',
            delay: 0.1, // Pequeño delay
          });
        }
      });

      // --- ABRIR O CERRAR LA TARJETA CLICADA ---
      if (isOpen) {
        // --- LÓGICA DE CERRAR ---
        card.classList.remove('is-open');

        // 1. Animamos la salida de los sub-items
        gsap.to(subItems, {
          opacity: 0,
          y: 10, // Se van hacia abajo
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.in',
        });

        // 2. Cerramos el contenedor (un poco después)
        gsap.to(description, {
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.5,
          ease: 'power3.inOut',
          delay: 0.1, // Empieza casi a la vez que los sub-items
        });
      } else {
        // --- LÓGICA DE ABRIR ---
        card.classList.add('is-open');

        // 1. Abrimos el contenedor
        gsap.set(description, { height: 'auto', opacity: 1 });
        gsap.from(description, {
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.5,
          ease: 'power3.out',
        });

        // 2. Animamos la entrada de los sub-items (con un delay)
        gsap.to(subItems, {
          opacity: 1,
          y: 0, // Vienen desde abajo
          duration: 0.4,
          stagger: 0.1, // Una detrás de otra
          ease: 'power2.out',
          delay: 0.3, // Espera a que el contenedor esté medio abierto
        });
      }
    });
  });
}