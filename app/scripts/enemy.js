function Enemy(id) {
    this.colour = 'green';
    this.position = World.getInstance().placeRandom();
    this.width = 12;
    this.height = 12;
    this.speed = 10;
    this.health = 1;
    this.active = true;
    this.id = id;
    console.log(this.id);
}

Enemy.prototype.draw = function(canvas) {
    canvas.fillStyle = this.colour;
    canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Enemy.prototype.update = function() {
    // body...
};

Enemy.prototype.damage = function(damage) {
    this.health -= damage;
    if(this.health <= 0) {
        this.die();
    }
}

Enemy.prototype.die = function() {
    this.active = false;
    // World.getInstance.player
    // notify game that enemy died
}