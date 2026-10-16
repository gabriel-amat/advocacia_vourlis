/* ==========================================================================
   UI INTERACTIONS MODULE
   Clean Architecture: Lógica de Interação com a Interface do Usuário
   ========================================================================== */

export class UIInteractions {
  constructor() {
    this.header = document.querySelector('header');
    this.contactForm = document.getElementById('contact-form');
    this.init();
  }

  init() {
    this.setupHeaderScroll();
    this.setupContactForm();
  }

  setupHeaderScroll() {
    if (!this.header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.header.classList.add('bg-navy-950/95', 'shadow-2xl', 'border-gold-500/20');
        this.header.classList.remove('bg-navy-900/60');
      } else {
        this.header.classList.remove('bg-navy-950/95', 'shadow-2xl', 'border-gold-500/20');
        this.header.classList.add('bg-navy-900/60');
      }
    }, { passive: true });
  }

  setupContactForm() {
    if (!this.contactForm) return;

    this.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = this.contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin h-4 w-4 text-navy-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Enviando com sigilo...
        </span>
      `;

      setTimeout(() => {
        submitBtn.innerHTML = `✓ Mensagem Recebida. Retornaremos em breve!`;
        submitBtn.classList.remove('bg-gold-500', 'text-navy-900');
        submitBtn.classList.add('bg-emerald-600', 'text-white');

        setTimeout(() => {
          this.contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('bg-emerald-600', 'text-white');
          submitBtn.classList.add('bg-gold-500', 'text-navy-900');
        }, 3500);
      }, 1200);
    });
  }
}
