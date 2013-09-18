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
        var enemyTile = 4;
        
        // !!! TODO: this should be pulled from game.js
        var tileWidth = tileHeight = 12;
        var CANVAS_HEIGHT = Generator.worldHeight * tileHeight;
        var CANVAS_WIDTH = Generator.worldWidth * tileWidth;

        return {
            // public methods/vars
            playerTile: playerTile,
            bombs: [], 
            entities: {},

            forEachEntity: function(callback) {
                _.each(this.entities, function(entity) {
                    callback(entity);
                });
            },

            addEntity: function(entity) {
                if(this.entities[entity.id] === undefined) {
                    this.entities[entity.id] = entity;
                }
            },

            placePlayer: function() {
                for(var y = 0; y < Generator.worldHeight; y++) {
                    for(var x = 0; x < Generator.worldWidth; x++) {
                        if(world[x][y] === emptyTile) {
                            world[x][y] = playerTile;
                            return this.toPixelCoords({ x: x, y: y });
                        }
                    }
                }
            },
            
            placeRandom: function() {
                var ranX = Math.floor(Math.random() * Generator.worldWidth);
                var ranY = Math.floor(Math.random() * Generator.worldHeight);

                if(world[ranX][ranY] === emptyTile) {
                    world[ranX][ranY] = enemyTile;
                    return this.toPixelCoords({ x: ranX, y: ranY });
                } else {
                    return this.placeRandom();
                }
            },

            updateBombs: function() {
                var newBombs = [];
                for(var i = 0; i < this.bombs.length; i++) {
                   if(this.bombs[i].active) {
                        newBombs.push(this.bombs[i]);
                   }
                }
                this.bombs = newBombs;

                var time = new Date().getTime();
                for(var i = 0; i < this.bombs.length; i++) {
                    if(this.bombs[i].active) {
                        if(time > (this.bombs[i].startTime + this.bombs[i].fuse)) {
                            this.bombs[i].explode();
                            // update map
                            var bombPos = this.toTileCoords(this.bombs[i].position);
                            this.addTile(emptyTile, bombPos);
                            // remove tiles around bomb
                            for(var x = bombPos.x - 1; x < bombPos.x + 2; x++) {
                                for(var y = bombPos.y - 1; y < bombPos.y + 2; y++) {
                                    console.log(x, y, world[x][y]);
                                    switch(world[x][y]) {
                                        case enemyTile:
                                            break;
                                        case playerTile:
                                            player.damage(this.bombs[i].damage);
                                            break;
                                        case wallTile:
                                            this.addTile(emptyTile, { x: x, y: y });
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            } // end for x
                        }
                    }
                } // end for bombs
            },
            
            update: function(keydown) {
                
                this.updateBombs();

                var newx = player.position.x;
                var newy = player.position.y;

                if(keydown.left) {
                    player.direction = 'left';
                    newx -= player.speed;
                }
                if(keydown.right) {
                    player.direction = 'right';
                    newx += player.speed;
                }
                if(keydown.up) {
                    player.direction = 'up';
                    newy -= player.speed;
                }
                if(keydown.down) {
                    player.direction = 'down';
                    newy += player.speed;
                }

                if(keydown.d) {
                    // console.log(world);
                    console.log(this.bombs);
                    console.log(this.toTileCoords(player.position));
                }

                var tmp = this.toTileCoords({ x: newx, y: newy });

                // collision detection
                if(newx >= 0 
                   && newx <= CANVAS_WIDTH 
                   && newy >= 0 
                   && newy <= CANVAS_HEIGHT 
                   && world[tmp.x][tmp.y] === emptyTile) {
                    player.move(newx, newy);
                }

                if(world[tmp.x][tmp.y] === treasureTile) {
                    world[tmp.x][tmp.y] = emptyTile;
                    player.updateScore(10);
                    player.move(newx, newy);
                }


                // player.attack
                if(keydown.space) {
                    var bombPos = { x: player.position.x, y: player.position.y };

                    switch(player.direction) {
                        case 'up':
                            bombPos.y -= tileHeight;
                            this.bombs.push(new Bomb(bombPos));
                            this.addTile(bombTile, this.toTileCoords(bombPos));
                            break;
                        case 'down':
                            bombPos.y += tileHeight;
                            this.bombs.push(new Bomb(bombPos));
                            this.addTile(bombTile, this.toTileCoords(bombPos));
                            break;
                        case 'left':
                            bombPos.x -= tileWidth;
                            this.bombs.push(new Bomb(bombPos));
                            this.addTile(bombTile, this.toTileCoords(bombPos));
                            break;
                        case 'right':
                        default:
                            bombPos.x += tileWidth;
                            this.bombs.push(new Bomb(bombPos));
                            
                            this.addTile(bombTile, this.toTileCoords(bombPos));
                            break;
                    }
                    console.log(this.bombs);
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
                            default:
                                ctx.fillStyle = emptyTile;
                                break;

                        }
                        
                        ctx.fillRect(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);
                    }
                }
            }, // draw

            toTileCoords: function(position) {
                var x = Math.floor(position.x / tileWidth);
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
            },

            addTile: function(tile, position) {
                world[position.x][position.y] = tile;
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
