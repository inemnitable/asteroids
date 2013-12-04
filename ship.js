var Asteroids = (function (Asteroids) {

  var Ship = Asteroids.Ship = function(pos, game) {
    Asteroids.MovingObject.call(this, pos);
    this.game = game;
    this.radius = 5;
    this.vel = {x:0, y:0};
    var that = this;
    key('left', function() { that.power(-1, 0); });
    key('right', function() { that.power(1, 0); });
    key('up', function() {that.power(0, -1); });
    key('down', function() {that.power(0, 1); });
    key('z', function() {that.fireBullet(); });
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.draw = function(canvas) {
    var context = canvas.getContext('2d');
    context.beginPath();
    context.save()
    context.translate(this.pos.x, this.pos.y)
    var dir = this.direction();
    var rad = Math.atan(dir.y / dir.x)
    if (dir.x < 0) rad += Math.PI;
    context.rotate(rad);
    context.moveTo(7, 0);
    context.lineTo(-7, 10/Math.sqrt(3));
    context.lineTo(-7, -10/Math.sqrt(3));
    context.closePath();
    // context.clip();
    context.restore();
    // context.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
    context.fillStyle = "red";
    context.fill();
  };

  Ship.prototype.update = function() {
    Asteroids.MovingObject.prototype.update.call(this, this.vel);
  };

  Ship.prototype.power = function(dx, dy) {
    if (Math.abs(this.vel.x + dx) <= 5) { this.vel.x += dx; }
    if (Math.abs(this.vel.y + dy) <= 5) { this.vel.y += dy; }
  };

  Ship.prototype.direction = function() {
    if (this.vel.x === 0 && this.vel.y === 0){
      return {x: 0, y: -1};
    }
    var speed = (Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2)));
    return {x: this.vel.x / speed, y: this.vel.y / speed};
  };

  Ship.prototype.fireBullet = function() {
    this.game.bullets.push( new Asteroids.Bullet(this.pos, this.direction()));
  };

  return Asteroids;
})(Asteroids || {});