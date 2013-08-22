var Asteroids = (function(Asteroids) {

	var Bullet = Asteroids.Bullet = function(pos, direction) {
		Asteroids.MovingObject.call(this, pos);
		this.bulletSpeed = 10;
		this.vel = {x: direction.x * this.bulletSpeed,
								y: direction.y * this.bulletSpeed};
		this.radius = 2;
	};

	Bullet.inherits(Asteroids.MovingObject);

	Bullet.prototype.draw = function(canvas) {
		var context = canvas.getContext('2d');
		context.beginPath();
		context.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
		context.fillStyle = "#00FF00";
		context.fill();
	};

	Bullet.prototype.update = function() {
		Asteroids.MovingObject.prototype.update.call(this, this.vel);
	};

	return Asteroids;

})(Asteroids || {});