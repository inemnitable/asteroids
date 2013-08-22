var Asteroids = (function (Asteroids) {

	// function Game(context) {
	var Game = Asteroids.Game = function(canvas) {
		this.canvas = canvas;
		this.w = canvas.width;
		this.h = canvas.height;
		this.asteroids = [];
		for (var i = 0; i<10; i++){
			this.asteroids.push(Asteroids.Asteroid.randomAsteroid());
		}
		this.ship = new Asteroids.Ship({x: this.w/2, y: this.h/2}, this);
		this.bullets = [];
		this.score = 0;
	}

	Game.prototype.draw = function() {
		var that = this;
		var ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.w, this.h);
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, this.w, this.h);
		this.asteroids.forEach(function(asteroid) {
			asteroid.draw(that.canvas);
		});
		this.ship.draw(that.canvas);
		this.bullets.forEach(function(bullet) {
			bullet.draw(that.canvas);
		})
	}

	Game.prototype.update = function() {
		// var that = this
		// for (var i=0; i<this.asteroids.length; i++){
		// 	this.asteroids[i].update();
		// }
		var that = this;
		this.asteroids.forEach(function(asteroid) {
			asteroid.update();
		});
		this.ship.update();
		this.bullets.forEach(function(bullet, idx) {
			bullet.update();
			// console.log(that.asteroids);
			var collision = bullet.isHit(that.asteroids);
			if (typeof collision === "number") {
				that.asteroids.splice(collision, 1);
				that.bullets.splice(idx, 1);
				that.score += 1;
			}
		})
		if (typeof this.ship.isHit(this.asteroids) === "number") {
 			alert("Game Over. Your score: " + this.score);
 			clearInterval(this.intervalID);
 		}
		for (var i=0; i < this.asteroids.length; i++){
				this.asteroids[i].fixOffscreen()
		}
		this.ship.fixOffscreen();
		for (var i=0; i < this.bullets.length; i++){
			if (this.bullets[i].offscreen()) {
				this.bullets.splice(i, 1);
				i -= 1;
			}
		}
	}

	Game.prototype.start = function() {
		var that = this;
		this.intervalID = setInterval(function() {
			that.update();
			that.draw();

		}, 33)
		this.asteroidIntervalId = setInterval(function() {
			that.asteroids.push(Asteroids.Asteroid.randomAsteroid());
		}, 5000)
	}
	return Asteroids;

})(Asteroids || {});

function callcanvas() {
	var canvas = document.getElementById('canvas');
	console.log(document.getElementById('canvas'));
	// canvas.backgroundColor = 'black';

	// console.log(Asteroids);
	g = new Asteroids.Game(canvas);
	g.start();
}