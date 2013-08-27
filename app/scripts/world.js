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
        var bombTile = 3;
        // !!! TODO: this should be pulled from game.js
        var tileWidth = tileHeight = 12;

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

                if(keydown.left) {
                    player.direction = 'left';
                   newx--;
                }
                if(keydown.right) {
                    player.direction = 'right';
                    newx++;
                }
                if(keydown.up) {
                    player.direction = 'up';
                    newy--;
                }
                if(keydown.down) {
                    player.direction = 'down';
                    newy++;
                }

                if(world[newx][newy] === emptyTile) {
                    world[player.x][player.y] = emptyTile;
                    player.x = newx;
                    player.y = newy;
                    world[player.x][player.y] = playerTile;
                } else if(world[newx][newy] == treasureTile) {
                    player.score += 10;

                    world[player.x][player.y] = emptyTile;
                    player.x = newx;
                    player.y = newy;
                    world[player.x][player.y] = playerTile;
                }

                // player.attack
                if(keydown.space) {
                    // player.attack();
                    // world[player.x][player.y] = bombTile;
                    console.log(player.x, player.y);
                    console.log(this.toPixelCoords({x: player.x, y: player.y } ));
                    
                    var pixelPos = this.toPixelCoords({ x: player.x, y: player.y });

                    console.log(this.toTileCoords(pixelPos));

                    switch(player.direction) {
                        case 'up':
                            world[player.x][player.y + 1] = bombTile;
                            break;
                        case 'down':
                            world[player.x][player.y - 1] = bombTile;
                            break;
                        case 'left':
                            world[player.x + 1][player.y] = bombTile;
                            break;
                        case 'right':
                        default:
                            world[player.x - 1][player.y] = bombTile;
                            break;
                    }
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
            }, // draw

            toTileCoords: function(position) {
                var x = Math.floor(position.x / tileWidth);
                // var y = ((CANVAS_HEIGHT * tileHeight) - position.y) / tileHeight;
                var y = Math.floor(position.y / tileHeight);
                return {
                    x: x,
                    y: y
                };
            },

            toPixelCoords: function(position) {
                var x = position.x * tileWidth;
                var y = position.y * tileHeight;

                return {
                    x: x,
                    y: y
                };
            }
        }; // end return
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
