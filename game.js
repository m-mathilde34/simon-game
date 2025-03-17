//alert("Working!");

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function playSound(name){
    let audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass("pressed")
    setTimeout(function(){$('#' + currentColour).removeClass("pressed"), 1000})
}

function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

nextSequence();

$(".btn").on("click", function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});