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

        this.physics.add.collider(this.enemyspawn.group, this.player);

        this.physics.world.setBounds(0,0,1680,900)

        this.enemyspawn.group.getChildren().forEach(child => {
            child.setVelocity(0,0)
            child.setCollideWorldBounds(true)
            child.setBounce(1)
        })


        this.player.setCollideWorldBounds(true)
        this.keys = this.input.keyboard.addKeys("W,A,S,D")




    }
    update(){


        const rawplayerspeed = 400

        if (this.player.body.velocity.x != 0 && this.player.body.velocity.y != 0) {
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

        

        // this.enemyspawn.group.getChildren().forEach(child => {
        //     console.log(child.x)

        //     if (child.body.x == 0 && this.pcancheckx == true || child.body.x == 1696.5 && this.pcancheckx == true) {
        //         this.velox = -this.velox
        //         this.pcancheckx = false

        //     }
        //     else if (child.body.y == 0 && this.pcanchecky == true || child.body.y == 853.25 && this.pcanchecky == true) {
        //         this.veloy = -this.veloy
        //         this.pcanchecky = false

        //     }

        //     child.setVelocity(this.velox,this.veloy)

        //     if (this.pcancheckx == false) {
        //         setTimeout(() => {

        //             this.pcancheckx = true
        //         }, 100);
        //     } else if (this.pcanchecky == false) {
        //         setTimeout(() => {
        //             this.pcanchecky = true
        //         }, 100);
        //     }
            
        // });


    }
}