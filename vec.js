(function() {

    this.vec = this.vec2 = function (x, y) {
        return this.vec_(2, {x:x, y:y});
    }

    this.vec3 = function (t, x, y) {
        return this.vec_(3, {t:t, x:x, y:y});
    }

    this.vec_ = function (d, o) {
        o = o || {};
        switch(d) {
            case 2: return (new V(['x', 'y'], o))._setup();      break;
            case 3: return  new V(['t', 'x', 'y'], o);           break;
            default: throw "Vector: supported dimensions: 2, 3"; break;
        }
    }

    var V = function (g, o) {
        this.keys = g;
        this.set(o);
    };

    // sets values
    V.prototype.set = function (o) {
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            this[k] = o[k] || 0;
        return this;
    }

    // duplicate
    V.prototype.dup = function () {
        return (new V(this.keys, this))._setup();
    }

    // equals
    V.prototype.equ = function (o) {
        var b = this.keys.length == o.keys.length;
        if (!b) return false;
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i ) {
            b = (this[k] == o[k]);
            if (!b) break;
        }
        return b;
    }

    // setups Vector
    V.prototype._setup = function () {
        if(this.keys.length === 2) {
            this.perp = _2d_perp;
            this.cross = _2d_cross;
        }
        return this;
    }

    // negate
    V.prototype.neg = function () {
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            this[k] = -this[k];
        return this;
    }

    // add
    V.prototype.add = function (o) {
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            this[k] += o[k];
        return this;
    }

    // subtrate
    V.prototype.sub = function (o) {
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            this[k] -= o[k];
        return this;
    }

    // multiply
    V.prototype.mul = function (f) {
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            this[k] *= f;
        return this;
    }

    // dot product
    V.prototype.dot = function (o) {
        var r = 0;
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            r += this[k] * o[k];
        return r;
    }

    // squared magnitude
    V.prototype.lenSq = function () {
        var r = 0;
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            r += this[k] * this[k];
        return r;
    }

    // magnitude
    V.prototype.len = function () {
        return Math.sqrt(this.lenSq());
    }

    // normalize
    V.prototype.norm = function () {
        var d = this.len();
        if(!d) return this;
        d = 1 / d;
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            this[k] *= d;
        return this;
    }

    // for applying on functions
    V.prototype.toList = function () {
        var r = [];
        for(var k, s=this.keys, i=0, l=s.length ; i<l && (k=s[i]) ; ++i )
            r.push(this[k]);
        return r;
    }

    // for debugging
    V.prototype.toString = function () {
        return "vec(" + this.toList().join(", ") + ")";
    }

    // for 2D

    // rotate by 90°
    var _2d_perp = function () {
        var dummy = this.x;
        this.x = this.y;
        this.y = -dummy;
        return this;
    }

    // dot product of 90° rotated vec with input
    var _2d_cross = function (o) {
        return this.dup().perp().dot(o);
    }

})();


