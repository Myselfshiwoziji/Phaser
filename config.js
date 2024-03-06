import MainScene from './MainScene.js'

const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 1000,
    height: 1000,
    backgroundColor: "RGB(0,0,0)",
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        },
    },

    scene:[
        MainScene
    ]
}

new Phaser.Game(config);