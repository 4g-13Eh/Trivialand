document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('settingsForm').addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("Submit event triggered");

        const amount = document.getElementById('number').value;
        const category = document.getElementById('category').value;
        const difficulty = document.getElementById('difficulty').value;
        const type = document.getElementById('type').value;

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

        let url = buildAPI(amount, category, difficulty, type);

        console.log("Final URL:", url);

        settingsForm.style.display = 'none';
        questionsContainer.style.display = 'block';

        console.log("Fetching data...");
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.response_code === 0){
                const questionsarray = data.results;
                questionsarray.forEach((questionObject) =>{
                    
                    const question = questionObject.question;
                    decodedQuestion = atob(question);

                    const incorrectAnswers = questionObject.incorrect_answers;
                    const correctAnswer = questionObject.correct_answer;
                    const answers = [];
                    answers.push(correctAnswer);
                    answers.push(...incorrectAnswers);
                    answers.sort();
                    decodedAnswers = answers.map((answer) => {
                        return atob(answer);
                    });
                    console.log(decodedAnswers);

                    questionElement = document.createElement('div');
                    questionElement.textContent = `${decodedQuestion}`;
                    decodedAnswers.forEach((answer) => {
                        answerElement = document.createElement('div');

                        radioInput = document.createElement('input');
                        radioInput.type = 'radio';
                        radioInput.name = 'answer';
                        radioInput.value = `${answer}`;
                        answerElement.appendChild(radioInput);
                        
                        questionElement.appendChild(answerElement);
                    });
                    questionElement.classList.add('questionBox');

                    const questionsContainer = document.getElementById("questionsContainer");

                    questionsContainer.appendChild(questionElement);
                })
                console.log(data)
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });


    });

});