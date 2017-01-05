function Arrow() {
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.color = '#ffff00';
}

Arrow.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.lineWidth = 5;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(-50, -25);
    ctx.lineTo(0, -25);
    ctx.lineTo(0, -50);
    ctx.lineTo(50, 0);
    ctx.lineTo(0, 50);
    ctx.lineTo(0, 25);
    ctx.lineTo(-50, 25);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
};
