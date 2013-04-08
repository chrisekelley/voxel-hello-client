# voxel-hello-client

This is a fork of voxel-hello-world with the addition of voxel-client, which passes data to voxel-server.

It does not work yet - it does hit the server, but I need to do a bit more work on voxel-client. 

Learn more at http://voxeljs.com

## Status:

4/6/2013: gets playerID and settings from server. Game is created in voxel-client from server settings. voxel-hello-client adds a player.
Still there is work to do; see errors in server log after deleting some voxels.

# Get it running on your machine

Run the start script:

```
npm start
```

This gets the client running on port 8081.

Install [voxel-server](https://github.com/chrisekelley/voxel-server) and run npm install and npm start for get it running on port 8080.

Then point your browser to [http://localhost:8080](http://localhost:8081) to watch the log in the javascript console, and (eventually) have fun!

If the game does not render, check if the server is running. Voxel-hello-client waits for the settings to be passed before creating a player and rendering the game.

## How does this work?

voxel.js modules use [browserify](http://browserify.org) for packaging modules together into game bundles. This means that every time you change code in your game you have to build a new bundle in order to test it out. Luckily this is very easy and is automated. When you run the `npm start` script, it runs a local server: when the browser requests `index.js`, it compiles it serverside and then serves up the compiled version.

The upshot is, as long as you're running the `npm start` script in the background, you can save your changes to index.js and reload the game to see the new code in action, without having to have a build step in between. (If you'd like to change the start script, it's contained in the `package.json` file in the root directory.)

## license

BSD
