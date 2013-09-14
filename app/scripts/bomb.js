function Bomb(pos) {
    this.colour = '#333';
    this.position = pos;
    this.width = 12;
    this.height = 12;
    this.startTime = new Date().getTime();
    this.fuse = 3000;
    this.active = true;
    this.damage = 1;
}

Bomb.prototype.draw = function(canvas) {
    canvas.fillStyle = this.colour;
    canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
};


Bomb.prototype.explode = function() {
    this.active = false;
}
