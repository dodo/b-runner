


var Player = function () {
    this.p = vec(160, 100);
    this.v = vec();
    this.move = new Movement(this.p, this.v);
    this.radius = 10;

    this.inAir = true;
    this.normal = vec(0, -1);
};

Player.prototype.draw = function (dt) {
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(this.p.x, this.p.y, this.radius, 0, Math.PI*2, true);
    ctx.fill();

    //this.move.update(dt);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    var p = this.move.getPoint(0);
    ctx.moveTo(p.x, p.y);
    for(var f = 0.1; f <= 1 ; f+=0.1) {
        p = this.move.getPoint(f);
        ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    ctx.strokeStyle = "white";
};

Player.prototype.update = function () {
    if(keys[37] || keys[38] || keys[39] || keys[40]) {
        var dir = vec3(0,keys[39] - keys[37], keys[40] - keys[38]);

        var m = this.move.m.dup().norm();
        if(m.equ(dir)) {
            // TODO update movement
            //this.move.norm();
        } else {
            // TODO calc new movent
            //this.move.set(dir).mul(this.radius*2);
            this.move = new Movement(this.p, this.v);
        }

    }
    this.v.add({x:(keys[39] - keys[37]) * 0.5,
                y:(keys[40] - keys[38]) * 0.5 + 0.17})
          .mul(0.98);
    this.p.add(this.v);
};

// ---------------------

var Movement = function (p, v) {
    this.p = vec_(2,p);
    this.v = vec_(2,v).mul(0.98);
    this.m = vec3();
    this.t = 0;
    this._p = this.p.dup();
    this.calculate();
};

Movement.prototype.calculate = function () {
    // TODO collision check
    var t = 50; // hrhr FIXME
    var v = this.v.dup().mul(t);
    v.y += 0.17*t*t;
    v.add(this.p);
    this.m = vec3.apply(null, [t].concat(v.toList()));
    return this;
};

Movement.prototype.update = function (dt) {
    return this.getPoint(1);
    /*if (this.t <= this.m.t) {
        this.t += dt || 0;
        return this.getPoint(this.t / this.m.t);
    } else return this.getPoint();*/
};

Movement.prototype.getPoint = function (perc) {
    if (!perc && perc !== 0)
        return this._p;
    var t = this.m.t*perc;
    var v = this.v.dup().mul(t);
    v.y += 0.17*0.5*t*t;
    return this._p.set(this.p).add(v);
};

