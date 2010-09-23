var include = function(file) { document.write('<script type="text/javascript" src="' + file + '"></script>'); };

include("vec.js");
include("player.js");
include("map.js");

//           ←     ↑     →     ↓     x     c
var keys = { 37:0, 38:0, 39:0, 40:0, 88:0, 89:0 };
window.onkeydown = function (e) { keys[e.which] = 1; };
window.onkeyup = function (e) { keys[e.which] = 0; };


var canvas;
var ctx;

var player;
var map;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    player = new Player();
    map = new Map();

    setInterval(update_loop, 16);  // 60 fps
    setInterval(  draw_loop, 33);  // 30 fps
};

var update_loop = function() {
    player.update();
    map.collision(player);
};

var draw_loop = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    map.draw();
    player.draw(0.2);

};


