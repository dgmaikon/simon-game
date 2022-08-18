
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePatter = [];
var userClickerPattern = [];

var gameStart = false;
var level = 0;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

$(document).keydown(function() {
    nextSequence();
    gameStart = true;
})

function nextSequence() {
    
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber];
    
    userClickerPattern = [];
    $('#level-title').text("level " + level);
    level++;
    
    gamePatter.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    }

function checkAnswer(currentLevel) {

    if(gamePatter[currentLevel] === userClickerPattern[currentLevel]) {
        if(gamePatter.length === userClickerPattern.length) {
            setTimeout(function() {
            nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong");

        wrong();

        startOver();
    }
}

    
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickerPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickerPattern.length - 1);
})

function startOver() {
    gamePatter = [];
    userClickerPattern = [];
    level = 0;
    $('#level-title').text("Game over, Press Any Key to Restart");
}

function wrong() {
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    },200)
}
   

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    },100)
}
        




   