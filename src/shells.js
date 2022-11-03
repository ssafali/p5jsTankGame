
class Shell {
    constructor(x, y, angle, isWhite) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.isWhite = isWhite;
        this.speed = 2;
        this.r = 1.5;
        this.shellSpawned = 0;
    }

    update() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
        this.isWithin();
        this.shellSpawned++;
    }

    isWithin() {
        if (this.x < -this.r) {
            this.x = 540;
        } else if (this.x > 540) {
            this.x = 0;
        }

        if (this.y > 540) {
            this.y = 0;
        } else if (this.y < -this.r) {
            this.y = 540;
        }
    }

    draw() {
        if(this.isWhite) {
            push();
            noStroke();
            fill(120);
            ellipse(this.x, this.y, this.r*2, this.r*2);	
            pop();
        } else {
            push();
            fill(4);
            ellipse(this.x, this.y, 5, 5);	
            pop();
        }
    }
}