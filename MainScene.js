import enemy from "./enemy.js";

export default class MainScene extends Phaser.Scene{
    constructor(){
        super("Mainscene")
    }

    preload(){
        this.load.image("rat", "rat-rats-london-about-rats-and-how-deal-with-them-8.png");
        this.load.image("enemy", "mousetrap.jpg");
    }


    create(){
        this.player = this.physics.add.image(500,100, "rat").setScale(0.2)
        this.enemyspawn = new enemy(this, "enemy")
     

        this.keys = this.input.keyboard.addKeys("W,A,S,D")

    }
    update(){

        const playerspeed = 500


        if (this.keys.D.isDown)
		{
			this.player.setVelocityX(playerspeed)
		} else if (this.keys.A.isDown){
            this.player.setVelocityX(-playerspeed)
        } else {
            this.player.setVelocityX(0)
        }

        if (this.keys.S.isDown)
		{
			this.player.setVelocityY(playerspeed)
		} else if (this.keys.W.isDown){
            this.player.setVelocityY(-playerspeed)
        } else {
            this.player.setVelocityY(0)
        }



        // this.player.setVelocity(100,100)




    }
}