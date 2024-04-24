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
        bullet.piercecap = 10

        bullet.setRotation(angle)


        bullet.setVelocity(2100*Math.cos(angle),2100*Math.sin(angle))

        return bullet
    }
}
