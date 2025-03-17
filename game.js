//alert("Working!");

let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour = buttonColours[nextSequence()];
let gamePattern = [];

gamePattern.push(randomChosenColour);

function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);

    return randomNumber;
}