// Set requestAnimFrame
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
})();

var Game = function(){
  var $gameboard = $('#gameboard');

  var gameWidth  = $gameboard.width(); // Width of gameboard
  var gameHeight = $gameboard.height(); // Height of gameboard

  // Initialzed Settings that needs to be reset every game;
  var score             = 0;
  var currentTime       = new Date().getTime();
  var locations         = [];
  var locationDatabase  = locationDatabase();


  // Game Settings to affect gameplay
  var generatationDelay = 2000;
  var generationControl = true;
  var dropSpeed         = 1;
  var lifeLimit         = 3;
  var timerLimit        = 60;

  var pickRandomLocation = function () {
    var randomIndex = Math.floor(Math.random() * (locationDatabase.length-1));
    return locationDatabase[randomIndex];
  };

  var generateLocation = function () {
    var randomX = Math.round(Math.random()*gameWidth);
    var newLocation = new Location({name: pickRandomLocation(), dropSpeed: dropSpeed, x: randomX, y: 0});
    locations.push(newLocation);
    $gameboard.append(newLocation.element);
  };

  var loop = function() {
    var newTime = new Date().getTime();
    if (generationControl && currentTime + generatationDelay <= newTime) {
      generateLocation();
      currentTime = newTime;
    }

    var locationsToRemove = [];
    for (var i = 0; i < locations.length; i++) {
      locations[i].render(); // moves the blocks
      // collition detection
    }
  };

  var animloop = function () {
    loop();
    window.requestAnimFrame(animloop);
  };

  this.start = function () {
    animloop();
  };
}
