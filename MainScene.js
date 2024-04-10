import enemy from "./enemy.js";
import bullet from './bullet.js'


export default class MainScene extends Phaser.Scene{
    constructor(){
        super("Mainscene")
    }

    preload(){
        this.load.image("rat", "rat-rats-london-about-rats-and-how-deal-with-them-8.png");
        this.load.image("enemy", "mousetrap.png");
        this.load.image("background", "wanehi.png")
        this.load.image("cheese", "cheese.png")
    }


    create(){



        this.player = this.physics.add.image(500,100, "rat").setScale(0.1)
        this.enemyspawn = new enemy(this, "enemy")


        //LESSON 11 CONTENT


        this.bullet = new bullet(this, 'cheese', this.player)
        this.shootcooldown = true
        this.shotspersecond = 1


        //UP TO THIS POINT












        for (let i = 0; i < 5; i++) {
            this.enemyspawn.spawn()

        }


        this.physics.add.collider(this.enemyspawn.group, this.player);

        this.physics.world.setBounds(0,0,1680,900)

        this.enemyspawn.group.getChildren().forEach(child => {
            child.setVelocity(0,0)
            child.setCollideWorldBounds(true)
        })


        this.player.setCollideWorldBounds(true)
        this.keys = this.input.keyboard.addKeys("W,A,S,D,E,F")





    }
    update(time,delta){

        this.physics.add.collider(this.enemyspawn.group, this.enemyspawn.group);
        this.physics.add.collider(this.enemyspawn.group, this.bullet.group, null, this.destroy)


        //LESSON 11 CONTENT

        // this.distance = [this.input.activePointer.x - this.player.body.x - 130,this.input.activePointer.y - this.player.body.y - 60]

        this.enemyspawn.group.getChildren().forEach(child => {
            var DifferenceX = this.player.body.x - child.x
            var DifferenceY = this.player.body.y - child.y

            var length = Math.sqrt(DifferenceX**2 + DifferenceY**2)

            const speed = length > 100 ? 200: 0
            child.setVelocity(DifferenceX*speed/length , DifferenceY*speed/length)

        }, this)

        this.cursorangle = Phaser.Math.Angle.Between(this.player.body.x + 130, this.player.body.y + 50, this.input.activePointer.x, this.input.activePointer.y)

        if (this.input.activePointer.isDown && this.shootcooldown == true) {
            for (let j = 0; j < 2; j++) { //j is the amount of shots
                setTimeout(() => {
                    this.bullet.shoot(this.cursorangle)
                }, 100*j);
            }

            this.shootcooldown = false

            setTimeout(() => {
                this.shootcooldown = true
            }, 1000/this.shotspersecond);
        }

        // if (this.keys.F.isDown && this.ready == true) {
        //     this.bullet.laser(this.distance)
        //     this.laserready = false

        //     // this.add.particles(this.player.body.x + 130,this.player.body.y + 50, 'cheese', {
        //     //     lifespan: {min: 100, max: 300},
        //     //     maxParticles: 1,
        //     //     speed: 100,
        //     // })

        // }

        // if (this.keys.F.isUp && this.laserready == false) {
        //     this.ready = false
        //     setTimeout(() => {
        //         this.laserready = true
        //         this.ready = true

        //     }, 1000);

        //     this.bullet.group.getChildren().forEach(child => {
        //         child.destroy()
        //     })

        // }



        // this.physics.add.overlap(this.enemyspawn.group, this.bullet.group, this.destroy, null, this)


        // UP TO THIS POINT








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

        


    }

    destroy = (enemy, bullet) => {
        enemy.destroy()
        if (bullet.piercecap > 1) {
            bullet.piercecap -= 1
        }
        else {
            bullet.destroy()
        }
    }
}