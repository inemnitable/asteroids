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

  Game.prototype.gameOver = function() {
    var messages = document.getElementById("messages");
    messages.innerHTML = "Game Over. Your score: " + this.score + 
      "<br>Hit enter to play again!";
    clearInterval(this.intervalId);
    clearInterval(this.asteroidIntervalId);
    key.unbind('up, down, left, right, z, space');
    console.log("unbinding code ran");
    callcanvas();
  }

  Game.prototype.update = function() {
    // var that = this
    // for (var i=0; i<this.asteroids.length; i++){
    //  this.asteroids[i].update();
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
      this.gameOver();
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
    function pause() {
      var messages = document.getElementById('messages');
      if(that.intervalId) {
        messages.innerHTML = 'Paused';
        console.log("pausing");
        clearInterval(that.intervalId);
        clearInterval(that.asteroidIntervalId);
        that.intervalId = null;
        that.asteroidIntervalId = null;
      }
      else {
        messages.innerHTML = '';
        console.log("unpausing");
        that.intervalId = setInterval(function() {
          that.update();
          that.draw();
        }, 33);
        that.asteroidIntervalId = setInterval(function() {
          that.asteroids.push(Asteroids.Asteroid.randomAsteroid());
        }, 5000)    
      }
    }
    key('space', pause);
    pause();
  }
  return Asteroids;

})(Asteroids || {});

function callcanvas() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  key('enter', function() {
    key.unbind('enter');
    g = new Asteroids.Game(canvas);
    g.start();

  });
  
}