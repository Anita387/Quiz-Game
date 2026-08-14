// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answer-container");
const currentQustionSpan = document.getElementById('current-question');
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("resulte-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "Which programming language is primarily used for Android app development?",
        answers: [
            { text: "Swift", correct: false },
            { text: "Kotlin", correct: true },
            { text: "Python", correct: false },
            { text: "Ruby", correct: false },
        ],
    },
    {
        question: "What does the acronym 'SQL' stand for?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: "Simple Question Language", correct: false },
            { text: "System Query Logic", correct: false },
            { text: "Sequential Query Language", correct: false },
        ],
    },
    {
        question: "Which of the following is NOT an object-oriented programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "C++", correct: false },
            { text: "C", correct: true },
            { text: "Python", correct: false },
        ],
    },
    {
        question: "What is the output of 'console.log(typeof [])' in JavaScript?",
        answers: [
            { text: "array", correct: false },
            { text: "object", correct: true },
            { text: "undefined", correct: false },
            { text: "null", correct: false },
        ],
    },
    {
        question: "Which data structure uses LIFO (Last In First Out) principle?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Array", correct: false },
            { text: "Linked List", correct: false },
        ],
    },
];

// Quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length; // FIXED: was questionText.length

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars    
    currentQuestionIndex = 0;
    score = 0; //  reset score
    scoreSpan.textContent = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestions();
}

function showQuestions() {
    //reset the state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQustionSpan.textContent = currentQuestionIndex + 1;

    // FIXED: proper progress calculation
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;
    
    // getting rid of the previos answers
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // dataset: store some custom data
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);

        //adding the button to the UI
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    //optimisation
    if (answersDisabled) return;
    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    // for each: gets an array as an in so we need to convert 
    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    // setting some delay (   ()=> {},wait time  )
    setTimeout(() => {
        currentQuestionIndex++;

        //check if there are more questions or if the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestions();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    // FIXED: hide quiz, show results
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    
    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;
    
    // FIXED: proper percentage comparisons
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Great effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not Bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz(); // FIXED: call startQuiz directly
}