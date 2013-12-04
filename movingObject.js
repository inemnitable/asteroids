var Asteroids = (function(Asteroids) {
  // function MovingObject(pos) {
  var MovingObject = Asteroids.MovingObject = function(pos) {
    //pos = {x: x_coord, y: y_coord}
    this.pos = {};
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    var canvas = document.getElementById('canvas');
    this.w = canvas.width;
    this.h = canvas.height;
  }

  MovingObject.prototype.update = function(velocity) {
    this.pos.x += velocity.x;
    this.pos.y += velocity.y;
  }

  MovingObject.prototype.offscreen = function() {
    return this.pos.x < 0 ||
           this.pos.x > this.w ||
           this.pos.y < 0 ||
           this.pos.y > this.h;
  }

  MovingObject.prototype.fixOffscreen = function() {
    if (this.pos.x < 0) { this.pos.x += this.w; }
    if (this.pos.x > this.w) { this.pos.x -= this.w; }
    if (this.pos.y < 0) { this.pos.y += this.h; }
    if (this.pos.y > this.h) { this.pos.y -= this.h; }
  }

  MovingObject.prototype.isHit = function(asteroids) {
    var that = this;
    for (var i=0; i<asteroids.length; i++){
      var sumRadii = that.radius + asteroids[i].radius;
      var xDisp = that.pos.x - asteroids[i].pos.x;
      var yDisp = that.pos.y - asteroids[i].pos.y;
      var dist = Math.sqrt(Math.pow(xDisp, 2) + Math.pow(yDisp, 2));
      if(dist <= sumRadii){
        return i;
      }
    }
    return false;
  }

  return Asteroids;
})(Asteroids || {});