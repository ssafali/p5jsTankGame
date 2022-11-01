
class Tank {
    constructor(image) {
        this.height = 540;
        this.width = 540;

        this.image = image;
        this.x = random(540);
        this.y = random(540);

        this.angle = 0;
        this.speed = 0.2;
        
    }


    rotate() {

        this.angle += this.rotateAmount;
        console.log("Space pressed.")

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
            this.x+=this.speed;
        } else if (this.x > this.width) {
            this.x =0;
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
        rotate(this.angle);
        rect(0, 0,28,28)
        pop();
        
    }

    update() {
        this.goForward();
        this.stayWithin();
        this.rotate();
    }

}