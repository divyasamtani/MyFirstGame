// LOCATION OBJECT

var Location = function(opts){
  this.element   = null;

  var $gameboard = opts.gameboard; // gameboard reference
  var name       = opts.name;
  var width      = null;
  var scrambled  = null;
  var dropSpeed  = opts.dropSpeed;
  var position   = {
    x: null,
    y: opts.y
  };

  // SCRAMBLES THE NAME
  var scrambleName = function (that){ //Use 'that' because 'this' within this function does not mean 'this', but 'that' = 'this'
    var characters = name.split(''); //Split string into an array
    var scrambled  = ''; //create empty string
    while(characters.length){
      scrambled += characters.splice(Math.floor(Math.random() * characters.length), 1)[0]; //pick random elements from the array and splice them back into a string
    }
    that.scrambled = scrambled;
    // that.scrambled = name
  };

  // CREATES WORD DIV AND USES SCRAMBLE FUNCTION
  var create = function(that){
    that.element     = $('<div class="location"></div>').text(that.scrambled); //creates div element using scrambled name
    $gameboard.append(that.element); //append location element to gameboard
    width            = that.element.width(); //sets location width
    position.x       = Math.round(Math.random() * ($gameboard.width() - width)); //randomize position of location elementwithin gameboard
    that.element.css('left', position.x + "px"); //set the position of location element
  };

  scrambleName(this); //run the scramble function
  create(this); //run the create function

  this.getName = function () {
    return name;
  }

  // MATCHES LOCATION NAME TO INPUT TEXT
  this.matchWord = function(textBox){
    return textBox.toUpperCase() === name;
  };

  // RENDERS BLOCK AND MOVES IT DOWNWARDS
  this.render = function(){
    position.y += dropSpeed;
    this.element.css('top', position.y + "px");
  };


  // CREATES COLLISION and LOSING FUNCTION
  this.collision = function (gameHeight) {
    if (position.y >= gameHeight) { //Collision detection
      return true;
    }
  };
};
