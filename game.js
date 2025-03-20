const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let startGame = false;
let level = 0;


// Plays a sound from a given mp3 file.
function playSound(name){
    let audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}


// Animates a button when pressed by adding then removing the class 'pressed' to it.
function animatePress(currentColour){
    $('#' + currentColour).addClass("pressed");
    setTimeout(function(){$('#' + currentColour).removeClass("pressed")}, 100);
}


// Checks the latest user input against the expected answer from the sequence.
// If answers different, trigger the gameOver state.
// Otherwise, if all elements in the sequence are the same, sequenceComplete is set to true
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){nextSequence()}, 1000);
        };
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 200);
        $("h1").text("Game Over, Press Any Key To Restart!");

        startOver();
    };
}


// Resets all the parameters so that user may start the game again if they wish to.
function startOver(){
    level = 0;
    gamePattern = [];
    startGame = false;
}


// Reset the user's guesses to an empty array
// Increase level by 1
// Display level in title
// Randomly selects the next button in the sequence
// Display the latest chosen button to the user with corresponding sound
function nextSequence(){
    userClickedPattern = [];

    level += 1;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


// Listens for key presses
// If this is the first key press of a new game,
// Game is On, and level is displayed instead of title
// Otherwise nothing changes
$("body").on("keypress", function(){
    if(startGame == false){
        startGame = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
});


// Allows user to click on buttons
// Upon clicking on a button,
// Said button's colour is added to the user's answer array
// The button animates and makes a corresponding sound to confirm the action
// Finally, the selected button is checked against what is expected
// If the whole sequence is correct, go to next level
// Otherwise, game over!
$(".btn").on("click", function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});
