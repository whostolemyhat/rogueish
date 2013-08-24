// Singleton
var World = (function() {
    var instance;

    function init() {
        // private vars
        var world = Generator.generateMap();

        return {
            // public methods/vars

            placePlayer: function() {
                for(var y = 0; y < Generator.worldHeight; y++) {
                    for(var x = 0; x < Generator.worldWidth; x++) {
                        if(world[x][y] === 0) {
                            world[x][y] = 9;
                            return { x: x, y: y }
                        }
                    }
                }
            },
            
            update: function() {
                // console.log('world update');
            },
            draw: function(ctx, config) {

                for(var x = 0; x < Generator.worldWidth; x++) {
                    for(var y = 0; y < Generator.worldHeight; y++) {

                        switch(world[x][y]) {
                            case 0: // floor
                                ctx.fillStyle = config.floor;
                                break;
                            case 1: // walls
                                ctx.fillStyle = config.walls;
                                break;
                            case 2: //treasure
                                ctx.fillStyle = config.treasure;
                                break;
                            case 9: // player
                                ctx.fillStyle = config.player;
                                break;
                            default:
                                ctx.fillStyle = '#000';
                                break;

                        }
                        
                        ctx.fillRect(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);
                    }
                }
            }
        };
    };

    return {
        getInstance: function() {
            if(!instance) {
                instance = init();
            }

            return instance;
        }
    };

})();
