// variables
var numOfSquares = 6;
var colors = [];
var goalColor;
// query selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      // Ternary operator to check if button text equals easy and if so set
      // numOfSquares to 3 else set it to 6.
      // Variation of a simple if statement.
      this.textContent === "Easy" ? (numOfSquares = 3) : (numOfSquares = 6);
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add click listeners to squares.
    squares[i].addEventListener("click", function() {
      // Get color of clicked square.
      var clickedColor = this.style.backgroundColor;
      // Compare to goalColor.
      if (clickedColor === goalColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numOfSquares);
  goalColor = pickColor();
  colorDisplay.textContent = goalColor;
  resetButton.textContent = "New Colours";
  messageDisplay.textContent = "";
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

// Reset the colors array and display.
// Reset the goalColor as well.
resetButton.addEventListener("click", function() {
  reset();
});

function changeColors(color) {
  // loop through array of squares.
  for (i = 0; i < squares.length; i++) {
    // change color of each square to match the correct color.
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  // Pick a random number.
  // And remove decimal point.
  var randomNum = Math.floor(Math.random() * colors.length);
  // use this number to access random position in color array.
  return colors[randomNum];
}

function generateRandomColors(num) {
  // Make an array.
  var arr = [];
  // Add num of random colors to array.
  for (var i = 0; i < num; i++) {
    // Get random color and push into array.
    arr.push(randomColor());
  }
  // return that array.
  return arr;
}

function randomColor() {
  // Pick a "red" from 0 to 255
  var r = Math.floor(Math.random() * 256);
  // Pick a "green" from 0 to 255
  var g = Math.floor(Math.random() * 256);
  // Pick a "blue" from 0 to 255
  var b = Math.floor(Math.random() * 256);
  // Combine these into 1 string and return.
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
