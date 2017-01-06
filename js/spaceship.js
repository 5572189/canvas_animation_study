function SpaceShip() {
    this.x = 0;
    this.y = 0;
    this.width = 25;
    this.height = 25;
    this.rotation = 0;
    this.showFlame = false;
}

SpaceShip.prototype.draw = function(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.strokeStyle = '#ffffff';
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(10, 0);
    ctx.closePath();
    ctx.stroke();
    if (this.showFlame === true) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#f69';
        ctx.moveTo(-7.5, -5);
        ctx.lineTo(-15, 0);
        ctx.lineTo(-7.5, 5);
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
};
