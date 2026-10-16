/* ==========================================================================
   PARTICLE NETWORK MODULE (Canvas Gravitacional & Teia)
   Clean Architecture: Módulo de Infraestrutura de Animação e Gráficos
   ========================================================================== */

import { PARTICLE_CONFIG } from '../core/config.js';

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.radius = Math.random() * 2 + 1.2;
    
    // Velocidade angular
    const angle = Math.random() * Math.PI * 2;
    const speed = PARTICLE_CONFIG.speed.min + Math.random() * (PARTICLE_CONFIG.speed.max - PARTICLE_CONFIG.speed.min);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    // Posição original para amortecimento
    this.originVx = this.vx;
    this.originVy = this.vy;
    this.mass = this.radius * 1.5;
  }

  update(mouse) {
    // Gravidade / Interação com o Mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < PARTICLE_CONFIG.mouse.radius && dist > 1) {
        // Vetor normalizado
        const normalX = dx / dist;
        const normalY = dy / dist;

        // Se estiver muito perto do cursor (< 40px), repele suavemente para não colapsar em ponto zero
        if (dist < 45) {
          this.vx -= normalX * PARTICLE_CONFIG.mouse.repelForce * 3;
          this.vy -= normalY * PARTICLE_CONFIG.mouse.repelForce * 3;
        } else {
          // Gravidade: atrai em direção ao cursor
          const force = (1 - dist / PARTICLE_CONFIG.mouse.radius) * PARTICLE_CONFIG.mouse.gravityForce;
          this.vx += normalX * force;
          this.vy += normalY * force;
        }
      }
    }

    // Amortecimento de atrito para retornar à velocidade normal
    this.vx = this.vx * 0.98 + this.originVx * 0.02;
    this.vy = this.vy * 0.98 + this.originVy * 0.02;

    this.x += this.vx;
    this.y += this.vy;

    // Bordas infinitas (rebote suave)
    if (this.x < 0) { this.x = 0; this.vx *= -1; }
    if (this.x > this.canvasWidth) { this.x = this.canvasWidth; this.vx *= -1; }
    if (this.y < 0) { this.y = 0; this.vy *= -1; }
    if (this.y > this.canvasHeight) { this.y = this.canvasHeight; this.vy *= -1; }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = PARTICLE_CONFIG.colors.particle;
    ctx.fill();
  }
}

export class ParticleNetwork {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    this.bindEvents();
    this.createParticles();
    this.start();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticles() {
    this.particles = [];
    const count = PARTICLE_CONFIG.particleCount;
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.width, this.height));
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Conexões entre partículas (Teia)
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < PARTICLE_CONFIG.connectDistance) {
          const alpha = (1 - dist / PARTICLE_CONFIG.connectDistance) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }

      // 2. Conexão direta de teia ao Cursor do Mouse
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mdx = this.mouse.x - p1.x;
        const mdy = this.mouse.y - p1.y;
        const mDist = Math.hypot(mdx, mdy);

        if (mDist < PARTICLE_CONFIG.mouse.radius) {
          const mouseAlpha = (1 - mDist / PARTICLE_CONFIG.mouse.radius) * 0.45;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(255, 215, 0, ${mouseAlpha})`;
          this.ctx.lineWidth = 1.2;
          this.ctx.stroke();
        }
      }

      // 3. Atualizar e desenhar cada partícula
      p1.update(this.mouse);
      p1.draw(this.ctx);
    }

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  start() {
    if (!this.animationFrameId) {
      this.render();
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
