var poem = "Some say the world will end in 🔥, Some say in ice. From what I’ve tasted of desire, I hold with those who favor fire. But if it had to perish twice, I think I know enough of hate. To say that for destruction ice, Is also great, And would suffice.";
var words = poem.split(" ");

var mainEl = document.getElementById("main");
var timerEl = document.getElementById("countdown");
var bodyEl = document.createElement("div");


var millisecondsPerWord = prompt("How many milliseconds between words would you like?");

function countdown() {
  var timeLeft = 5;

  var timeInterval = setInterval(function() {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + " seconds remaining.";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + "second remaining";
      timeLeft--;
    } else {
      timerEl.textContent = '';

      clearInterval(timeInterval);

      displayMessage();
    }
  }, 1000);
}

function speedRead() {
  //Add Your Code Here
  let i=0;
  mainEl.appendChild(timerEl);
  
  var poemInterval = setInterval(function() {
    if (words[i] ===undefined) {
      clearInterval(poemInterval);
    } else {
      mainEl.textContent = words[i];
      i++;
    }
  }, millisecondsPerWord);
};

speedRead();
