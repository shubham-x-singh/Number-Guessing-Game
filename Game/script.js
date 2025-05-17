// ✅ Your allowed numbers
const possibleNumbers = [51, 25, 61, 55, 99];

let attempts = 0;
let timeLeft = 120;
let timerInterval;

// Pick a number randomly from your list (OR you can allow all of them to be correct)
let randomNumber = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const timeoutSound = document.getElementById("timeoutSound");

startTimer();


// ✅ Enter key se bhi checkGuess() chale
document.getElementById("guessInput").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});


function checkGuess() {
  const guessInput = document.getElementById("guessInput") 
  const guess = parseInt(guessInput.value);
  const message = document.getElementById("message");
  const tries = document.getElementById("tries");
  

  if (timeLeft <= 0) return;

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "⚠️ Enter a number between 1 and 100.";
    message.style.color = "orange";
    return;
  }

  attempts++;
  tries.textContent = "Attempts: " + attempts;

  // ✅ This line makes any number from your list a correct answer
  if (possibleNumbers.includes(guess)) {
    message.textContent = "🎉 Congratulations! You guessed it!";
    message.style.color = "#0f0";
    correctSound.play();
    message.classList.add("bounce");
    document.getElementById("playAgainBtn").style.display = "inline-block";
    clearInterval(timerInterval);
  } else {
    message.textContent = guess < randomNumber ? "📉 Too low!" : "📈 Too high!";
    message.style.color = "red";
    wrongSound.play();
    guessInput.classList.add("shake");
    setTimeout(() => guessInput.classList.remove("shake"), 400);
  }
}

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱ Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("message").textContent = "⏳ Time's up! You lost!";
      document.getElementById("message").style.color = "#f00";
      timeoutSound.play();
      document.getElementById("playAgainBtn").style.display = "inline-block";
    }
  }, 1000);
}

function resetGame() {
  // Pick new random number from your custom list
  randomNumber = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
  attempts = 0;
  timeLeft = 60;

  document.getElementById("guessInput").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("tries").textContent = "Attempts: 0";
  document.getElementById("timer").textContent = "⏱ Time Left: 120s";
  document.getElementById("playAgainBtn").style.display = "none";
  document.getElementById("message").classList.remove("bounce");

  clearInterval(timerInterval);
  startTimer();
}
