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
            this.x -= this.speed;
        }
        if(keydown.right) {
            this.x += this.speed;
        }
        if(keydown.up) {
            this.y -= this.speed;
        }
        if(keydown.down) {
            this.y += this.speed;
        }
        // this.checkBounds();
    },

    checkBounds: function(maxWidth, maxHeight) {
        this.x = this.x.clamp(0, maxWidth - this.width);
        this.y = this.y.clamp(0, maxHeight - this.width);
    }
}

