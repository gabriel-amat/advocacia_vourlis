/* ==========================================================================
   CONFIGURAÇÃO GERAL & ENTIDADES DO SISTEMA
   Separado da lógica de renderização para fácil manutenção
   ========================================================================== */

export const PARTICLE_CONFIG = {
  // Quantidade de partículas (ajustada para não pesar em mobile)
  particleCount: window.innerWidth < 768 ? 45 : 90,
  
  // Raio de conexão entre partículas
  connectDistance: 130,
  
  // Interatividade com o cursor
  mouse: {
    radius: 170,           // Raio do campo gravitacional do mouse
    gravityForce: 0.04,    // Força com que as partículas são atraídas pelo mouse
    repelForce: 0.08       // Força de repulsão quando estão muito próximas
  },
  
  // Cores do tema (Dourado sutil + Azul marinho profundo)
  colors: {
    particle: 'rgba(212, 175, 55, 0.6)',       // Ouro
    particleHighlight: 'rgba(255, 215, 0, 0.9)',
    line: 'rgba(212, 175, 55, 0.15)',          // Linha de teia sutil
    lineHighlight: 'rgba(212, 175, 55, 0.4)'
  },
  
  // Velocidade de dispersão natural
  speed: {
    min: 0.2,
    max: 0.7
  }
};
