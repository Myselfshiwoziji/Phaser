import enemy from "./enemy.js";

export default class MainScene extends Phaser.Scene{
    constructor(){
        super("Mainscene")
    }

    preload(){
        this.load.image("rat", "rat-rats-london-about-rats-and-how-deal-with-them-8.png");
        this.load.image("enemy", "mousetrap.png");
    }


    create(){
        this.player = this.physics.add.image(500,100, "rat").setScale(0.2)
        this.enemyspawn = new enemy(this, "enemy")

        this.enemyspawn.spawn()

     

        this.keys = this.input.keyboard.addKeys("W,A,S,D")

        this.physics.add.collider(this.player, this.enemyspawn.group)

        this.player.setCollideWorldBounds(true)

        this.pcancheckx = true
        this.pcanchecky = true

        this.velox = 300
        this.veloy = 300


    }
    update(){


        const rawplayerspeed = 500

        if (this.player.body.velocity.x != 0 && this.player.body.velocity.x != 0) {
            this.playerspeed = rawplayerspeed/Math.sqrt(2)
        }

        else {
            this.playerspeed = rawplayerspeed
        }


        if (this.keys.D.isDown)
		{
			this.player.setVelocityX(this.playerspeed)
		} else if (this.keys.A.isDown){
            this.player.setVelocityX(-this.playerspeed)
        } else {
            this.player.setVelocityX(0)
        }

        if (this.keys.S.isDown)
		{
			this.player.setVelocityY(this.playerspeed)
		} else if (this.keys.W.isDown){
            this.player.setVelocityY(-this.playerspeed)
        } else {
            this.player.setVelocityY(0)
        }

        

        this.enemyspawn.group.getChildren().forEach(child => {



            if (child.body.x == 0 && this.pcancheckx == true || child.body.x == 1233 && this.pcancheckx == true) {
                this.velox = -this.velox
                this.pcancheckx = false
                console.log("hello x")
            }
            else if (child.body.y == 0 && this.pcanchecky == true || child.body.y == 683.5 && this.pcanchecky == true) {
                this.veloy = -this.veloy
                this.pcanchecky = false
                console.log("hello y")
            }

            child.setVelocity(this.velox,this.veloy)

            if (this.pcancheckx == false) {
                setTimeout(() => {
                    console.log(this.pcancheckx)
                    this.pcancheckx = true
                }, 100);
            } else if (this.pcanchecky == false) {
                setTimeout(() => {
                    this.pcanchecky = true
                }, 100);
            }
            
        });


    }
}