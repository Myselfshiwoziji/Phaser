//LESSON 11 CONTENT


export default class bullet {
    constructor(scene, bullet = "bullet", root) {
        this.scene = scene;
        this.key = bullet
        this._group = this.scene.physics.add.group()
        this.root = root
    }

    get group() {
        return this._group
    }

    shoot(angle) {

        const bullet = this.group.create(this.root.body.x + 130, this.root.body.y + 70, this.key).setScale(0.5)
        bullet.piercecap = 2


        bullet.setVelocity(2100*Math.cos(angle),2100*Math.sin(angle))

        return bullet
    }
}










    //just for fun lol
    // laser(distance) {
    //     var euclid = Math.sqrt(distance[0]**2 + distance[1]**2)
    //     var len = Math.ceil(euclid/30)

    //     for (let i = 0; i < len; i++) {
    //         setTimeout(() => {
    //             const laser = this.group.create(
    //                 this.root.body.x + 130 + (distance[0]/len)*i,
    //                 this.root.body.y + 70 + (distance[1])*i/len, 
    //                 this.key
    //             ).setScale(0.5)
    //             laser.piercecap = 100
    //         }, 3*i);

    //     }

    // }

// }