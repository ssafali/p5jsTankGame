const EXPLOSION_COLORS = [[255, 230, 120], [255, 150, 40], [230, 70, 30], [90, 90, 90]];

const effects = {
  particles: [],
  rings: [],
  shakeTime: 0,
  shakeStrength: 0,

  explode(x, y) {
    for (let i = 0; i < 28; i++) {
      const angle = random(TWO_PI);
      const speed = random(40, 170);
      const life = random(0.3, 0.8);
      this.particles.push({
        x, y,
        vx: cos(angle) * speed,
        vy: sin(angle) * speed,
        life,
        maxLife: life,
        size: random(3, 8),
        color: random(EXPLOSION_COLORS),
      });
    }
    this.rings.push({ x, y, life: 0.35, maxLife: 0.35 });
    this.shake(0.3, 7);
  },

  muzzleFlash(x, y) {
    for (let i = 0; i < 6; i++) {
      const life = random(0.08, 0.18);
      this.particles.push({
        x, y,
        vx: random(-30, 30),
        vy: random(-30, 30),
        life,
        maxLife: life,
        size: random(2, 5),
        color: [255, 220, 140],
      });
    }
  },

  shake(duration, strength) {
    this.shakeTime = Math.max(this.shakeTime, duration);
    this.shakeStrength = Math.max(this.shakeStrength, strength);
  },

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 1 - 3 * dt;
      p.vy *= 1 - 3 * dt;
      p.life -= dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }
    for (let i = this.rings.length - 1; i >= 0; i--) {
      this.rings[i].life -= dt;
      if (this.rings[i].life <= 0) this.rings.splice(i, 1);
    }
    this.shakeTime = Math.max(0, this.shakeTime - dt);
    if (this.shakeTime === 0) this.shakeStrength = 0;
  },

  applyShake() {
    if (this.shakeTime > 0) {
      translate(random(-1, 1) * this.shakeStrength, random(-1, 1) * this.shakeStrength);
    }
  },

  draw() {
    push();
    noStroke();
    for (const p of this.particles) {
      const t = p.life / p.maxLife;
      fill(p.color[0], p.color[1], p.color[2], 255 * t);
      circle(p.x, p.y, p.size * (0.5 + t));
    }
    noFill();
    for (const r of this.rings) {
      const t = 1 - r.life / r.maxLife;
      stroke(255, 240, 200, 255 * (1 - t));
      strokeWeight(3 * (1 - t) + 1);
      circle(r.x, r.y, 10 + t * 70);
    }
    pop();
  },

  clear() {
    this.particles = [];
    this.rings = [];
    this.shakeTime = 0;
    this.shakeStrength = 0;
  },
};
