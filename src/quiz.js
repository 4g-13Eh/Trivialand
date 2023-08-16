document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('settingsForm').addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("Submit event triggered");

        const amount = document.getElementById('number').value;
        const category = document.getElementById('category').value;
        const difficulty = document.getElementById('difficulty').value;
        const type = document.getElementById('type').value;

        let url = `https://opentdb.com/api.php?amount=${amount}`
        if (category !== 'any'){
            url += `&category=${category}`
        }
        if (difficulty !== 'any'){
            url += `&difficulty=${difficulty}`
        }
        if (type !== 'any'){
            url += `&type=${type}`
        }

        console.log("Final URL:", url);

        console.log("Fetching data...");
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
        
        const settingsForm = document.getElementById('settings');
        settingsForm.style.display = 'none';

        const settingsDone = document.getElementById('settingsDone');
        settingsDone.style.display = 'block';

    });

});