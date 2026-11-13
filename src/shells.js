class Shell {
  constructor(x, y, vx, vy, shellColor) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.shellColor = shellColor;
    this.age = 0;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.age += dt;
  }

  isExpired() {
    return this.age > SHELL_LIFETIME || this.isOutOfBounds();
  }

  isOutOfBounds() {
    return this.x < -SHELL_RADIUS || this.x > CANVAS_SIZE + SHELL_RADIUS ||
      this.y < -SHELL_RADIUS || this.y > CANVAS_SIZE + SHELL_RADIUS;
  }

  draw() {
    push();
    stroke(0);
    fill(this.shellColor);
    circle(this.x, this.y, SHELL_RADIUS * 2);
    pop();
  }
}
