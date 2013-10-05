function Enemy(id) {
    this.colour = 'green';
    this.position = World.getInstance().placeRandom();
    this.width = 12;
    this.height = 12;
    this.speed = 10;
    this.health = 1;
    this.id = id;
    this.direction = "left";
}

Enemy.prototype.draw = function(canvas) {
    canvas.fillStyle = this.colour;
    canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Enemy.prototype.update = function() {
    // body...
};

Enemy.prototype.damage = function(damage) {
    console.log('taking damage ' + this.id);
    this.health -= damage;
    if(this.health <= 0) {
        this.die();
    }
}

Enemy.prototype.die = function() {
    // notify game that enemy died
    var world = World.getInstance();
    world.removeEntity(this.id);
    world.addTile(world.emptyTile, world.toTileCoords(this.position));
}
