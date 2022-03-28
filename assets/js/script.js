var beginBtn = document.querySelector(".btn")
var timerEl = document.querySelector('.timer')
var scoreEl = document.querySelector('.score')
var cardHeadEl = document.querySelector('.card-header')
var cardBodyEl = document.querySelector('.card-body')
var answerBoxEl = document.querySelector('.answer-boxes')

var secondsLeft = 60
var score = 0
var cardIndex = []
var cardQuestion = ""
var cardAnswers = []
var highScoreIndex = []

cardIndex = [
    ["This is a test question", ["test answer 1", "test answer 2", "test answer 3", "test answer 4"], "test answer 1"],
    ["This is another test question", ["test answer 5", "test answer 6", "test answer 7", "test answer 8"], "test answer 5"],
    ["This is a 3rd test question", ["test answer 9", "test answer 10", "test answer 11", "test answer 12"], "test answer 9"],
]

function init() {
    resetTimer()
    resetScore()
    resetCard()
    resetQuestions()
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
            timerEl.textContent = ""
            removeBtn()
            endGame()
        }
    }, 100)
}

function resetScore() {
    score = 0
    scoreEl.textContent = ("Score: " + score)
}

function resetCard() {
    answerBoxEl.textContent = ""
}

function resetQuestions() {
    cardIndex = [
        ["This is a test question", ["test answer 1", "test answer 2", "test answer 3", "test answer 4"], "test answer 1"],
        ["This is another test question", ["test answer 5", "test answer 6", "test answer 7", "test answer 8"], "test answer 5"],
        ["This is a 3rd test question", ["test answer 9", "test answer 10", "test answer 11", "test answer 12"], "test answer 9"],
    ]
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

function removeBtn() {
    var btnList = document.getElementById('answer-id')
    while (btnList.firstChild) {
        btnList.removeChild(btnList.lastChild)
    }
}

function drawCard() {
    if (cardIndex != 0) {
        cardQuestion = cardIndex[0][0]
        cardPossibleAnswers = cardIndex[0][1]
        cardAnswer = cardIndex[0][2]
        shuffleArray(cardPossibleAnswers)
        cardHeadEl.textContent = cardQuestion
    
        for(let i = 0; i < cardPossibleAnswers.length; i++) {
            window['answerBtn'+i] = document.createElement('button') 
            window['answerBtn'+i].id = 'answer-btn'
            window['answerBtn'+i].innerText = cardPossibleAnswers[i]
            window['answerBtn'+i].addEventListener('click', function() {
                if(eval('answerBtn'+i).innerText === cardAnswer) {
                    score += 5
                    scoreEl.textContent = ("Score: " + score)
                }
                else {
                    secondsLeft -= 5
                    if(score > 0) {
                        score -= 5
                        scoreEl.textContent = ("Score: " + score)
                    }
                }
                cardIndex = cardIndex.slice(1)
                removeBtn()
                drawCard()
            }
            )
            var answerEl = document.createElement('li')
            answerEl.appendChild(window['answerBtn'+i])
            answerBoxEl.appendChild(answerEl)
        } 
    }
    else {
        secondsLeft = 0
        endGame()
    }
}

function endGame() {
    cardHeadEl.textContent = "GAME OVER"
}


beginBtn.addEventListener("click", init)

