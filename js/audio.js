
// Background Music for each level

var levelOne = new Audio();
levelOne.src = "audio/levelone.mp3"

playlevelOne = function(){
  levelOne.play();
  levelOne.loop = true;
};


var levelTwo = new Audio();
levelTwo.src = "audio/beachmusic.mp3"

playlevelTwo = function(){
  levelTwo.play();
};



var levelThree = new Audio();
levelThree.src = "audio/underwatersong.mp3"

playlevelThree = function(){
  levelThree.play();
};


// Game over and life lost sounds

var lifeLost = new Audio();
  lifeLost.src = "audio/lifelost.mp3"

playlifeLost = function(){
  lifeLost.play();
};


var gameOver = new Audio();
  gameOver.src = "audio/game-over.wav"

playgameOver = function(){
  gameOver.play();
};


// Game won, next level and match word sounds

var matchWord = new Audio();
  matchWord.src = "audio/wordmatch"

playmatchWord = function(){
  matchWord.play();
};


var nextLevel = new Audio();
  nextLevel.src = "audio/nextlevel.wav"

playnextLevel = function(){
  nextLevel.play();
};

var gameWon = new Audio();
  gameWon.src = "audio/gamewon.wav"

playgameWon = function(){
  gameWon.play();
};
