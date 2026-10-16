/* ==========================================================================
   MOUSE GLOW & SPOTLIGHT MODULE
   Clean Architecture: Módulo de Interação de Luz / Iluminação Dinâmica
   Adiciona efeito de holofote sutil (spotlight) ao passar o mouse sobre os cards
   ========================================================================== */

export class MouseGlow {
  constructor(selector = '.glow-card') {
    this.cards = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Atualiza variáveis CSS no próprio elemento para animações aceleradas por GPU
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--glow-opacity', '1');
  }

  handleMouseLeave(card) {
    card.style.setProperty('--glow-opacity', '0');
  }
}
