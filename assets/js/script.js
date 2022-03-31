// question array
var questions = [
    {
        q: "Arrays in Javascript can be used to store________.",
        a: ["other arrays", "booleens", "numbers and strings", "all of the above"],
        correct: "all of the above"
    },
]

var startQuiz = function() {
    document.getElementById("start").addEventlistener("click", getQuestion())
}

var getQuestion = function() {
    getElementById("question").textContent(q);
}