var createGame = require('voxel-engine')
var highlight = require('voxel-highlight')
var player = require('voxel-player')
var texturePath = require('painterly-textures')(__dirname)
var voxel = require('voxel')
var extend = require('extend')
var createClient = require('voxel-client')
var game

module.exports = function(opts, setup) {
  setup = setup || defaultSetup
  // var defaults = {
//     generate: voxel.generator['Valley'],
//     chunkDistance: 2,
//     materials: [
//       ['grass', 'dirt', 'grass_dirt'],
//       'obsidian',
//       'brick',
//       'grass',
//       'plank'
//     ],
//     texturePath: texturePath,
//     worldOrigin: [0, 0, 0],
//     controls: { discreteFire: true }
//   }
   opts = extend({}, opts || {})

  // setup the game and add some trees
  // var game = createGame(opts)
//   var container = opts.container || document.body
//   window.game = game // for debugging
//   game.appendTo(container)
//   if (game.notCapable()) return game
  
  var client = createClient("ws://localhost:8080/");
  
  client.emitter.on('settings', function(id) {
	console.log("Creating player")
	//var container = opts.container || document.body
	game = window.game
	//game.appendTo(container)
	if (game.notCapable()) return game
	
    var createPlayer = player(game)

    // create the player from a minecraft skin file and tell the
    // game to use it as the main player
    var avatar = createPlayer(opts.playerSkin || 'player.png')
    avatar.possess()
    avatar.yaw.position.set(2, 14, 4)

    setup(game, avatar, client)
  })
  
  
  
  return game

}

function defaultSetup(game, avatar, client) {
    // highlight blocks when you look at them, hold <Ctrl> for block placement
    console.log("defaultSetup in client.")
    var blockPosPlace, blockPosErase
    var hl = game.highlighter = highlight(game, { color: 0xff0000 })
    hl.on('highlight', function (voxelPos) { blockPosErase = voxelPos })
    hl.on('remove', function (voxelPos) { blockPosErase = null })
    hl.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })
    hl.on('remove-adjacent', function (voxelPos) { blockPosPlace = null })

    // toggle between first and third person modes
    window.addEventListener('keydown', function (ev) {
      if (ev.keyCode === 'R'.charCodeAt(0)) avatar.toggle()
    })

    // block interaction stuff, uses highlight data
    var currentMaterial = 1

    game.on('fire', function (target, state) {
      var position = blockPosPlace
      if (position) {
        game.createBlock(position, currentMaterial)
		client.emitter.emit('set', position, currentMaterial)
      }
      else {
        position = blockPosErase
        if (position) {
			game.setBlock(position, 0)
			var point = {x: position[0], y: position[1], z: position[2]}
			console.log("Erasing point at " + JSON.stringify(point))
			client.emitter.emit('set', point, 0)
		}
      }
    })


}
