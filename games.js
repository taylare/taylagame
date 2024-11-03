// Array containing the color options for the game buttons.
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game-generated sequence of colors.
var gamePattern = [];

// Array to store the user's clicked color sequence.
var userClickedPattern = [];

// Variable to track whether the game has started.
var started = false;

// Variable to track the current level.
var level = 0;

// 1. Detect a click or touchstart event to start the game.
$(document).on("click touchstart", function() {
  if (!started) {
    // Update the h1 title to indicate the current level (starts at "Level 0").
    $("#level-title").text("Level " + level);
    nextSequence();  // Call nextSequence to begin the game pattern.
    started = true;  // Set started to true, so the game only starts once on click or touchstart.
  }
});

// Detect button clicks or touchstart by the user.
// This function captures the ID of the clicked button and adds it to the user pattern array.
$(".btn").on("click touchstart", function() {
  var userChosenColour = $(this).attr("id");  // Get the ID of the clicked button.
  userClickedPattern.push(userChosenColour);  // Add the color to the user's pattern.

  playSound(userChosenColour);  // Play sound for the clicked color.
  animatePress(userChosenColour);  // Animate the button press.

  checkAnswer(userClickedPattern.length - 1);  // Check the user's answer against the game pattern.
});

// Function to generate the next color in the sequence.
function nextSequence() {
  userClickedPattern = [];  // Reset the user pattern at the beginning of each level.
  level++;  // Increase the level by 1.
  $("#level-title").text("Level " + level);  // Update the level title.

  var randomNumber = Math.floor(Math.random() * 4);  // Generate a random number between 0 and 3.
  var randomChosenColour = buttonColours[randomNumber];  // Select a color based on the random number.
  gamePattern.push(randomChosenColour);  // Add the chosen color to the game pattern.

  // Add visual effect by fading the selected button.
  $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);  // Play the sound for the chosen color.
}

// Function to play sound based on the color passed to it.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");  // Load the sound file for the specified color.
  audio.play();  // Play the sound.
}

// Function to animate button press by adding a CSS class temporarily.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");  // Add the "pressed" class for the animation effect.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");  // Remove the "pressed" class after 100 milliseconds.
  }, 100);
}

// Function to check the user's answer against the game pattern.
function checkAnswer(clickedPattern) {
  // Check if the latest user click matches the corresponding game pattern color.
  if (gamePattern[clickedPattern] === userClickedPattern[clickedPattern]) {
    console.log("success");  // Log "success" if the user answer matches the game pattern.

    // Check if the user has completed the current level sequence.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();  // Call nextSequence after a 1-second delay if the user was correct.
      }, 1000);
    }
  } else {
    console.log("wrong");  // Log "wrong" if the user's answer does not match the game pattern.

    playSound("Wrong");  // Play the "wrong" sound.

    // Add a red background (game-over effect) to the body and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();  // Restart the game by calling startOver.
  }
}

// Function to reset game variables, allowing the game to restart.
function startOver() {
  level = 0;  // Reset the level to 0.
  gamePattern = [];  // Clear the game pattern.
  userClickedPattern = [];  // Clear the user pattern.
  started = false;  // Reset started to allow the game to start again.

  $("#level-title").text("Game over, tap anywhere to restart");
}
