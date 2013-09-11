function Bomb(pos) {
    this.colour = '#333';
    this.position = pos;
    this.width = 10;
    this.height = 10;
    this.startTime = new Date().getTime();
    this.fuse = 3000;
    this.active = true;
}

Bomb.prototype.draw = function(canvas) {
    canvas.fillStyle = this.colour;
    canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Bomb.prototype.update = function() {
    // var time = new Date().getTime();
    // if((this.startTime + this.fuse) > time) {
    //     this.explode();
    // }
};

Bomb.prototype.explode = function() {
    // var world = World.getInstance();
    // // world.removeTile(this.position);
    // world.removeBomb(this.index);
    this.active = false;
}
