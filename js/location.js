var Location = function(opts){
  this.element  = null;

  var name      = opts.name;
  var scrambled = null;
  var dropSpeed = opts.dropSpeed;
  var position  = {
    x: opts.x,
    y: opts.y
  };

  /*
   *  Scramble name
   */
  var scrambleName = function (that){
    var characters = name.split('');
    var scrambled  = '';
    while(characters.length){
      scrambled += characters.splice(Math.floor(Math.random() * characters.length), 1)[0];
    }
    that.scrambled = scrambled;
  };

  /*
   *  Create div with the scrambled name
   */
  var create = function(that){
    that.element = $('<div class="location"></div>').text(that.scrambled);
    that.element.css('left', position.x + "px");
  };

  scrambleName(this);
  create(this);

  /*
   *  Move the location downwards
   */
  this.render = function(){
    position.y += dropSpeed;
    this.element.css('top', position.y + "px");
  };

  this.collision = function (gameHeight) {
    if (position.y >= gameHeight) {
      return true;
    }
  };
};
