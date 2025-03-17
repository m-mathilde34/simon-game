//alert("Working!");

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameOn = false;
let level = 0;

function playSound(name){
    let audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass("pressed")
    setTimeout(function(){$('#' + currentColour).removeClass("pressed"), 1000})
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

$(".btn").on("click", function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

$("body").on("keypress", function(){
    // If this is the first key press,
    // Game is On, and level is displayed instead of title
    // Otherwise nothing changes
    if(gameOn == false){
        gameOn = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
});