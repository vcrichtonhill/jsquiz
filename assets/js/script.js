var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

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
    },
    {
        text: "The external JavaScript file must contain the <script> tag.",
        choices: ["True", "False"],
        answer: "True"
    },
    {
        text: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
        answer: "function = myFunction()"
    },
    {
        text: "How do you call a function named 'myFunction'?",
        choices: ["call myFunction()", "myFunction()", "call function myFunction()"],
        answer: "myFunction()"
    },
    {
        text: "How does a FOR loop start?",
        choices: ["for (i=0; i<=5", "for i= 1 to 5", "for (i=0; i <= 5; i++)", "for (i <= 5; i++)"],
        answer: "for (i=0; i <= 5; i++)"
    },
    {
        text: "How can you add a comment in a JavaScript?",
        choices: ["//This is a comment", "<!-- This is a comment -->", "'This is a comment"],
        answer: "//This is a comment"
    },
    {
        text: "What is the correct way to write a JavaScript array?",
        choices: ["var colors = (1:'red', 2:'green, 3:'blue')", "var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var color = ['red', 'green', 'blue']"],
        answer: "var color = ['red', 'green', 'blue']"
    },
    {
        text: "How do you declare a JavaScript variable?",
        choices: ["v carName;", "variable carName;", "var carName;"],
        answer: "var carName;"
    }
];

var startBtn = document.querySelector("#start");
var answers = document.querySelector("#answers");
var scoreDisplay = document.querySelector("#score-display")
var tryAgain = document.querySelector("#play-again")
var setNumber = 0;
var time = 75;
var timeEl = document.getElementById("timer");
var timeInterval;

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
}

function endGame() {
    clearInterval(timeInterval);
    var scoreObject = {
        initials: window.prompt("Please enter your initials."),
        score: time
    }
    highScores.push(scoreObject)
    localStorage.setItem("highScores", JSON.stringify(highScores))
    highScores.sort(function(a, b){
        return b.score - a.score;
    });
    displayScores();
}

function displayScores() {
    answers.setAttribute("style", "display: none")
    for (let i = 0; i < highScores.length; i++) {
        var scoreEl = document.createElement("li");
        scoreEl.textContent = highScores[i].initials + ": " + highScores[i].score;
        scoreDisplay.append(scoreEl);
    }    
}
