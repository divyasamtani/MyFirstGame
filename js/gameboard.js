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
  var $gameboard = $('#gameboard'); // gameboard reference
  var gameWidth  = $gameboard.width(); // Width of gameboard
  var gameHeight = $gameboard.height(); // Height of gameboard

  // Initialzed Settings that needs to be reset every game;
  var score             = 0;
  var currentTime       = new Date().getTime();
  var locations         = [];
  var locationDatabase  = window.locationDatabase();


  // Game Settings to affect gameplay
  var generatationDelay = 5000;
  var generationControl = true;
  var dropSpeed         = 0.2;
  var lifeLimit         = 3;
  var timerLimit        = 60000;

  //Picks random name from location database
  var pickRandomLocation = function () {
    var randomIndex = Math.floor(Math.random() * (locationDatabase.length-1)); //Generates a random index number to pick from the location database
    return locationDatabase[randomIndex];
  };

  //Places the random name on a random location within the board
  var generateLocation = function () {
    var randomX = Math.round(Math.random()*gameWidth);
    var newLocation = new Location({name: pickRandomLocation(), dropSpeed: dropSpeed, x: randomX, y: 0});
    //creates a new Location element using the randomly generated word and location
    locations.push(newLocation); //pushes the new Location element to an empty array
    $gameboard.append(newLocation.element); //appends the new Location element to the gameboard
  };

  //This is the Game Loop
  var loop = function() {
    var newTime = new Date().getTime(); //Sets the delay between names generated
    if (generationControl && currentTime + generatationDelay <= newTime) { //Allows for control over the generation delay
      generateLocation(); //generates the random location
      currentTime = newTime;
    }

    var locationsToRemove = [];
    for (var i = 0; i < locations.length; i++) {
      locations[i].render(); // moves the blocks downwards
      if (locations[i].collision(gameHeight)) { // collision detection
        locationsToRemove.push(i); //pushes fallen location to 'remove' array
        lifeLimit --; //reduce one life from total count
      }
    }

    for (var i = 0; i < locationsToRemove.length; i++) {
      var index = locationsToRemove[i]; //for length of remove array, remove each element
      locations[i].element.remove();
      locations.splice(index, 1); //??? Splice locations
    }
  };

  var animloop = function () {
    loop();
    window.requestAnimFrame(animloop);
  };

  this.start = function () {
    generateLocation();
    animloop();
  };
};
