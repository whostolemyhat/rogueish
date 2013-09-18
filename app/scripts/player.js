var player = {
    colour: 'red',
    position: {
        x: 0,
        y: 0
    },
    score: 0,
    direction: '',
    width: 12,
    height: 12,
    speed: 12,
    health: 3,

    draw: function(canvas) {
        canvas.fillStyle = this.colour;
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
    },

    // update: function(keydown) {
    //     if(keydown.left) {
    //         this.x -= this.speed;
    //     }
    //     if(keydown.right) {
    //         this.x += this.speed;
    //     }
    //     if(keydown.up) {
    //         this.y -= this.speed;
    //     }
    //     if(keydown.down) {
    //         this.y += this.speed;
    //     }
    // },

    attack: function() {

    },

    updateScore: function(num) {
        this.score += num;
    },

    move: function(x, y) {
        var world = World.getInstance();
        world.addTile(world.emptyTile, world.toTileCoords(this.position));
        this.position.x = x;
        this.position.y = y;
        world.addTile(world.playerTile, world.toTileCoords(this.position));
    },

    damage: function(damage) {
        this.health -= damage;
    }

    // checkBounds: function(maxWidth, maxHeight) {
    //     this.x = this.x.clamp(0, maxWidth - this.width);
    //     this.y = this.y.clamp(0, maxHeight - this.width);
    // }
}

