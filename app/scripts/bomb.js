function Bomb(pos) {
    this.colour = '#333';
    this.position = pos;
    this.startTime = new Date().getTime();
    this.fuse = 3000;
}

Bomb.prototype.draw = function(canvas) {
    // body...
};

Bomb.prototype.update = function() {
    // var time = new Date().getTime();
    // if((this.startTime + this.fuse) > time) {
    //     this.explode();
    // }
};
