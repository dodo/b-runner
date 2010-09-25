

var Sprite = function(src, width, animations) {
	var that = this;
	this.constructor.prototype.imagesToLoad++;
	var img = new Image();
	img.src = src;
	img.onload = function() {
		that.canvas = document.createElement("canvas");
		that.ctx = that.canvas.getContext("2d");
		that.canvas.width = img.width;
		that.canvas.height = img.height * 2;	// twice the height for flipped sprites

		that.frameHeight = img.height;
		that.frameWidth = width || img.height;

		that.frameCount = Math.floor(img.width / that.frameWidth);

		// copy frames to canvas
		that.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
		// copy flipped frames to canvas
		for(var i = 0; i < that.frameCount; ++i) {
			for(var x = 0; x < that.frameWidth; ++x) {
				that.ctx.drawImage(img, i * that.frameWidth + x, 0, 1, img.height,
										i * that.frameWidth + that.frameWidth - 1 - x, img.height, 1, img.height);
			}
		}
		that.constructor.prototype.imagesToLoad--;
	}

	this.curFrame = 0;
	this.curAnim = null;

	this.setAnim = function(a) {
		if(this.curAnim == this.anims[a]) return;
		this.curAnim = this.anims[a];
		this.curFrame = 0;
	};
	this.nextFrame = function() {
		this.curFrame = (this.curFrame + 1) % this.curAnim.length;
	}


	this.anims = {
		"idle" : [ 0 ],
		"crouch" : [ 1 ],
		"jump" : [ 2 ],
		"run" : [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
	};
	this.setAnim("idle");

};

Sprite.prototype.imagesToLoad = 0;

Sprite.prototype.draw = function(flipped) {
	var x = this.curAnim[this.curFrame] * this.frameWidth;
	var y = flipped ? this.frameHeight : 0;
	ctx.drawImage(this.canvas, x, y, this.frameWidth, this.frameHeight, -this.frameWidth/2, -this.frameHeight/2, this.frameWidth, this.frameHeight);
};




