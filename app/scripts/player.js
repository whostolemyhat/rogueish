var player = {
    colour: '#05A',
    x: 200,
    y: 200,
    width: 32,
    height: 32,
    speed: 10,

    draw: function(canvas) {
        canvas.fillStyle = this.colour;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },

    update: function(keydown) {
        if(keydown.left) {
            // player.moveLeft();
            player.x -= this.speed;
        }
        if(keydown.right) {
            player.x += this.speed;
        }
        if(keydown.up) {
            player.y -= this.speed;
        }
        if(keydown.down) {
            player.y += this.speed;
        }
    }
}

