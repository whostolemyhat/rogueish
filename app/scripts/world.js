// Singleton
var World = (function() {
    var instance;

    function init() {
        // private vars
        var world = Generator.generateMap();
        var playerTile = 9;
        var emptyTile = 0;
        var wallTile = 1;
        var treasureTile = 2;

        return {
            // public methods/vars

            placePlayer: function() {
                for(var y = 0; y < Generator.worldHeight; y++) {
                    for(var x = 0; x < Generator.worldWidth; x++) {
                        if(world[x][y] === emptyTile) {
                            world[x][y] = playerTile;
                            return { x: x, y: y }
                        }
                    }
                }
            },
            
            update: function(keydown) {
                var newx = player.x;
                var newy = player.y;

                // world[player.x][player.y] = 0;

                if(keydown.left) {
                   newx--;
                }
                if(keydown.right) {
                   newx++;
                }
                if(keydown.up) {
                   newy--;
                }
                if(keydown.down) {
                   newy++;
                }

                if(world[newx][newy] === emptyTile) {
                    world[player.x][player.y] = emptyTile;
                    player.x = newx;
                    player.y = newy;
                    world[player.x][player.y] = playerTile;
                } else if(world[newx][newy] == treasureTile) {
                    player.score += 10;
                    console.log(player.score);
                    
                    world[player.x][player.y] = emptyTile;
                    player.x = newx;
                    player.y = newy;
                    world[player.x][player.y] = playerTile;
                }
                
            },
            draw: function(ctx, config) {

                for(var x = 0; x < Generator.worldWidth; x++) {
                    for(var y = 0; y < Generator.worldHeight; y++) {

                        switch(world[x][y]) {
                            case emptyTile: // floor
                                ctx.fillStyle = config.floor;
                                break;
                            case wallTile: // walls
                                ctx.fillStyle = config.walls;
                                break;
                            case treasureTile: //treasure
                                ctx.fillStyle = config.treasure;
                                break;
                            case playerTile: // player
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
