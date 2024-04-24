import enemy from "./enemy.js";
import bullet from './bullet.js'


export default class MainScene extends Phaser.Scene{
    constructor(){
        super("Mainscene")
    }

    preload(){
        this.load.image("rat", "rat-rats-london-about-rats-and-how-deal-with-them-8.png");
        this.load.image("enemy", "mousetrap.png");
        this.load.image("background", "bubble.png")
        this.load.image("cheese", "cheese.png")
    }


    create(){

        // this.physics.add.image(0,0, "background").setScale(10)

        this.player = this.physics.add.image(500,100, "rat").setScale(0.1)
        this.enemyspawn = new enemy(this, "enemy")

        this.bullet = new bullet(this, 'cheese', this.player)
        this.shootcooldown = true
        this.shotspersecond = 1

        //Lesson 12 content


        // this.wave = 1

        // this.upgradetime = false
        // this.upgradespeed = 0
        // this.upgradeamount = 0

        this.playerhealth = 5
        this.hurtcooldown = true
        this.dead = false


        //Up to this point


        for (let i = 0; i < 5; i++) {
            this.enemyspawn.spawn(5)

        }


        this.physics.add.collider(this.enemyspawn.group, this.player);

        //lesson 12 content maybe
        // this.physics.world.setBounds(0,0,2000,1800)

        this.enemyspawn.group.getChildren().forEach(child => {
            child.setVelocity(0,0)
            // child.setCollideWorldBounds(true)
        })


        // this.player.setCollideWorldBounds(true)
        this.keys = this.input.keyboard.addKeys("W,A,S,D,E,F")

        this.cameras.main.startFollow(this.player)
        //until to this point




    }
    update(){

        this.physics.add.overlap(this.enemyspawn.group, this.bullet.group, null, this.destroy)
        this.physics.add.overlap(this.enemyspawn.group, this.player, null, this.destroyPlayer)




        this.enemyspawn.group.getChildren().forEach(child => {
            var DifferenceX = this.player.body.x - child.x
            var DifferenceY = this.player.body.y - child.y

            var length = Math.sqrt(DifferenceX**2 + DifferenceY**2)

            const speed = length > 100 ? 350: 0
            if (this.dead == false) {
                child.setVelocity(DifferenceX*speed/length , DifferenceY*speed/length)
            }
            else {
                child.setVelocity(-3*DifferenceX*speed/length , -3*DifferenceY*speed/length)
            }

        }, this)

        this.cursorangle = Phaser.Math.Angle.Between(this.player.body.x + 130, this.player.body.y + 50, this.input.activePointer.x + this.cameras.main.scrollX, this.input.activePointer.y + this.cameras.main.scrollY)

        if (this.input.activePointer.isDown && this.shootcooldown == true) {
            for (let j = 0; j < 1; j++) { //j is the amount of shots
                setTimeout(() => {
                    this.bullet.shoot(this.cursorangle)
                }, 100*j);
            }

            this.shootcooldown = false

            setTimeout(() => {
                this.shootcooldown = true
            }, 1000/(this.shotspersecond));
        }

        if(this.dead == true){
            this.deadtag.setPosition(this.player.x-30, this.player.y-220)
        }


        //Lesson 12 content

        // if (this.keys.E.isDown && this.upgradetime == true) {
        //     this.upgradespeed += 1
        //     this.upgradetime = false
        //     this.text.destroy()
        // } else if (this.keys.F.isDown && this.upgradetime == true) {
        //     this.upgradeamount += 1
        //     this.upgradetime = false
        //     this.text.destroy()
        // }

        //Up to this point




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

    //lesson 12 content
    destroy = (enemy, bullet) => {
        //kill enemy
        if (enemy.health > 1) {
            enemy.health -= 1
        }
        else (enemy.destroy())

        //waves
        //(this.wave < 10 ? this.wave + 1 : 10)
        //&& this.wave%5 != 4
        // && this.wave%5 == 4
        if (this.enemyspawn.group.getChildren().length == 0) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    this.enemyspawn.spawn(5)
                }, 10*i);
            }

            // this.wave += 1
            // console.log(`wave: ${this.wave}`)
        }
        // else if (this.enemyspawn.group.getChildren().length == 0) {
        //     this.upgradetime = true
        //     this.text = this.add.text(this.player.x - 500, -300 + this.player.y, 'Upgrade your cheese by pressing E or F!', { font: '60px Arial', fill: '#FFFFFF'});
        //     this.wave += 1
        //     setTimeout(() => {
        //         this.enemyspawn.spawn(5)
        //     }, 10000);
        // }


        //bullet pierce
        if (bullet.piercecap > 1) {
            bullet.piercecap -= 1
        }
        else {
            bullet.destroy()
        }
    }

    destroyPlayer = (enemy, player) => {
        if (this.playerhealth >= 1 && this.hurtcooldown == true) {
            this.playerhealth -= 1
            this.hurtcooldown = false

            setTimeout(() => {
                this.hurtcooldown = true
            }, 1000);

        } else if (this.playerhealth == 0 && this.dead == false) {
            this.deadtag = this.add.text(this.player.body.x - 30, this.player.body.y - 220, 'you are dead!', { font: '80px Arial', fill: '#FFFFFF'});
            this.input.keyboard.enabled = false
            this.player.setVelocity(0,0)
            this.dead = true
        }
    }

    //up to this point
}