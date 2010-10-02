


var Point = function (x, y, fixed) {
    this.fixed = fixed || false;
    this.pos = vec(x,y);
    this.acc = vec();
    this.force = vec();
    this._prev = vec(x,y);
};

Point.prototype.simulate = function (delta) {
    if (!this.fixed) {
        this.acc = this.acc.add(this.force).mul(delta*delta);
        var pos = this.pos.sub(this._prev).add(this.acc).mul(0.9).add(this.pos);
        this._prev = this.pos;
        this.pos = pos;
        this.acc = vec();
    }
};

Point.prototype.hit =  function (v) {
    if (!this.fixed) this.force = this.force.add(v);
};

Point.prototype.accelerate =  function (v) {
    if (!this.fixed) this.acc = this.acc.add(v);
};

Point.prototype.correct =  function (v) {
    if (!this.fixed) this.pos = this.pos.add(v);
};

Point.prototype.clearForces =  function () {
    this.force = vec();
};


var Constraint = function (p1, p2, stiffness) {
    this.p1 = p1;
    this.p2 = p2;
    this.target = p1.pos.sub(p2.pos).len();
    this.stiffness = stiffness || 4;
};

Constraint.prototype.resolve = function () {
    var pos1 = this.p1.pos;
    var pos2 = this.p2.pos;
    var force = (this.target - pos1.sub(pos2).len()) * this.stiffness;
    var dir = pos1.sub(pos2).normalize();
    var acc = dir.mul(force);
    this.p1.accelerate(acc);
    this.p2.accelerate(acc.mul(-1));
};

Constraint.prototype.draw = function () {
    var pos1 = this.p1.pos;
    var pos2 = this.p2.pos;
    var deviation = this.target - pos1.sub(pos2).len();
    var color_diff = Math.round(deviation * deviation * 512);

    ctx.strokeStyle = 'rgba(' + (128+color_diff) + ', ' + (128-color_diff) + ', ' + (128-color_diff) + ', 1)';

    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
};



var Segment = function (points) {
    this.points = points.slice(0,4);
    for(var i=0; i<8; i++) {
        var a = i%4, b = (i+1)%4, c = (i+2)%4;
        var ab = this.points[b].pos.sub(this.points[a].pos);
        var ac = this.points[c].pos.sub(this.points[a].pos);
        if(ab.dot(ac) != 0) {
            var dummy = this.points[b];
            this.points[b] = this.points[c];
            this.points[c] = dummy;
        }
    }
};

Segment.prototype.draw = function () {
    ctx.lineWidth = 0.6;
    ctx.fillStyle = "#777";
    ctx.strokeStyle = "#777";
    ctx.beginPath();
    ctx.moveTo(this.points[3].pos.x, this.points[3].pos.y);
    for(var i=0; i<4; i++) {
        var p = this.points[i];
        ctx.lineTo(p.pos.x, p.pos.y);
    }
    ctx.fill();
    ctx.stroke();
    /* debug
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(this.points[3].pos.x, this.points[3].pos.y);
    for(var i=0; i<4; i++) {
        var p = this.points[i];
        ctx.lineTo(p.pos.x, p.pos.y);
    }
    ctx.stroke(); */
    ctx.lineWidth = 1;
};

Segment.prototype.collisionCheck = function (player) {
    var poly = [];
    for(var i=3; i>=0; i--) poly.push(this.points[i].pos);
    var col = polygonCollision(poly, player.pos);
    if(col.d <= player.radius) {
        var m = player.mass;
        var r = player.radius;
        var points = [];
        for(var i=0; i<4;i++) points.push({p:this.points[i],d:this.points[i].pos.sub(player.pos)});
        points.sort(function (a,b) {return a.d.lenSq() - b.d.lenSq();});
        for(var i=0; i<2;i++) points[i].p.hit(points[i].d.normalize().mul(m*r/points[i].d.len()));
    }
    return col;
};



var Block = function (p1, p2, p3, p4, stiffness) {
    this.bb = {min:vec(), max:vec()};
    this.stiffness = stiffness;
    var points = this.points = [
        new Point(p1.x, p1.y, p1.fixed),
        new Point(p2.x, p2.y, p2.fixed),
        new Point(p3.x, p3.y, p3.fixed),
        new Point(p4.x, p4.y, p4.fixed)
    ];
    this.segments = [new Segment(points)];
    this.constraints = [
        new Constraint(points[0],points[1],stiffness),
        new Constraint(points[1],points[2],stiffness),
        new Constraint(points[2],points[3],stiffness),
        new Constraint(points[3],points[0],stiffness),
        new Constraint(points[0],points[2],stiffness),
        new Constraint(points[1],points[3],stiffness)
    ];
    this.update();
};

