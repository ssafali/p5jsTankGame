class Tank {
  constructor(name, image, x, y, angle, shellColor) {
    this.name = name;
    this.image = image;
    this.spawn = { x, y, angle };
    this.shellColor = shellColor;
    this.reset();
  }

  reset() {
    this.x = this.spawn.x;
    this.y = this.spawn.y;
    this.angle = this.spawn.angle;
    this.speed = CRUISE_SPEED;
    this.velocity = p5.Vector.fromAngle(this.angle, this.speed);
    this.shells = [];
    this.score = 0;
    this.cooldown = 0;
    this.flash = 0;
  }

  update(dt, turn, throttle) {
    this.angle += turn * ROTATE_SPEED * dt;

    const targetSpeed = throttle > 0 ? BOOST_SPEED : throttle < 0 ? BRAKE_SPEED : CRUISE_SPEED;
    this.speed = approach(this.speed, targetSpeed, ACCELERATION * dt);

    const desired = p5.Vector.fromAngle(this.angle, this.speed);
    this.velocity.lerp(desired, Math.min(1, GRIP * dt));

    this.x += this.velocity.x * dt;
    this.y += this.velocity.y * dt;
    wrapAround(this, TANK_RADIUS);

    this.cooldown = Math.max(0, this.cooldown - dt);
    this.flash = Math.max(0, this.flash - dt);

    for (let i = this.shells.length - 1; i >= 0; i--) {
      this.shells[i].update(dt);
      if (this.shells[i].isExpired()) {
        this.shells.splice(i, 1);
      }
    }
  }

  checkHits(enemy) {
    const hits = [];
    for (let i = this.shells.length - 1; i >= 0; i--) {
      const shell = this.shells[i];
      if (dist(enemy.x, enemy.y, shell.x, shell.y) < TANK_RADIUS + SHELL_RADIUS) {
        this.shells.splice(i, 1);
        this.score++;
        enemy.takeHit(shell);
        hits.push(shell);
      }
    }
    return hits;
  }

  takeHit(shell) {
    this.flash = HIT_FLASH_TIME;
    this.velocity.add(createVector(shell.vx, shell.vy).setMag(HIT_KNOCKBACK));
  }

  shoot() {
    if (this.cooldown > 0 || this.shells.length >= MAX_SHELLS) return null;

    const muzzle = this.muzzlePosition();
    const shot = p5.Vector.fromAngle(this.angle, SHELL_SPEED).add(this.velocity);
    this.shells.push(new Shell(muzzle.x, muzzle.y, shot.x, shot.y, this.shellColor));

    this.velocity.sub(p5.Vector.fromAngle(this.angle, RECOIL));
    this.cooldown = SHOT_COOLDOWN;
    return muzzle;
  }

  muzzlePosition() {
    const offset = TANK_WIDTH / 2;
    return { x: this.x + cos(this.angle) * offset, y: this.y + sin(this.angle) * offset };
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + PI);
    imageMode(CENTER);
    if (this.flash > 0 && Math.floor(this.flash * 16) % 2 === 0) {
      tint(255, 90);
    }
    image(this.image, 0, 0, TANK_WIDTH, TANK_HEIGHT);
    pop();

    for (const shell of this.shells) {
      shell.draw();
    }
  }
}
