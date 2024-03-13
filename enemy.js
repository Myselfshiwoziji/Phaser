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

    spawn()
    {
        const xrand = Math.floor((Math.random() - Math.random()) * 1000)
        const yrand = Math.floor((Math.random() - Math.random()) * 1000)


        const enemyguy = this.group.create(500, 500, this.key).setScale(0.5)
        enemyguy.setCollideWorldBounds(true)

        return enemyguy
    }


}




