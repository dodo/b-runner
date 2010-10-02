
var TILE_SIZE = 32;

var Map = function() {

	this.data = [
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 0, 6, 6, 6, 6, 6, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 7, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];


};

var tiles = [undefined,
	[vec(0, 0), vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],

	[vec(0, 0), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],
	[vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],

	[vec(0, 0), vec(TILE_SIZE, 0), vec(0, TILE_SIZE)],
	[vec(0, 0), vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE)],

	[vec(0, 0), vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE/2), vec(0, TILE_SIZE/2)],
	[vec(0, TILE_SIZE/2), vec(TILE_SIZE, TILE_SIZE/2), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],

	[vec(TILE_SIZE, TILE_SIZE/2), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],
	[vec(0, TILE_SIZE/2), vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],

	[vec(0, 0), vec(TILE_SIZE/2, TILE_SIZE), vec(0, TILE_SIZE)],
	[vec(0, 0), vec(TILE_SIZE/2, 0), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],

];
var buildConstraints = function () {
return new ConstraintSolver([
    (new Block({x:12*TILE_SIZE, y:5*TILE_SIZE, fixed:true}, {x:12*TILE_SIZE, y:6*TILE_SIZE, fixed:true}, {x:13*TILE_SIZE, y:5*TILE_SIZE}, {x:13*TILE_SIZE, y:6*TILE_SIZE}))
    .connect({x:13*TILE_SIZE, y:5*TILE_SIZE}, {x:13*TILE_SIZE, y:6*TILE_SIZE}, {x:14*TILE_SIZE, y:5*TILE_SIZE}, {x:14*TILE_SIZE, y:6*TILE_SIZE})
    .connect({x:14*TILE_SIZE, y:5*TILE_SIZE}, {x:14*TILE_SIZE, y:6*TILE_SIZE}, {x:15*TILE_SIZE, y:5*TILE_SIZE}, {x:15*TILE_SIZE, y:6*TILE_SIZE})
    .connect({x:15*TILE_SIZE, y:5*TILE_SIZE}, {x:15*TILE_SIZE, y:6*TILE_SIZE}, {x:16*TILE_SIZE, y:5*TILE_SIZE}, {x:16*TILE_SIZE, y:6*TILE_SIZE})
    .connect({x:16*TILE_SIZE, y:5*TILE_SIZE}, {x:16*TILE_SIZE, y:6*TILE_SIZE}, {x:17*TILE_SIZE, y:5*TILE_SIZE}, {x:17*TILE_SIZE, y:6*TILE_SIZE})
    .connect({x:17*TILE_SIZE, y:5*TILE_SIZE}, {x:17*TILE_SIZE, y:6*TILE_SIZE}, {x:18*TILE_SIZE, y:5*TILE_SIZE, fixed:true}, {x:18*TILE_SIZE, y:6*TILE_SIZE, fixed:true}),
    (new Block({x:28*TILE_SIZE, y:4*TILE_SIZE, fixed:true}, {x:28*TILE_SIZE, y:5*TILE_SIZE, fixed:true}, {x:29*TILE_SIZE, y:4*TILE_SIZE}, {x:29*TILE_SIZE, y:5*TILE_SIZE}, 100))
    .connect({x:29*TILE_SIZE, y:4*TILE_SIZE}, {x:29*TILE_SIZE, y:5*TILE_SIZE}, {x:30*TILE_SIZE, y:4*TILE_SIZE}, {x:30*TILE_SIZE, y:5*TILE_SIZE})
    .connect({x:30*TILE_SIZE, y:4*TILE_SIZE}, {x:30*TILE_SIZE, y:5*TILE_SIZE}, {x:31*TILE_SIZE, y:4*TILE_SIZE}, {x:31*TILE_SIZE, y:5*TILE_SIZE})
    .connect({x:31*TILE_SIZE, y:4*TILE_SIZE}, {x:31*TILE_SIZE, y:5*TILE_SIZE}, {x:32*TILE_SIZE, y:4*TILE_SIZE}, {x:32*TILE_SIZE, y:5*TILE_SIZE}),
    (new Block({x:32*TILE_SIZE, y:14*TILE_SIZE, fixed:true},{x:33*TILE_SIZE, y:14*TILE_SIZE, fixed:true},{x:32*TILE_SIZE, y:13*TILE_SIZE},{x:33*TILE_SIZE, y:13*TILE_SIZE}, 2))
    .connect({x:32*TILE_SIZE, y:13*TILE_SIZE},{x:33*TILE_SIZE, y:13*TILE_SIZE},{x:32*TILE_SIZE, y:12*TILE_SIZE},{x:33*TILE_SIZE, y:12*TILE_SIZE})
    .connect({x:32*TILE_SIZE, y:12*TILE_SIZE},{x:33*TILE_SIZE, y:12*TILE_SIZE},{x:32*TILE_SIZE, y:11*TILE_SIZE},{x:33*TILE_SIZE, y:11*TILE_SIZE})
    .connect({x:32*TILE_SIZE, y:11*TILE_SIZE},{x:33*TILE_SIZE, y:11*TILE_SIZE},{x:32*TILE_SIZE, y:10*TILE_SIZE},{x:33*TILE_SIZE, y:10*TILE_SIZE})
    .connect({x:32*TILE_SIZE, y:10*TILE_SIZE},{x:33*TILE_SIZE, y:10*TILE_SIZE},{x:32*TILE_SIZE, y:9*TILE_SIZE},{x:33*TILE_SIZE, y:9*TILE_SIZE}),
]);
};
/*
 * returns an object containing the shortest distance betwixt given point and polygon.
 * also returns the corresponding normal vector and possible collision point.
 */
