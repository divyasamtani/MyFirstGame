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
  var scrambleName = function (that){
    var characters = name.split('');
    var scrambled  = '';
    while(characters.length){
      scrambled += characters.splice(Math.floor(Math.random() * characters.length), 1)[0];
    }
    that.scrambled = scrambled;
    // that.scrambled = name
  };

  // CREATES WORD DIV AND USES SCRAMBLE FUNCTION
  var create = function(that){
    that.element     = $('<div class="location"></div>').text(that.scrambled);
    $gameboard.append(that.element);
    width            = that.element.width();
    position.x       = Math.round(Math.random() * ($gameboard.width() - width));
    that.element.css('left', position.x + "px");
  };

  scrambleName(this);
  create(this);

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
