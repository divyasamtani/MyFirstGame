$(document).ready(function(){

  var game = new Game();
  // game.start();
  $("#gameboard").hide();
  $("#timer").hide();
  $("#label").hide();
  $("#inputForm").hide();

  $("button#startgame").on("click", game.start);


});

