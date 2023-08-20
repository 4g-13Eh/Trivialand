document.addEventListener('DOMContentLoaded', () => {
    let score = localStorage.getItem('score');
    let amount = localStorage.getItem('amount');

    const scoreDisplay = document.getElementById('real');
    scoreDisplay.textContent = score;

    showCeleb(score, amount);
    
    localStorage.clear();
});

function showCeleb(score, amount){
    const congratsContainer = document.getElementById('congratsContainer');
    const congrats = document.createElement('h4');
    if (score == amount){
        congrats.textContent = 'Herzlichen Glückwunsch! Du bist ein echter Quiz-Experte!';
        congratsContainer.appendChild(congrats);
    } else if (score != amount && score >= amount * 0.8) {
        congrats.textContent = 'Gut gemacht! Du bist sehr gut gewesen!';
        congratsContainer.appendChild(congrats);
    } else if (score < amount * 0.8 && score >= amount * 0.5) {
        congrats.textContent = 'Du hast es geschafft! Du bist gut gewesen!';
        congratsContainer.appendChild(congrats);
    } else if (score < amount * 0.5 && score >= amount * 0.3) {
        congrats.textContent = 'Ist noch Luft nach oben! Du bist okay gewesen!';
        congratsContainer.appendChild(congrats);
    } else if (score < amount * 0.3 && score >= 0) {
        congrats.textContent = 'Das war nicht so gut! Du bist schlecht gewesen!';
        congratsContainer.appendChild(congrats);
    } else if (score < 0) {
        congrats.textContent = 'Wie hast du das denn geschafft?!';
        congratsContainer.appendChild(congrats);
    }
}