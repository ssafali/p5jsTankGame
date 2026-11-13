const CANVAS_SIZE = 540;

const TANK_WIDTH = 50;
const TANK_HEIGHT = 40;
const TANK_RADIUS = 18;
const ROTATE_SPEED = 3;

const CRUISE_SPEED = 54;
const BOOST_SPEED = 115;
const BRAKE_SPEED = 15;
const ACCELERATION = 110;
const GRIP = 4;
const RECOIL = 30;
const HIT_KNOCKBACK = 90;
const HIT_FLASH_TIME = 0.5;

const SHELL_SPEED = 160;
const SHELL_RADIUS = 2.5;
const SHELL_LIFETIME = 2.25;
const SHOT_COOLDOWN = 0.25;
const MAX_SHELLS = 4;

const WIN_SCORE = 3;
const MAX_FRAME_TIME = 0.05;

function wrapAround(entity, margin) {
  const min = -margin;
  const max = CANVAS_SIZE + margin;
  if (entity.x < min) entity.x = max;
  else if (entity.x > max) entity.x = min;
  if (entity.y < min) entity.y = max;
  else if (entity.y > max) entity.y = min;
}

function approach(value, target, step) {
  if (value < target) return Math.min(value + step, target);
  return Math.max(value - step, target);
}