Block.prototype.connect = function (p1, p2, p3, p4) {
    var points = [null, null, null, null];
    var isnew = [true, true, true, true];
    for(var i=0; i<4; i++) {
        var p = [p1, p2, p3, p4][i];
        var found = false;
        for(var n=0, nl=this.points.length; n<nl; n++) {
            var point = this.points[n];
            if(p.x == point.pos.x && p.y == point.pos.y) {
                if(p.fixed) point.fixed = true;
                points[i] = point;
                isnew[i] = false;
                found = true;
                break;
            }
        }
        if (!found) this.points.push( points[i] = new Point(p.x, p.y, p.fixed) );
    }
    if(isnew[0] || isnew[1]) this.constraints.push(new Constraint(points[0],points[1],this.stiffness));
    if(isnew[1] || isnew[2]) this.constraints.push(new Constraint(points[1],points[2],this.stiffness));
    if(isnew[2] || isnew[3]) this.constraints.push(new Constraint(points[2],points[3],this.stiffness));
    if(isnew[3] || isnew[0]) this.constraints.push(new Constraint(points[3],points[0],this.stiffness));
    if(isnew[0] || isnew[2]) this.constraints.push(new Constraint(points[0],points[2],this.stiffness));
    if(isnew[1] || isnew[3]) this.constraints.push(new Constraint(points[1],points[3],this.stiffness));
    this.segments.push(new Segment(points));
    this.update();
    return this;
};

Block.prototype.draw = function () {
    for(var i=0, il=this.segments.length; i<il; i++) this.segments[i].draw();
    //for(var i=0, il=this.constraints.length; i<il; i++) this.constraints[i].draw(); // debug
    //ctx.strokeStyle = "green";ctx.strokeRect(this.bb.min.x, this.bb.min.y, this.bb.max.x-this.bb.min.x, this.bb.max.y-this.bb.min.y); // debug
};

Block.prototype.update = function () {
    var _min = vec(9e9,9e9), _max = vec();
    for(var i=0, il=this.points.length; i<il; i++) {
        var point = this.points[i];
        _min.x = Math.min(_min.x, point.pos.x);
        _min.y = Math.min(_min.y, point.pos.y);
        _max.x = Math.max(_max.x, point.pos.x);
        _max.y = Math.max(_max.y, point.pos.y);
    }
    this.bb.min = _min;
    this.bb.max = _max;
};

Block.prototype.collisionCheck = function (player) {
    var col = {d:9e9}, r = player.radius;
    if(player.pos.x > this.bb.min.x-r && player.pos.x < this.bb.max.x+r &&
       player.pos.y > this.bb.min.y-r && player.pos.y < this.bb.max.y+r) {
        for(var i=0, il=this.segments.length; i<il; i++) {
            var c = this.segments[i].collisionCheck(player);
            if(c.d < col.d) col = c;
        }
    }
    return col;
};




var ConstraintSolver = function (blocks) {
    this.blocks = blocks || [];
    this.constraints = [];
    this.points = [];
    for(var i=0, il=this.blocks.length; i<il; i++) {
        var block = this.blocks[i];
        this.constraints = this.constraints.concat(block.constraints);
        this.points = this.points.concat(block.points);
    }
    this.bb = {min:vec(), max:vec()};
};

ConstraintSolver.prototype.update = function (steps) {
    steps = steps || 15;
    var delta = 1/steps;
    var gravity = vec(0,GRAVITY);
    var _min = vec(9e9,9e9), _max = vec();
    for(var j=0; j<steps; j++) {
        for(var i=0, il=this.constraints.length; i<il; i++) {
            this.constraints[i].resolve();
        }
        for(var i=0, il=this.points.length; i<il; i++) {
            var point = this.points[i];
            point.accelerate(gravity);
            point.simulate(delta);
            if (j == steps-1) point.clearForces();
        }
    }
    for(var i=0, il=this.blocks.length; i<il; i++) {
        var block = this.blocks[i];
        block.update();
        _min.x = Math.min(_min.x, block.bb.min.x);
        _min.y = Math.min(_min.y, block.bb.min.y);
        _max.x = Math.max(_max.x, block.bb.max.x);
        _max.y = Math.max(_max.y, block.bb.max.y);
    }
    this.bb.min = _min;
    this.bb.max = _max;
};

ConstraintSolver.prototype.draw = function () {
    for(var i=0, il=this.blocks.length; i<il; i++) this.blocks[i].draw();
    //ctx.strokeStyle = "red";ctx.strokeRect(this.bb.min.x, this.bb.min.y, this.bb.max.x-this.bb.min.x, this.bb.max.y-this.bb.min.y); // debug
};


ConstraintSolver.prototype.collisionCheck = function (player) {
    var col = {d:9e9}, r = player.radius;
    if(player.pos.x > this.bb.min.x-r && player.pos.x < this.bb.max.x+r &&
       player.pos.y > this.bb.min.y-r && player.pos.y < this.bb.max.y+r) {
        for(var i=0, il=this.blocks.length; i<il; i++) {
            var c = this.blocks[i].collisionCheck(player);
            if(c.d < col.d) col = c;
        }
    }
    return col;
};
