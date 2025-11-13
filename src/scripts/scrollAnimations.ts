// src/scripts/scrollAnimations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initThreeScene } from './threeScene';

// ¡MUY IMPORTANTE! Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
const timelineCards = gsap.utils.toArray('.timeline-card');

export function initScrollAnimations() {

  gsap.to('.timeline-progress', {
    scaleY: 1, // Anima la escala vertical de 0 a 1
    scrollTrigger: {
      trigger: '.timeline-container', // El contenedor de la timeline
      start: 'top 50%', // Empieza cuando la parte de arriba del contenedor llega al centro
      end: 'bottom 90%', // Termina cuando el 90% del contenedor ha pasado
      scrub: 1.5, // ¡Conecta la animación al scroll!
    },
    ease: 'none', // Progreso lineal
  });


  timelineCards.forEach((card: any) => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',     // La animación EMPIEZA aquí
        end: 'bottom 20%',    // La animación TERMINA aquí
        scrub: 1,             // Conectada al scroll
      },
    });
    
    tl.to(card, {
      opacity: 1,
      x: 0,
      ease: 'power3.out',
      duration: 1, // 1 "segundo" relativo
    });

    // 2. ANIMACIÓN DE SALIDA (la nueva)
    tl.to(card, {
      opacity: 0,
      y: -150,
      ease: 'power2.in',
      duration: 1, // 1 "segundo" relativo
    }, 
    '>=1' // Deja 1 "segundo" de pausa entre la entrada y la salida
    );
  });


  // --- LA ANIMACIÓN 3D ---
  const sceneData = initThreeScene();
  if (!sceneData) return;
  const { shape, camera, renderer } = sceneData;



  const nextSection = document.querySelector('.contact') as HTMLElement; 

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-3d-container',
      start: 'top top',
      end: '+=4000', 
      pin: true,
      scrub: 1,
      markers: false, 
      onLeave: () => {
        // Asegúrate de que la cámara esté en su estado final y la siguiente sección visible
        gsap.set(camera.position, { z: -30 }); 
        gsap.set(nextSection, { opacity: 1, pointerEvents: 'all' });
      },
      onEnterBack: () => {
        gsap.set(camera.position, { z: 8 }); 
        gsap.set(nextSection, { opacity: 0, pointerEvents: 'none' });
      }
    },
  });

  // ----------------------------------------------------
  // --- FASE 1: Rotación de la figura y cambio de texto ---
  // ----------------------------------------------------

  tl.to(shape.rotation, {
    x: 4,
    y: 6,
    z: 2, // Le damos más rotación en Z para un efecto más dinámico
    ease: 'none',
    duration: 5.5,
  }, 0);

  tl.to('.about-text.text-1', { opacity: 1 }, 0.5);
  tl.to('.about-text.text-1', { opacity: 0 }, 2);
  tl.to('.about-text.text-2', { opacity: 1 }, 2);
  tl.to('.about-text.text-2', { opacity: 0 }, 3.5);
  tl.to('.about-text.text-3', { opacity: 1 }, 3.5);
  tl.to('.about-text.text-3', { opacity: 0 }, 5);

  // ----------------------------------------------------
  // --- FASE 2: Animación de salida (VUELO A TRAVÉS DEL QUESITO) ---
  // ----------------------------------------------------

  // 1. Zoom de la cámara hacia el agujero central
  tl.to(
    camera.position,
    {
      z: -10, // La cámara atraviesa el donut (pasa de z=5, a z=0, a z=-10)
      ease: 'power1.inOut',
      duration: 2, 
    },
    5 
  );

  // 2. El donut se hace transparente y se escala mucho para el efecto de "pasar"
  tl.to(
    shape.material,
    {
      opacity: 0, 
      ease: 'power1.in',
      duration: 1,
    },
    5.5 
  );

  tl.to(
    shape.scale,
    {
      x: 20, // Se hace 20 veces más grande para un efecto de "boom" al pasar
      y: 20,
      z: 20,
      ease: 'power1.in',
      duration: 1.5,
    },
    5 // Empieza al mismo tiempo que el movimiento de cámara
  );
  
  // 3. Revelar la siguiente sección HTML
  tl.to(
    nextSection,
    {
      opacity: 1, 
      pointerEvents: 'all', 
      ease: 'power1.out',
      duration: 1.5,
    },
    5.8 
  );

  // 4. La cámara sigue alejándose un poco más (opcional, para una transición suave)
  tl.to(
    camera.position,
    {
      z: -30, 
      ease: 'power1.out',
      duration: 1.5,
    },
    6 
  );
}