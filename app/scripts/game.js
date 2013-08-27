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
        player.x = tmp.x;
        player.y = tmp.y;
        
        setInterval(function() {
            update();
            draw();
        }, 1000/FPS);
    }

    
    function update() {
        // player.update(keydown);
        // player.checkBounds(CANVAS_WIDTH, CANVAS_HEIGHT);
        world.update(keydown);

    }

    function draw() {
        canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // player.draw(canvas);
        world.draw(canvas, {
            floor: lightColour,
            walls: darkColour,
            treasure: treasureColour,
            tileWidth: tileWidth,
            tileHeight: tileHeight,
            player: player.colour
        });

        // Score
        canvas.fillStyle = 'rgba(250, 250, 250, 0.9)';
        canvas.font = "24px Helvetica";
        canvas.textAlign = "left";
        canvas.textBaseline = "top";
        canvas.fillText("Treasure: " + player.score, 12, 12);
    }

    init();
});

