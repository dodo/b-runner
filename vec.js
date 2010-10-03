(function() {

    this.vec = function(x, y) {
        return new V(x, y);
    }

    var V = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    V.prototype.zero = function() {
        this.x = 0;
        this.y = 0;
        return this;
    };

    V.prototype.set = function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    };

    V.prototype.copy = function(o) {
        this.x = o.x;
        this.y = o.y;
        return this;
    };

    V.prototype.dup = function() {
        return new V(this.x, this.y);
    };

    V.prototype.equ = function(o) {
        return this.x == o.x && this.y == o.y;
    };

    V.prototype.neg = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };

    V.prototype.add = function (o) {
        this.x += o.x;
        this.y += o.y;
        return this;
    };

    V.prototype.sub = function (o) {
        this.x -= o.x;
        this.y -= o.y;
        return this;
    };

    V.prototype.mul = function (f) {
        this.x *= f;
        this.y *= f;
        return this;
    };

    V.prototype.dot = function (o) {
        return this.x * o.x + this.y * o.y;
    };

    V.prototype.lenSq = function () {
        return this.x * this.x + this.y * this.y;
    };

    V.prototype.len = function () {
        return Math.sqrt(this.lenSq());
    };

    V.prototype.perp = function () {
        var dummy = this.x;
        this.x = this.y;
        this.y = - dummy;
        return this;
    };

    V.prototype.cross = function (o) {
        return this.y * o.x + (-this.x) * o.y;
    };

    V.prototype.norm = function () {
        var l = 1 / this.len();
        this.x *= l;
        this.y *= l;
        return this;
    };

    V.prototype.toList = function () {
        return [this.x, this.y];
    };

    V.prototype.toString = function () {
        return "vec(" + this.toList().join(", ") + ")";
    };

})();

