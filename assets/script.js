var quizArea = document.getElementById("quiz");
var startBtn = document.getElementById("startBtn");
var countdown = document.getElementById("countDown");
var checkmate = document.getElementById("endGame");
var scoreBtn = document.getElementById("score");
var highScore = document.getElementById("highScore");

var timerCount = 60;
var score;

var questions = [
  {
    question: "What does HTML stand for? ",
    answerChoices: ["High Tech Markup Language", "Hyper Text Markup Language", "Hyper Tech Motor Lingo", "None of the above"],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    answerChoices: ["Corresponding stat sheet", "Color Styling System", "Conditioned Sheet Styling", "Cascading Style Sheets"],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "what does api stand for?",
    answerChoices: ["Application Programming Interface", "Apple Prep Interface", "Amplify Program Intel", "All the above"],
    correctAnswer: "1st answer choice"
  },
  {
    question: "What is the abbreviation for the identification element?",
    answerChoices: ["info", "div", "id", "input"],
    correctAnswer: "id"
  },
  {
    question: "what is the generic block-level container for other elements?",
    answerChoices: ["form", "h2", "header", "div"],
    correctAnswer: "div"
  }
]

var currentQuestion = 0;
var timeLeft = 60;

function startGame(event) {
  event.preventDefault();
  quizArea.innerHTML = '';
  startTimer()
  generateQuestion();
}

function generateQuestion() {
  var question = questions[currentQuestion].question;
  var prompt = document.createElement('h1');
  prompt.textContent = question;
  quizArea.append(prompt);
  generateAnswerChoices();
}

function generateAnswerChoices() {
  answerSlot = document.createElement('div');
  for (var i = 0; i < questions[currentQuestion].answerChoices.length; i++) {
    var choices = document.createElement('button');
    choices.textContent = questions[currentQuestion].answerChoices[i];
    answerSlot.append(choices);
    quizArea.append(answerSlot);
  }
  answerSlot.addEventListener('click', validateAnswer);
}

function validateAnswer(event) {
  event.preventDefault();

  var userChoice = event.target.textContent;
  var correct = questions[currentQuestion].correctAnswer;

  if (userChoice === correct) {
    quizArea.innerHTML = '';
  } else {
    quizArea.innerHTML = '';
    timeLeft = timeLeft - 10;
  }

  currentQuestion++

  if (currentQuestion !== questions.length) {
    generateQuestion();
  } else if (currentQuestion === questions.length) {
    endGame();
  }
}

function startTimer() {

  var timeInterval = setInterval(function () {

    if (currentQuestion === questions.length) {
      countdown.textContent = 'Time: ' + timeLeft;
      clearInterval(timeInterval)
    }

    if (timeLeft > 1) {
      countdown.textContent = 'Time: ' + timeLeft;
      timeLeft--;
    } else if (timeLeft === 1) {
      countdown.textContent = 'Time: ' + timeLeft;
      timeLeft--;
    } else {
      countdown.textContent = 'Time : ';
      clearInterval(timeInterval)
      quizArea.innerHTML = '';
      endGame()
    }
  }, 1000)
}

function endGame() {
  displayText = document.createElement('h2');
  finalScore = document.createElement('p');
  finalScore.textContent = 'Final score: ' + timeLeft;
  displayText.append(finalScore);
  checkmate.append(displayText);

  // display score
  

  // display high score
}

function saveScore(event) {
  event.preventDefault();

  var scoreObj = {
    intials: event.target.children[0].value,
    score: timerCount
  }
  // sets the score into local storage
  localStorage.setItem("score", JSON.stringify(scoreObj));
}

function getScore() {
  // get high score out of localstorage
  var topScore = JSON.parse(localStorage.getItem("score"))

  document.getElementById('highScore').value = topScore

  var showScores = document.createElement('p')

  showScores.textContent = topScore.intials, topScore.score

  showScores.append(topScore);
  quizArea.append(showScores);

}

startBtn.addEventListener("click", startGame);

scoreBtn.addEventListener("submit", saveScore);

highScore.addEventListener('click', getScore);