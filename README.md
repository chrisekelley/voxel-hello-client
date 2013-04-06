# voxel-hello-client

This is a fork of voxel-hello-world with the addition of voxel-client, which passes data to voxel-server.

It does not work yet - it does hit the server, but I need to do a bit more work on voxel-client. 

Learn more at http://voxeljs.com

# Get it running on your machine

Don't install the npm modules; they are included because voxel-client uses a custom version of duplex-emitter. 
TODO: create a fork of duplex-emitter to avoid including the node_modules.
Manually updated JSONStream version to work around Unexpected "\u0000" at position 0 error. Refer to
https://github.com/pgte/duplex-emitter/issues/4#issuecomment-15699928
Also added Buffer to the Window scope to make it visible to jsonparse.
That feels wrong.

Run the start script:

```
npm start
```

This gets the client running on port 8081.

Install [voxel-server](git://github.com/maxogden/voxel-server.git) and run npm install and npm start for get it running on port 8080.

Then point your browser to [http://localhost:8080](http://localhost:8081) to watch the errors in the javascript console, and (eventually) have fun!

## How does this work?

voxel.js modules use [browserify](http://browserify.org) for packaging modules together into game bundles. This means that every time you change code in your game you have to build a new bundle in order to test it out. Luckily this is very easy and is automated. When you run the `npm start` script, it runs a local server: when the browser requests `index.js`, it compiles it serverside and then serves up the compiled version.

The upshot is, as long as you're running the `npm start` script in the background, you can save your changes to index.js and reload the game to see the new code in action, without having to have a build step in between. (If you'd like to change the start script, it's contained in the `package.json` file in the root directory.)

## license

BSD
