var beginBtn = document.querySelector(".btn")
var secondsLeft = 60
var timerEl = document.querySelector('.timer')
var cardHeadEl = document.querySelector('.card-header')
var cardBodyEl = document.querySelector('.card-body')
var answerBoxEl = document.querySelector('.answer-boxes')

var score = 0
var cardIndex = []
var cardQuestion = ""
var cardAnswers = []
var highScoreIndex = []

cardIndex = [
    ["This is a test question", ["test answer 1", "test answer 2", "test answer 3", "test answer 4"]],
    ["This is another test question", ["test answer 5", "test answer 6", "test answer 7", "test answer 8"]],
    ["This is a 3rd test question", ["test answer 9", "test answer 10", "test answer 11", "test answer 12"]],
]

function init() {
    resetTimer()
    resetScore()
    resetCard()
    shuffleArray(cardIndex)
    drawCard()
}

function resetTimer() {
    secondsLeft = 60
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = ("Time: " + secondsLeft)

        if(secondsLeft <= 0) {
            clearInterval(timerInterval)
            timerEl.textContent = "GAME OVER"
        }
    }, 100)
}

function resetScore() {
    score = 0
}

function resetCard() {
    answerBoxEl.textContent = ""
}

function shuffleArray(arg1) {
    // Fisher-Yates shuffle algorithm for an array, taken from google search "javascript shuffle array"
    for(let i = arg1.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = arg1[i]
        arg1[i] = arg1[j]
        arg1[j] = temp
  }
}

function drawCard() {
    cardQuestion = cardIndex[0][0]
    cardAnswers = cardIndex[0][1]
    shuffleArray(cardAnswers)
    cardHeadEl.textContent = cardQuestion

    var answer0btn = document.createElement('button')
    answer0btn.innerText = cardAnswers[0]

    var answer1btn = document.createElement('button')
    answer1btn.innerText = cardAnswers[1]

    var answer2btn = document.createElement('button')
    answer2btn.innerText = cardAnswers[2]

    var answer3btn = document.createElement('button')
    answer3btn.innerText = cardAnswers[3]
    
    for(let i = 0; i < cardAnswers.length; i++) {
        var answerEl = document.createElement('li')
        answerEl.appendChild(eval('answer'+i+'btn'))
        answerBoxEl.appendChild(answerEl)
    } 
}

beginBtn.addEventListener("click", init)