function Enemy(id) {
    this.colour = 'green';
    this.position = World.getInstance().placeRandom();
    this.width = 12;
    this.height = 12;
    this.speed = 12; // simplify movement for now
    this.health = 1;
    this.id = id;
    this.direction = "left";
}

Enemy.prototype.draw = function(canvas) {
    canvas.fillStyle = this.colour;
    canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Enemy.prototype.update = function() {
    // make action in queue
};

Enemy.prototype.patrol = function(dest) {
    // pick random tile
    var world = World.getInstance();
    var dest = world.placeRandom();
    console.log(world.toTileCoords(this.position), world.toTileCoords(dest));
    // get path from Astar
    var path = findPath(world.world, world.toTileCoords(this.position), world.toTileCoords(dest));
    console.log(path);
    // move self.speed to next tile in path list
    world.addTile(world.emptyTile, world.toTileCoords(this.position));
    this.position.x = this.position.x += this.speed;
    // this.position.y = y;
    world.addTile(world.enemyTile, world.toTileCoords(this.position));
    // am i on the next tile?
    // move to next tile in path list
    // pause
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
