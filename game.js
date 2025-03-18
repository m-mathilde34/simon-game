let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let startGame = false;
let gameOver = false;
let level = 0;
let sequenceComplete = false;

function playSound(name){
    let audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass("pressed")
    setTimeout(function(){$('#' + currentColour).removeClass("pressed"), 1000})
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel == gamePattern.length-1){
            sequenceComplete = true;
        };
    } else {
        gameOver = true;
        console.log("Failure");
    };
}

function nextSequence(){
    // Display level as title
    // Then increase level by 1 
    $("h1").text("Level " + level);
    level += 1;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$("body").on("keypress", function(){
    // If this is the first key press,
    // Game is On, and level is displayed instead of title
    // Otherwise nothing changes
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

    if(sequenceComplete == true){
        setTimeout(nextSequence(), 1000);
        userClickedPattern = [];
        sequenceComplete = false;
    } else if(gameOver == true){
        alert("You lost!");
    }

});
