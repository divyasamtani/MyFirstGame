
// SET REQUEST ANIMATION
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
})();

// MAIN GAME OBJECT
var Game = function(){

  var $gameboard = $('#gameboard').css('background-image', 'url("images/city2.jpg")'); // Gameboard reference
  var gameWidth  = $gameboard.width(); // Width of gameboard
  var gameHeight = $gameboard.height(); // Height of gameboard
  var gameLoop   = null;

  // INITIALIZATED SETTINGS, NEEDS TO BE RESET EVERY GAME
  var score             = 0;
  var currentTime       = null; // Current time stamp for name generation control
  var timeStarted       = null; // Current time stamp for timer control
  var timeRemain        = null;
  var locations         = [];
  var locationDatabase  = []; // Set it to empty to begin with
  var textBox           = "";

  // STANDARD SETTINGS THAT AFFECT GAME PLAY
  var generationDelay   = 1000;
  var generationControl = true;
  var dropSpeed         = 0.1;
  var lifeLimit         = 3;
  var timerLimit        = 5000; // 60 seconds
  var locationYStart    = 0;

  var databases         =  ["locationDatabase","locationDatabase2","locationDatabase3"];
  var level             =  0;


// PICKS RANDOM LOCATION NAME FROM DATABASE *****************************


  // Level 1
  var pickRandomLocation = function () {
    if (locationDatabase.length === 0){
      locationDatabase  = window[databases[level]]; // Call global locationDatabase if local one is empty, which it is
    }
    var randomIndex = Math.floor(Math.random() * (locationDatabase.length-1)); // Generates a random index number to pick from the location database
    return locationDatabase.splice(randomIndex, 1)[0]; // Removes the picked element from the locationDatabase and returns the index - ensures there are no duplicates
  };

// CREATES NEW LOCATION ELEMENT WITH RANDOM, SCRAMBLED NAME ***************

  // Level 1
  var generateLocation = function () {
    var newLocation = new Location({name: pickRandomLocation(), dropSpeed: dropSpeed, y: locationYStart, gameboard: $gameboard});
    // Creates a new Location element using the randomly generated location
    locations.push(newLocation); // Pushes the new Location OBJECT to an empty array
  };


// STANDARD GAME FUNCTIONS **************************************************

 // STOP GAME - STOPS THE ANIMATION FRAME
  var stopGame = function () { // Passes one of two messages through
    window.cancelAnimationFrame(gameLoop);
    gameLoop = null;

    for (var i = 0; i < locations.length; i++) { // Remove locations before displaying "play again" message
      locations[i].element.remove();
    }
  };

  this.nextLevel = function() {

    timeStarted       = new Date().getTime();
    currentTime       = new Date().getTime();
    timeRemain        = timerLimit;
    score             = 0;
    locations         = [];
    locationDatabase  = [];
    textBox           = "";
    $(".location").remove();
    $("#secondlevel").remove();
    animloop();

    console.log("Change backgound to level: " + level);

    if(level == 1){
      $('#gameboard').css('background-image', 'url("images/beach6.jpg")');
    }

    if(level == 2){
      $('#gameboard').css('background-image', 'url("images/underwater1.jpeg")');
    }
  }


  // CHECK WIN or LOSE
  var checkWinLose = function (newTime) {
    if (lifeLimit === 0) {  // Player loses if collision occurs three times, game stops
      stopGame();
      level = 0;
      $('#gameboard').append($('<button id="playagain"></button>').text('Game over! Do you want to play again?'));
    } else if (lifeLimit > 0 && timeRemain <= 0 ) { // Else if lives > 0 when timer = 0, player wins
      stopGame();

      level++;

      console.log("Display button for level: " + level);

      if(level == 1){
        $('#gameboard').append($('<button id="secondlevel"></button>').text('Well done! On to the next round.'));
      }

      if(level == 2){
        $('#gameboard').append($('<button id="secondlevel"></button>').text('Well done! On to the next round.'));
      }

      if(level == 3){
        level = 0;
        $('#gameboard').append($('<button id="playagain"></button>').text('Congrats you win!!'));
      }
    }
  };


  // TIMER COUNT DOWN
  var countDownTime = function () {
    var timeNow  = new Date().getTime();
    var timePast = timeNow - timeStarted;
    timeRemain   = timerLimit - timePast;
    timeRemain   = Math.round(timeRemain / 1000);
    $('#timer').text("Time" + " " + "=" + " " + timeRemain + " " +"seconds"); // Displays time remaining on the timer
  };

  // MATCH KEY INPUT WITH LOCATION ON SCREEN
  var keyInput = function () {
    $('#inputForm').off().keydown(function(event){
      if(event.keyCode == 13) {
        textBox = $(event.target).val(); // On pressing enter on the textBox, return value of text box
      }
    });
  };

  // MAIN GAME LOOP OBJECT
  var loop = function() {
    var newTime = new Date().getTime(); // Sets the delay between location objects being generated on screen
    if (generationControl && currentTime + generationDelay <= newTime) { // Allows for control over the generation delay
      generateLocation(); // Generates the location object
      currentTime = newTime;
    }

    // ANIMATES OBJECT, CHECKS FOR COLLISION & REDUCES 1 LIFE
    var locationsToRemove = [];
    for (var i = 0; i < locations.length; i++) {
      locations[i].render(); // Renders and moves the blocks downwards

      if (locations[i].matchWord(textBox)){ //Checks for match with text box and location in the current array
        locationsToRemove.push(i); // Removes location once matched
        $("#inputForm").val(""); // Clears input field

      } else if (locations[i].collision(gameHeight)) { // Detects collision
        locationsToRemove.push(i); // Pushes collided name to 'remove' array
        lifeLimit --; // Reduce one life from total count

      }
    }

    // REMOVES LOCATIONS THAT HAVE COLLIDED WITH THE GROUND
    for (var i = 0; i < locationsToRemove.length; i++) {
      var index = locationsToRemove[i]; // Index of object that has been removed
      locations[index].element.remove(); // Physically remove that object off the gameboard
      locations.splice(index, 1); // Splice or remove that element from the locations array
    }
    countDownTime();
    checkWinLose(newTime);
  }; //END OF GAME LOOP


  // ANIMATION LOOP FUNCTION
  var animloop = function () {
    gameLoop = window.requestAnimFrame(animloop);
    loop();
  };


  // START GAME FUNCTION
  this.start = function () {
    timeStarted         = new Date().getTime(); // Starts time
    currentTime         = new Date().getTime();
    timeRemain          = timerLimit; // Time remaining = 60 seconds
    generateLocation();   // Blocks start generating
    animloop();           // Starts game / animation loop / generation of names
    keyInput ();
    $("#menu").hide();
    $("#gameboard").show();
    $("#timer").show();
    $("#label").show();
    $("#inputForm").show();
    $('#lifeCounter').text("Life" + " " + "=" + " " + lifeLimit + " " + "left"); // Displays lives remaining


  };

  // PLAY AGAIN
  this.startGameAgain = function () {
    timeStarted       = new Date().getTime();
    currentTime       = new Date().getTime();
    timeRemain        = timerLimit;
    score             = 0;
    lifeLimit         = 3;
    locations         = [];
    locationDatabase  = [];
    textBox           = "";
    $(".location").remove();
    $("#playagain").remove();
    generateLocation();
    animloop();
    $('#gameboard').css('background-image', 'url("images/city2.jpg")');
  };

};
