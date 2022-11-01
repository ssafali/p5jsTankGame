class Game {
    constructor() {
        this.greenTankP1;
        this.brownTankP2;

        this.greenTankImage;
        this.brownTankImage;

        const rotateAmount = 0.05;
        
        // this.backgroundImage;
    }

    preload() {
        this.greenTankImage = loadImage('assets/panzerGreen.png');
        this.brownTankImage = loadImage('assets/panzerBrown.png')
        this.greenTankP1 = new Tank(this.greenTankImage);
        this.brownTankP2 = new Tank(this.brownTankImage);
    }

    draw() {
        background(15, 80, 100);
        this.greenTankP1.draw();
        this.brownTankP2.draw();

        this.greenTankP1.update();
        this.brownTankP2.update();

    }


}