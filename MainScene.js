

export default class MainScene extends Phaser.Scene{
    constructor(){
        super("Mainscene")
    }

    preload(){
        this.load.image("rat", "rat-rats-london-about-rats-and-how-deal-with-them-8.png");
    }


    create(){
        this.player = this.physics.add.image(500,100, "rat").setScale(0.2)
        this.player.setCollideWorldBounds(true);

        console.log(window.innerWidth)
        console.log(window.innerHeight)

        var velo = 300

        this.velox = velo
        this.veloy = velo

        for (let i = 0; i < 100000; i++) {
            setTimeout(() => {

                // console.log(this.player.body.x)
                // console.log(this.player.body.y)

            }, 8*i);
    
        }
    

        this.cancheckx = true
        this.canchecky = true

    }
    update(){

        this.player.setVelocity(this.velox,this.veloy)

        if (this.player.body.x == 0 && this.cancheckx == true || this.player.body.x == 1440  && this.cancheckx == true) {
            this.velox = -this.velox
            this.cancheckx = false
            console.log("hello x")
        }
        else if (this.player.body.y == 0 && this.canchecky == true ||  this.player.body.y == 803 && this.canchecky == true) {
            this.veloy = -this.veloy
            this.canchecky = false
            console.log("hello y")
        }

        setTimeout(() => {
            this.cancheckx = true
        }, 300);

        setTimeout(() => {
            this.canchecky = true
        }, 300);






    }
}