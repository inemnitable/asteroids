Function.prototype.inherits = function(superclass) {
	function Surrogate() {}
	Surrogate.prototype = superclass.prototype;
	this.prototype = new Surrogate();
};

var Asteroids = (function (Asteroids) {
	// function Asteroid(pos, vel, radius) {
	var Asteroid = Asteroids.Asteroid = function(pos, vel, radius) {
		Asteroids.MovingObject.call(this, pos);
		this.vel = vel;
		this.radius = radius;
	}
	Asteroid.inherits(Asteroids.MovingObject);


	Asteroid.randomAsteroid = function() {
		var canvas = document.getElementById('canvas');
		var radius = Math.floor(5 + Math.random()*10);
		var x = Math.floor(Math.random()*canvas.width);
		var y = Math.floor(Math.random()*canvas.height);
		var v_x = Math.floor((Math.random() - 0.5)*5);
		var v_y = Math.floor((Math.random() - 0.5)*5);
		return new Asteroid({x: x, y: y}, {x: v_x, y: v_y}, radius);
	}

	Asteroid.prototype.draw = function(canvas){
		var context = canvas.getContext('2d');
		context.beginPath();
		context.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
		context.fillStyle = "#FFFFFF";
		context.fill();
	}

	Asteroid.prototype.update = function(){
		Asteroids.MovingObject.prototype.update.call(this, this.vel);
		// this.pos.x += this.vel.x;
	// 	this.pos.y += this.vel.y;
	}



	return Asteroids;
})(Asteroids || {});