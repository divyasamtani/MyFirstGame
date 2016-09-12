var Location = function(name){

  var name = name;
  var position = {
    x:50,
    y:0
  };

  var dropSpeed = 0.5;
  var element = null;


  /*
   *  Scramble name
   */
  function scrambleName (Location.name){
    var word= name.value.split('');
    var scram= '';
    while(word.length){
        scram+= word.splice(Math.floor(Math.random()*word.length), 1)[0];
    }
    return scram;
  }

  scrambleName({value:'xxx'});

  /*
   *  Create div with the scrambled name
   */
  var create = function(){
    element = $('<div class="location"></div>').text(scrambleName());
    $('#gameboard').append(element);
    $(element).css('left', position.x + "px");
  }

  /*
   *  Move the location downwards
   */
  this.render = function(){
    position.y += dropSpeed;
    $(element).css('top', position.y + "px");

  }

  create();
}
