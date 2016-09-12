var Game = function(){

  var score = 0;
  var timer = 0;
  var frame = 0;

  var locations = ["London", "Berlin", "Amsterdam"];
  var l = new Location("");

  var loop = function() {
    l.render();
  }

  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
  })();


  (function animloop(){
    loop();
    requestAnimFrame(animloop);
  })();
}

var game = new Game();
