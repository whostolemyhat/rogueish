$(function() {
    'use strict';

    var tileWidth = 12;
    var tileHeight = 12;

    var CANVAS_HEIGHT = Generator.worldHeight * tileHeight;
    var CANVAS_WIDTH = Generator.worldWidth * tileWidth;
    var FPS = 15;
    var canvasElement = $('<canvas width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>');
    var canvas = canvasElement.get(0).getContext('2d');
    var world;

    var lightColour = '#3355aa';
    var darkColour = '#433';
    var treasureColour = '#f1d437';


    function init() {
        canvasElement.appendTo('body');

        world = World.getInstance();
        var tmp = world.placePlayer();
        player.position.x = tmp.x;
        player.position.y = tmp.y;
        world.enemies.push(new Enemy(), new Enemy(), new Enemy());
        
        setInterval(function() {
            update();
            draw();
        }, 1000/FPS);
    }

    
    function update() {
        world.update(keydown);
    }

    function draw() {
        canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        world.draw(canvas, {
            floor: lightColour,
            walls: darkColour,
            treasure: treasureColour,
            tileWidth: tileWidth,
            tileHeight: tileHeight,
            player: player.colour
        });
        
        for(var i = 0; i < world.bombs.length; i++) {
            world.bombs[i].draw(canvas);
        }
        for(var i = 0; i < world.enemies.length; i++) {
            world.enemies[i].draw(canvas);
        }
        player.draw(canvas);
        

        // Score
        canvas.fillStyle = 'rgba(250, 250, 250, 0.9)';
        canvas.font = "24px Helvetica";
        canvas.textAlign = "left";
        canvas.textBaseline = "top";
        // text, x, y
        canvas.fillText("Treasure: " + player.score, 12, 12);
        canvas.fillText("Heath: " + player.health, 12, 36);
    }

    init();
});

