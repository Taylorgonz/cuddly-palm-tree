let wordBlank = document.querySelector(".word-blanks");
let win= document.querySelector(".win");
let lose = document.querySelector(".lose");
let timerElement = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// arrays to creat blanks and letters on screen
let lettersInChosenWord = [];
let blanksLetters = [];

// array of words the user will guess
let words = [
  "hello",
  "goodbye",
  "javascript",
  "potato",
  "coffee",
  "design"
]

// the init function is called when the page loads
function init () {
  getWins();
  getLosses();
}

// Start game button function
  function startGame () {
    isWin = false;
    timerCount= 10;
    // prevent start button from being clicked while game is in session
    startButton.disabled= true;
    renderBlanks();
    startTimer();
  }

// win game function is called when the win condition is met
  function winGame() {
    wordBlank.textContent="YOU WON!!";
    winCounter++
    startButton.disabled = false;
    setWins()
  }

  // the lose function is callled when the timer reaches 0
  function loseGame() {
    wordBlank.textContent = "Game Over";
    loseCounter++
    startButton.disabled = false;
    setLosses()
  }

  // the setTimer function starts and stops the timer and triggerswinGame() and loseGame()
function startTimer() {
  // sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timer >= 0) {

      if(isWin && timerCount > 0) {
        clearInterval(timer);
        winGame();
      }
    }

    if (timerCount === 0){
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Creates blanks on screen
function  renderBlanks() {
  // randomly pick word from words array
  chosenWord = words[Math.floor(Math.random() * words.length)];
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  blanksLetters = [];
  // uses loop to push blanks to blankLetters array
  for (var i = 0; i< numBlanks; i++) {
    blanksLetters.push("_");
  }
wordBlank.textContent= blanksLetters.join(" ");
}

// update win count on screen and sets win to the client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

function getWins() {
  let storedWins = localStorage.getItem("winCount");
  
  if (storedWins=== null) {
    winCounter = 0 ;
  } else {
  winCounter = storedWins;
}
win.textContent= winCounter;
}

function getLosses() {
  let storedLosses = localStorage.getItem("loseCount");
  if(storedLosses=== null) {
    loseCounter= 0;
  } else {
    loseCounter= storedLosses;
  }
  lose.textcontent= loseCounter;
}

function checkWin() {
  if (chosenWord=== blanksLetters.join("")) {
    isWin = true;
  }
}
// test if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
  var letterInWord = false;
  for(var i = 0; i<numBlanks; i ++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if(letterInWord) {
    for( var j = 0; j<numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}
// attach event listener to document to listen for key event
document.addEventListener("keydown",function(event) {
  if (timerCount === 0)  {
    return;
  }
  let key = event.key.toLowerCase();
  let alphabetNumericCharacters= 
  "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// attach event listener to start button to cal startGame function on click
 startButton.addEventListener("click", startGame);

//  Calls init() so that it fires when page opened
init();

let resetButton = document.querySelector(".reset-button");

function resetGame() {
  winCounter = 0;
  loseCounter = 0;

  setWins()
  setLosses()
}
resetButton.addEventListener("click", resetGame);

