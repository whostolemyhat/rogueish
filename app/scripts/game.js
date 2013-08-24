$(function() {
    'use strict';

    var CANVAS_HEIGHT = 480;
    var CANVAS_WIDTH = 640;

    var canvasElement = $('<canvas width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>');
    var canvas = canvasElement.get(0).getContext('2d');
    canvasElement.appendTo('body');

    function update() {
        player.update(keydown);
        player.checkBounds(CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    function draw() {
        canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        player.draw(canvas);
    }

    var FPS = 60;
    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);

});

