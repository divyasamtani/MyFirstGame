var Game = function(){
  var $gameboard = $('#gameboard');

  var score = 0;
  var timer = 0;
  var frame = 0;

  var locations = ["London", "Berlin", "Amsterdam"];
  var randomLocations = [],

  gameWidth = $(#gameboard).width(); // Width of gameboard
  gameHeight = $(#gameboard).height(); // Height of gameboard
  randomWidth= Math.round(Math.random()*size+20);


  var loop = function() {
    if (locations.length < 1) {

        function generateRandomLocation () {
        var random = locations[Math.floor(Math.random() * locations.length)];
        return(random);
      }

      locations.push(random);
      $gameboard.append(l.element);
    }

    for (var i = 0; i < locations.length; i++) {
      locations[i].render();
    }
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
