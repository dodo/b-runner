


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

    var iter = this.move.createTileIterator();//console.log("------------------------")
    ctx.beginPath();
    for(var i = 0 ; i < 20 ; ++i) {
        ctx.moveTo(iter.x*TILE_SIZE, iter.y*TILE_SIZE);
        ctx.lineTo((iter.x+1)*TILE_SIZE, iter.y*TILE_SIZE);
        ctx.lineTo((iter.x+1)*TILE_SIZE, (iter.y+1)*TILE_SIZE);
        ctx.lineTo(iter.x*TILE_SIZE, (iter.y+1)*TILE_SIZE);
        ctx.lineTo(iter.x*TILE_SIZE, iter.y*TILE_SIZE);
        ctx.moveTo(this.p.x, this.p.y);
        ctx.lineTo(iter.p.x, iter.p.y);
        iter.next()//if (!iter.next()) break;
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
    this.a = vec2(0,0.17);
    this.m = vec3();
    this.t = 0;
    this._p = this.p.dup();
    this.calculate();
};

Movement.prototype.calculate = function () {
    // TODO collision check
    var t = this._calc_boundary_t(
            { // min
                t: 0, x: 0, y: 0
            }, { // max
                t: 100,
                x: canvas.width,
                y: canvas.height
            }, this.p, this.a, this.v);
    var v = this._calc_p(t);
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

Movement.prototype._calc_p = function (t) {
    return this.v.dup().mul(t).add(this.a.dup().mul(0.5*t*t)).add(this.p);
};

Movement.prototype._calc_t = function (min_t, c, p, a, v) {
    var t = NaN;
    if (a === 0) {
        if (v !== 0) {
            t = p / v;
            if (t < min_t) t = NaN;
        }
    } else {
        var t1 =   ( Math.sqrt( 2 * a * ( c - p ) + v * v ) - v ) / a;
        var t2 = - ( Math.sqrt( 2 * a * ( c - p ) + v * v ) + v ) / a;
        if (!isNaN(t1) && !isNaN(t2)) {
                 if( t1 >= 0 && t2 < 0 && t1 >= min_t) t = t1;
            else if (t2 >= 0 && t1 < 0 && t2 >= min_t) t = t2;
            else {
                if (t1 >= min_t && t2 >= min_t)
                    t = Math.min(t1,t2);
                else if (t1 >= min_t) t = t1;
                else if (t2 >= min_t) t = t2;
            }
        } else if (isNaN(t2) && t1 >= min_t) t = t1;
          else if (isNaN(t1) && t2 >= min_t) t = t2;
    }
    //console.log("t",min_t,"|",t,t1,t2)
    return Math.abs(t);
};

Movement.prototype._calc_boundary_t = function (min, max, p, a, v) {
    var _t, t = max.t;
    var _t = this._calc_t(min.t, min.x, p.x, a.x, v.x);
    if (!isNaN(_t)) t = Math.min(t, _t);
    var _t = this._calc_t(min.t, min.y, p.y, a.y, v.y);
    if (!isNaN(_t)) t = Math.min(t, _t);
    var _t = this._calc_t(min.t, max.x, p.x, a.x, v.x);
    if (!isNaN(_t)) t = Math.min(t, _t);
    var _t = this._calc_t(min.t, max.y, p.y, a.y, v.y);
    if (!isNaN(_t)) t = Math.min(t, _t);
    return t;
};

Movement.prototype.getPoint = function (perc) {
    if (!perc && perc !== 0)
        return this._p;
    var t = this.m.t*perc;
    return this._p.set(this._calc_p(t));
};

Movement.prototype.createTileIterator = function () {
    var that = this;
    var _TS = 1 / TILE_SIZE;
    var iter = {
        x: Math.floor(this.p.x * _TS),
        y: Math.floor(this.p.y * _TS),
        p: vec3.apply(null, [0].concat(this.p.toList()))
    };
    var m = that.m.dup().sub(vec3.apply(null, [0].concat(that.p.toList())));
    iter.next = function () {
        /* // maybe dead end
        var t = that._calc_boundary_t(
            { // min
                t: iter.p.t,
                x: iter.x * TILE_SIZE - 0.001,
                y: iter.y * TILE_SIZE - 0.001
            }, { // max
                t: 9e9,
                x: (iter.x + 1) * TILE_SIZE + 0.001,
                y: (iter.y + 1) * TILE_SIZE + 0.001
            }, iter.p, that.a, that.v);

        var p = vec3.apply(null, [t].concat(that._calc_p(t).toList()));
        //console.log(p.toString())
        if (t > that.m.t) return false;

        iter.p = p;//iter.p = vec_(3, that.getPoint(t / that.m.t));
        iter.x = Math.floor(iter.p.x / TILE_SIZE);
        iter.y = Math.floor(iter.p.y / TILE_SIZE);
        iter.p.t = t;
        return true;
        */
        var x = iter.x;
        var y = iter.y;
        var d, perc, t, i = 1;
        while(x == iter.x && y == iter.y) {
            d = that.v.dup().norm().mul(TILE_SIZE*0.1).add(iter.p).sub(that.p).add(that.a.dup().mul(iter.p.t));
            perc = Math.sqrt(d.lenSq() / m.lenSq());
            t = m.dup().mul(perc).t;
            iter.p = vec3.apply(null, [t].concat(that._calc_p(t).toList()));
            iter.x = Math.floor(iter.p.x * _TS);
            iter.y = Math.floor(iter.p.y * _TS);
            if(++i == 20) break;
        }
        return true;

    };
    return iter;
};

