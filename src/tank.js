
class Tank {
    constructor(image, isWhite) {
        this.height = 540;
        this.width = 540;

        this.image = image;
        this.x = random(540);
        this.y = random(540);

        this.angle = 0;
        this.speed = 0.9;

        this.rotateAmount = 0;

        this.shells = [];
        this.isWhite = isWhite;

        // this.blueTankP1Score = document.querySelector('#blueScore');
        // this.redTankP2Score = document.querySelector("#redScore");
        this.score = 0;
    }

    update(enemyPlayer) {
        this.goForward();
        this.stayWithin();

        this.angle += this.rotateAmount;

        //checking if player has been hit
        this.gettingShot(enemyPlayer)
    }

    gettingShot(enemyPlayer) {
        let enemyShells = enemyPlayer.shells;
        for (let i = enemyShells.length - 1; i >= 0; i--) {
            if (dist(this.x, this.y, enemyShells[i].x, enemyShells[i].y) < (15 + enemyShells[i].r)) {
                enemyShells.splice(i, 1);
                console.log("Got hit.")
                this.score++;
            }
        }
    }

    goForward() {
        this.x += this.speed * sin(this.angle);
        this.y += this.speed * cos(this.angle);

    }

    stayWithin() {
        if (this.x < -1) {
            this.x = this.width;
        } else if (this.x > this.width) {
            this.x = 0;
        }
        if (this.y > this.height - 30) {
            this.y = 0;
        } else if (this.y < -this.image.height) {
            this.y = this.height - 30;
        }
    }

    draw() {

        push();
        translate(this.x, this.y);
        imageMode(CENTER);
        rotate(this.angle + PI);
        image(this.image, 0, 0, 50, 40)
        pop();

        this.drawShells();
        if(this.score == 3) {
            noLoop();
        }
    }

    shoot() {
        let shell = new Shell(this.x, this.y, this.angle, this.isWhite);
        if (this.shells.length < 4) {
            this.shells.push(shell);
        }
    }
    drawShells() {
        for (let i = this.shells.length - 1; i >= 0; i--) {
            this.shells[i].update();
            this.shells[i].draw();

            if (this.shells[i].shellSpawned > 180 ||
                this.shells[i].x > 520 ||
                this.shells[i].y > 520) {
                this.shells.splice(i, 1);

            }
        }
    }
}