var polygonCollision = function(poly, m) {
	var col = { d: 9e9 };
	var len = poly.length;
	var a = poly[len - 1];
	var b;
	var i;
	for(i = 0; i < len; ++i) {
		b = poly[i];
		var ab = b.sub(a);
		var am = m.sub(a);
		var p = null;
		var d;
		var n;
		var q = ab.dot(am) / ab.lenSq();
		if(q < 0) p = a;
		else if(q > 1) p = b;
		if(p) { // vertex
			n = m.sub(p);
			d = n.len();
			n.normalize();
		}
		else { // line
			p = a.add(ab.mul(q));
			n = ab.perp().normalize();
			d = Math.abs(n.dot(am));
		}
		if(d < col.d) {
			col.d = d;
			col.n = n;
			col.p = p;
		}
		a = b;
	}
	return col;
};


/*
var circle = {};
circle.m = vec(200, 100);
circle.r = 50;

var circleCollision = function(circle, m) {
	var col = {};

	var n = m.sub(circle.m);
	col.d = n.len() - circle.r;
	col.n = n.normalize();
	col.p = circle.m.add(n.mul(circle.r));

	return col;
}
*/

Map.prototype.collision = function(player, solver) {

	var col = { d: 9e9 };

	var x1 = Math.floor(player.pos.x / TILE_SIZE - 0.5) - 1;
	var y1 = Math.floor(player.pos.y / TILE_SIZE - 0.5) - 1;

	for(var y = y1; y < y1 + 4; ++y) {
		var row = this.data[y];
		if(!row) continue;
		for(var x = x1; x < x1 + 4; ++x) {
			if(!row[x]) continue;
			var poly = tiles[row[x]];
			if(!poly) continue;

			var offset = vec(x * TILE_SIZE, y * TILE_SIZE);
			var w = player.pos.sub(offset);

			var c = polygonCollision(poly, w);
			if(c.d < col.d) {
				col = c;
				col.p = col.p.add(offset);
			}
		}
	}

    var c = solver.collisionCheck(player);
    if(c.d < col.d) col = c;

	// apply corrections
	if(col.d < player.radius) {
		// position correction
		var k = col.n.mul(col.d - player.radius);
		player.pos.subEq(k);
		// velocity correction
		var pn = col.n.perp();
		player.vel = pn.mul(player.vel.dot(pn));

		player.normal = col.n;
		player.collision = true;
	}
	else {
		player.collision = false;
	}
};



Map.prototype.draw = function() {

	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#777";
	ctx.beginPath();

	for(var y = 0, ly = this.data.length; y < ly; ++y) {
		for(var x = 0, lx = this.data[y].length; x < lx; ++x) {

			var poly = tiles[this.data[y][x]];
			if(poly === undefined) continue;

			var v = poly[0];
			ctx.moveTo(v.x + x * TILE_SIZE, v.y + y * TILE_SIZE);
			for(var i = poly.length - 1; i >= 1; --i) {
				v = poly[i];
				ctx.lineTo(v.x + x * TILE_SIZE, v.y + y * TILE_SIZE);
			}
			ctx.closePath();

		}
	}

	ctx.fill();
//	ctx.stroke();
	ctx.lineWidth = 2;

};


