var beginBtn = document.querySelector(".btn")
var secondsLeft = 60
var timerEl = document.querySelector('.timer')
var cardHeadEl = document.querySelector('.card-header')
var cardBodyEl = document.querySelector('.card-body')
var score = 0
var cardIndex = []
var cardQuestion = ""
var cardAnswers = []

cardIndex = [
    ["This is a test question", ["test answer 1", "test answer 2", "test answer 3", "test answer 4"]],
]

function init() {
    resetTimer()
    resetScore()
    shuffleCards()
    drawCard()
}

function resetTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = ("Time: " + secondsLeft)

        if(secondsLeft === 0) {
            clearInterval(timerInterval)
            timerEl.textContent = "GAME OVER"
        }
    }, 100)
}

function resetScore() {
    score = 0
}

function shuffleCards() {
    // Fisher-Yates shuffle algorithm for an array, taken from google search "javascript shuffle array"
    for(let i = cardIndex.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = cardIndex[i]
        cardIndex[i] = cardIndex[j]
        cardIndex[j] = temp
  }
}

function drawCard() {
    cardQuestion = cardIndex[0][0]
    cardAnswers = cardIndex[0][1]
    cardHeadEl.textContent = cardQuestion
    cardBodyEl.textContent = cardAnswers
}

beginBtn.addEventListener("click", init)