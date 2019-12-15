var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Set initial colors
$(".square").each(function(idx, el) {
  $(el).css("background-color", buttonColors[idx]);
});

//Press key to start
$(document).on('keypress', function newGame() {
  console.log(started);
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".square ").click(function() {
  userClickedPattern.push($(this).attr('id'));
  playSound($(this).attr('id'));
  animate($(this).attr('id'));

  checkAnswer(userClickedPattern.length - 1);
  console.log("Game Pattern", gamePattern);
  console.log("User Pattern", userClickedPattern);
});


function nextRandom() {
  return Math.floor(Math.random() * 4);
}

function animate(name) {
  $("#" + name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name) {
  var x = new Audio(`sounds/${name}.mp3`);
  x.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

//Pseudo-random number generator 0-3
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level).css("color", "#ff7315");

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    // console.log("Game Pattern", gamePattern[currentLevel]);
    // console.log("User Pattern", userClickedPattern[currentLevel]);
    // console.log("Win!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }

  } else {
    playSound("wrong");
    animate("level-title");
    $("body").addClass("game-over");
    $("#level-title").css("color", "red");
    $("#level-title").text("Game Over! Press any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 500);
    startOver();
  }
}
