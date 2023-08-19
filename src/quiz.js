let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settingsForm');
    const questionsContainer = document.getElementById('questionsContainer');

    let currentQuestion = 0;
    let questionsArray = [];

    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Submit event triggered");

        const amount = document.getElementById('number').value;
        const category = document.getElementById('category').value;
        const difficulty = document.getElementById('difficulty').value;
        const type = document.getElementById('type').value;

        let url = buildAPI(amount, category, difficulty, type);
        console.log("Final URL:", url);

        hideSettingsDisplayQuestions(settingsForm, questionsContainer);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.response_code === 0) {
                    questionsArray = data.results;
                    showQuestion(questionsArray, currentQuestion, score);
                }
            })
            .catch(error => console.log(error));
    });
});

function buildAPI(amount, category, difficulty, type){
    let url = `https://opentdb.com/api.php?amount=${amount}`;

    if (category !== 'any') {
        url += `&category=${category}`;
    }
    if (difficulty !== 'any') {
        url += `&difficulty=${difficulty}`;
    }
    if (type !== 'any') {
        url += `&type=${type}`;
    }
    url += `&encode=base64`;	

    return url;
}

function hideSettingsDisplayQuestions(settingsForm, questionsContainer){
    settingsForm.style.display = 'none';
    questionsContainer.style.display = 'block';
};

function checkAnswers(correctAnswer, userAnswer){
    let isCorrect = atob(correctAnswer) === userAnswer;
    if (isCorrect){
        return 100;
    } else {
        return -100;
    }
}

function showQuestion(questionsArray, currentQuestionIndex, score){
    const questionObject = questionsArray[currentQuestionIndex];
    const question = questionObject.question;
    let decodedQuestion = atob(question);

    const incorrectAnswers = questionObject.incorrect_answers;
    const correctAnswer = questionObject.correct_answer;
    console.log("Correct answer:", atob(correctAnswer));
    const answers = [];
    answers.push(correctAnswer);
    answers.push(...incorrectAnswers);
    answers.sort();
    let decodedAnswers = answers.map((answer) => {
        return atob(answer);
    });

    let questionElement = document.createElement('div');
    questionElement.textContent = `${decodedQuestion}`;

    decodedAnswers.forEach((answer) => {
        let answerElement = document.createElement('div');

        let radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'answer';
        radioInput.value = `${answer}`;
        radioInput.id = `${answer.replace(/\s+/g, '-').toLowerCase()}`; // replace spaces with dashes and make lowercase
        radioInput.id += Math.floor(Math.random() * 1000); // just in case there are duplicate answers
        radioInput.classList.add('radiobtn');
        answerElement.appendChild(radioInput);

        let radioLabel = document.createElement('label');
        radioLabel.textContent = `${answer}`;
        radioLabel.setAttribute('for', radioInput.id);
        radioLabel.classList.add('radioLabel');
        answerElement.appendChild(radioLabel);
        
        questionElement.appendChild(answerElement);
    });

    let subbtn = document.createElement('button');
    subbtn.textContent = 'Nächste Frage';
    subbtn.id = 'subbtn';
    subbtn.classList.add('subbtn');
    subbtn.disabled = true;
    questionElement.appendChild(subbtn);

    questionElement.addEventListener("change", () => {
        console.log("Change event triggered");
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        subbtn.disabled = !selectedAnswer;
    });

    subbtn.addEventListener('click', () => {
        let userAnswer = document.querySelector('input[name="answer"]:checked');
        if (userAnswer) {
            let selectedAnswer = userAnswer.value;
            let points = checkAnswers(questionObject.correct_answer, selectedAnswer);;

            questionElement.style.display = 'none';
            score = updateScore(points, score);
            updateScoreDisplay(score);
            currentQuestionIndex++;
            if (currentQuestionIndex < questionsArray.length) {
                showQuestion(questionsArray, currentQuestionIndex, score);
            } else {
                console.log("Quiz is over");
            }
        }
    });

    questionElement.classList.add('questionBox');
    questionsContainer.appendChild(questionElement);
}

function updateScoreDisplay(score){
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateScore(points, currentScore) {
    currentScore += points;
    updateScoreDisplay(currentScore);
    return currentScore;
}