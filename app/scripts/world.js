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
        var bombId = 0;

        // TODO: placeholder sprite from http://buildnewgames.com/astar/
        var spritesheet = new Image();
        spritesheet.src = 'data:image/png;base64,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';
        spritesheet.onload = function() {
            console.log('sprite loaded');
        }

        // !!! TODO: this should be pulled from game.js
        var tileWidth = tileHeight = 12;
        var CANVAS_HEIGHT = Generator.worldHeight * tileHeight;
        var CANVAS_WIDTH = Generator.worldWidth * tileWidth;

        return {
            // public methods/vars
            playerTile: playerTile,
            emptyTile: emptyTile,
            bombTile: bombTile,
            bombs: [], 
            entities: {},
            tileHeight: tileHeight,
            tileWidth: tileWidth,
            spritesheet: spritesheet,

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

            removeEntity: function(id) {
                if(this.entities[id]) {
                    delete this.entities[id];
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
                var self = this;

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
                            // take damage once per bomb
                            var playerDamaged = false;
                            // remove tiles around bomb
                            for(var x = bombPos.x - 1; x < bombPos.x + 2; x++) {
                                for(var y = bombPos.y - 1; y < bombPos.y + 2; y++) {
                                    switch(world[x][y]) {
                                        case enemyTile:
                                            this.forEachEntity(function(entity) {
                                                var enemyPos = self.toTileCoords(entity.position);
                                                if(enemyPos.x === x && enemyPos.y === y) {
                                                    entity.damage(self.bombs[i].damage);
                                                }
                                            });
                                            break;
                                        case playerTile:
                                            if(!playerDamaged) {
                                                player.damage(this.bombs[i].damage);
                                                playerDamaged = true;
                                            }
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
                var self = this;
                
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

                if(world[tmp.x][tmp.y] === enemyTile) {
                    // TODO: magic number!
                    player.damage(1);
                }


            },
            draw: function(ctx, config) {
                var self = this;

                for(var x = 0; x < Generator.worldWidth; x++) {
                    for(var y = 0; y < Generator.worldHeight; y++) {

                        switch(world[x][y]) {
                            case emptyTile: // floor
                                // ctx.fillStyle = config.floor;
                                // img, sx, sy, swidth,sheight,x,y,width,height
                                ctx.drawImage(self.spritesheet, 
                                              emptyTile * tileWidth, // == 0, first img in spritesheet 
                                              0, 
                                              self.tileWidth, 
                                              self.tileHeight, 
                                              x * self.tileWidth, 
                                              y * self.tileHeight, 
                                              self.tileWidth, 
                                              self.tileHeight);
                                break;
                            case wallTile: // walls
                                // ctx.fillStyle = config.walls;
                                ctx.drawImage(self.spritesheet, 
                                              // wallTile * tileWidth, // == 1 * tilewidth, second img in spritesheet
                                              32,
                                              0, 
                                              self.tileWidth, 
                                              self.tileHeight, 
                                              x * self.tileWidth, 
                                              y * self.tileHeight, 
                                              self.tileWidth, 
                                              self.tileHeight);
                                break;
                            case treasureTile: //treasure
                                ctx.fillStyle = config.treasure;
                                ctx.fillRect(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);
                                break;
                            default:
                                ctx.fillStyle = emptyTile;
                                break;

                        }
                        
                        // ctx.fillRect(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);
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
