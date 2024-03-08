import MainScene from './MainScene.js'

const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "RGB(0,0,0)",
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: true,
        },
    },

    scene:[
        MainScene
    ]
}

new Phaser.Game(config);