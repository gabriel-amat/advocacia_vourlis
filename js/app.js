/* ==========================================================================
   APPLICATION ENTRY POINT (BOOTSTRAP)
   Clean Architecture: Orquestrador Principal
   Inicializa os subsistemas de gráficos, efeitos visuais e eventos de interface.
   ========================================================================== */

import { ParticleNetwork } from './modules/particle-network.js';
import { MouseGlow } from './modules/mouse-glow.js';
import { UIInteractions } from './modules/interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa o fundo interativo de teia e partículas gravitacionais
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    new ParticleNetwork(canvas);
  }

  // 2. Inicializa o efeito de iluminação dinâmica nos cards ao passar o mouse
  new MouseGlow('.glow-card');

  // 3. Inicializa interações de UI e formulário
  new UIInteractions();

  console.log('🏛️ Silva & Mendes Advocacia LP inicializada com sucesso (Zero Node/Zero Bundler).');
});
