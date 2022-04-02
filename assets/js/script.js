var highScores = JSON.parse(localStorage.getItem("highScores")) || []

// question array
const questions = [
    {
        text: "Arrays in Javascript can be used to store________.",
        choices: ["other arrays", "booleans", "numbers and strings", "all of the above"],
        answer: "all of the above"
    },
    {
        text: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<scripting>", "<script>", "<javascript>"],
        answer: "<script>"
    },
    {
        text: "Where is the correct place to insert a JavaScript?",
        choices: ["It will work in the <head> or the <body>", "the <body> section", "the <head> section"],
        answer: "the <body> section"
    }
];

var startBtn = document.querySelector("#start");
var answers = document.querySelector("#answers");
var setNumber = 0;
var time = 75;
var timeEl = document.getElementById("timer");
var timeInterval;
console.log(startBtn)

startBtn.addEventListener("click", function(){
    timeInterval = setInterval(runTimer, 1000)
    populateQuestion();
});

var populateQuestion = function() {
    startBtn.setAttribute("style", "display: none")
    answers.innerHTML = "";
    var questionText = document.createElement("h3");
    questionText.textContent = questions[setNumber].text
    answers.appendChild(questionText)

    questions[setNumber].choices.forEach(function(choice){
        var button = document.createElement("button")
        button.textContent = choice
        button.setAttribute("value", choice)
        button.onclick = function() {
            if(this.value === questions[setNumber].answer) {
                console.log("correct")
            } else {
                console.log("wrong")
                time -= 10
            }
            setNumber++;
            if(setNumber === questions.length) {
                endGame();
            } else {
                populateQuestion();
            }
        }

        answers.appendChild(button)
    })    
}

function runTimer() {
    time--;
    timeEl.textContent=time;
    if(time <= 0){
        time = 0
        clearInterval(timeInterval);
    }
    console.log(time)
}

function endGame() {
    clearInterval(timeInterval);
    var scoreObject = {
        initials:"VCH",
        score:time
    }
    highScores.push(scoreObject)
    localStorage.setItem("highScores", JSON.stringify(highScores))
    console.log(localStorage)
}
