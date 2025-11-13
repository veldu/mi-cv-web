// src/main.ts

// 1. Importar los estilos
import './styles/main.css';

// 2. Importar las funciones de animación
import { initScrollAnimations } from './scripts/scrollAnimations';
import { initContactAnimations } from './scripts/contactAnimation';
import { initTimelineCollapse } from './scripts/timelineCollapse';

// 3. Esperar a que el HTML esté listo antes de animar
document.addEventListener('DOMContentLoaded', () => {
  initTimelineCollapse();
  initScrollAnimations();
  initContactAnimations();
});