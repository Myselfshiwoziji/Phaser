
export default class MainScene extends Phaser.Scene{
    constructor(){
        super({key: "Mainscene"})
    }

    preload(){
        this.load.image("rat", "rat-rats-london-about-rats-and-how-deal-with-them-8.png");
    }


    create(){
        this.player = this.physics.add.image(500,50, "rat").setScale(0.2)
        this.player.setCollideWorldBounds(true);
    }

    update(){
        var velo = 100
        this.player.setVelocity(-velo,0)

        
    }
}