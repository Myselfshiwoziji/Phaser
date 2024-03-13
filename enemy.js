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


        const enemyguy = this.group.create(xrand, yrand, this.key).setScale(4)

        return enemyguy
    }


}




