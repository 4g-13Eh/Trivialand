document.addEventListener('DOMContentLoaded', () => {
    /* checkedSettings(); */

    document.getElementById('settingsForm').addEventListener("submit", (e) => {
        e.preventDefault();

        const amount = document.getElementById('number').value;
        const category = document.getElementById('category').value;
        const difficulty = document.getElementById('difficulty').value;
        const type = document.getElementById('type').value;

        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

        function generateQuiz(){
            fetch(url, {
                method: 'GET'
            })
        }
    });
});