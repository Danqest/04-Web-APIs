var beginBtn = document.querySelector(".btn")
var timerEl = document.querySelector('.timer')
var scoreEl = document.querySelector('.score')
var cardHeadEl = document.querySelector('.card-header')
var cardBodyEl = document.querySelector('.card-body')
var cardFootEl = document.querySelector('.card-footer')
var answerBoxEl = document.querySelector('.answer-boxes')
var footerUl = document.querySelector(".footer-body")
var scoreboard = document.querySelector('#view-scoreboard')

var secondsLeft = 60
var score = 0
var cardIndex = []
var cardQuestion = ""
var cardAnswers = []
var playerScores = {}

// initialize game flow via init()
function init() {
    resetTimer()
    resetScore()
    resetCard()
    resetQuestions()
    resetFooter()
    shuffleArray(cardIndex)
    drawCard()
}

// resets timer to 60s, ends game at 0s
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
    }, 1000)
}
// resets score to 0 in beginning
function resetScore() {
    score = 0
    scoreEl.textContent = ("Score: " + score)
}
// resets card text to remove text
function resetCard() {
    answerBoxEl.textContent = ""
}
// establishes array containing questions, possible answers, and correct answers
function resetQuestions() {
    cardIndex = [
        ["Interest rate risk is measured by ___", ["duration", "convexity", "I-spread", "loss given default (LGD)"], "duration"],
        ["An economic balance sheet for an individual includes ___", ["extended portfolio assets & liabilities", "measures of GDP", "business assets & liabilities", "wishful thinking"], "extended portfolio assets & liabilities"],
        ["When interest rates go up, bond prices ___", ["go down", "go up", "do nothing", "vary randomly"], "go down"],
        ["Money printer goes ___", ["brrrrrrr", "ouch", "to China", "to collect"], "brrrrrrr"],
        ["A dollar tomorrow is worth ___ a dollar today", ["less than", "more than", "the same as", "a random value relative to"], "less than"],
        ["An individual's largest asset is typically their ___", ["home", "car", "education", "time to live"], "home"],
        ["Nothing is certain except ___", ["death & taxes", "chips & dip", "day & night", "chicken tendies"], "death & taxes"],
        ["Full replication of bond indicies is not done due to ___", ["cost & liquidity", "effort", "not enough issuers", "legality"], "cost & liquidity"],
        ["Hedge fund fee structure is usually ___", ["2/20", "4/40", "6/60", "8/80"], "2/20"],
        ["Derivatives are usually used for ___", ["hedging", "speculating", "market manipulation", "algorithmic trading"], "hedging"],
        ["Active managers are usually compared to a ___", ["market index", "better manager", "Fed funds rate", "hedge fund"], "market index"],
        ["When you are young, most of your portfolio should be in ___", ["equities", "bonds", "derivatives", "private equity"], "equities"],
        ["When you are old, most of your portfolio should be in ___", ["equities", "bonds", "derivatives", "private equity"], "bonds"],
        ["A covered call strategy involves owning shares and ___", ["writing call options", "buying call options", "writing put options", "buying put options"], "writing call options"],
        ["Target date funds are useful because they are ___", ["set-and-forget", "older financial instruments", "lucrative for managers", "actively managed"], "set-and-forget"],
    ]
}
// shuffles an input array
function shuffleArray(arg1) {
    // Fisher-Yates shuffle algorithm for an array, taken from google search "javascript shuffle array"
    for(let i = arg1.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = arg1[i]
        arg1[i] = arg1[j]
        arg1[j] = temp
  }
}
// removes button
function removeBtn() {
    var btnList = document.getElementById('answer-id')
    while (btnList.firstChild) {
        btnList.removeChild(btnList.lastChild)
    }
}
// draws shuffled card if any available, presents question and answers, verifies right/wrong answer and associated rewards, draws next card.
// if no cards are left the game ends
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
                    window.alert("RIGHT! Gained 5 points")
                    score += 5
                    scoreEl.textContent = ("Score: " + score)
                }
                else {
                    window.alert("WRONG! Lost 5 seconds")
                    secondsLeft -= 5
                    if(score > 0) {
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
    }
}
// removes buttons on game reset
function resetFooter() {
    beginBtn.remove()
    var endbtnList = document.querySelectorAll('.end-btn')
    if(endbtnList.length > 0) {
        footerUl.lastChild.remove() 
    }
}

// at end of game, displays buttons to restart game or input your player name into storage along with your score
function endGame() {

    cardHeadEl.textContent = "GAME OVER"
    var footerEl = document.createElement('li')

    var endbtn0 = document.createElement('button')
    endbtn0.className = 'end-btn'
    endbtn0.innerText = "RESTART GAME"
    endbtn0.addEventListener('click', init)
    footerEl.append(endbtn0)
    
    var endbtn1 = document.createElement('button')
    endbtn1.className = 'end-btn'
    endbtn1.innerText = "RECORD SCORE"
    endbtn1.addEventListener('click', openForm
    )
    footerEl.append(endbtn1)
    footerUl.appendChild(footerEl)

}
// renders scores
function renderScores() {
    var storedScores = JSON.parse(localStorage.getItem('playerScores'))

    if (storedScores != null) {
        window.alert('High Score Table \n' + JSON.stringify(storedScores))
    }
    else {
        window.alert('No scores recorded!')
    }
}
// function to input player name and save
function openForm() {
    var prompt1 = window.prompt("Please enter your player name to save to the highscore table!\nYour score this round was " + score)
    var player = prompt1
    playerScores[player] = score

    localStorage.setItem('playerScores', JSON.stringify(playerScores))
    renderScores()
}

// code to begin the game upon clicking Start
beginBtn.addEventListener("click", init)

