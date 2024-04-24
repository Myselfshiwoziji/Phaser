export default class enemy  {
    constructor(scene, enemy = "enemy") {
        this.scene = scene
        this.key = enemy
        this._group = this.scene.physics.add.group()
    }

    get group()
    {
        return this._group
    }

    spawn(health)
    {
        const xrand = Math.floor((Math.random()) * 1233)
        const yrand = Math.floor((Math.random()) * 683.5)


        const enemyguy = this.group.create(xrand, yrand, this.key).setScale(0.15)

        enemyguy.health = health


        return enemyguy
    }


}




