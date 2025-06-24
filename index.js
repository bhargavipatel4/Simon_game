let buttonColors = ["red", "blue", "green", "yellow"];
 let userClickedPattern = [];

var gamePattern =[];
var started = false;
var level= 0;

// function to generate next sequence and store it in gamePattern 
// it also updates level and show it to screen 
// plays sound and animate the button 
function nextSeq()
{
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);


    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);

    
}


// to detect button click and store the user click pattern
$(".btn").on("click", function()
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);

});
 // function to play sound
function playSound(name)
{
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
   
}

// to animate button after clicking 
function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  },100);
}
 // for detecting key press to strart the game
$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").text("Level" + level);
        nextSeq();
        userClickedPattern = [];
        started = true;
    }

});



function checkAnswer(currentLevel)
{   
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel])  // checks elemnet
  {
    
    if (userClickedPattern.length === gamePattern.length) // check if user has completed the sequence fully 
    {
        setTimeout(function()
    {
        nextSeq();
        
    }, 900);
    }
  }
  else
  {
    // for wrong answer 
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any key to Restart");
    startOver();

  }
}




// reset everthing to start over 
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
 
  