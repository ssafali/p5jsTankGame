
class Tank {
    constructor(image, isWhite) {
        this.height = 540;
        this.width = 540;

        this.image = image;
        this.x = random(540);
        this.y = random(540);

        this.angle = 0;
        this.speed = 0.7;

        this.rotateAmount = 0;

        this.shells = [];
        this.isWhite = isWhite;
    }

    update(enemyShells) {
        this.goForward();
        this.stayWithin();

        this.angle += this.rotateAmount;

        //checking if player has been hit
        this.gettingShot(enemyShells)
    }

    gettingShot(enemyShells) {
        for (let i = enemyShells.length - 1; i >= 0; i--) {
            if (dist(this.x, this.y, enemyShells[i].x, enemyShells[i].y) < (10 + enemyShells[i].r)){ 
                enemyShells.splice(i, 1);
          }
        }
    }

    goForward() {
        this.x += this.speed * sin(this.angle);
        this.y += this.speed * cos(this.angle);

        console.log("X:" + this.x)
        console.log("Y:" + this.y)
    }

    stayWithin() {
        if (this.x < -this.image.width) {
            this.x = this.width;
        } else if (this.x > this.width) {
            this.x = 0;
        }
        if (this.y > this.height) {
            this.y = 0;
        } else if (this.y < -this.image.height) {
            this.y = this.height;
        }
    }

    draw() {
        
        push();
        translate(this.x, this.y);
        imageMode(CENTER);
        rotate(this.angle + PI);
        image(this.image, 0, 0,40,45)
        pop();

        this.drawShells();
    }

    shoot() {
        let shell = new Shell(this.x, this.y, this.angle, this.isWhite);
        this.shells.push(shell);
    }

    drawShells() {
    
        for (let i = this.shells.length - 1; i >= 0; i--) {
          this.shells[i].update();
          this.shells[i].draw(); 
          
          if (this.shells[i].shellSpawned > 180 ||
              this.shells[i].x > 540) {
              this.shells.splice(i, 1);
          }


        }
      }


}